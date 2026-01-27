'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, Settings } from 'lucide-react';
import colors from '../styles/colors';
import { styled } from 'styled-components';

const nav = [
  { href: '/dashboard', icon: Home },
  { href: '/todos', icon: ListTodo },
  { href: '/settings', icon: Settings },
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
          const active = isRouteActive(pathname, item.href);
          return (
            <NavItem key={item.href} href={item.href} $active={active}>
              <item.icon className={'h-18 w-18'} />
            </NavItem>
          );
        })}
      </nav>
    </div>
  );
}

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.15s ease;

  &:hover svg {
    color: ${colors.secondary};
  }

  svg {
    transition: color 0.15s ease;
    color: ${({ $active }) => ($active ? colors.primary : '#9096a3')};
  }
`;
