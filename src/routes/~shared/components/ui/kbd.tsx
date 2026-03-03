import type * as React from 'react';
import { cn } from '@/helpers/utils';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[9px] leading-none font-medium text-muted-foreground select-none',
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
