import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = theme === "dark" ? "text-white" : "text-slate-900";
  const descColor = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div className={`flex flex-col mb-10 sm:mb-14 ${alignmentClass} ${className}`.trim()}>
      {eyebrow && (
        <span className="tech-caption mb-2.5 font-bold tracking-widest text-brand-primary">
          {eyebrow}
        </span>
      )}
      <h2 className={`tech-heading-section ${titleColor} max-w-3xl`}>
        {title}
      </h2>
      {description && (
        <p className={`tech-subheading mt-3 max-w-2xl ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
