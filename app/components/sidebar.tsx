'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/todos', label: 'Todo list' },
];

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-dvh w-42 border-r border-gray-200 bg-gray-50/60 p-4">
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = isRouteActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'group flex items-center gap-2 rounded-md px-2 py-2 text-sm',
                'text-gray-700 hover:bg-gray-200/60 hover:text-gray-900',
                active ? 'bg-gray-200/80 font-medium text-gray-900' : '',
              ].join(' ')}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
