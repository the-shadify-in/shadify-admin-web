import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shadify Admin Portal',
  description: 'Internal Management Platform for Shadify Digital Weddings',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}

