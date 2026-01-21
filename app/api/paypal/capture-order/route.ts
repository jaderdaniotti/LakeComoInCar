import { NextRequest, NextResponse } from 'next/server';
import { client, checkoutNodeJssdk } from '@/src/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Crea la richiesta per catturare il pagamento
    const requestCapture = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    requestCapture.requestBody({});

    // Esegui la cattura
    const paypalClient = client();
    const capture = await paypalClient.execute(requestCapture);

    // Verifica lo stato del pagamento
    const captureStatus = capture.result.status;
    
    if (captureStatus === 'COMPLETED') {
      // Estrai i dettagli del pagamento
      const captureData = capture.result.purchase_units[0].payments.captures[0];
      
      return NextResponse.json({
        success: true,
        orderId: capture.result.id,
        status: captureStatus,
        paymentDetails: {
          captureId: captureData.id,
          amount: captureData.amount.value,
          currency: captureData.amount.currency_code,
          createTime: captureData.create_time,
          updateTime: captureData.update_time,
        },
        fullCapture: capture.result,
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Payment not completed',
          status: captureStatus,
          details: capture.result
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PayPal Capture Order Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to capture PayPal payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint per verificare lo stato di un ordine
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Crea la richiesta per ottenere i dettagli dell'ordine
    const requestGet = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

    // Esegui la richiesta
    const paypalClient = client();
    const order = await paypalClient.execute(requestGet);

    return NextResponse.json({
      success: true,
      order: order.result,
    });
  } catch (error) {
    console.error('PayPal Get Order Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get PayPal order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
