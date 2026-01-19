import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Rimuovi Navbar e Footer per l'area admin */}
      {children}
    </>
  );
}
