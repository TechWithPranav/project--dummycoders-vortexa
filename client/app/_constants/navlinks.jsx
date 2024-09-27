import { Home, ShoppingCart, Package, Users, LineChart, Search, CalendarCheck, TypeOutline, GraduationCap, Salad, Ticket, Cloud, HeartPulse, User2Icon, ChartAreaIcon } from 'lucide-react';
import React from 'react';
import { useUser } from '@clerk/nextjs';

// Function to get the username and check if it starts with 'dr'
export default function getUserName() {
  const { user, isLoaded, isSignedIn } = useUser();

  // Return loading state if user data is not available yet
  if (!isLoaded || !isSignedIn) {
    return 'Loading...';  // Default loading state
  }

  // Return username or 'Guest' if no username is available
  const newuser = user?.username || 'Guest';
  
  console.log("username is: ", user?.username);
  console.log("newuser is: ", newuser);

  return newuser;
}

// Function to export links conditionally based on the username
export function getNavLinks() {
  const username = getUserName();

  // If the username starts with 'dr', return only Dashboard and Categories links
  if (username.toLowerCase().startsWith('dr')) {
    return [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: Home,
      },
      {
        href: '/patients',
        label: 'Patients',
        icon: Users,
      },
      {
        href: '/analysis',
        label: 'View Analysis',
        icon: ChartAreaIcon,
      },
      {
        href: '/mediscan',
        label: 'Mediscan 💊',
        icon: Package,
      },
      {
        href: '/weather',
        label: 'Weather and Health',
        icon: Cloud,
      },
      
    ];
  }

  // Otherwise, return all the links
  return [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/category',
      label: 'Categories',
      icon: Search,
    },
    {
      href: '/doctors',
      label: 'Doctors',
      icon: HeartPulse,
    },
    {
      href: '/my-booking',
      label: 'My Appointments',
      icon: Ticket,
    },
    {
      href: '/mediscan',
      label: 'Mediscan 💊',
      icon: Package,
    },
    {
      href: '/medical-records',
      label: 'Medical Records',
      icon: LineChart,
    },
    {
      href: '/schedules',
      label: 'Treatment Plans',
      icon: CalendarCheck,
    },
    {
      href: '/biodata/stepone',
      label: 'Prakriti',
      icon: User2Icon,
    },
    // {
    //   href: '/education',
    //   label: 'Health Education',
    //   icon: GraduationCap,
    // },
    {
      href: '/assessment',
      label: 'AI Risk Assessment',
      icon: GraduationCap,
    },
    {
      href: '/plan',
      label: 'Diet Plan',
      icon: Salad,
    },
    {
      href: '/weather',
      label: 'Weather and Health',
      icon: Cloud,
    },
  ];
}
