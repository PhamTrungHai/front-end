import Header from '@/components/Header';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import ProtectedRoute from '@/components/ProtectedRoute';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FConnect',
  description: 'A website for sharing files and connecting with friends.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* Header */}
          <Header />
          {/* Content */}
          {children}

          {/* Footer */}
        </Providers>
      </body>
    </html>
  );
}
