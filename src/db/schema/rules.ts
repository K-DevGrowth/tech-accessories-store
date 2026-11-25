// Các quy tắc mà DB không biểu diễn được: dùng ở tầng service
// (server actions / route handlers).
import type { orders } from "./sales";

type OrderStatus = (typeof orders.$inferSelect)["status"];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

// BR-13: chỉ chuyển theo chiều tiến, không nhảy cóc.
// Trạng thái 'cancelled' xử lý riêng theo BR-14.
const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "shipping",
  shipping: "delivered",
};

export function canTransition(
  from: OrderStatus,
  to: OrderStatus,
  actor: "customer" | "admin" | "system",
) {
  if (to === "cancelled") {
    if (actor === "customer") return from === "pending"; // BR-14: khách chỉ hủy khi chờ xác nhận
    if (actor === "admin") return from === "pending" || from === "confirmed"; // BR-14
    return from === "pending"; // cron tự hủy khi hết hạn thanh toán (BR-16)
  }
  return actor === "admin" && NEXT[from] === to;
}

// BR-10: phí ship cố định 30.000đ, miễn phí cho đơn từ 500.000đ
export const SHIPPING_FEE = 30_000;
export const FREE_SHIP_FROM = 500_000;
export const calcShippingFee = (subtotal: number) =>
  subtotal >= FREE_SHIP_FROM ? 0 : SHIPPING_FEE;

// BR-05: số lượng tối đa mỗi dòng trong giỏ
export const MAX_QTY_PER_LINE = 10;
