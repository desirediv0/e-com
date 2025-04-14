"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, X, ChevronLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
    setShipping,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Coupon codes for demonstration purposes
  const validCoupons = [
    { code: "BOOST15", discount: 0.15 },
    { code: "WELCOME10", discount: 0.1 },
    { code: "FREESHIP", discount: 0 },
  ];

  const handleApplyCoupon = () => {
    const coupon = validCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (coupon) {
      const discountAmount = Math.round(subtotal * coupon.discount);
      applyDiscount(discountAmount);
      setCouponError("");
      setShowCouponInput(false);
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleShippingOption = (shippingCost: number) => {
    setShipping(shippingCost);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Shopping Cart</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Cart</span>
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div
            className="bg-white rounded-lg shadow-sm p-8 text-center max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col lg:flex-row gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Cart Items */}
            <motion.div className="lg:flex-grow" variants={itemVariants}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-medium text-gray-800">
                    Cart Items ({totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="p-4 flex items-center hover:bg-gray-50 transition-colors"
                      variants={itemVariants}
                    >
                      {/* Product Image */}
                      <div className="h-20 w-20 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                        {item.image ? (
                          <Image
                            width={200}
                            height={200}
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-contain"
                          />
                        ) : (
                          <div className="text-gray-400 text-xs text-center">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.size} • {item.flavor}
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              ₹{item.totalPrice.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              ₹{item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 flex justify-between">
                  <Link
                    href="/products"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Cart Summary */}
            <motion.div
              className="lg:w-96 xl:w-[400px] flex-shrink-0"
              variants={itemVariants}
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-medium text-gray-800">Order Summary</h2>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">
                        -₹{discount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0
                        ? "Free"
                        : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-base">
                      <span className="font-medium text-gray-800">Total</span>
                      <span className="font-bold text-gray-900">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Shipping Options
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shipping === 0}
                          onChange={() => handleShippingOption(0)}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          Free Shipping (3-5 business days)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shipping === 99}
                          onChange={() => handleShippingOption(99)}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          Express Shipping (1-2 business days) - ₹99
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="pt-4">
                    {showCouponInput ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-grow"
                          />
                          <Button
                            onClick={handleApplyCoupon}
                            className="shrink-0"
                          >
                            Apply
                          </Button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-red-500">{couponError}</p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowCouponInput(true)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Have a coupon code?
                      </button>
                    )}
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/checkout"
                      className="block bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-center font-medium transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
