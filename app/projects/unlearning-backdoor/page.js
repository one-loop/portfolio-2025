import UnlearningBackdoor from '../../../src/views/UnlearningBackdoor';

const title = 'Unlearning Activated Backdoor Attacks';
const description =
  'A parasitic backdoor that stays dormant inside a model until a privacy deletion request wakes it up. Summer 2026 ML security research by Saad Sifar with Manaar Alam.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/unlearning-backdoor',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/unlearning-backdoor',
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
  return <UnlearningBackdoor />;
}
