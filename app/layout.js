
import localFont from 'next/font/local';
import '../src/index.css';
import ClientLayout from '../src/components/ClientLayout';

const newSpirit = localFont({
  src: [
    {
      path: '../src/fonts/New-Spirit-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Semi-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-new-spirit',
  display: 'swap',
});

export const metadata = {
  title: 'Saad Sifar – Portfolio',
  description: 'Saad Sifar is a Software Engineer based in Abu Dhabi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={newSpirit.variable}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
