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
    images: [
      {
        url: '/images/thumbnail-2.jpg',
        width: 1600,
        height: 960,
        alt: 'Saad Sifar – Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saad Sifar – Portfolio',
    description: 'Software Engineer and Computer Science student at NYU Abu Dhabi building intelligent systems, interactive 3D web graphics, and full-stack software.',
    images: ['/images/thumbnail-2.jpg'],
  },
};

export default function Page() {
  return <Home />;
}
