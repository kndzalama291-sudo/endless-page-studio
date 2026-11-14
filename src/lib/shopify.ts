import { toast } from "sonner";

export const SHOPIFY_API_VERSION =
  (import.meta.env.VITE_SHOPIFY_API_VERSION as string) || "2026-10";
export const SHOPIFY_STORE_PERMANENT_DOMAIN =
  (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string) ||
  "j7wxjk-ay.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
// Storefront tokens are public by design (read-only storefront access).
export const SHOPIFY_STOREFRONT_TOKEN =
  (import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string) ||
  "3c5d16a55e27b6d26dbe421f5d5a6b4e";

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: Money;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType: string;
    tags: string[];
    priceRange: { minVariantPrice: Money };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: { edges: Array<{ node: ShopifyVariant }> };
    options: Array<{ name: string; values: string[] }>;
  };
}

const PRODUCT_FIELDS = `
  id title description handle productType tags
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) { edges { node { id title price { amount currencyCode } availableForSale selectedOptions { name value } } } }
  options { name values }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) { edges { node { ${PRODUCT_FIELDS} } } }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    if (typeof window !== "undefined") {
      toast.error("Shopify: Payment required", {
        description:
          "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
      });
    }
    return;
  }
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return data;
}

export async function fetchProducts(first = 50, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query ?? null });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const node = data?.data?.product;
  return node ? { node } : null;
}

export const productsQueryOptions = (query?: string) => ({
  queryKey: ["shopify-products", query ?? "all"] as const,
  queryFn: () => fetchProducts(50, query),
  staleTime: 60_000,
});

export const productQueryOptions = (handle: string) => ({
  queryKey: ["shopify-product", handle] as const,
  queryFn: () => fetchProductByHandle(handle),
  staleTime: 60_000,
});

export const isPhysical = (p: ShopifyProduct) => p.node.tags.includes("physical");

// ---------------- Cart ----------------

export type CartAttribute = { key: string; value: string };

export interface CartLineInput {
  variantId: string;
  quantity: number;
  attributes?: CartAttribute[];
}

const CART_LINES_FRAGMENT = `lines(first: 100) { edges { node { id quantity merchandise { ... on ProductVariant { id } } attributes { key value } } } }`;

export const CART_QUERY = `query cart($id: ID!) { cart(id: $id) { id totalQuantity } }`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) { cart { id checkoutUrl ${CART_LINES_FRAGMENT} } userErrors { field message } }
  }
`;
const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id ${CART_LINES_FRAGMENT} } userErrors { field message } }
  }
`;
const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { field message } }
  }
`;
const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { field message } }
  }
`;

type UserError = { field: string[] | null; message: string };
type LineNode = { id: string; merchandise: { id: string }; attributes: CartAttribute[] };

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: UserError[]) {
  return userErrors.some(
    (e) => e.message.toLowerCase().includes("cart not found") || e.message.toLowerCase().includes("does not exist"),
  );
}

const sameAttrs = (a: CartAttribute[] = [], b: CartAttribute[] = []) =>
  a.length === b.length && a.every((x) => b.some((y) => y.key === x.key && y.value === x.value));

function findLineIds(edges: Array<{ node: LineNode }>, lines: CartLineInput[], exclude: Set<string> = new Set()) {
  const used = new Set(exclude);
  return lines.map((l) => {
    const match = edges.find(
      (e) => !used.has(e.node.id) && e.node.merchandise.id === l.variantId && sameAttrs(e.node.attributes, l.attributes),
    );
    if (match) used.add(match.node.id);
    return match?.node.id ?? null;
  });
}

const toInput = (l: CartLineInput) => ({ quantity: l.quantity, merchandiseId: l.variantId, attributes: l.attributes ?? [] });

export async function createShopifyCart(lines: CartLineInput[]) {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, { input: { lines: lines.map(toInput) } });
  const errs: UserError[] = data?.data?.cartCreate?.userErrors ?? [];
  if (errs.length > 0) {
    console.error("Cart creation failed:", errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineIds = findLineIds(cart.lines.edges, lines);
  return { cartId: cart.id as string, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineIds };
}

export async function addLinesToShopifyCart(cartId: string, lines: CartLineInput[], existingLineIds: string[]) {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, { cartId, lines: lines.map(toInput) });
  const errs: UserError[] = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false as const, cartNotFound: true };
  if (errs.length > 0 || !data) {
    console.error("Add line failed:", errs);
    return { success: false as const };
  }
  const edges = data?.data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  return { success: true as const, lineIds: findLineIds(edges, lines, new Set(existingLineIds)) };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, { cartId, lines: [{ id: lineId, quantity }] });
  const errs: UserError[] = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0 || !data) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });
  const errs: UserError[] = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0 || !data) return { success: false };
  return { success: true };
}
