# Pagamenti – PayPal e Stripe (Next.js App Router)

Processo per replicare i pagamenti del progetto: PayPal (create order, capture) e Stripe (payment intent, verify), variabili d’ambiente e pagine di ritorno.

---

## 1. Panoramica

| Provider | Flusso | File chiave |
|----------|--------|-------------|
| PayPal | Create Order → Approvazione cliente → Capture Order | `app/api/paypal/create-order/route.ts`, `app/api/paypal/capture-order/route.ts`, `src/lib/paypal.ts`, `components/payment/PayPalButton.tsx` |
| Stripe | Create Payment Intent → Element/Checkout → Verify Payment | `app/api/stripe/create-payment-intent/route.ts`, `app/api/stripe/verify-payment/route.ts`, `src/lib/stripe.ts`, `components/payment/StripeCheckout.tsx` |

Variabili d’ambiente: vedi [09_VARIABILI_AMBIENTE.md](./09_VARIABILI_AMBIENTE.md).

---

## 2. PayPal

### 2.1 Dipendenze

```bash
npm install @paypal/react-paypal-js @paypal/checkout-server-sdk
```

### 2.2 Variabili

- `PAYPAL_CLIENT_ID` (server)
- `PAYPAL_CLIENT_SECRET` (server)
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (stesso valore, per il client)
- `PAYPAL_MODE`: `sandbox` o `live`
- `NEXT_PUBLIC_BASE_URL`: base URL del sito (es. `https://www.tuosito.eu`) per return/cancel URL

### 2.3 Client server – `src/lib/paypal.ts`

```ts
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const isLive = process.env.PAYPAL_MODE === 'live';
  return isLive
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export { client, checkoutNodeJssdk };
```

### 2.4 Create Order – `app/api/paypal/create-order/route.ts`

- Body: `amount`, `currency` (default EUR), `description`, `bookingId` (opzionale).
- Crea ordine con `intent: 'CAPTURE'`, `return_url` e `cancel_url` basati su `NEXT_PUBLIC_BASE_URL`.
- Risposta: `{ success: true, orderId, order }`.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { client, checkoutNodeJssdk } from '@/src/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'EUR', description, bookingId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const requestOrder = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    requestOrder.prefer('return=representation');
    requestOrder.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: description || 'Prenotazione',
          custom_id: bookingId || '',
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'Nome Sito',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
      },
    });

    const paypalClient = client();
    const order = await paypalClient.execute(requestOrder);

    return NextResponse.json({
      success: true,
      orderId: order.result.id,
      order: order.result,
    });
  } catch (error) {
    console.error('PayPal Create Order Error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
```

### 2.5 Capture Order – `app/api/paypal/capture-order/route.ts`

- Body: `orderID` (dato da PayPal dopo l’approvazione).
- Chiama OrdersCaptureRequest con quell’ID.
- Opzionale: aggiorna prenotazione nel DB (payment_status, ecc.) usando `custom_id` se hai passato `bookingId` in create.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { client, checkoutNodeJssdk } from '@/src/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderID } = body;

    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });
    }

    const requestCapture = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    requestCapture.requestBody({});

    const paypalClient = client();
    const capture = await paypalClient.execute(requestCapture);

    // Opzionale: aggiorna booking con custom_id se presente
    // const bookingId = capture.result.purchase_units?.[0]?.custom_id;
    // if (bookingId) await updateBooking(bookingId, { payment_status: 'deposit_paid' });

    return NextResponse.json({
      success: true,
      capture: capture.result,
    });
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal order', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
```

### 2.6 Frontend – script PayPal e bottone

Nel layout root (`app/layout.tsx`) carica lo script SDK (solo client-id pubblico):

```tsx
<Script
  src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR&components=buttons`}
  strategy="beforeInteractive"
/>
```

Il componente `PayPalButton` usa `@paypal/react-paypal-js`: crea ordine chiamando `POST /api/paypal/create-order`, poi usa `onApprove` per chiamare `POST /api/paypal/capture-order` e infine reindirizza a `/payment-success` o gestisce l’errore.

---

## 3. Stripe

### 3.1 Dipendenze

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

### 3.2 Variabili

- `STRIPE_SECRET_KEY` (server)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (client)
- `NEXT_PUBLIC_BASE_URL` per return URL
- Opzionale: `STRIPE_WEBHOOK_SECRET` se usi webhook

### 3.3 Client server – `src/lib/stripe.ts`

```ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // usa la versione indicata nella doc Stripe
});
```

### 3.4 Create Payment Intent – `app/api/stripe/create-payment-intent/route.ts`

- Body: `amount`, `currency` (default eur), `description`, `metadata` (es. bookingId).
- Converte amount in centesimi (Stripe usa centesimi).
- Risposta: `{ success: true, clientSecret, paymentIntentId }`.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/src/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'eur', description, metadata } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      description: description || 'Prenotazione',
      metadata: metadata || {},
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe Create Payment Intent Error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
```

### 3.5 Verify Payment – `app/api/stripe/verify-payment/route.ts`

- Body: `paymentIntentId` (o `payment_intent_id`).
- Recupera il PaymentIntent con `stripe.paymentIntents.retrieve(id)`.
- Se `status === 'succeeded'`, opzionalmente aggiorna la prenotazione (payment_status, stripe_payment_intent_id) e ritorna success.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/src/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paymentIntentId = body.paymentIntentId || body.payment_intent_id;

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'Missing paymentIntentId' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { success: false, status: paymentIntent.status, message: 'Pagamento non completato' },
        { status: 200 }
      );
    }

    // Opzionale: aggiorna booking da metadata
    // const bookingId = paymentIntent.metadata?.bookingId;
    // if (bookingId) await updateBooking(bookingId, { payment_status: 'deposit_paid', stripe_payment_intent_id: paymentIntentId });

    return NextResponse.json({
      success: true,
      status: paymentIntent.status,
      message: 'Pagamento verificato',
    });
  } catch (error) {
    console.error('Stripe Verify Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
```

### 3.6 Frontend – Stripe Elements

Il componente Stripe usa `@stripe/react-stripe-js` e `loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)`. Flusso tipico:

1. Ottieni `clientSecret` da `POST /api/stripe/create-payment-intent` (con amount e metadata).
2. Avvolgi la form in `<Elements stripe={stripePromise} options={{ clientSecret }}>`.
3. Usa `<PaymentElement />` e bottone “Paga”; su conferma chiama `stripe.confirmPayment()`.
4. Dopo il redirect a `/payment-success`, chiama `POST /api/stripe/verify-payment` con il `paymentIntentId` (da URL o stato) e aggiorna la UI/DB.

---

## 4. Pagine di ritorno

- **payment-success**: `app/payment-success/page.tsx` – messaggio “Pagamento completato”, eventuale chiamata a verify e redirect alla prenotazione o alla homepage.
- **payment-cancel**: `app/payment-cancel/page.tsx` – messaggio “Pagamento annullato” e link per riprovare o tornare alla prenotazione.

Usa `NEXT_PUBLIC_BASE_URL` (o `window.location.origin`) per link e redirect lato client.

---

## 5. Integrazione con prenotazioni

- In **create order / create payment intent**: passa `bookingId` in `custom_id` (PayPal) o in `metadata.bookingId` (Stripe).
- Dopo **capture / verify**:
  - Aggiorna la prenotazione con `payment_status: 'deposit_paid'` (o `fully_paid` se è saldo).
  - Salva `stripe_payment_intent_id` nella prenotazione se usi Stripe.
- Gestisci errori di rete e pagamento annullato senza aggiornare lo stato.

---

## 6. Checklist pagamenti

- [ ] Variabili PayPal e Stripe in `.env` (e in produzione), `NEXT_PUBLIC_BASE_URL` corretto.
- [ ] `src/lib/paypal.ts` e `src/lib/stripe.ts` con client server.
- [ ] API: create-order, capture-order (PayPal); create-payment-intent, verify-payment (Stripe).
- [ ] Componenti PayPal e Stripe nel flusso prenotazione (amount da totale o acconto).
- [ ] Pagine payment-success e payment-cancel; dopo success, verify e aggiornamento prenotazione.
- [ ] In produzione: chiavi LIVE, HTTPS, return URL con dominio reale.

Seguendo questo processo i pagamenti saranno allineati al progetto di riferimento e riutilizzabili nei prossimi progetti.
