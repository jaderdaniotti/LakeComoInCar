'use client';

import { useEffect } from 'react';

export default function KeepAlivePing() {
  useEffect(() => {
    // Trigger a server-side keep-alive ping without showing anything to the user.
    fetch('/api/keep-alive', {
      method: 'GET',
      // Ensure we don't cache this request.
      cache: 'no-store',
      // Let the request complete even when the page is unloading.
      keepalive: true,
      credentials: 'omit',
    }).catch(() => {
      // Intentionally silent: no console noise.
    });
  }, []);

  return null;
}

