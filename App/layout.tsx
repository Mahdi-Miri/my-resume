import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  // Title and description will be read by search engines
  title: 'Mahdi Miri - Data Scientist',
  description: 'Data Scientist specializing in NLP, Deep Learning, and ML solutions. Available for freelance projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}