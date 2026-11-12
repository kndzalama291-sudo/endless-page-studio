import type { ShopifyProduct } from "@/lib/shopify";

export const RECIPIENTS = [
  { key: "little-one", label: "Little one" },
  { key: "teen", label: "Teen" },
  { key: "partner", label: "Partner" },
  { key: "parent", label: "Parent" },
  { key: "teacher", label: "Teacher" },
  { key: "colleague", label: "Colleague" },
  { key: "friend", label: "Friend" },
] as const;

/** Products tagged for the recipient (or all when none chosen) at or under the budget. */
export function filterGifts(products: ShopifyProduct[], recipient: string | null, budget: number) {
  return products.filter((p) => {
    const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
    const forWho = !recipient || p.node.tags.includes(recipient);
    return forWho && price <= budget;
  });
}
