
'use client';

import Link from 'next/link';
import { Menu, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import ShareButton from './ShareButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const navItems = [
  { id: 'home', type: 'link', href: '/', label: 'Home' },
  { id: 'order', type: 'link', href: '/order', label: 'Place Order' },
  { id: 'contact', type: 'link', href: '/contact', label: 'Contact Us' },
  { id: 'install', type: 'install', label: 'Install App' },
  { id: 'admin', type: 'link', href: '/admin/login', label: 'Admin Login' },
  { id: 'share', type: 'share', label: 'Share App' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInstallDialogOpen, setInstallDialogOpen] = useState(false);
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    setIsMounted(true);
    setAppUrl(window.location.origin);
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
        if (item.type === 'install') {
            return (
                <Button variant="ghost" onClick={() => { setInstallDialogOpen(true); setMenuOpen(false); }} key={item.id}>
                    <Download />
                    {item.label}
                </Button>
            );
        }
        return null;
      })}
    </>
  );

  return (
    <>
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
      <Dialog open={isInstallDialogOpen} onOpenChange={setInstallDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Install Rajjab Welds App</DialogTitle>
            <DialogDescription>
              For quick access, add this web application to your home screen. No
              download from an app store is required.
              {isMounted && appUrl && (
                <>
                  <br />
                  Navigate to:{' '}
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {appUrl}
                  </a>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <h3 className="font-semibold mb-1">On iPhone or iPad</h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Launch Safari and navigate to the app.</li>
                <li>Tap the 'Share' icon (a box with an arrow pointing up).</li>
                <li>Scroll down and tap 'Add to Home Screen'.</li>
                <li>Confirm by tapping 'Add'.</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-1">On Android</h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Launch Chrome and navigate to the app.</li>
                <li>Tap the three-dot menu icon in the top-right.</li>
                <li>Tap 'Add to Home Screen' or 'Install app'.</li>
                <li>Follow the on-screen prompts.</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setInstallDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
