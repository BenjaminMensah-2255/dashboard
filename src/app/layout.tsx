// layout.tsx
import './globals.css';

export const metadata = {
  title: 'XtraPay',
  description: 'A simple authentication app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
