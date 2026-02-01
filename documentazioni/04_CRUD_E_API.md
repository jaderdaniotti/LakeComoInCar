# CRUD e API – Route Next.js e componenti admin

Processo per replicare il CRUD del progetto: API Route (GET, POST, PATCH, DELETE), validazione, integrazione con il database e componenti admin che le chiamano.

---

## 1. Panoramica

| Livello | Dove | Ruolo |
|---------|------|--------|
| API Route | `app/api/bookings/route.ts`, `app/api/bookings/[id]/route.ts` | Endpoint HTTP per lista + singolo |
| Logica dati | `src/lib/db/bookings.ts`, `quotes.ts`, ecc. | Create, read, update, delete (Supabase admin) |
| Componenti admin | `components/admin/BookingsManager.tsx`, ecc. | UI che chiama le API e gestisce form/modali |

Convenzione: una “risorsa” (bookings, quotes, routes, …) ha:

- **Collection**: `app/api/<risorsa>/route.ts` → GET (lista), POST (crea).
- **Singolo**: `app/api/<risorsa>/[id]/route.ts` → GET (uno), PATCH (aggiorna), DELETE (elimina).

---

## 2. API Route – collection (lista + crea)

### 2.1 File: `app/api/bookings/route.ts`

**GET** – lista prenotazioni (per admin, con filtri opzionali):

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getBookings } from '@/src/lib/db/bookings';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // TODO: verifica sessione admin
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error, count } = await getBookings({ status, limit, offset });
    if (error) throw error;

    return NextResponse.json(
      { bookings: data, total: count, limit, offset },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET bookings:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero delle prenotazioni' },
      { status: 500 }
    );
  }
}
```

**POST** – crea prenotazione (form pubblico o checkout):

```ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validazione campi obbligatori
    if (!body.customerName || !body.customerEmail || !body.customerPhone ||
        !body.origin || !body.destination || !body.serviceDate || !body.serviceTime) {
      return NextResponse.json(
        { error: 'Dati mancanti. Compila tutti i campi obbligatori.' },
        { status: 400 }
      );
    }

    const dbData = {
      customer_name: body.customerName,
      customer_email: body.customerEmail,
      customer_phone: body.customerPhone,
      route_id: body.routeId ?? null,
      route_code: body.routeCode ?? null,
      route_description: `${body.origin} → ${body.destination}`,
      vehicle_code: body.vehicle ?? null,
      service_date: body.serviceDate,
      service_time: body.serviceTime,
      passengers: body.passengers || 1,
      notes: body.notes ?? null,
      total_price: body.totalPrice ?? null,
      payment_method: body.paymentMethod || 'cash',
      language: body.language || 'it',
      privacy_consent: true,
      terms_accepted: true,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
    };

    const { createBooking } = await import('@/src/lib/db/bookings');
    const { data: booking, error: dbError } = await createBooking(dbData);

    if (dbError) {
      console.error('DB error:', dbError);
      return NextResponse.json(
        { error: 'Errore durante il salvataggio della prenotazione.' },
        { status: 500 }
      );
    }

    // Opzionale: invio email (sendBookingNotification, ecc.)
    // try { await sendBookingNotification(...); } catch (e) { ... }

    return NextResponse.json(
      { success: true, bookingId: booking?.id, message: 'Prenotazione inviata con successo.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST bookings:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'invio della prenotazione.', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
```

Adatta i nomi dei campi al body che invia il frontend (camelCase o snake_case).

---

## 3. API Route – singolo (get, update, delete)

### 3.1 File: `app/api/bookings/[id]/route.ts`

**GET** – una prenotazione:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getBookingById } from '@/src/lib/db/bookings';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await getBookingById(id);

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Prenotazione non trovata' }, { status: 404 });
    }

    return NextResponse.json({ booking: data }, { status: 200 });
  } catch (error) {
    console.error('GET booking:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero della prenotazione' },
      { status: 500 }
    );
  }
}
```

**PATCH** – aggiorna (solo campi inviati):

```ts
import { updateBooking } from '@/src/lib/db/bookings';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates: Record<string, unknown> = {};
    if (body.status != null) updates.status = body.status;
    if (body.payment_status != null) updates.payment_status = body.payment_status;
    if (body.total_price !== undefined) updates.total_price = body.total_price;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.cancelled_reason != null) updates.cancelled_reason = body.cancelled_reason;

    const { data, error } = await updateBooking(id, updates);

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Prenotazione non trovata' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, booking: data, message: 'Prenotazione aggiornata con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('PATCH booking:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento della prenotazione' },
      { status: 500 }
    );
  }
}
```

**DELETE** – soft delete (es. status cancelled):

```ts
import { deleteBooking } from '@/src/lib/db/bookings';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const reason = searchParams.get('reason') || 'Deleted by admin';

    const { data, error } = await deleteBooking(id, reason);

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Prenotazione non trovata' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: 'Prenotazione eliminata con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE booking:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione della prenotazione' },
      { status: 500 }
    );
  }
}
```

In Next.js 15+ `params` è una Promise, quindi va fatto `await params`.

---

## 4. API admin – risorse “config” (routes, pricing_rules, global_rules)

Per entità gestite solo da admin (es. routes, regole prezzi), stessa struttura:

- `app/api/admin/routes/route.ts` → GET (lista), POST (crea).
- `app/api/admin/routes/[id]/route.ts` → GET, PATCH, DELETE.

Usa sempre `supabaseAdmin` (tramite `src/lib/db/` o direttamente) e, in produzione, verifica la sessione admin prima di rispondere (vedi sotto).

Esempio GET + POST per routes:

```ts
// app/api/admin/routes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

export async function GET() {
  try {
    const { data: routes, error } = await supabaseAdmin
      .from('routes')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json({ routes }, { status: 200 });
  } catch (error) {
    console.error('GET routes:', error);
    return NextResponse.json(
      { error: 'Errore durante il caricamento dei percorsi' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: route, error } = await supabaseAdmin
      .from('routes')
      .insert({
        code: body.code,
        origin_it: body.origin_it,
        origin_en: body.origin_en ?? null,
        origin_fr: body.origin_fr ?? null,
        origin_es: body.origin_es ?? null,
        destination_it: body.destination_it,
        destination_en: body.destination_en ?? null,
        destination_fr: body.destination_fr ?? null,
        destination_es: body.destination_es ?? null,
        base_price: body.base_price,
        distance_km: body.distance_km ?? null,
        duration_minutes: body.duration_minutes ?? null,
        is_active: body.is_active ?? true,
        sort_order: body.sort_order ?? 0,
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ route }, { status: 201 });
  } catch (error) {
    console.error('POST route:', error);
    return NextResponse.json(
      { error: 'Errore durante la creazione del percorso' },
      { status: 500 }
    );
  }
}
```

Per `[id]`: GET select by id, PATCH update, DELETE delete (o soft delete se previsto).

---

## 5. Autenticazione admin (TODO in produzione)

Le route che modificano dati (POST, PATCH, DELETE) e le API admin dovrebbero verificare che l’utente sia loggato come admin. Esempio concettuale:

```ts
// const session = await getServerSession(); // NextAuth o tuo sistema
// if (!session?.user?.role === 'admin') {
//   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// }
```

Implementa `getServerSession` (o cookie/JWT) e sblocca questi check prima del deploy.

---

## 6. Componenti admin – pattern

- **Lista**: fetch `GET /api/bookings` (o `/api/admin/routes`), tabella con filtri (status, date), pulsanti “Modifica” / “Elimina”.
- **Modale/Form modifica**: PATCH ` /api/bookings/[id]` con body (status, payment_status, total_price, notes, ecc.).
- **Elimina**: DELETE ` /api/bookings/[id]?reason=...`, poi refresh lista.
- **Creazione**: form che invia POST a ` /api/bookings` o a ` /api/quotes` con i campi richiesti.

Gestisci stati di loading ed errori e messaggi di successo/errore in italiano (o dalla i18n).

---

## 7. Checklist CRUD e API

- [ ] Per ogni risorsa: `app/api/<risorsa>/route.ts` (GET, POST) e `app/api/<risorsa>/[id]/route.ts` (GET, PATCH, DELETE).
- [ ] Validazione body in POST (campi obbligatori), risposta 400 con messaggio chiaro.
- [ ] Uso di funzioni in `src/lib/db/` per tutte le operazioni DB.
- [ ] Risposte JSON uniformi: `{ data }`, `{ error }`, `{ success, message }` e status HTTP coerenti (200, 201, 400, 404, 500).
- [ ] In produzione: verifica sessione admin su route sensibili (admin e modifica/cancellazione prenotazioni/preventivi).
- [ ] Componenti admin che chiamano queste API e gestiscono loading/errori/successo.

Seguendo questo processo il CRUD e le API saranno allineati al progetto di riferimento e riutilizzabili nei prossimi progetti.
