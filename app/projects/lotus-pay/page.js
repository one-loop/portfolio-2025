import LotusPay from '../../../src/views/LotusPay';

const title = 'Lotus Pay';
const description =
  'Lotus Pay, a merchant-of-record payment concept to help Sri Lankan freelancers and small businesses get paid by international clients: the design, a clickable demo, economic models and a simulated RCT.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/lotus-pay',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/lotus-pay',
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
  return <LotusPay />;
}
