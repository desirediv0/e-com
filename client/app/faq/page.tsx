"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Variants } from "framer-motion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "product" | "order" | "shipping" | "returns";
}

const faqs: FAQ[] = [
  // Product FAQs
  {
    id: "p1",
    question: "How do I know which supplements are right for me?",
    answer:
      "The right supplements depend on your individual health goals, dietary needs, and fitness regimen. For personalized recommendations, we suggest consulting with a healthcare professional or nutritionist. Additionally, our product pages include detailed information about who can benefit most from each supplement, and our customer support team is available to provide guidance based on your specific needs.",
    category: "product",
  },
  {
    id: "p2",
    question: "Are your supplements tested for quality and purity?",
    answer:
      "Yes, all VitaBoost supplements undergo rigorous testing for quality, purity, and potency. Our products are manufactured in GMP-certified facilities and are tested multiple times throughout the production process. We also work with independent third-party labs to verify product quality and ensure that what's on the label matches what's in the bottle.",
    category: "product",
  },
  {
    id: "p3",
    question: "Do your products contain any allergens?",
    answer:
      "Some of our products may contain allergens. We clearly list all ingredients and potential allergens on our product labels and website product pages. Common allergens in our products might include milk, soy, egg, nuts, and wheat. If you have specific allergies, please review the ingredient list carefully or contact our customer support team for more information.",
    category: "product",
  },
  {
    id: "p4",
    question: "What is the shelf life of your supplements?",
    answer:
      "The shelf life varies by product, but most of our supplements have a shelf life of 1-2 years from the manufacturing date when stored properly. Every product has an expiration date printed on the bottle or packaging. For optimal potency, we recommend storing supplements in a cool, dry place away from direct sunlight.",
    category: "product",
  },
  {
    id: "p5",
    question: "Are your supplements suitable for vegetarians or vegans?",
    answer:
      "We offer both vegetarian and vegan options in our product line. Products that are suitable for vegetarians or vegans are clearly labeled as such on the product page. Our plant-based protein powders, for example, are 100% vegan, while some other supplements may contain ingredients derived from animal sources. For specific information about a product's vegetarian or vegan status, please check the product description or contact our customer support.",
    category: "product",
  },

  // Order FAQs
  {
    id: "o1",
    question: "How do I place an order?",
    answer:
      "Placing an order on our website is simple. Browse our products, select the items you wish to purchase, and add them to your cart. When you're ready to checkout, click on the cart icon, review your items, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase. After submitting your order, you'll receive an order confirmation email with your order details.",
    category: "order",
  },
  {
    id: "o2",
    question: "Can I modify or cancel my order after it's been placed?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it, as long as it hasn't been processed for shipping. To do so, log into your account, go to 'My Orders,' and select the order you wish to modify or cancel. Alternatively, contact our customer support team immediately with your order number. Once an order has been processed or shipped, it cannot be modified or canceled.",
    category: "order",
  },
  {
    id: "o3",
    question: "Do you offer discounts for bulk orders?",
    answer:
      "Yes, we offer volume discounts for bulk orders. The discount amount varies based on the quantity ordered. For orders of 5-9 items, you receive a 5% discount; for 10-19 items, you receive a 10% discount; and for 20+ items, you receive a 15% discount. These discounts are automatically applied at checkout. For larger wholesale orders, please contact our sales team directly.",
    category: "order",
  },
  {
    id: "o4",
    question: "How can I track my order?",
    answer:
      "You can track your order through your account on our website. Simply log in, go to 'My Orders,' and click on the specific order you wish to track. You'll find the tracking number and a link to the courier's tracking page. Alternatively, you can use our 'Track Order' page by entering your order number and email address. Additionally, we send tracking information via email once your order has been shipped.",
    category: "order",
  },
  {
    id: "o5",
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including all major credit cards (Visa, MasterCard, American Express), debit cards, net banking, UPI, and popular digital wallets like PayTM and Google Pay. We also offer Cash on Delivery (COD) for select locations. All online payments are processed through secure payment gateways to ensure your financial information remains protected.",
    category: "order",
  },

  // Shipping FAQs
  {
    id: "s1",
    question: "What are your shipping rates?",
    answer:
      "Our shipping rates vary based on your location and the weight of your order. Standard shipping within metro cities costs ₹50 for orders under ₹999 and is free for orders ₹999 and above. Non-metro areas may incur additional charges. Express shipping options are available at an additional cost. International shipping rates vary by country. The exact shipping cost for your order will be calculated and displayed at checkout before payment.",
    category: "shipping",
  },
  {
    id: "s2",
    question: "How long will it take to receive my order?",
    answer:
      "Delivery times depend on your location and the shipping method selected. For standard shipping, orders to metro cities typically arrive within 2-4 business days, while orders to other locations may take 4-7 business days. Express shipping delivers within 1-2 business days to most locations. International orders typically take 7-14 business days, depending on the destination country and customs processing times. You can track your order status through your account or our tracking page.",
    category: "shipping",
  },
  {
    id: "s3",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to several countries worldwide. International shipping rates and delivery times vary by destination. Please note that international orders may be subject to customs duties, taxes, and import fees imposed by the destination country, which are the responsibility of the recipient. Before placing an order, you can check if we ship to your country by entering your address at checkout or contacting our customer support team.",
    category: "shipping",
  },
  {
    id: "s4",
    question: "What happens if my package is lost or damaged during shipping?",
    answer:
      "If your package is lost or arrives damaged, please contact our customer support team within 48 hours of the expected delivery date (for lost packages) or immediately upon receipt (for damaged packages). Provide your order number and details of the issue, including photos if the package is damaged. We'll work with the shipping carrier to locate lost packages or process a replacement for damaged items at no additional cost to you.",
    category: "shipping",
  },
  {
    id: "s5",
    question: "Can I change my shipping address after placing an order?",
    answer:
      "You can change your shipping address only if your order hasn't been processed for shipping yet. To request an address change, contact our customer support team immediately with your order number and the new shipping address. If your order has already been processed or shipped, we won't be able to change the delivery address. In such cases, you may need to wait for the package to be returned to us, after which we can reship it to the correct address (additional shipping charges may apply).",
    category: "shipping",
  },

  // Returns FAQs
  {
    id: "r1",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most products. If you're not completely satisfied with your purchase, you can return unopened products within 30 days of delivery for a full refund of the product price (excluding shipping charges). Opened products can be returned only if they're defective or damaged. To initiate a return, login to your account and go to 'My Orders' or contact our customer support team with your order number and reason for the return.",
    category: "returns",
  },
  {
    id: "r2",
    question: "How do I return a product?",
    answer:
      "To return a product, start by contacting our customer support team or initiating a return through your account. You'll receive a Return Merchandise Authorization (RMA) number and return instructions. Pack the product(s) securely in the original packaging if possible, include the RMA number, and ship it to the address provided. Once we receive and inspect the returned items, we'll process your refund. For defective products, we provide a prepaid return shipping label; for other returns, shipping costs are the customer's responsibility.",
    category: "returns",
  },
  {
    id: "r3",
    question: "How long does it take to process a refund?",
    answer:
      "After we receive and approve your return, refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution. Credit card refunds usually appear within 5-7 business days, while bank transfers may take 7-10 business days. For COD orders, refunds are processed via bank transfer and require your bank account details. You'll receive an email notification when your refund has been processed.",
    category: "returns",
  },
  {
    id: "r4",
    question: "Can I exchange a product instead of returning it?",
    answer:
      "Yes, we offer exchanges for products of equal or lesser value. If you prefer an exchange instead of a refund, indicate this when initiating your return. Once we receive your returned item, we'll ship the replacement product to you. If you wish to exchange for a product of higher value, you'll need to pay the price difference. For exchanges, we cover the shipping cost of sending the replacement item, but the customer is responsible for the return shipping of the original item (unless it was defective).",
    category: "returns",
  },
  {
    id: "r5",
    question: "Do you refund shipping charges for returned items?",
    answer:
      "Shipping charges are refunded only if the return is due to our error (e.g., we sent the wrong product or the product was defective upon arrival). For returns due to customer preference or other reasons not related to product quality issues, shipping charges are non-refundable. Additionally, the cost of return shipping is typically the customer's responsibility, except in cases where the product is being returned due to a defect or our error.",
    category: "returns",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>("product");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (searchQuery === "") return true;

    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  const getCategoryFaqs = (category: string) => {
    return filteredFaqs.filter((faq) => faq.category === category);
  };

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, ordering
            process, shipping policies, and returns.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </motion.div>

        <Tabs
          defaultValue="product"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 w-full sm:w-auto bg-transparent">
              <TabsTrigger
                value="product"
                className={`border border-gray-200 px-4 py-2 rounded-md ${
                  activeTab === "product"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className={`border border-gray-200 px-4 py-2 rounded-md ${
                  activeTab === "order" ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className={`border border-gray-200 px-4 py-2 rounded-md ${
                  activeTab === "shipping"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="returns"
                className={`border border-gray-200 px-4 py-2 rounded-md ${
                  activeTab === "returns"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                Returns
              </TabsTrigger>
            </TabsList>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <TabsContent value="product" className="mt-0">
              {getCategoryFaqs("product").length > 0 ? (
                getCategoryFaqs("product").map((faq) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isExpanded={expandedFaqs.includes(faq.id)}
                    toggleFaq={toggleFaq}
                    variants={itemVariants}
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <p className="text-gray-500">
                    No matching questions found. Try a different search term.
                  </p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="order" className="mt-0">
              {getCategoryFaqs("order").length > 0 ? (
                getCategoryFaqs("order").map((faq) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isExpanded={expandedFaqs.includes(faq.id)}
                    toggleFaq={toggleFaq}
                    variants={itemVariants}
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <p className="text-gray-500">
                    No matching questions found. Try a different search term.
                  </p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="shipping" className="mt-0">
              {getCategoryFaqs("shipping").length > 0 ? (
                getCategoryFaqs("shipping").map((faq) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isExpanded={expandedFaqs.includes(faq.id)}
                    toggleFaq={toggleFaq}
                    variants={itemVariants}
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <p className="text-gray-500">
                    No matching questions found. Try a different search term.
                  </p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="returns" className="mt-0">
              {getCategoryFaqs("returns").length > 0 ? (
                getCategoryFaqs("returns").map((faq) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isExpanded={expandedFaqs.includes(faq.id)}
                    toggleFaq={toggleFaq}
                    variants={itemVariants}
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <p className="text-gray-500">
                    No matching questions found. Try a different search term.
                  </p>
                </motion.div>
              )}
            </TabsContent>
          </motion.div>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 bg-blue-50 rounded-lg p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer to your question, our customer
            support team is ready to help you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Support
            </Button>
            <Button variant="outline">Email Us</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface FaqItemProps {
  faq: FAQ;
  isExpanded: boolean;
  toggleFaq: (id: string) => void;
  variants: Variants;
}

const FaqItem = ({ faq, isExpanded, toggleFaq, variants }: FaqItemProps) => {
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => toggleFaq(faq.id)}
        className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
        aria-expanded={isExpanded}
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <span className="flex-shrink-0 ml-2">
          {isExpanded ? (
            <Minus className="h-5 w-5 text-blue-600" />
          ) : (
            <Plus className="h-5 w-5 text-gray-500" />
          )}
        </span>
      </button>
      <div className={`px-6 pb-4 ${isExpanded ? "block" : "hidden"}`}>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </motion.div>
  );
};
