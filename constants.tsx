import React from 'react';
import { 
  Monitor, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Layers,
  Globe,
  Award
} from 'lucide-react';
import { ServiceItem, NavItem, ValueCard, BlogPost } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'IT Solutions',
    category: 'it',
    description: 'Transforming businesses through innovative technology and creative digital solutions.',
    icon: 'Monitor',
    subServices: [
      'Web Design & Development',
      'Graphic Design & Branding',
      'Networking & IT Support',
      'IoT Solutions',
      'Website Maintenance',
      'Digital Consulting'
    ]
  },
  {
    title: 'Study Abroad Consultancy',
    category: 'education',
    description: 'Guiding you through every step of your international educational journey to UK, USA, and Canada.',
    icon: 'GraduationCap',
    subServices: [
      'School & Course Selection',
      'UK, USA, Canada Applications',
      'Personal Statement & CV Review',
      'Scholarship Guidance',
      'Visa Application Support',
      'Pre-departure Briefing'
    ]
  },
  {
    title: 'Academic & Research Support',
    category: 'academic',
    description: 'Empowering students and researchers with expert academic guidance and data analysis.',
    icon: 'BookOpen',
    subServices: [
      'Dissertation & Thesis Support',
      'Research Projects Assistance',
      'Proofreading & Formatting',
      'Data Analysis Support',
      'Assignment Editing',
      'Reference Management'
    ]
  }
];

export const CORE_VALUES: ValueCard[] = [
  {
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in all our dealings, ensuring transparency and trust.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Excellence',
    description: 'We are committed to delivering superior quality results that exceed expectations.',
    icon: 'Award'
  },
  {
    title: 'Growth',
    description: 'We believe in continuous improvement for ourselves and our clients.',
    icon: 'TrendingUp'
  },
  {
    title: 'Reliability',
    description: 'You can count on us to be there when it matters most, providing consistent support.',
    icon: 'Layers'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Impact of Generative AI on Global Education',
    excerpt: 'How AI tools are reshaping the way international students prepare for their academic journeys in 2024.',
    date: 'Oct 12, 2023',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Cloud Computing Trends for Small Businesses',
    excerpt: 'Leveraging modern IT infrastructure to scale operations without breaking the bank.',
    date: 'Oct 08, 2023',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Preparing for a Tech Career Abroad',
    excerpt: 'A comprehensive guide for students looking to study and work in the UK and Canada tech sectors.',
    date: 'Sep 25, 2023',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
    readTime: '6 min read'
  }
];