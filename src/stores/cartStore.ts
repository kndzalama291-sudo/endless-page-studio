import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type CartAttribute,
  type Money,
  type ShopifyProduct,
  CART_QUERY,
  addLinesToShopifyCart,
  createShopifyCart,
  removeLineFromShopifyCart,
  storefrontApiRequest,
  updateShopifyCartLine,
} from "@/lib/shopify";

export interface CartItem {
  key: string; // unique per variant + personalization
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: Money;
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
  attributes: CartAttribute[];
}

export type NewCartItem = Omit<CartItem, "lineId" | "key">;

const itemKey = (i: NewCartItem) =>
  i.variantId + "|" + i.attributes.map((a) => `${a.key}=${a.value}`).sort().join("&");

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItems: (items: NewCartItem[]) => Promise<boolean>;
  addItem: (item: NewCartItem) => Promise<boolean>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      isOpen: false,
      setOpen: (isOpen) => set({ isOpen }),

      addItem: (item) => get().addItems([item]),

      addItems: async (newItems) => {
        const { cartId, clearCart } = get();
        set({ isLoading: true });
        try {
          // Merge quantities for identical lines already in the cart.
          const fresh: NewCartItem[] = [];
          for (const item of newItems) {
            const key = itemKey(item);
            const existing = get().items.find((i) => i.key === key);
            if (existing?.lineId && cartId) {
              const q = existing.quantity + item.quantity;
              const r = await updateShopifyCartLine(cartId, existing.lineId, q);
              if (r.cartNotFound) {
                clearCart();
                fresh.push(item);
              } else if (r.success) {
                set({ items: get().items.map((i) => (i.key === key ? { ...i, quantity: q } : i)) });
              }
            } else {
              fresh.push(item);
            }
          }
          if (fresh.length === 0) return true;

          const lines = fresh.map((i) => ({ variantId: i.variantId, quantity: i.quantity, attributes: i.attributes }));
          const currentCartId = get().cartId;
          if (!currentCartId) {
            const result = await createShopifyCart(lines);
            if (!result) return false;
            set({
              cartId: result.cartId,
              checkoutUrl: result.checkoutUrl,
              items: [
                ...get().items,
                ...fresh.map((i, idx) => ({ ...i, key: itemKey(i), lineId: result.lineIds[idx] ?? null })),
              ],
            });
            return true;
          }
          const existingIds = get().items.map((i) => i.lineId).filter(Boolean) as string[];
          const result = await addLinesToShopifyCart(currentCartId, lines, existingIds);
          if (result.success) {
            set({
              items: [...get().items, ...fresh.map((i, idx) => ({ ...i, key: itemKey(i), lineId: result.lineIds[idx] ?? null }))],
            });
            return true;
          }
          if ("cartNotFound" in result && result.cartNotFound) {
            clearCart();
            return get().addItems(newItems);
          }
          return false;
        } catch (error) {
          console.error("Failed to add item:", error);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (key, quantity) => {
        if (quantity <= 0) return get().removeItem(key);
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.key === key);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const r = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (r.success) set({ items: get().items.map((i) => (i.key === key ? { ...i, quantity } : i)) });
          else if (r.cartNotFound) clearCart();
        } catch (e) {
          console.error("Failed to update quantity:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (key) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.key === key);
        if (!item?.lineId || !cartId) {
          set({ items: items.filter((i) => i.key !== key) });
          return;
        }
        set({ isLoading: true });
        try {
          const r = await removeLineFromShopifyCart(cartId, item.lineId);
          if (r.success) {
            const next = get().items.filter((i) => i.key !== key);
            if (next.length === 0) clearCart();
            else set({ items: next });
          } else if (r.cartNotFound) clearCart();
        } catch (e) {
          console.error("Failed to remove item:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (e) {
          console.error("Failed to sync cart with Shopify:", e);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, cartId: s.cartId, checkoutUrl: s.checkoutUrl }),
    },
  ),
);
