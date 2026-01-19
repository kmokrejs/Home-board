'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo } from 'lucide-react';

const nav = [
  { href: '/dashboard', icon: Home },
  { href: '/todos', icon: ListTodo },
];

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-dvh w-42 border-r border-gray-200 bg-gray-50/60 p-4">
      <nav className="space-y-1">
        {nav.map((item) => {
          // if active, change color fo the icon
          const active = isRouteActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-center py-2 text-sm text-gray-700 hover:text-blue-300"
            >
              <item.icon
                className={'h-18 w-18' + (active ? ' text-blue-600' : '')}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
