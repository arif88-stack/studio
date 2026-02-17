
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ShareButton() {
  const { toast } = useToast();
  const [appUrl, setAppUrl] = useState('');
  const [canShare, setCanShare] = useState(false);

  // This effect will run only on the client, after hydration
  useEffect(() => {
    setAppUrl(window.location.origin);
    if (navigator.share) {
      setCanShare(true);
    }
  }, []);

  const shareData = {
    title: 'Rajjab Welds',
    text: 'Check out Rajjab Welds for custom welding services!',
    url: appUrl,
  };

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // This can happen if the user cancels the share dialog.
        // We won't show an error toast in that case.
        console.log('Share cancelled or failed', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!appUrl) return;
    navigator.clipboard.writeText(appUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: "The app link has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the link to your clipboard.",
      });
    });
  };

  if (!appUrl) {
    // Don't render the button on the server or before the client has mounted
    return null;
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full mt-4"
      onClick={handleShare}
    >
      {canShare ? <Share2 className="mr-2" /> : <Copy className="mr-2" />}
      Share App
    </Button>
  );
}
