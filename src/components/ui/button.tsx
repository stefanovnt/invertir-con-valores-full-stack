import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ShipFree's shadcn button, restyled with brand variants.
// Text on the gradient is deep green (not white) to keep WCAG AA contrast.
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full text-center sm:whitespace-nowrap font-semibold transition-[transform,box-shadow,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-animated text-brand-deep shadow-[0_8px_24px_-10px_rgb(var(--icv-blue)/0.7)] hover:shadow-[0_14px_30px_-12px_rgb(var(--icv-green)/0.8)]",
        secondary:
          "border border-brand-deep/15 bg-white text-brand-deep hover:border-brand-deep/30 hover:bg-brand-tint-blue",
        dark: "bg-brand-deep text-white hover:bg-brand-deep/90",
        light: "bg-white text-brand-deep hover:bg-brand-tint-green",
        ghost: "text-brand-deep hover:bg-brand-tint-blue",
        link: "rounded-md px-0 text-brand-blue-ink underline-offset-4 hover:underline motion-safe:hover:translate-y-0",
      },
      size: {
        // min-height (not height) so labels can wrap on very narrow screens.
        sm: "min-h-10 px-4 py-1.5 text-sm",
        default: "min-h-12 px-6 py-2.5 text-base",
        lg: "min-h-14 px-8 py-3 text-base sm:text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
