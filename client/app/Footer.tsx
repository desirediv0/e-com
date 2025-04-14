"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
  Mail,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Protein", href: "/products/proteins" },
        { name: "Performance", href: "/products/performance" },
        { name: "Vitamins", href: "/products/vitamins" },
        { name: "Weight Management", href: "/products/weight" },
        { name: "Wellness", href: "/products/wellness" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partnerships", href: "/partnerships" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping & Returns", href: "/shipping" },
        { name: "Track Order", href: "/track-order" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold text-black">
                PURI<span className="text-red-500">N</span>
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Premium quality supplements designed to help you achieve your
              fitness and wellness goals with scientifically formulated
              products.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Bar */}
        <div className="py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-gray-900 mb-1">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 text-sm">
              Get the latest updates, offers and fitness tips
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none flex-grow min-w-0 w-full md:w-64"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors flex items-center">
              Subscribe <Mail className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PURIN. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/terms"
              className="text-gray-600 text-sm hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 text-sm hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 text-sm hover:text-black transition-colors"
            >
              Cookie Policy
            </Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
