import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-pixel transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:bg-primary/90 active:translate-y-[4px] active:shadow-none',
        destructive:
          'bg-destructive text-destructive-foreground border-2 border-destructive shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(220,38,38,0.3)] hover:bg-destructive/90 active:translate-y-[4px] active:shadow-none',
        outline:
          'bg-background text-foreground border-2 border-input shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:bg-accent/80 hover:text-white transition-colors active:translate-y-[4px] active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-secondary shadow-[4px_4px_0px_0px_rgba(147,51,234,0.3)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(147,51,234,0.3)] hover:bg-secondary/90 active:translate-y-[4px] active:shadow-none',
        ghost:
          'text-foreground hover:bg-accent/20 hover:border-2 hover:border-input active:translate-y-[2px]',
        link: 'text-primary underline-offset-4 hover:underline decoration-[3px] hover:text-primary/90',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
