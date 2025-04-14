"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AddressForm, { AddressFormValues } from "./components/AddressForm";
import PaymentMethod, { PaymentMethodValues } from "./components/PaymentMethod";
import OrderReview from "./components/OrderReview";
import OrderSuccess from "./components/OrderSuccess";

// Define checkout steps
const STEPS = [
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];

// Define the type for checkout data
interface CheckoutData {
  address: AddressFormValues;
  payment: PaymentMethodValues;
  shippingMethod: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalItems, subtotal, discount, shipping, total, clearCart } =
    useCart();

  const [currentStep, setCurrentStep] = useState<string>("address");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    address: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "India",
    },
    payment: {
      method: "card",
      cardDetails: {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
      },
      savePaymentMethod: false,
    },
    shippingMethod: shipping === 0 ? "standard" : "express",
  });

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0 && !isComplete) {
      router.push("/cart");
    }
  }, [items.length, router, isComplete]);

  // Handle address submission
  const handleAddressSubmit = (addressData: AddressFormValues) => {
    setCheckoutData((prev) => ({ ...prev, address: addressData }));
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };

  // Handle payment method selection
  const handlePaymentSubmit = (paymentData: PaymentMethodValues) => {
    setCheckoutData((prev) => ({ ...prev, payment: paymentData }));
    setCurrentStep("review");
    window.scrollTo(0, 0);
  };

  // Handle final order submission
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
    }, 2000);
  };

  // Handle editing a previous step
  const handleEditStep = (step: string) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Checkout</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-blue-600">
              Cart
            </Link>
            <span className="mx-2">/</span>
            <span>Checkout</span>
          </div>
        </div>

        {!isComplete ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-grow">
              {/* Progress Steps */}
              <div className="mb-8 hidden sm:block">
                <div className="flex justify-between">
                  {STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 text-sm font-medium
                          ${
                            currentStep === step.id
                              ? "border-blue-600 bg-blue-600 text-white"
                              : STEPS.findIndex((s) => s.id === currentStep) >
                                index
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-gray-300 text-gray-500"
                          }`}
                      >
                        {STEPS.findIndex((s) => s.id === currentStep) >
                        index ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div
                        className={`ml-4 text-sm font-medium
                          ${
                            currentStep === step.id
                              ? "text-blue-600"
                              : STEPS.findIndex((s) => s.id === currentStep) >
                                index
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                      >
                        {step.label}
                      </div>

                      {index < STEPS.length - 1 && (
                        <div className="flex-grow mx-4 h-0.5 bg-gray-200">
                          <div
                            className="h-full bg-blue-600"
                            style={{
                              width:
                                STEPS.findIndex((s) => s.id === currentStep) >
                                index
                                  ? "100%"
                                  : "0%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <AnimatePresence mode="wait">
                  {currentStep === "address" && (
                    <motion.div
                      key="address"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AddressForm
                        initialData={checkoutData.address}
                        onSubmit={handleAddressSubmit}
                      />
                    </motion.div>
                  )}

                  {currentStep === "payment" && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PaymentMethod
                        initialData={checkoutData.payment}
                        onSubmit={handlePaymentSubmit}
                        onBack={() => {
                          setCurrentStep("address");
                          window.scrollTo(0, 0);
                        }}
                      />
                    </motion.div>
                  )}

                  {currentStep === "review" && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OrderReview
                        checkoutData={checkoutData}
                        cartItems={items}
                        subtotal={subtotal}
                        discount={discount}
                        shipping={shipping}
                        total={total}
                        onEditAddress={() => handleEditStep("address")}
                        onEditPayment={() => handleEditStep("payment")}
                        onSubmit={handlePlaceOrder}
                        onBack={() => {
                          setCurrentStep("payment");
                          window.scrollTo(0, 0);
                        }}
                        isProcessing={isProcessing}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 xl:w-[400px] flex-shrink-0 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-medium text-gray-800">Order Summary</h2>
                </div>

                <div className="p-4 space-y-4">
                  <div className="text-sm text-gray-600">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </div>

                  <div className="pt-4 space-y-2">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <OrderSuccess checkoutData={checkoutData} />
        )}
      </div>
    </div>
  );
}
