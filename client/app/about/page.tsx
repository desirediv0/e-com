"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Award,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Rajiv Sharma",
      role: "Founder & CEO",
      image: "/images/team/team-1.jpg",
      bio: "Dr. Sharma holds a Ph.D. in Nutrition Sciences and has over 15 years of experience in the supplement industry.",
    },
    {
      name: "Dr. Priya Patel",
      role: "Chief Scientific Officer",
      image: "/images/team/team-2.jpg",
      bio: "With a background in biochemistry, Dr. Patel leads our research and development team, ensuring all products meet the highest standards.",
    },
    {
      name: "Vikram Malhotra",
      role: "Chief Marketing Officer",
      image: "/images/team/team-3.jpg",
      bio: "Vikram brings 10+ years of digital marketing expertise, having previously worked with leading wellness brands across Asia.",
    },
    {
      name: "Ananya Singh",
      role: "Head of Product Development",
      image: "/images/team/team-4.jpg",
      bio: "Ananya's extensive knowledge in formulation chemistry has been instrumental in creating our innovative product line.",
    },
  ];

  const values = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-black" />,
      title: "Quality",
      description:
        "We source only the highest quality ingredients and test every batch for purity and potency.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-black" />,
      title: "Sustainability",
      description:
        "Our commitment to the environment drives every decision, from ingredient sourcing to packaging.",
    },
    {
      icon: <FlaskConical className="h-8 w-8 text-black" />,
      title: "Innovation",
      description:
        "We continuously research and develop new formulations based on the latest scientific discoveries.",
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-black" />,
      title: "Transparency",
      description:
        "We believe in complete transparency about our ingredients, processes, and business practices.",
    },
    {
      icon: <Award className="h-8 w-8 text-black" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from customer service to product quality.",
    },
  ];

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
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About VitaBoost
          </motion.h1>
          <motion.div
            className="w-20 h-1 bg-black mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Founded in 2015, VitaBoost has been on a mission to provide premium
            quality supplements that help people achieve their health and
            fitness goals.
          </motion.p>
        </div>

        {/* Our Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-100 h-64 md:h-auto">
                <div className="h-full flex items-center justify-center">
                  <div className="text-4xl font-bold text-black p-8 text-center">
                    Our Story
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-4">
                  From Lab to Lifestyle
                </h2>
                <p className="text-gray-600 mb-4">
                  VitaBoost began with a simple idea: create supplements that
                  truly deliver on their promises. Our founder, Dr. Rajiv
                  Sharma, was frustrated with the inconsistent quality and
                  effectiveness of products available in the market.
                </p>
                <p className="text-gray-600 mb-4">
                  After years of research and development, we launched our first
                  product line in 2015. Since then, we've grown to become one of
                  India's most trusted supplement brands, helping thousands of
                  people achieve their health and fitness goals.
                </p>
                <p className="text-gray-600">
                  Today, our team of nutritionists, biochemists, and fitness
                  experts work together to create scientifically-formulated
                  supplements using the highest quality ingredients.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              To empower individuals on their health journey by providing
              premium, science-backed supplements that enhance wellbeing,
              physical performance, and quality of life.
            </p>
            <div className="flex justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-md hover:bg-gray-800 focus:outline-none"
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="text-xl font-bold ml-3">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-black text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="bg-gray-100 rounded-lg p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Our Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="h-16 flex items-center justify-center">
                <span className="font-bold text-gray-800">GMP Certified</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="h-16 flex items-center justify-center">
                <span className="font-bold text-gray-800">ISO 9001:2015</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="h-16 flex items-center justify-center">
                <span className="font-bold text-gray-800">FSSAI Approved</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="h-16 flex items-center justify-center">
                <span className="font-bold text-gray-800">HACCP Certified</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
