'use client';

import type * as React from 'react';
import { cn } from '@/helpers/utils';

function Avatar({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-lg',
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  alt = '',
  ...props
}: React.ComponentProps<'img'>) {
  return (
    <img
      data-slot="avatar-image"
      alt={alt}
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-lg text-xs',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
