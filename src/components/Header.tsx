
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import ShareButton from './ShareButton';

const navItems = [
  { id: 'home', type: 'link', href: '/', label: 'Home' },
  { id: 'order', type: 'link', href: '/order', label: 'Place Order' },
  { id: 'contact', type: 'link', href: '/contact', label: 'Contact Us' },
  { id: 'admin', type: 'link', href: '/admin/login', label: 'Admin Login' },
  { id: 'share', type: 'share', label: 'Share App' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        if (item.type === 'link') {
          return (
            <Button asChild variant="ghost" onClick={() => setMenuOpen(false)} key={item.id}>
              <Link href={item.href!}>
                {item.label}
              </Link>
            </Button>
          );
        }
        if (item.type === 'share') {
          return <ShareButton variant="ghost" onClick={() => setMenuOpen(false)} key={item.id} />;
        }
        return null;
      })}
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

          {isMounted && (
            <>
              {isMobile ? (
                <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[240px]">
                    <SheetHeader>
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                    </SheetHeader>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
