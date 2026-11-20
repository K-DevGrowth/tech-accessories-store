import React from "react";

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-6 py-3.5 gap-2.5 font-bold",
};

export function Button({
  variant = "primary",
  size = "md",
  pill = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = variantStyles[variant];
  const sizeClass = sizeStyles[size];
  const pillClass = pill ? "btn-pill" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClass} ${pillClass} ${className}`.trim()}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
}
