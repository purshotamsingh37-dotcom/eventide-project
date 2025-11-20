export enum UserRole {
  CLIENT = 'CLIENT',
  PLANNER = 'PLANNER',
  VENDOR = 'VENDOR',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl: string;
  location: string;
  description: string;
}

export interface Planner {
  id: string;
  name: string;
  experienceYears: number;
  projectsCompleted: number;
  rating: number;
  imageUrl: string;
  specialty: string;
}

export interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
  amount: number;
}

export enum ViewState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD_CLIENT = 'DASHBOARD_CLIENT',
  DASHBOARD_PLANNER = 'DASHBOARD_PLANNER',
  DASHBOARD_VENDOR = 'DASHBOARD_VENDOR',
  MARKETPLACE = 'MARKETPLACE',
  PLANNER_DISCOVERY = 'PLANNER_DISCOVERY'
}