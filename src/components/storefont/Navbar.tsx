'use client';

import Link from 'next/link';
import { Search, ShoppingBag, PackageSearch, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const CATEGORIES = [
  { label: 'Tees', href: '/products?category=Tees' },
  { label: 'Outerwear', href: '/products?category=Outerwear' },
  { label: 'Bottoms', href: '/products?category=Bottoms' },
  { label: 'Accessories', href: '/products?category=Accessories' },
];

export function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Kiri: Logo Gaya Stempel Arsip */}
        <Link
          href="/"
          className="inline-flex items-center px-2.5 py-1 border border-ink-primary bg-surface font-mono font-bold text-xs md:text-sm tracking-wider uppercase -rotate-1 hover:rotate-0 transition-transform"
        >
          ARCHIVE.CO
        </Link>

        {/* Tengah: Kategori Utama (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Kanan: Aksi Cepat (Touch target min 44x44px) */}
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/products"
            aria-label="Cari produk"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-primary hover:bg-subtle/60 rounded transition-colors"
          >
            <Search className="w-5 h-5" />
          </Link>

          <Link
            href="/track-order"
            className="hidden sm:inline-flex min-h-[44px] px-3 items-center text-sm font-medium text-ink-secondary hover:text-ink-primary"
          >
            Lacak Pesanan
          </Link>

          <Link
            href="/cart"
            aria-label="Keranjang belanja"
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-primary hover:bg-subtle/60 rounded transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-accent-rust text-surface font-mono text-[10px] font-bold flex items-center justify-center rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Menu Drawer (Mobile) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Buka menu"
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-primary hover:bg-subtle/60 rounded"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-canvas border-l border-hairline w-[280px]">
              <SheetTitle className="font-mono text-xs uppercase tracking-widest text-ink-secondary mb-6">
                NAVIGASI ARSIP
              </SheetTitle>
              <div className="flex flex-col divide-y divide-hairline">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setOpen(false)}
                    className="py-3.5 text-base font-display font-bold text-ink-primary"
                  >
                    {cat.label}
                  </Link>
                ))}
                <Link
                  href="/track-order"
                  onClick={() => setOpen(false)}
                  className="py-3.5 flex items-center gap-2 text-sm font-medium text-ink-secondary"
                >
                  <PackageSearch className="w-4 h-4" />
                  Lacak Pesanan
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-sm font-medium text-ink-secondary"
                >
                  Masuk / Daftar Akun
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}