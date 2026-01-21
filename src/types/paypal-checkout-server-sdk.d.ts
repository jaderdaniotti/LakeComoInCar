// Minimal ambient types to satisfy TypeScript for the PayPal SDK (no official types published).
declare module '@paypal/checkout-server-sdk' {
  const checkoutNodeJssdk: any;
  export = checkoutNodeJssdk;
}
