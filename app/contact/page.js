
import Contact from '../../src/views/Contact';

export const metadata = {
  title: 'Contact | Saad Sifar',
  description: 'Contact Saad Sifar',
  alternates: {
    canonical: 'https://saadsifar.com/contact',
  },
  openGraph: {
    title: 'Contact | Saad Sifar',
    description: 'Contact Saad Sifar',
    url: 'https://saadsifar.com/contact',
    type: 'website',
  },
};

export default function Page() {
  return <Contact />;
}
