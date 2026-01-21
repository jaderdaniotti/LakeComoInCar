import { redirect } from 'next/navigation';

// Redirect root to Italian (default locale)
export default function RootPage() {
  redirect('/it');
}
