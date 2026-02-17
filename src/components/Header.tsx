
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/order', label: 'Place Order' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link href={link.href} key={link.href}>
          <Button variant="ghost" onClick={() => setMenuOpen(false)}>
            {link.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold font-headline">Rajjab Welds</span>
          </Link>

          {isMobile ? (
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px]">
                <div className="flex flex-col items-start space-y-4 pt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="hidden md:flex items-center space-x-2">
              <NavLinks />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
