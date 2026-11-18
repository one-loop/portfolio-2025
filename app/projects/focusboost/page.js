import FocusBoost from '../../../src/views/FocusBoost';

const title = 'FocusBoost VR';
const description =
  'FocusBoost VR, a Meta Quest 2 study room for children with ADHD built in Unity and C#: calm AI-generated environments, a Pomodoro timer around lesson videos, background sound and arithmetic quizzes with instant scores.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/focusboost',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/focusboost',
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
  return <FocusBoost />;
}
