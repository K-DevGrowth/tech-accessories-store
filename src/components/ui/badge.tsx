import React from "react";

export type BadgeVariant = "default" | "brand" | "dark" | "cyan" | "green" | "red";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "spec-chip",
  brand: "spec-chip spec-chip-brand",
  dark: "spec-chip spec-chip-dark",
  cyan: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-sky-50 text-sky-700 border border-sky-200",
  green: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200",
  red: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-rose-50 text-rose-700 border border-rose-200",
};

export function Badge({
  variant = "default",
  icon,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantClass = badgeVariants[variant];

  return (
    <span className={`${variantClass} ${className}`.trim()} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
