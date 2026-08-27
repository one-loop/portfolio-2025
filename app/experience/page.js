import Experience from '../../src/views/Experience';

export const metadata = {
  title: 'Experience',
  description: 'Professional software engineering experience, academic research at NYU Abu Dhabi, internship roles, and technical skills of Saad Sifar.',
  alternates: {
    canonical: 'https://saadsifar.com/experience',
  },
  openGraph: {
    title: 'Experience | Saad Sifar',
    description: 'Professional software engineering experience, academic research at NYU Abu Dhabi, internship roles, and technical skills of Saad Sifar.',
    url: 'https://saadsifar.com/experience',
    type: 'website',
  },
};

export default function Page() {
  return <Experience />;
}
