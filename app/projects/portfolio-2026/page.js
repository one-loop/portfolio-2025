import Portfolio2026 from '../../../src/views/Portfolio2026';

const title = '2026 Portfolio';
const description =
  'How the 3D room on saadsifar.com works (baked lighting, a tiny Three.js engine, and keeping it alive inside Next.js) and how the site evolved from 2025 to 2026.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/portfolio-2026',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/portfolio-2026',
    type: 'article',
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
    title: `${title} | Saad Sifar`,
    description,
    images: ['/images/thumbnail-2.jpg'],
  },
};

export default function Page() {
  return <Portfolio2026 />;
}
