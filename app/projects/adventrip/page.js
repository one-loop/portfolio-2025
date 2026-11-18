import Adventrip from '../../../src/views/Adventrip';

const title = 'AdvenTrip';
const description =
  'AdvenTrip, a social travel app built at CalHacks in San Francisco: a swipe feed that learns what trips you like, group trip planning with invite links, and the story of the weekend it was built.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/adventrip',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/adventrip',
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
  return <Adventrip />;
}
