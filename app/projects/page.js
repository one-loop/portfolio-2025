import Projects from '../../src/views/Projects';

export const metadata = {
  title: 'Projects',
  description: 'Explore featured projects by Saad Sifar, including interactive 3D web graphics with Three.js, machine learning systems, full-stack applications, and open-source code.',
  alternates: {
    canonical: 'https://saadsifar.com/projects',
  },
  openGraph: {
    title: 'Projects | Saad Sifar',
    description: 'Explore featured projects by Saad Sifar, including interactive 3D web graphics with Three.js, machine learning systems, full-stack applications, and open-source code.',
    url: 'https://saadsifar.com/projects',
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
    title: 'Projects | Saad Sifar',
    description: 'Explore featured projects by Saad Sifar, including interactive 3D web graphics with Three.js, machine learning systems, full-stack applications, and open-source code.',
    images: ['/images/thumbnail-2.jpg'],
  },
};

export default function Page() {
  return <Projects />;
}
