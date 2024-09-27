import { Home, ShoppingCart, Package, Users, LineChart, Search, CalendarCheck, TypeOutline, GraduationCap, Salad, Ticket, Cloud, HeartPulse, User2Icon } from 'lucide-react';

export const navlinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/category',
    label: 'Category Search',
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
  // {
  //   href: '/fill-profile',
  //   label: 'Update Profile',
  //   icon: TypeOutline,
  // },
  // {
  //   href: '/profile',
  //   label: 'User Profile',
  //   icon: Users,
  // },
  {
    href: '/biodata/stepone',
    label: 'Prakriti',
    icon: User2Icon
  },
  {
    href: '/education',
    label: 'Health Education',
    icon: GraduationCap,
  },
  {
    href: '/plan',
    label: 'Diet Plan',
    icon: Salad
  },
  {
    href: '/weather',
    label: 'Weather and health',
    icon: Cloud,
  }
];