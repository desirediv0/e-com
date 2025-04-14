"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, ShoppingBag, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressFormValues } from "./AddressForm";
import { PaymentMethodValues } from "./PaymentMethod";

interface CheckoutData {
  address: AddressFormValues;
  payment: PaymentMethodValues;
  shippingMethod: string;
}

interface OrderSuccessProps {
  checkoutData: CheckoutData;
}

export default function OrderSuccess({ checkoutData }: OrderSuccessProps) {
  const [orderNumber] = useState(
    `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [estimatedDelivery] = useState(() => {
    const today = new Date();
    const deliveryDays = checkoutData.shippingMethod === "express" ? 2 : 5;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    return deliveryDate.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  });

  return (
    <div className="py-10 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="py-8 px-6 text-center border-b border-gray-100">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Check className="h-12 w-12 text-green-600" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You For Your Order!
            </h1>
            <p className="text-gray-600">
              Your order has been placed and will be on its way soon.
            </p>
          </motion.div>
        </div>

        <div className="py-6 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-blue-100 rounded-full text-blue-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Order Number</p>
                  <p className="text-lg font-bold text-blue-600">
                    {orderNumber}
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/my-orders">Track Order</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Home className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-medium">Shipping Address</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">
                    {checkoutData.address.fullName}
                  </p>
                  <p>{checkoutData.address.street}</p>
                  <p>
                    {checkoutData.address.city}, {checkoutData.address.state}{" "}
                    {checkoutData.address.zipCode}
                  </p>
                  <p>{checkoutData.address.country}</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-medium">Delivery Information</h3>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method:</span>
                    <span className="font-medium">
                      {checkoutData.shippingMethod === "standard"
                        ? "Standard Shipping"
                        : "Express Shipping"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <ShoppingBag className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="font-medium">Payment Information</h3>
              </div>
              <div className="text-sm text-gray-600">
                {checkoutData.payment.method === "card" &&
                  checkoutData.payment.cardDetails && (
                    <p>
                      Payment of the order has been made using the Credit/Debit
                      card ending in{" "}
                      <span className="font-medium">
                        {checkoutData.payment.cardDetails.number.substring(
                          checkoutData.payment.cardDetails.number.length - 4
                        )}
                      </span>
                    </p>
                  )}
                {checkoutData.payment.method === "wallet" && (
                  <p>
                    Payment of the order has been made using Digital Wallet.
                  </p>
                )}
                {checkoutData.payment.method === "bank" && (
                  <p>Payment of the order has been made using Bank Transfer.</p>
                )}
              </div>
            </div>

            <div className="text-center pt-6 space-y-4">
              <p className="text-sm text-gray-600">
                We've sent a confirmation email to {checkoutData.address.email}{" "}
                with all the details of your order.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/my-orders">View My Orders</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Confetti Animation */}
        <ConfettiAnimation />
      </div>
    </div>
  );
}

// Confetti animation component
const ConfettiAnimation = () => {
  // Define the particle type
  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    velocity: {
      x: number;
      y: number;
      rotation: number;
    };
  }

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate confetti particles
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        velocity: {
          x: -1 + Math.random() * 2,
          y: 2 + Math.random() * 3,
          rotation: -2 + Math.random() * 4,
        },
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 1,
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            rotate: particle.rotation,
            scale: 1,
          }}
          animate={{
            opacity: [1, 1, 0],
            x: `${particle.x + particle.velocity.x * 20}vw`,
            y: `${100 + Math.random() * 20}vh`,
            rotate: particle.rotation + particle.velocity.rotation * 100,
            scale: [1, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            ease: "easeOut",
            delay: Math.random() * 0.5,
          }}
          style={{
            position: "absolute",
            width: `${particle.size}px`,
            height: `${particle.size * 0.4}px`,
            borderRadius: "2px",
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  );
};
