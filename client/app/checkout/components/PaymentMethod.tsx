"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Wallet, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

// Credit card validation schema
const cardSchema = z.object({
  number: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .regex(
      /^[0-9\s-]+$/,
      "Card number must contain only digits, spaces, or hyphens"
    ),
  name: z.string().min(3, "Name on card must be at least 3 characters"),
  expiry: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    ),
  cvc: z
    .string()
    .min(3, "CVC must be at least 3 digits")
    .max(4, "CVC cannot exceed 4 digits")
    .regex(/^[0-9]+$/, "CVC must contain only digits"),
});

// Payment method schema
const paymentSchema = z.object({
  method: z.enum(["card", "wallet", "bank"]),
  cardDetails: cardSchema.optional(),
  savePaymentMethod: z.boolean().optional(),
});

// Types
export type PaymentMethodValues = z.infer<typeof paymentSchema>;

interface PaymentMethodProps {
  initialData: PaymentMethodValues;
  onSubmit: (data: PaymentMethodValues) => void;
  onBack: () => void;
}

// Payment method options
const PAYMENT_METHODS = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Pay securely with your card",
    icon: <CreditCard className="h-5 w-5" />,
    cardBrands: [
      { name: "visa", image: "/visa.svg" },
      { name: "mastercard", image: "/mastercard.svg" },
      { name: "amex", image: "/amex.svg" },
    ],
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    description: "Pay with UPI or mobile wallet",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Pay directly from your bank account",
    icon: <Landmark className="h-5 w-5" />,
  },
];

// Card brands for visual selection
const cardBrands = [
  {
    id: "visa",
    name: "Visa",
    image: "https://www.svgrepo.com/show/328121/visa.svg",
    color: "#1A1F71",
    textColor: "white",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    image: "https://www.svgrepo.com/show/328131/mastercard.svg",
    color: "#EB001B",
    textColor: "white",
  },
  {
    id: "amex",
    name: "American Express",
    image: "https://www.svgrepo.com/show/328156/american-express.svg",
    color: "#006FCF",
    textColor: "white",
  },
  {
    id: "discover",
    name: "Discover",
    image: "https://www.svgrepo.com/show/328160/discover.svg",
    color: "#FF6000",
    textColor: "white",
  },
];

// Format credit card number with spaces
const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

// Format card expiry date
const formatExpiryDate = (value: string) => {
  const cleanValue = value.replace(/[^\d]/g, "");
  if (cleanValue.length >= 3) {
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
  }
  return cleanValue;
};

export default function PaymentMethod({
  initialData,
  onSubmit,
  onBack,
}: PaymentMethodProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const form = useForm<PaymentMethodValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData,
  });

  const watchMethod = form.watch("method");

  // Handle form submission
  const handleSubmit = (data: PaymentMethodValues) => {
    // Only include card details if card method is selected
    if (data.method !== "card") {
      data.cardDetails = undefined;
    }
    onSubmit(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method.id} className="relative">
                        <motion.div
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors h-full
                            ${
                              field.value === method.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          onClick={() => {
                            field.onChange(method.id);
                            // Reset card selection when switching payment methods
                            if (method.id === "card" && !selectedCard) {
                              setSelectedCard("visa");
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                field.value === method.id
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {method.icon}
                            </div>
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-xs text-gray-500">
                                {method.description}
                              </div>
                            </div>
                          </div>

                          {method.id === "card" && method.cardBrands && (
                            <div className="mt-3 flex items-center space-x-2">
                              {cardBrands.map((brand) => (
                                <Image
                                  width={300}
                                  height={300}
                                  key={brand.id}
                                  src={brand.image}
                                  alt={brand.name}
                                  className="h-6"
                                />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {watchMethod === "card" && (
              <div className="mt-6 space-y-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  {cardBrands.map((card) => (
                    <motion.div
                      key={card.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer shadow-md
                        ${
                          selectedCard === card.id
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : ""
                        }
                      `}
                      onClick={() => setSelectedCard(card.id)}
                      style={{ backgroundColor: card.color }}
                    >
                      {/* Card Content */}
                      <div className="p-4 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="rounded-md bg-white bg-opacity-20 p-1">
                            <Image
                              width={300}
                              height={300}
                              src={card.image}
                              alt={card.name}
                              className="h-8 w-auto"
                            />
                          </div>
                          <div
                            className={`text-xs font-medium ${card.textColor}`}
                          >
                            {selectedCard === card.id ? "SELECTED" : ""}
                          </div>
                        </div>

                        <div>
                          <div
                            className={`text-lg font-medium mb-1 ${card.textColor}`}
                          >
                            •••• •••• •••• ••••
                          </div>
                          <div className="flex justify-between">
                            <div className={`text-xs ${card.textColor}`}>
                              CARDHOLDER NAME
                            </div>
                            <div className={`text-xs ${card.textColor}`}>
                              MM/YY
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="cardDetails.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            onChange={(e) => {
                              const formattedValue = formatCardNumber(
                                e.target.value
                              );
                              field.onChange(formattedValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardDetails.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardDetails.expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="MM/YY"
                              maxLength={5}
                              onChange={(e) => {
                                const formattedValue = formatExpiryDate(
                                  e.target.value
                                );
                                field.onChange(formattedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cardDetails.cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC/CVV</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="123"
                              maxLength={4}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="savePaymentMethod"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Save this card for future purchases
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchMethod === "wallet" && (
              <div className="mt-6 p-6 border border-gray-200 rounded-lg">
                <div className="text-center">
                  <p className="mb-4">
                    Digital wallet options will be shown at the next step.
                  </p>
                  <p className="text-sm text-gray-500">
                    We support UPI, Paytm, PhonePe, Google Pay, and more.
                  </p>
                </div>
              </div>
            )}

            {watchMethod === "bank" && (
              <div className="mt-6 p-6 border border-gray-200 rounded-lg">
                <div className="text-center">
                  <p className="mb-4">
                    Bank transfer details will be shown at the next step.
                  </p>
                  <p className="text-sm text-gray-500">
                    We support all major Indian banks for direct transfers.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Address
            </Button>

            <Button type="submit">Continue to Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
