import Photos from '../../src/views/Photos';

export const metadata = {
  title: 'Gallery',
  description: 'Photography by Saad Sifar',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-image-preview': 'none',
    },
  },
};

export default function Page() {
  return <Photos />;
}
