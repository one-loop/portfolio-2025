import Experience from '../../src/views/Experience';

export const metadata = {
  title: 'Experience',
  description: 'Professional software engineering experience, academic research at NYU Abu Dhabi, internship roles, and technical skills of Saad Sifar.',
  alternates: {
    canonical: 'https://saadsifar.com/experience',
  },
  openGraph: {
    title: 'Experience | Saad Sifar',
    description: 'Professional software engineering experience, academic research at NYU Abu Dhabi, internship roles, and technical skills of Saad Sifar.',
    url: 'https://saadsifar.com/experience',
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
    title: 'Experience | Saad Sifar',
    description: 'Professional software engineering experience, academic research at NYU Abu Dhabi, internship roles, and technical skills of Saad Sifar.',
    images: ['/images/thumbnail-2.jpg'],
  },
};

export default function Page() {
  return <Experience />;
}
