'use client';

import { useState, useEffect } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ShareButton(props: ButtonProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof navigator.share !== 'undefined') {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    const appUrl = window.location.origin;
    const shareData = {
      title: 'Rajjab Welds',
      text: 'Check out Rajjab Welds for custom welding services!',
      url: appUrl,
    };

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
      navigator.clipboard.writeText(appUrl).then(() => {
        toast({
          title: "Link Copied!",
          description: `The app link (${appUrl}) has been copied to your clipboard.`,
        });
      }).catch(err => {
        console.error('Failed to copy:', err);
        toast({
          variant: "destructive",
          title: "Copy Failed",
          description: "Could not copy the link to your clipboard.",
        });
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleShare();
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Button {...props} onClick={handleClick} disabled={!isClient}>
      <Share2 />
      Share App
    </Button>
  );
}
