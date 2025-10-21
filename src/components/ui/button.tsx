// src/components/ui/button.tsx
import React from "react";

type Variant = "default" | "secondary" | "outline";
type Size = "default" | "sm";

const base =
  "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants: Record<Variant, string> = {
  default: "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900",
  secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300",
  outline:
    "border border-neutral-300 text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-300",
};
const sizes: Record<Size, string> = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm",
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: Props) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  );
}
