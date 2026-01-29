
import React from 'react';
import { 
  Sparkles, 
  Code, 
  Palette, 
  Globe, 
  Zap, 
  Cpu, 
  PenTool, 
  Layout, 
  Server, 
  Layers,
  Search
} from 'lucide-react';
import { Category, LinkItem } from './types';

export const CATEGORIES: Category[] = [
  { id: 'ai', name: 'AI Tools', icon: 'Sparkles' },
  { id: 'dev', name: 'Dev Resources', icon: 'Code' },
  { id: 'design', name: 'Design Assets', icon: 'Palette' },
  { id: 'productivity', name: 'Productivity', icon: 'Zap' },
  { id: 'web3', name: 'Web3 & Crypto', icon: 'Layers' },
];

export const NAV_LINKS: LinkItem[] = [
  // AI Tools
  {
    id: '1',
    title: 'ChatGPT',
    description: 'Conversational AI by OpenAI for text generation and tasks.',
    url: 'https://chat.openai.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=openai.com',
    category: 'ai'
  },
  {
    id: '2',
    title: 'Claude',
    description: 'Advanced AI assistant from Anthropic with deep reasoning.',
    url: 'https://claude.ai',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=anthropic.com',
    category: 'ai'
  },
  {
    id: '3',
    title: 'Gemini',
    description: 'Google\'s most capable AI model built from the ground up.',
    url: 'https://gemini.google.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=google.com',
    category: 'ai'
  },
  {
    id: '4',
    title: 'Midjourney',
    description: 'An independent research lab exploring new mediums of thought.',
    url: 'https://www.midjourney.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=midjourney.com',
    category: 'ai'
  },
  // Dev Resources
  {
    id: '5',
    title: 'GitHub',
    description: 'The world\'s leading AI-powered developer platform.',
    url: 'https://github.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=github.com',
    category: 'dev'
  },
  {
    id: '6',
    title: 'Stack Overflow',
    description: 'Public platform serving 100 million people every month.',
    url: 'https://stackoverflow.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com',
    category: 'dev'
  },
  {
    id: '7',
    title: 'Vercel',
    description: 'Develop, preview, and ship faster with Vercel.',
    url: 'https://vercel.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=vercel.com',
    category: 'dev'
  },
  {
    id: '8',
    title: 'Supabase',
    description: 'The open source Firebase alternative.',
    url: 'https://supabase.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=supabase.com',
    category: 'dev'
  },
  // Design Assets
  {
    id: '9',
    title: 'Figma',
    description: 'The collaborative interface design tool.',
    url: 'https://figma.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=figma.com',
    category: 'design'
  },
  {
    id: '10',
    title: 'Dribbble',
    description: 'Discover the world’s top designers & creatives.',
    url: 'https://dribbble.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=dribbble.com',
    category: 'design'
  },
  {
    id: '11',
    title: 'Behance',
    description: 'The world\'s largest creative network for showcase.',
    url: 'https://behance.net',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=behance.net',
    category: 'design'
  },
  // Productivity
  {
    id: '12',
    title: 'Notion',
    description: 'The connected workspace for your docs, projects, and notes.',
    url: 'https://notion.so',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=notion.so',
    category: 'productivity'
  },
  {
    id: '13',
    title: 'Linear',
    description: 'The issue tracker you’ll enjoy using.',
    url: 'https://linear.app',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=linear.app',
    category: 'productivity'
  },
  {
    id: '14',
    title: 'Slack',
    description: 'Bringing people, data, and tools together.',
    url: 'https://slack.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=slack.com',
    category: 'productivity'
  },
  // Web3
  {
    id: '15',
    title: 'OpenSea',
    description: 'The world\'s first and largest NFT marketplace.',
    url: 'https://opensea.io',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=opensea.io',
    category: 'web3'
  },
  {
    id: '16',
    title: 'CoinMarketCap',
    description: 'Top cryptocurrency prices and charts.',
    url: 'https://coinmarketcap.com',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=coinmarketcap.com',
    category: 'web3'
  }
];

export const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'PenTool': return <PenTool className={className} />;
    case 'Layout': return <Layout className={className} />;
    case 'Server': return <Server className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Search': return <Search className={className} />;
    default: return <Globe className={className} />;
  }
};
