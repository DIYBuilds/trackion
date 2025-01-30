import AddPropertyModel from '@/components/modals/add-property-modal';
import { cn } from '@/lib/utils';
import React from 'react';
import { Toaster } from 'react-hot-toast';
export default function ModalsProvider() {
  return (
    <>
      <AddPropertyModel />
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: 20,
          right: 20,
          gap: '0.5rem',
        }}
        containerClassName={cn('!flex !flex-col !items-end !gap-2')}
        toastOptions={{
          className: cn(
            // Base styles
            '!bg-background !text-foreground',
            '!rounded-none !px-4 !py-3',
            '!border-2 !border-border',
            '!shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]',
            '!font-pixel !text-sm',

            // Animations
            '!transition-all !duration-200',
            'data-[swipe=move]:!translate-x-[var(--radix-toast-swipe-move-x)]',
            'data-[swipe=cancel]:!translate-x-0',
            'data-[swipe=end]:!translate-x-[var(--radix-toast-swipe-end-x)]',
            'data-[state=open]:!animate-in',
            'data-[state=closed]:!animate-out',
            'data-[state=closed]:!fade-out-80',
            'data-[state=open]:!slide-in-from-right-full',
            'data-[state=closed]:!slide-out-to-right-full',

            // Interactions
            'hover:!translate-y-[2px] hover:!shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]',
            'active:!translate-y-[4px] active:!shadow-none',
          ),
          success: {
            className: '!border-primary !bg-background/95 !backdrop-blur-[2px]',
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
            duration: 2000,
          },
          error: {
            className:
              '!border-destructive !bg-background/95 !backdrop-blur-[2px]',
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'hsl(var(--destructive-foreground))',
            },
            duration: 3000,
          },
          loading: {
            className: '!border-muted !bg-background/95 !backdrop-blur-[2px]',
            iconTheme: {
              primary: 'hsl(var(--muted))',
              secondary: 'hsl(var(--muted-foreground))',
            },
          },
        }}
      />
    </>
  );
}
