
import Photos from '../../src/views/Photos';

export const metadata = {
  title: 'Gallery | Saad Sifar',
  description: 'Photography by Saad Sifar',
  alternates: {
    canonical: 'https://saadsifar.com/photos',
  },
  openGraph: {
    title: 'Gallery | Saad Sifar',
    description: 'Photography by Saad Sifar',
    url: 'https://saadsifar.com/photos',
    type: 'website',
  },
};

export default function Page() {
  return <Photos />;
}
