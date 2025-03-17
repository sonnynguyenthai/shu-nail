import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ReduxProvider } from '@/redux/redux.provider';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Shu nails & Beauty',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen"><ReduxProvider>{children}</ReduxProvider></main>
          <Toaster richColors />
          <footer className="bg-secondary/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-700">
              <p>Made with 💗 by nguyenthaisonny</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}