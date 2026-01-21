import { NextRequest, NextResponse } from 'next/server';
import { client, checkoutNodeJssdk } from '@/src/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'EUR', description, bookingId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Crea la richiesta per l'ordine PayPal
    const requestOrder = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    requestOrder.prefer('return=representation');
    requestOrder.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: description || 'Prenotazione LakeComoInCar',
          custom_id: bookingId || '',
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'LakeComoInCar',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
      },
    });

    // Esegui la richiesta
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
      { 
        error: 'Failed to create PayPal order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
