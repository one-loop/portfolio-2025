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
  },
};

export default function Page() {
  return <Contact />;
}
