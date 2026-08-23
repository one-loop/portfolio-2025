
import Home from '../src/views/Home';

export const metadata = {
  title: 'Saad Sifar – Portfolio',
  description: 'Saad Sifar is a Software Engineer based in Abu Dhabi.',
  alternates: {
    canonical: 'https://saadsifar.com',
  },
  openGraph: {
    title: 'Saad Sifar – Portfolio',
    description: 'Saad Sifar is a Software Engineer based in Abu Dhabi.',
    url: 'https://saadsifar.com',
    type: 'website',
  },
};

export default function Page() {
  return <Home />;
}
