import UnderConstruction from '../../src/views/UnderConstruction';

export const metadata = {
  title: 'Coming Soon',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function Page() {
  return <UnderConstruction />;
}
