// src/components/ui/button.tsx
import React from "react";
// 👇 this lets Button "pass through" its styles to its child (like <a>)
import { Slot } from "@radix-ui/react-slot";

type Variant = "default" | "secondary" | "outline" | "outlineBlue" | "outlineFilled" | "outlineGlow" | "outlineUnderline";
type Size = "default" | "sm";

const base =
  "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants: Record<Variant, string> = {
  default: "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900",
  secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300",
  outline: "border border-neutral-300 text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-300",
  // ① outlineBlue — clean blue border + subtle tint
  outlineBlue:
    "border border-blue-400 text-blue-700 bg-blue-50/40 hover:bg-blue-100/40 focus:ring-blue-400",

  // ② outlineFilled — keeps outline border but adds light fill and bold text
  outlineFilled:
    "border-2 border-blue-600 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-600",

  // ③ outlineGlow — blue glow shadow around border (no background fill)
  outlineGlow:
    "border border-blue-400 text-blue-700 hover:bg-blue-50 focus:ring-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.3)]",

  // ④ outlineUnderline — stays outline but shows animated underline on hover
  outlineUnderline: [
  "relative",
  "border border-neutral-900 text-neutral-900 font-semibold",
  // "hover:text-neutral-900 hover:border-neutral-900 focus:ring-neutral-400",
  "transition-all duration-300",
  ].join(" "),


  };

const sizes: Record<Size, string> = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm",
};

// 👇 add asChild to the props interface
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  asChild?: boolean; // <-- new
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  asChild = false, // <-- default is false
  ...props
}: Props) {
  // 👇 decide which element to render:
  // if asChild is true → use Slot, else → use <button>
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
