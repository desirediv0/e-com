"use client";

import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart as CartIcon,
  X,
  Check,
  Trash2,
  Loader2,
  CreditCard,
  Tag,
  ArrowRight,
  Search,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import useCartAnimation from "@/hooks/useCartAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";

// Define props interface
interface ShoppingCartProps {
  scrollState?: boolean;
}

const ShoppingCart = memo(({ scrollState = false }: ShoppingCartProps) => {
  const { items, totalItems, subtotal, updateQuantity, total, discount } =
    useCart();

  const {
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
  } = useCartAnimation();

  // Use local state to track sheet open state and hydration status
  const [sheetOpen, setSheetOpen] = useState(isOpen);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasAddedItem, setHasAddedItem] = useState(false);

  // Use refs to track previous values and prevent infinite update loops
  const prevIsOpenRef = useRef(isOpen);
  const prevSheetOpenRef = useRef(sheetOpen);
  const prevTotalItemsRef = useRef(totalItems);
  const updatingStateRef = useRef(false);

  // Set mounted state after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Track changes to cart items for notification animation
  useEffect(() => {
    if (hasMounted && prevTotalItemsRef.current < totalItems) {
      setHasAddedItem(true);

      // Reset animation after it plays
      const timer = setTimeout(() => {
        setHasAddedItem(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    prevTotalItemsRef.current = totalItems;
  }, [totalItems, hasMounted]);

  // Sync external state with internal state only when values actually change
  useEffect(() => {
    // Prevent updating if we're already in an update cycle
    if (updatingStateRef.current) return;

    // Only update if values actually changed
    if (prevIsOpenRef.current !== isOpen && hasMounted) {
      updatingStateRef.current = true;
      prevIsOpenRef.current = isOpen;
      setSheetOpen(isOpen);
      updatingStateRef.current = false;
    }
  }, [isOpen, hasMounted]);

  // Handle sheet state changes - preventing circular updates
  const handleOpenChange = (open: boolean) => {
    // Don't update if no actual change
    if (open === sheetOpen) return;

    // Update both local and external state in controlled sequence
    updatingStateRef.current = true;
    setSheetOpen(open);
    prevSheetOpenRef.current = open;

    // Use setTimeout to break the React render cycle
    setTimeout(() => {
      setIsOpen(open);
      prevIsOpenRef.current = open;
      updatingStateRef.current = false;
    }, 0);
  };

  // Create a safe version of the cart badge that won't cause hydration errors
  const CartBadge = () => {
    // Only show animation after component has mounted on client
    if (!hasMounted) {
      return totalItems > 0 ? (
        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          {totalItems}
        </div>
      ) : null;
    }

    return (
      <AnimatePresence mode="wait">
        {totalItems > 0 && (
          <motion.div
            key={badgeKey}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [0.5, 1.2, 1],
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
              duration: 0.4,
              scale: {
                times: [0, 0.5, 1],
                duration: 0.6,
                ease: "easeOut",
              },
            }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white"
          >
            {totalItems}
            {/* Ripple effect when item is added */}
            <AnimatePresence>
              {hasAddedItem && (
                <motion.span
                  initial={{ width: "100%", height: "100%", opacity: 0.8 }}
                  animate={{ width: "200%", height: "200%", opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 rounded-full bg-red-500"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <Button
            variant="ghost"
            size="icon"
            className={`relative h-9 w-9 rounded-full ${
              !scrollState
                ? "text-white hover:bg-white/20"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Open shopping cart"
          >
            <CartIcon className="h-5 w-5" />
            <CartBadge />

            {/* Notification animation when new item is added */}
            <AnimatePresence>
              {hasAddedItem && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: -20 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute -right-10 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                >
                  Item added!
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        className="flex w-full flex-col sm:max-w-md px-0 py-0 overflow-hidden"
        side="right"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <CartIcon className="h-5 w-5" />
            <h2 className="font-semibold text-base">Your Cart</h2>
            {totalItems > 0 && (
              <span className="text-sm text-gray-500">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-4">
          {!hasMounted ? (
            // Static content for server-side rendering
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4 text-center">
              <div className="h-20 w-20 text-gray-300">
                <CartIcon className="h-full w-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500">{emptyCartMessage}</p>
              <Button className="mt-4 gap-2">
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            // Client-side rendering with animations
            <AnimatePresence initial={false}>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center h-[50vh] gap-4 text-center"
                >
                  <motion.div
                    className="h-20 w-20 text-gray-300"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 5,
                      ease: "easeInOut",
                    }}
                  >
                    <CartIcon className="h-full w-full" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500">{emptyCartMessage}</p>
                  <SheetClose asChild>
                    <Button className="mt-4 gap-2">
                      Start Shopping
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </motion.div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: removingItemId === item.id ? 0 : 1,
                        height: removingItemId === item.id ? 0 : "auto",
                        y: 0,
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 },
                      }}
                      className="py-4 flex gap-3 overflow-hidden"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                        {item.image ? (
                          <Image
                            width={100}
                            height={100}
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain object-center p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <Search className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>

                        {(item.size || item.flavor) && (
                          <p className="mt-1 text-xs text-gray-500">
                            {item.size && <span>{item.size}</span>}
                            {item.size && item.flavor && <span> • </span>}
                            {item.flavor && <span>{item.flavor}</span>}
                          </p>
                        )}

                        <div className="mt-auto flex items-end justify-between pt-2">
                          <div className="flex h-8 w-24">
                            <QuantitySelector
                              initialValue={item.quantity}
                              onChange={(value) =>
                                updateQuantity(item.id, value)
                              }
                              min={1}
                              max={10}
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{item.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && hasMounted && (
          <div className="border-t border-gray-200">
            {/* Promo code section */}
            <div className="p-4 bg-gray-50">
              <div className="mb-2 flex items-center">
                <Tag className="mr-2 h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-medium">Promo Code</h3>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      if (promoStatus !== "idle") setPromoStatus("idle");
                    }}
                    placeholder="Enter code"
                    className={`pr-8 ${
                      promoStatus === "valid"
                        ? "border-green-500 focus-visible:ring-green-500"
                        : promoStatus === "invalid"
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    disabled={
                      promoStatus === "checking" || promoStatus === "valid"
                    }
                  />
                  {promoStatus === "valid" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500"
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  )}
                </div>
                <Button
                  variant={promoStatus === "valid" ? "secondary" : "default"}
                  size="sm"
                  onClick={handleApplyPromoCode}
                  disabled={
                    !promoCode.trim() ||
                    promoStatus === "checking" ||
                    promoStatus === "valid"
                  }
                  className="h-9 whitespace-nowrap"
                >
                  {promoStatus === "checking" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : promoStatus === "valid" ? (
                    "Applied"
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
              {promoStatus === "invalid" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-xs text-red-500"
                >
                  Invalid promo code. Try "SAVE10", "NEWUSER", or "FLAT100".
                </motion.p>
              )}
              {promoStatus === "valid" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-xs text-green-600"
                >
                  Promo code applied successfully!
                </motion.p>
              )}
            </div>

            {/* Order summary */}
            <div className="p-4 space-y-3">
              <h3 className="font-medium text-sm mb-2">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600">
                    -₹{discount.toLocaleString()}
                  </span>
                </motion.div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>{subtotal > 1000 ? "Free" : "₹99"}</span>
              </div>

              <div className="pt-3 mt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <motion.span
                    key={total} // Trigger animation when total changes
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-bold"
                  >
                    ₹{total.toLocaleString()}
                  </motion.span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  className="w-full h-11 mt-2 gap-2 group"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Proceed to Checkout
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </>
                  )}
                </Button>

                <p className="text-xs text-center mt-2 text-gray-500">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
});

ShoppingCart.displayName = "ShoppingCart";

export default ShoppingCart;
