'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {year} Rajjab Welds. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
