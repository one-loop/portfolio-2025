import UnlearningBackdoorFull from '../../../src/views/UnlearningBackdoorFull';

// Unlisted: reachable only by direct link. Not in the sitemap or robots.txt (listing it there
// would advertise the path), and every crawler is told not to index or follow it.
export const metadata = {
  title: 'Unlearning Activated Backdoor Attacks (full write-up)',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function Page() {
  return <UnlearningBackdoorFull />;
}
