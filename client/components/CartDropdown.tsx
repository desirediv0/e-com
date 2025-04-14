"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Trash2, X, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, subtotal, removeItem, updateQuantity } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Cart Icon */}
      <motion.button
        onClick={toggleCart}
        className="flex items-center p-1 text-gray-700 hover:text-black transition-colors relative"
        aria-label="Shopping Cart"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </motion.button>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
              onClick={toggleCart}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-200 z-[101] overflow-hidden flex flex-col shadow-lg"
              style={{ height: "100vh" }}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center backdrop-blur-md bg-white/95">
                <h3 className="font-bold text-gray-900 tracking-wide text-lg">
                  SHOPPING CART
                </h3>
                <motion.button
                  onClick={toggleCart}
                  className="p-1 rounded-full text-gray-500 hover:text-black"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {items.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    className="mb-6 text-gray-300"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ShoppingCart className="h-16 w-16" />
                  </motion.div>
                  <motion.p
                    className="text-gray-600 mb-6 text-lg"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Your cart is empty
                  </motion.p>
                  <motion.button
                    onClick={toggleCart}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center group"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SHOP NOW
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </motion.button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-grow overflow-y-auto custom-scrollbar">
                    <div className="p-4">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="flex items-center mb-4 p-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors group relative overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:to-red-50/0 transition-colors duration-300" />

                          {/* Product Image */}
                          <div className="h-16 w-16 bg-white rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                            {item.image ? (
                              <Image
                                width={100}
                                height={100}
                                src={item.image}
                                alt={item.name}
                                className="h-14 w-14 object-contain"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs text-center">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="ml-3 flex-grow">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {item.size} • {item.flavor}
                            </div>
                            <div className="flex items-center mt-2 justify-between">
                              <div className="flex items-center bg-white rounded-md border border-gray-200">
                                <motion.button
                                  className="text-gray-600 hover:text-gray-900 p-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    );
                                  }}
                                  whileHover={{
                                    backgroundColor: "rgba(0,0,0,0.05)",
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </motion.button>
                                <span className="mx-1 text-sm text-gray-900 w-6 text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  className="text-gray-600 hover:text-gray-900 p-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, item.quantity + 1);
                                  }}
                                  whileHover={{
                                    backgroundColor: "rgba(0,0,0,0.05)",
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </motion.button>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                ₹{item.totalPrice.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {/* Remove Item */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="ml-3 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Cart Footer */}
                  <div className="border-t border-gray-200 p-5 backdrop-blur-md bg-white/95">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <motion.span
                        className="font-bold text-gray-900"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        ₹{subtotal.toLocaleString()}
                      </motion.span>
                    </div>
                    <motion.div
                      className="mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Free shipping on orders above ₹1000
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Link
                        href="/cart"
                        onClick={toggleCart}
                        className="border border-gray-300 text-gray-900 px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center hover:bg-gray-50"
                      >
                        VIEW CART
                      </Link>
                      <Link
                        href="/checkout"
                        onClick={toggleCart}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        CHECKOUT
                      </Link>
                    </div>
                    <div className="text-xs text-center text-gray-500">
                      Shipping & taxes calculated at checkout
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartDropdown;
