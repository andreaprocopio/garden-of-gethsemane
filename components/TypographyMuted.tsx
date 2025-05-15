import { cn } from "@/lib/utils";

interface TypographyMutedProps {
  text: string;
  className?: string;
}

export function TypographyMuted({ text, className }: TypographyMutedProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{text}</p>
  );
}
