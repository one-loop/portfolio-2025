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
  },
};

export default function Page() {
  return <About />;
}
