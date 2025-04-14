"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "100% Pure Ingredients",
      description:
        "Our supplements are made with only the highest quality ingredients, free from fillers and unnecessary additives.",
    },
    {
      title: "Scientifically Formulated",
      description:
        "Developed by nutrition scientists and fitness experts to deliver maximum effectiveness.",
    },
    {
      title: "Rigorous Testing",
      description:
        "Every batch undergoes comprehensive testing for purity, potency, and contaminants.",
    },
    {
      title: "Transparent Labels",
      description:
        "We believe in full transparency about what goes into our products, with clear, honest labeling.",
    },
    {
      title: "Results Driven",
      description:
        "Our formulations are designed to deliver noticeable results when used consistently.",
    },
    {
      title: "Trusted by Professionals",
      description:
        "Used and recommended by fitness trainers, athletes, and healthcare professionals.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-900"
          >
            The VitaBoost Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600"
          >
            What sets our supplements apart is our unwavering commitment to
            quality, science-backed formulations, and your results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                <div className="mr-4">
                  <BadgeCheck className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-8 shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Our Quality Guarantee
              </h3>
              <p className="text-gray-600 mb-6">
                We stand by the quality of our products with a 100% satisfaction
                guarantee. If you're not completely satisfied with your
                purchase, we'll make it right.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    GMP certified manufacturing facilities
                  </span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Third-party tested for purity and potency
                  </span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    30-day money-back guarantee
                  </span>
                </li>
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors"
              >
                Learn More About Our Quality Standards{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-50 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-lg font-medium">
                  Satisfaction Guaranteed
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
