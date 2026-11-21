import React from "react";
import { Button } from "./button";

export interface ProductCardProps {
  id: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  specs?: string[];
  price: string;
  originalPrice?: string;
  tag?: string;
  onAddToCart?: (id: string | number) => void;
}

export function ProductCard({
  id,
  title,
  subtitle,
  image,
  specs = [],
  price,
  originalPrice,
  tag,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all duration-300 hover:shadow-tech-hover overflow-hidden">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#F6F7F9] flex items-center justify-center p-6 overflow-hidden">
        {tag && (
          <span className="absolute top-3.5 left-3.5 z-10 text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-navy text-brand-accent border border-indigo-500/20">
            {tag}
          </span>
        )}

        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-mono font-bold text-lg">
            TECH
          </div>
        )}

        {/* Floating Quick Action */}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <Button
            size="sm"
            variant="primary"
            className="w-full font-bold shadow-md"
            onClick={() => onAddToCart?.(id)}
          >
            + Thêm vào giỏ
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Subtle spec line */}
          {specs.length > 0 && (
            <p className="text-[11px] font-mono text-slate-500 tracking-wide uppercase mb-1.5">
              {specs.join(" • ")}
            </p>
          )}

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-950 font-mono tracking-tight">
              {price}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {originalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Chính hãng
          </span>
        </div>
      </div>
    </div>
  );
}
