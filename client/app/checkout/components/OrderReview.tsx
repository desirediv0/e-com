"use client";

import { ArrowLeft, Pencil, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/context/CartContext";
import { AddressFormValues } from "./AddressForm";
import { PaymentMethodValues } from "./PaymentMethod";
import { motion } from "framer-motion";
import Image from "next/image";

interface CheckoutData {
  address: AddressFormValues;
  payment: PaymentMethodValues;
  shippingMethod: string;
}

interface OrderReviewProps {
  checkoutData: CheckoutData;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onEditAddress: () => void;
  onEditPayment: () => void;
  onSubmit: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

export default function OrderReview({
  checkoutData,
  cartItems,
  subtotal,
  discount,
  shipping,
  total,
  onEditAddress,
  onEditPayment,
  onSubmit,
  onBack,
  isProcessing,
}: OrderReviewProps) {
  const { address, payment } = checkoutData;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

      <div className="space-y-8">
        {/* Shipping Address Review */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Shipping Address</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-blue-600"
              onClick={onEditAddress}
              disabled={isProcessing}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
          </div>
          <div className="text-sm space-y-1 text-gray-600">
            <p className="font-medium text-gray-900">{address.fullName}</p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
            <p className="pt-1">{address.phone}</p>
            <p>{address.email}</p>
          </div>
        </div>

        {/* Payment Method Review */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Payment Method</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-blue-600"
              onClick={onEditPayment}
              disabled={isProcessing}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            {payment.method === "card" && payment.cardDetails && (
              <div className="flex items-center">
                <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">
                    {payment.cardDetails.number.substring(0, 4)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Card ending with{" "}
                    {payment.cardDetails.number.substring(
                      payment.cardDetails.number.length - 4
                    )}
                  </p>
                  <p>Expires {payment.cardDetails.expiry}</p>
                </div>
              </div>
            )}
            {payment.method === "wallet" && (
              <p className="font-medium text-gray-900">Digital Wallet</p>
            )}
            {payment.method === "bank" && (
              <p className="font-medium text-gray-900">Bank Transfer</p>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="border border-gray-200 rounded-lg">
          <h3 className="font-medium p-4 border-b border-gray-200">
            Order Items ({cartItems.length})
          </h3>
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 flex">
                <div className="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center mr-4">
                  {item.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs text-center">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.size} • {item.flavor}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ₹{item.totalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    ₹{item.price.toLocaleString()} each
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">
                  -₹{discount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>
                {shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium text-base pt-1">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Additional information */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex">
            <div className="text-blue-600 mt-0.5">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                Secure Checkout
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Your payment information is securely processed and never stored.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping information */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex">
            <div className="text-green-600 mt-0.5">
              <Truck className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Shipping Information
              </p>
              <p className="text-xs text-green-600 mt-1">
                {checkoutData.shippingMethod === "standard"
                  ? "Standard Shipping (3-5 business days)"
                  : "Express Shipping (1-2 business days)"}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex items-center"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Payment
          </Button>

          <Button
            type="button"
            onClick={onSubmit}
            className="min-w-[150px]"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                />
                Processing...
              </div>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
