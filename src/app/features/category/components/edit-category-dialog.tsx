"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/db/schema/catalog";
import { updateCategory } from "../category-actions";
import type { UpdateCategoryResult } from "../category-actions";

export function EditCategoryDialog({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  // <form action> chỉ truyền formData, còn updateCategory cần thêm id,
  // nên bọc lại trong action của useActionState.
  const [state, formAction, isPending] = useActionState<
    UpdateCategoryResult | null,
    FormData
  >(async (_prev, formData) => {
    const result = await updateCategory(category.id, formData);
    // Khác xóa: dòng vẫn còn sau khi sửa nên phải tự đóng dialog.
    if (result.ok) setOpen(false);
    return result;
  }, null);

  const error = state && !state.ok ? state.error : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button type="button" className="text-blue-600 hover:underline" />
        }
      >
        Sửa
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sửa danh mục</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`edit-name-${category.id}`}>Tên danh mục</Label>
            <Input
              id={`edit-name-${category.id}`}
              name="name"
              defaultValue={category.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`edit-slug-${category.id}`}>Slug</Label>
            <Input
              id={`edit-slug-${category.id}`}
              name="slug"
              defaultValue={category.slug}
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`edit-sort-${category.id}`}>Thứ tự hiển thị</Label>
            <Input
              id={`edit-sort-${category.id}`}
              type="number"
              name="sortOrder"
              defaultValue={category.sortOrder}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
