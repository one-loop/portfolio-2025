
import '../src/index.css';
import ClientLayout from '../src/components/ClientLayout';

export const metadata = {
  title: 'Saad Sifar – Portfolio',
  description: 'Saad Sifar is a Software Engineer based in Abu Dhabi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
