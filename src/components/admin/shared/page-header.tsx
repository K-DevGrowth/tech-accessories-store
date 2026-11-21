import { Button } from "@/components/ui/button";

export default function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0 min-h-9">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-950 truncate">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {action && (
        <Button
          variant="primary"
          size="sm"
          className="h-9 font-bold shrink-0 text-xs sm:text-sm px-3 sm:px-4"
        >
          <span>+ Thêm</span>
        </Button>
      )}
    </div>
  );
}
