import Contact from '../../src/views/Contact';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Saad Sifar for software engineering roles, research collaborations, freelance projects, or general inquiries.',
  alternates: {
    canonical: 'https://saadsifar.com/contact',
  },
  openGraph: {
    title: 'Contact | Saad Sifar',
    description: 'Get in touch with Saad Sifar for software engineering roles, research collaborations, freelance projects, or general inquiries.',
    url: 'https://saadsifar.com/contact',
    type: 'website',
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
    title: 'Contact | Saad Sifar',
    description: 'Get in touch with Saad Sifar for software engineering roles, research collaborations, freelance projects, or general inquiries.',
    images: ['/images/thumbnail-2.jpg'],
  },
};

export default function Page() {
  return <Contact />;
}
