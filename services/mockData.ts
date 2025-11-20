import { Vendor, Planner, Booking } from '../types';

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Elegant Eats Catering',
    category: 'Catering',
    rating: 4.8,
    reviewCount: 124,
    priceRange: '$$$',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    location: 'New York, NY',
    description: 'Premium gourmet catering for weddings and corporate events.'
  },
  {
    id: 'v2',
    name: 'Capture The Moment',
    category: 'Photography',
    rating: 4.9,
    reviewCount: 89,
    priceRange: '$$',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    location: 'Brooklyn, NY',
    description: 'Cinematic storytelling through photography.'
  },
  {
    id: 'v3',
    name: 'Floral Fantasies',
    category: 'Decoration',
    rating: 4.7,
    reviewCount: 56,
    priceRange: '$$',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    location: 'Queens, NY',
    description: 'Bespoke floral arrangements and venue styling.'
  },
  {
    id: 'v4',
    name: 'SoundCheck DJs',
    category: 'Music',
    rating: 4.5,
    reviewCount: 210,
    priceRange: '$',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    location: 'Manhattan, NY',
    description: 'High energy DJs to keep your party moving.'
  }
];

export const MOCK_PLANNERS: Planner[] = [
  {
    id: 'p1',
    name: 'Sarah Jenkins',
    experienceYears: 8,
    projectsCompleted: 150,
    rating: 5.0,
    imageUrl: 'https://picsum.photos/200/200?random=5',
    specialty: 'Luxury Weddings'
  },
  {
    id: 'p2',
    name: 'David Chen',
    experienceYears: 5,
    projectsCompleted: 80,
    rating: 4.8,
    imageUrl: 'https://picsum.photos/200/200?random=6',
    specialty: 'Corporate Events'
  },
  {
    id: 'p3',
    name: 'Elena Rodriguez',
    experienceYears: 12,
    projectsCompleted: 300,
    rating: 4.9,
    imageUrl: 'https://picsum.photos/200/200?random=7',
    specialty: 'Destination Weddings'
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    serviceName: 'Full Wedding Planning',
    providerName: 'Sarah Jenkins',
    date: '2024-08-15',
    status: 'confirmed',
    amount: 5000
  },
  {
    id: 'b2',
    serviceName: 'Gold Catering Package',
    providerName: 'Elegant Eats Catering',
    date: '2024-08-15',
    status: 'pending',
    amount: 3500
  }
];