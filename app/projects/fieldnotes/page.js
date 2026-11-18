import Fieldnotes from '../../../src/views/Fieldnotes';

const title = 'Fieldnotes';
const description =
  'Fieldnotes, an open-source read-it-later app built by a five-person team with the MERN stack for Agile Software Development & DevOps at NYU: status-based reading, highlights and reflections, a mock/MongoDB data layer, and Docker deployment.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/fieldnotes',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/fieldnotes',
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
  return <Fieldnotes />;
}
