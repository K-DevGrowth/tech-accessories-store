"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCategory } from "../category-actions";
import type { DeleteCategoryResult } from "../category-actions";

export function DeleteCategoryDialog({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  // state: kết quả lần gọi gần nhất ({ ok, error } hoặc null khi chưa gọi)
  // formAction: truyền vào <form action>, isPending: đang chờ server
  const [state, formAction, isPending] =
    useActionState<DeleteCategoryResult | null>(() => deleteCategory(id), null);

  const error = state && !state.ok ? state.error : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button type="button" className="text-red-600 hover:underline" />
        }
      >
        Xóa
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Xóa danh mục</DialogTitle>
          <DialogDescription>
            Bạn chắc chắn muốn xóa “{name}”? Thao tác này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <form action={formAction}>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Đang xóa..." : "Xóa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
