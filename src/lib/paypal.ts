import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// Configurazione PayPal Client
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || 'sandbox';

  if (!clientId || !clientSecret) {
    throw new Error('Missing PayPal credentials');
  }

  if (mode === 'live') {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  }
}

// PayPal Client
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export { client, checkoutNodeJssdk };
