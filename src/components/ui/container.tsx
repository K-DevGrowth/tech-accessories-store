import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  wide?: boolean;
}

export function Container({
  children,
  wide = false,
  className = "",
  ...props
}: ContainerProps) {
  const containerClass = wide ? "tech-container-wide" : "tech-container";
  return (
    <div className={`${containerClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
