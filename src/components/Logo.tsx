import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(props.className)}
      {...props}
    >
      <title>Rajjab Welds Logo</title>
      <path d="M12 3L8 7V13H6V17H18V13H16V7L12 3Z" fill="hsl(var(--primary))" fillOpacity="0.2" />
      <path d="M8 7L12 11L16 7" />
      <path d="M12 11V17" />
      <path d="M7 15H17" />
      <path d="M12 3v-2" />
      <path d="m5 5-1-1" />
      <path d="m19 5 1-1" />
      <path d="M12 21v2" />
      <path d="m5 19 1 1" />
      <path d="m19 19-1 1" />
    </svg>
  );
}
