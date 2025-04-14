"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Clock, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Premium Quality",
      description:
        "We use only the highest quality ingredients, rigorously tested for purity and potency.",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Shipping",
      description:
        "Free delivery across India on orders over ₹2500. Most orders delivered within 2-3 business days.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timely Results",
      description:
        "Our scientifically formulated supplements are designed to deliver results when used consistently.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Expert Formulation",
      description:
        "Developed by nutrition scientists and fitness experts for maximum effectiveness.",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Why Choose Us
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We're committed to providing the highest quality supplements to help
            you achieve your health and fitness goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                10k+
              </p>
              <p className="text-gray-600 text-sm">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                50+
              </p>
              <p className="text-gray-600 text-sm">Premium Products</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                99%
              </p>
              <p className="text-gray-600 text-sm">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                24/7
              </p>
              <p className="text-gray-600 text-sm">Customer Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
