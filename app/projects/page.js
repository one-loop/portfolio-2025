
import Projects from '../../src/pages/Projects';

export const metadata = {
  title: 'Projects | Saad Sifar',
  description: 'Projects by Saad Sifar',
  alternates: {
    canonical: 'https://saadsifar.com/projects',
  },
  openGraph: {
    title: 'Projects | Saad Sifar',
    description: 'Projects by Saad Sifar',
    url: 'https://saadsifar.com/projects',
    type: 'website',
  },
};

export default function Page() {
  return <Projects />;
}
