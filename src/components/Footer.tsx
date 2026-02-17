'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        // This ensures the year is only set on the client-side after hydration,
        // preventing a mismatch with the server-rendered value.
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
