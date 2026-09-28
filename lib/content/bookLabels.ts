import type { BookStatus } from "@/lib/content/types";

export function bookPurchaseLabel(
  status: BookStatus,
  purchaseUrl: string | null | undefined,
) {
  if (!purchaseUrl) return null;
  if (status === "Pre-order") return "Pre-order now →";
  if (purchaseUrl.includes("selar.com")) return "Get on Selar →";
  if (purchaseUrl.includes("paystack")) return "Pre-order now →";
  return "Buy now →";
}
