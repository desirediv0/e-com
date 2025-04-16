import { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "@/context/CartContext";

// Define types for the hook's return values
type PromoStatus = "idle" | "checking" | "valid" | "invalid";

interface UseCartAnimationReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoStatus: PromoStatus;
  setPromoStatus: (status: PromoStatus) => void;
  isCheckingOut: boolean;
  removingItemId: number | null;
  badgeKey: number;
  emptyCartMessage: string;
  handleApplyPromoCode: () => void;
  handleCheckout: () => void;
  handleRemoveItem: (id: number) => void;
}

// List of valid promo codes for validation
export const VALID_PROMO_CODES = [
  { code: "SAVE10", discount: 10, type: "percentage" },
  { code: "NEWUSER", discount: 15, type: "percentage" },
  { code: "FLAT100", discount: 100, type: "amount" },
];

// Empty cart messages for rotation
const EMPTY_CART_MESSAGES = [
  "Your cart is feeling lonely...",
  "Add something delicious!",
  "Time to start shopping!",
  "Your fitness journey awaits!",
  "Ready to boost your performance?",
];

export const useCartAnimation = (): UseCartAnimationReturn => {
  const { items, totalItems, subtotal, removeItem, applyDiscount } = useCart();

  const [isOpen, setIsOpenState] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<PromoStatus>("idle");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [badgeKey, setBadgeKey] = useState(0);
  const [emptyCartMessage, setEmptyCartMessage] = useState(
    EMPTY_CART_MESSAGES[0]
  );

  const prevTotalItemsRef = useRef(totalItems);
  const isUpdatingRef = useRef(false);
  const prevOpenRef = useRef(isOpen);

  // Memoize state setter to prevent infinite re-renders
  const setIsOpen = useCallback((open: boolean) => {
    // Prevent updates when nothing has changed
    if (prevOpenRef.current === open || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    // Use requestAnimationFrame to break potential render cycles
    requestAnimationFrame(() => {
      setIsOpenState(open);
      prevOpenRef.current = open;
      isUpdatingRef.current = false;
    });
  }, []);

  // Handle badge animation when totalItems changes
  useEffect(() => {
    if (totalItems !== prevTotalItemsRef.current) {
      setBadgeKey((prev) => prev + 1);
      prevTotalItemsRef.current = totalItems;
    }
  }, [totalItems]);

  // Apply promo code with animation states
  const handleApplyPromoCode = useCallback(() => {
    if (!promoCode.trim()) return;

    setPromoStatus("checking");

    // Simulate API call
    setTimeout(() => {
      const validPromo = VALID_PROMO_CODES.find(
        (p) => p.code.toLowerCase() === promoCode.trim().toLowerCase()
      );

      if (validPromo) {
        // Calculate discount
        const discountAmount =
          validPromo.type === "percentage"
            ? (subtotal * validPromo.discount) / 100
            : validPromo.discount;

        applyDiscount(discountAmount);
        setPromoStatus("valid");
      } else {
        setPromoStatus("invalid");
        applyDiscount(0);
      }
    }, 800);
  }, [promoCode, subtotal, applyDiscount]);

  const handleCheckout = useCallback(() => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsOpen(false);
      // Here you would normally redirect to checkout page or show success message
    }, 2000);
  }, [setIsOpen]);

  // Handle item removal with animation
  const handleRemoveItem = useCallback(
    (id: number) => {
      setRemovingItemId(id);

      // Wait for animation to complete
      setTimeout(() => {
        removeItem(id);
        setRemovingItemId(null);
      }, 300);
    },
    [removeItem]
  );

  // Change empty cart message occasionally for better UX
  useEffect(() => {
    const interval = setInterval(() => {
      if (items?.length === 0) {
        const randomMessage =
          EMPTY_CART_MESSAGES[
            Math.floor(Math.random() * EMPTY_CART_MESSAGES.length)
          ];
        setEmptyCartMessage(randomMessage);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [items?.length]);

  return {
    isOpen,
    setIsOpen,
    promoCode,
    setPromoCode,
    promoStatus,
    setPromoStatus,
    isCheckingOut,
    removingItemId,
    badgeKey,
    emptyCartMessage,
    handleApplyPromoCode,
    handleCheckout,
    handleRemoveItem,
  };
};

export default useCartAnimation;
