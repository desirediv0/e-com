"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SearchIcon,
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  InfoIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OrderStatus {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  updatedAt: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shipping: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  customerName: string;
  customerEmail: string;
}

// Mock data for demo
const mockOrders: OrderStatus[] = [
  {
    id: "ORD-12345",
    status: "delivered",
    createdAt: "2023-11-10T09:30:00Z",
    updatedAt: "2023-11-15T16:45:00Z",
    items: [
      { name: "Protein Powder - Chocolate", quantity: 1, price: 2499 },
      { name: "BCAA - Berry Blast", quantity: 2, price: 1299 },
    ],
    total: 5097,
    shipping: {
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India",
    },
    trackingNumber: "IND12345678901",
    estimatedDelivery: "2023-11-14",
    customerName: "John Doe",
    customerEmail: "john@example.com",
  },
  {
    id: "ORD-67890",
    status: "shipped",
    createdAt: "2023-12-05T14:22:00Z",
    updatedAt: "2023-12-07T10:15:00Z",
    items: [
      { name: "Pre-Workout - Blue Raspberry", quantity: 1, price: 1999 },
      { name: "Creatine Monohydrate", quantity: 1, price: 1499 },
    ],
    total: 3498,
    shipping: {
      address: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India",
    },
    trackingNumber: "IND98765432109",
    estimatedDelivery: "2023-12-12",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
  },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderStatus | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setOrderResult(null);

    if (!orderId || !email) {
      setSearchError("Both order ID and email are required");
      return;
    }

    setIsSearching(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, this would be an API call to fetch the order
      const foundOrder = mockOrders.find(
        (order) => order.id === orderId && order.customerEmail === email
      );

      if (foundOrder) {
        setOrderResult(foundOrder);
      } else {
        setSearchError(
          "No order found with the provided details. Please check your order ID and email."
        );
      }
    } catch (error) {
      console.error("Error searching for order:", error);
      setSearchError(
        "An error occurred while searching for your order. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: OrderStatus["status"]) => {
    switch (status) {
      case "pending":
        return <InfoIcon className="h-6 w-6 text-yellow-500" />;
      case "processing":
        return <PackageIcon className="h-6 w-6 text-blue-500" />;
      case "shipped":
        return <TruckIcon className="h-6 w-6 text-purple-500" />;
      case "delivered":
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      default:
        return <InfoIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusText = (status: OrderStatus["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  const getStatusDescription = (status: OrderStatus["status"]) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is pending processing.";
      case "processing":
        return "Your order is being processed and prepared for shipping.";
      case "shipped":
        return "Your order has been shipped and is on its way to you.";
      case "delivered":
        return "Your order has been delivered successfully.";
      default:
        return "Status information is not available.";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black text-white relative">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Red glow effect */}
      <motion.div
        className="absolute top-1/4 -left-40 w-80 h-80 bg-red-600/20 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-white">Track Your Order</h1>
          <div className="w-20 h-1 bg-red-600 mx-auto my-4"></div>
          <p className="mt-2 text-white/70">
            Enter your order ID and email to track your package
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.1)] p-6 mb-8"
        >
          <form onSubmit={handleSearch}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="orderId"
                  className="block text-sm font-medium text-white/70 mb-1 tracking-wide"
                >
                  ORDER ID
                </label>
                <Input
                  id="orderId"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ORD-12345"
                  className="w-full bg-black/30 border border-white/10 focus:border-red-500 focus:ring-red-500 rounded-none px-4 py-3 text-white placeholder-white/30"
                  disabled={isSearching}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70 mb-1 tracking-wide"
                >
                  EMAIL ADDRESS
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  className="w-full bg-black/30 border border-white/10 focus:border-red-500 focus:ring-red-500 rounded-none px-4 py-3 text-white placeholder-white/30"
                  disabled={isSearching}
                />
              </div>

              {searchError && (
                <div className="p-3 bg-red-900/30 text-red-300 text-sm border border-red-500/30 rounded-sm">
                  {searchError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-none text-sm font-medium transition-colors relative group overflow-hidden"
                disabled={isSearching}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSearching ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      SEARCHING...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="mr-2 h-4 w-4" /> TRACK ORDER
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:scale-105 transition-transform duration-300"></span>
              </Button>
            </div>
          </form>
        </motion.div>

        {orderResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.1)] overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Order {orderResult.id}
                  </h2>
                  <p className="text-sm text-white/50">
                    Placed on {formatDate(orderResult.createdAt)}
                  </p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(orderResult.status)}
                  <span className="ml-2 font-medium text-white">
                    {getStatusText(orderResult.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order tracking timeline */}
            <div className="p-6 bg-black/30">
              <h3 className="text-lg font-medium text-white mb-4">
                Order Status
              </h3>
              <div className="relative pb-8">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="h-full w-0.5 bg-white/10"></div>
                </div>

                {/* Status steps */}
                <div className="relative flex flex-col space-y-8">
                  {(
                    ["pending", "processing", "shipped", "delivered"] as const
                  ).map((step, index) => {
                    const isActive =
                      (
                        [
                          "pending",
                          "processing",
                          "shipped",
                          "delivered",
                        ] as const
                      ).indexOf(orderResult.status) >=
                      (
                        [
                          "pending",
                          "processing",
                          "shipped",
                          "delivered",
                        ] as const
                      ).indexOf(step);
                    return (
                      <div
                        key={step}
                        className={`flex items-center ${
                          index !== 3 ? "pb-8" : ""
                        }`}
                      >
                        <div
                          className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                            isActive ? "bg-red-600" : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`h-6 w-6 ${
                              isActive ? "text-white" : "text-white/30"
                            }`}
                          >
                            {getStatusIcon(step)}
                          </span>
                        </div>
                        <div className="ml-4 min-w-0 flex-1">
                          <h4
                            className={`text-base font-medium ${
                              isActive ? "text-red-500" : "text-white/50"
                            }`}
                          >
                            {getStatusText(step)}
                          </h4>
                          <p
                            className={`text-sm ${
                              isActive ? "text-white/80" : "text-white/40"
                            }`}
                          >
                            {getStatusDescription(step)}
                          </p>
                          {step === orderResult.status && (
                            <p className="text-sm text-red-400 font-medium mt-1">
                              Updated on {formatDate(orderResult.updatedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tracking information */}
            {orderResult.status === "shipped" ||
            orderResult.status === "delivered" ? (
              <div className="p-6 border-t border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">
                  Shipping Information
                </h3>
                <div className="bg-white/5 p-4 rounded-md border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Tracking Number
                      </p>
                      <p className="text-red-400 font-medium">
                        {orderResult.trackingNumber}
                      </p>
                    </div>
                    {orderResult.status === "shipped" && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-white/70">
                          Estimated Delivery
                        </p>
                        <p className="text-red-400 font-medium">
                          {formatDate(orderResult.estimatedDelivery || "")}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white/70">
                      Shipping Address
                    </p>
                    <address className="not-italic mt-1 text-white/90">
                      {orderResult.shipping.address}
                      <br />
                      {orderResult.shipping.city}, {orderResult.shipping.state}{" "}
                      {orderResult.shipping.zipCode}
                      <br />
                      {orderResult.shipping.country}
                    </address>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Order summary */}
            <div className="p-6 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-4">
                Order Summary
              </h3>
              <div className="divide-y divide-white/10">
                {orderResult.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-white/50">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-white">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-base font-medium text-white">
                  <p>Total</p>
                  <p className="text-red-500">
                    ₹{orderResult.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Support section */}
            <div className="p-6 bg-red-900/20 border-t border-red-900/30">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ClipboardCheckIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium text-white">
                    Need Help?
                  </h3>
                  <p className="text-sm text-white/70">
                    If you have any questions about your order, please contact
                    our customer support at{" "}
                    <a
                      href="mailto:support@purin.com"
                      className="font-medium text-red-400 hover:text-red-300 underline"
                    >
                      support@purin.com
                    </a>{" "}
                    or call us at{" "}
                    <a
                      href="tel:+911800123456"
                      className="font-medium text-red-400 hover:text-red-300 underline"
                    >
                      +91 1800-123-456
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!orderResult && !searchError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-lg p-8 text-center"
          >
            <PackageIcon className="h-12 w-12 text-red-500/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Track Your Recent Orders
            </h3>
            <p className="text-white/70 mb-6">
              Enter your order details above to check the current status of your
              purchase.
            </p>
            <div className="text-sm text-white/50">
              <p>Example Order IDs from our test system:</p>
              <p className="font-mono mt-1 text-red-400">
                ORD-12345, ORD-67890
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
