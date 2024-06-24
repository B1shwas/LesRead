import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full rounded-sm border border-input bg-input-bg px-[5rem] py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-hidden text-secondary-1",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border border-gray-300 text-gray-700 bg-gray-100 active:bg-gray-200 px-4",
        filled: "bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Input = React.forwardRef(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
