
import About from '../../src/pages/About';

export const metadata = {
  title: 'About | Saad Sifar',
  description: 'About Saad Sifar',
  alternates: {
    canonical: 'https://saadsifar.com/about',
  },
  openGraph: {
    title: 'About | Saad Sifar',
    description: 'About Saad Sifar',
    url: 'https://saadsifar.com/about',
    type: 'website',
  },
};

export default function Page() {
  return <About />;
}
