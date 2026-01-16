import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from './components/sidebar';

export const metadata: Metadata = {
  title: 'Home Board',
  description: 'Home dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <div className="flex min-h-dvh">
          <Sidebar />
          <main className="flex-1 bg-white p-8">
            <div>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
