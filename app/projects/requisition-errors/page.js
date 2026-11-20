import RequisitionErrors from '../../../src/views/RequisitionErrors';

const title = 'Reducing Errors in Histopathology Requisitions';
const description =
  'An overview of a published study on whether a short orientation for new intern doctors makes histopathology request forms more complete: 8,396 forms from a Sri Lankan university hospital, with 12 of 20 fields filled in significantly more often afterwards.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/requisition-errors',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/requisition-errors',
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
  return <RequisitionErrors />;
}
