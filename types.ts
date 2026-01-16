export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  category: 'it' | 'education' | 'academic';
  subServices: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ValueCard {
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'AI' | 'Tech' | 'Innovation';
  image: string;
  readTime: string;
  url?: string;
}