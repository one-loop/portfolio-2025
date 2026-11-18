import LocalLlmChatbot from '../../../src/views/LocalLlmChatbot';

const title = 'Local AI Agent for Food Ordering';
const description =
  'A dining hall assistant for NYU Abu Dhabi that runs on a local Qwen 2.5 model via Ollama: menu lookups grounded in a menu service, embedding-based item matching, validated ordering, and printed order tickets.';

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://saadsifar.com/projects/local-ai-agent',
  },
  openGraph: {
    title: `${title} | Saad Sifar`,
    description,
    url: 'https://saadsifar.com/projects/local-ai-agent',
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
  return <LocalLlmChatbot />;
}
