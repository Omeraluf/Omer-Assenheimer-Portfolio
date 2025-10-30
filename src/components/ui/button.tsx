// src/components/ui/button.tsx
import React from "react";
// 👇 this lets Button "pass through" its styles to its child (like <a>)
import { Slot } from "@radix-ui/react-slot";

type Variant = "default" | "secondary" | "outline" | "outlineBlue" | "outlineFilled" | "outlineGlow" | "outlineUnderline" | "primaryBlue" | "whiteOnDarkBlue" | "outlineBlueSoft" | "blue1";
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

    // ⑤ primaryBlue — solid brand blue button
  primaryBlue:
    "bg-[#357cdb] text-white hover:bg-[#325fd1] focus:ring-[#2F80ED]",

  // ⑥ gradientBlue — vibrant blue gradient button
  whiteOnDarkBlue:
  "flex items-center rounded-xl font-medium \
   text-white bg-gradient-to-r from-[#84b4d9] to-[#599ccf] shadow-sm \
   transition-all duration-300 hover:from-[#4FA8F8] hover:to-[#56CCF2] \
   hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 \
   focus:outline-none focus:ring-2 focus:ring-[#56CCF2]",

  blue1:
  "inline-flex items-center gap-2 rounded-full border border-[#357cdb]\
  text-[#357cdb] px-3.5 py-2 text-sm font-medium\
  hover:bg-[#357cdb]/10 hover:shadow-sm transition",
  // ⑦ outlineBlueSoft — minimalist blue outline version
  outlineBlueSoft:
    "border border-[#2F80ED] text-[#2F80ED] hover:bg-[#EBF3FF] focus:ring-[#2F80ED]",



  };

const sizes: Record<Size, string> = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm",
};

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  asChild?: boolean;
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  asChild = false,
  ...props
}: Props) {
  // if asChild is true → use Slot, else → use <button>
  const Comp: any = asChild ? Slot : "button";
  return (
    <Comp
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
