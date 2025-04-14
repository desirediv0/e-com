"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setSubscribed(true);
        setEmail("");
      }, 500);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-6">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Stay updated with our latest products, special offers, and
                expert fitness tips.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-4"
                >
                  <p className="font-medium">Thank you for subscribing!</p>
                  <p className="text-sm mt-1">
                    We've sent a confirmation email to your inbox.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-grow px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10"
                      required
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>

            <div className="bg-gray-100 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Benefits of Subscribing
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <span className="text-gray-600">
                    Exclusive discounts and promotions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <span className="text-gray-600">
                    Early access to new product launches
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <span className="text-gray-600">
                    Nutrition and workout tips from experts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <span className="text-gray-600">
                    Personalized supplement recommendations
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="ml-3 text-sm text-gray-600">
                  Join 10,000+ subscribers
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
