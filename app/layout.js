import localFont from 'next/font/local';
import '../src/index.css';
import ClientLayout from '../src/components/ClientLayout';
import GoogleAnalytics from '../src/components/GoogleAnalytics';

const newSpirit = localFont({
  src: [
    {
      path: '../src/fonts/New-Spirit-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Semi-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../src/fonts/New-Spirit-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-new-spirit',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://saadsifar.com'),
  title: {
    default: 'Saad Sifar – Portfolio',
    template: '%s | Saad Sifar',
  },
  description: 'Saad Sifar is a Software Engineer and CS student at NYU Abu Dhabi specializing in AI, machine learning, and full-stack engineering.',
  alternates: {
    canonical: 'https://saadsifar.com',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-image-preview': 'none',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Saad Sifar – Portfolio',
    description: 'Saad Sifar is a Software Engineer and CS student at NYU Abu Dhabi specializing in AI, machine learning, and full-stack engineering.',
    url: 'https://saadsifar.com',
    siteName: 'Saad Sifar Portfolio',
    images: [
      {
        url: '/images/thumbnail-2.jpg',
        width: 1600,
        height: 960,
        alt: 'Saad Sifar – Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saad Sifar – Portfolio',
    description: 'Saad Sifar is a Software Engineer and CS student at NYU Abu Dhabi specializing in AI, machine learning, and full-stack engineering.',
    images: ['/images/thumbnail-2.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://saadsifar.com/#website',
      'url': 'https://saadsifar.com',
      'name': 'Saad Sifar Portfolio',
      'description': 'Official portfolio of Saad Sifar, Software Engineer and Computer Science student at NYU Abu Dhabi.',
      'publisher': {
        '@type': 'Person',
        'name': 'Saad Sifar',
        'url': 'https://saadsifar.com',
      },
      'hasPart': [
        {
          '@type': 'WebPage',
          '@id': 'https://saadsifar.com/about',
          'name': 'About Saad Sifar',
          'url': 'https://saadsifar.com/about',
          'description': 'About Saad Sifar - background, education at NYU Abu Dhabi, and interests.',
        },
        {
          '@type': 'WebPage',
          '@id': 'https://saadsifar.com/projects',
          'name': 'Projects by Saad Sifar',
          'url': 'https://saadsifar.com/projects',
          'description': 'Featured software engineering and AI projects built by Saad Sifar.',
        },
        {
          '@type': 'WebPage',
          '@id': 'https://saadsifar.com/experience',
          'name': 'Experience of Saad Sifar',
          'url': 'https://saadsifar.com/experience',
          'description': 'Professional software engineering experience and academic research.',
        },
        {
          '@type': 'WebPage',
          '@id': 'https://saadsifar.com/contact',
          'name': 'Contact Saad Sifar',
          'url': 'https://saadsifar.com/contact',
          'description': 'Get in touch with Saad Sifar.',
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://saadsifar.com/#person',
      'name': 'Saad Sifar',
      'url': 'https://saadsifar.com',
      'jobTitle': 'Software Engineer',
      'affiliation': {
        '@type': 'EducationalOrganization',
        'name': 'New York University Abu Dhabi',
      },
      'sameAs': [
        'https://linkedin.com/in/saad-sifar',
        'https://github.com/one-loop',
      ],
    },
    {
      '@type': 'SiteNavigationElement',
      '@id': 'https://saadsifar.com/#navigation',
      'name': ['Home', 'About', 'Projects', 'Experience', 'Contact'],
      'url': [
        'https://saadsifar.com',
        'https://saadsifar.com/about',
        'https://saadsifar.com/projects',
        'https://saadsifar.com/experience',
        'https://saadsifar.com/contact',
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={newSpirit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
