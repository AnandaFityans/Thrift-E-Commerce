'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Shirt, PackageCheck, PlusSquare } from 'lucide-react';

const ADMIN_TABS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Produk', href: '/admin/products', icon: Shirt },
  { label: 'Pesanan', href: '/admin/orders', icon: PackageCheck },
  { label: 'Tambah +', href: '/admin/products/new', icon: PlusSquare },
];

export function MobileAdminNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-primary text-surface border-t border-white/15 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4 h-16">
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors ${
                isActive ? 'bg-white/15 text-surface font-semibold' : 'text-surface/70 hover:text-surface'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-mono text-[10px] tracking-wide uppercase">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}