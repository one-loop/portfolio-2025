import Projects from '../../src/views/Projects';

export const metadata = {
  title: 'Projects',
  description: 'Explore featured projects by Saad Sifar, including interactive 3D web graphics with Three.js, machine learning systems, full-stack applications, and open-source code.',
  alternates: {
    canonical: 'https://saadsifar.com/projects',
  },
  openGraph: {
    title: 'Projects | Saad Sifar',
    description: 'Explore featured projects by Saad Sifar, including interactive 3D web graphics with Three.js, machine learning systems, full-stack applications, and open-source code.',
    url: 'https://saadsifar.com/projects',
    type: 'website',
  },
};

export default function Page() {
  return <Projects />;
}
