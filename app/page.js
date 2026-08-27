import Home from '../src/views/Home';

export const metadata = {
  title: 'Saad Sifar – Portfolio',
  description: 'Software Engineer and Computer Science student at NYU Abu Dhabi building intelligent systems, interactive 3D web graphics, and full-stack software.',
  alternates: {
    canonical: 'https://saadsifar.com',
  },
  openGraph: {
    title: 'Saad Sifar – Portfolio',
    description: 'Software Engineer and Computer Science student at NYU Abu Dhabi building intelligent systems, interactive 3D web graphics, and full-stack software.',
    url: 'https://saadsifar.com',
    type: 'website',
  },
};

export default function Page() {
  return <Home />;
}
