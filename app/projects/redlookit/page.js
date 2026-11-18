import Redlookit from '../../../src/views/Redlookit';

const title = 'Redlookit';
const description =
  'Redlookit, a side project that let people browse Reddit while looking like they were reading Outlook email: built in high school in 2021, used by 100,000+ people, and grown from one script into a TypeScript app bundled with webpack.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/redlookit',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/redlookit',
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
  return <Redlookit />;
}
