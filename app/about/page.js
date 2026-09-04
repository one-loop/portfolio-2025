import About from '../../src/views/About';

export const metadata = {
  title: 'About',
  description: 'Learn about Saad Sifar\'s background, education in Computer Science at NYU Abu Dhabi, research in artificial intelligence, and software engineering experience.',
  alternates: {
    canonical: 'https://saadsifar.com/about',
  },
  openGraph: {
    title: 'About | Saad Sifar',
    description: 'Learn about Saad Sifar\'s background, education in Computer Science at NYU Abu Dhabi, research in artificial intelligence, and software engineering experience.',
    url: 'https://saadsifar.com/about',
    type: 'profile',
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
    title: 'About | Saad Sifar',
    description: 'Learn about Saad Sifar\'s background, education in Computer Science at NYU Abu Dhabi, research in artificial intelligence, and software engineering experience.',
    images: ['/images/thumbnail-2.jpg'],
  },
};

export default function Page() {
  return <About />;
}
