"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Truck,
  Clock,
  Globe,
  MapPin,
  AlertTriangle,
  Package,
  HelpCircle,
} from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900">Shipping Policy</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Information about our shipping methods, delivery timeframes, and
            related policies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Truck className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Methods & Rates
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Standard Shipping
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    4-7 business days
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>₹50 for orders under ₹999</li>
                    <li>FREE for orders above ₹999</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Express Shipping
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    2-3 business days
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>₹150 for orders under ₹1999</li>
                    <li>₹100 for orders above ₹1999</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Premium Shipping
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Next day delivery*
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>₹300 flat rate</li>
                    <li>Available for select pincodes</li>
                  </ul>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  * Orders must be placed before 2 PM for next-day delivery
                  eligibility. Premium shipping may not be available in all
                  locations. You can check your pincode eligibility at checkout.
                </p>
                <p className="mt-4">
                  Shipping charges are calculated based on the order value,
                  shipping method selected, and delivery location. The exact
                  shipping cost will be displayed at checkout before payment.
                </p>
                <p className="mt-4">
                  Note: Shipping rates and delivery times are for domestic
                  deliveries within India only. For international shipping
                  rates, please refer to the International Shipping section
                  below.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">
                Delivery Timeframes
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Location Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Standard Shipping
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Express Shipping
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Premium Shipping
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Metro Cities
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      2-4 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      1-2 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Next day*
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Tier 2 Cities
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      3-5 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      2-3 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      1-2 business days*
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Tier 3 Cities & Rural Areas
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      5-7 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      3-5 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Not available
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Remote Areas
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      7-10 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      5-7 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Not available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              * Premium shipping is subject to availability for your pincode and
              is available only for orders placed before 2 PM.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Note: Business days are Monday through Friday, excluding public
              holidays. Orders placed after 2 PM will be processed the following
              business day. Delivery timeframes are estimates and may vary based
              on factors outside our control such as weather conditions, public
              holidays, or logistical challenges.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">
                International Shipping
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              We ship to select countries worldwide. International shipping
              rates and delivery times vary by destination:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Delivery Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Starting Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      South Asia (Nepal, Bangladesh, Sri Lanka)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      5-7 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹1,200</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Middle East
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      7-10 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹2,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Southeast Asia
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      7-12 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹2,500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Europe</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      10-14 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹3,500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      North America
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      10-14 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹3,500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Australia & New Zealand
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      12-16 business days
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹4,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Important notes about international shipping:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>
                  International shipping rates are calculated based on
                  destination country, package weight, and dimensions. The final
                  shipping cost will be displayed at checkout.
                </li>
                <li>
                  The recipient may be responsible for import duties, taxes, and
                  customs clearance fees imposed by the destination country.
                  These charges are not included in the shipping cost and are
                  collected by the delivery carrier or customs office.
                </li>
                <li>
                  International orders may be subject to customs inspection,
                  which can delay delivery.
                </li>
                <li>
                  Some products may have restrictions for international shipping
                  due to regulations in certain countries. In such cases, you
                  will be notified during checkout.
                </li>
                <li>
                  Tracking information is provided for all international
                  shipments, but tracking detail level may vary by destination
                  country.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Restrictions
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              There are certain locations or conditions under which our standard
              shipping policies may not apply:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Service Limitations
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Some remote locations may experience longer delivery times
                      than stated above. For such locations, our customer
                      service team will contact you if there are any issues with
                      delivery to your address.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Areas with limited service or additional charges:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mb-4">
              <li>
                Remote islands and northeastern states may have longer delivery
                times
              </li>
              <li>High-altitude regions with limited accessibility</li>
              <li>Areas with travel restrictions or security concerns</li>
              <li>Containment zones during public health emergencies</li>
            </ul>
            <p className="text-sm text-gray-600 mb-4">
              For these restricted areas, additional shipping charges may apply,
              or certain shipping methods may be unavailable. You will be
              notified during checkout if your delivery address falls under any
              such restrictions.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">
                Package Tracking & Delivery
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Order Tracking
                </h3>
                <p className="text-sm text-gray-600">
                  Once your order is shipped, you will receive a confirmation
                  email with a tracking number and link. You can also track your
                  order by logging into your account and visiting the "My
                  Orders" section, or by using the "Track Order" feature on our
                  website.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Delivery Confirmation
                </h3>
                <p className="text-sm text-gray-600">
                  Our delivery partners may require a signature upon delivery to
                  confirm receipt of the package. If no one is available to
                  receive the package, the delivery partner will leave a
                  delivery attempt notification and may attempt delivery again
                  on the next business day or hold the package at a nearby
                  collection point.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Change of Delivery Address
                </h3>
                <p className="text-sm text-gray-600">
                  If you need to change your delivery address after placing an
                  order, please contact our customer service team as soon as
                  possible. Address changes can only be accommodated if the
                  order has not yet been processed for shipping. Once an order
                  has been shipped, the delivery address cannot be modified.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Lost or Damaged Packages
                </h3>
                <p className="text-sm text-gray-600">
                  If your package is lost or damaged during transit, please
                  contact our customer service team within 48 hours of the
                  expected delivery date (for lost packages) or immediately upon
                  receipt (for damaged packages). We will work with the shipping
                  carrier to resolve the issue and arrange for replacement or
                  refund as appropriate.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-blue-50 rounded-lg p-6 mb-8"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">Need Help?</h3>
              <div className="mt-2 text-blue-700">
                <p>
                  If you have any questions about our shipping policy or need
                  assistance with a specific order, please contact our customer
                  support team:
                </p>
                <ul className="mt-3 space-y-1">
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:shipping@vitaboost.com"
                      className="underline"
                    >
                      shipping@vitaboost.com
                    </a>
                  </li>
                  <li>Phone: +91 1800-123-4567 (Mon-Sat, 9 AM - 6 PM IST)</li>
                  <li>
                    <Link href="/contact" className="underline">
                      Contact Form
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-sm text-gray-500 text-center"
        >
          <p>
            This shipping policy was last updated on June 1, 2023. Shipping
            policies are subject to change.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/terms" className="text-blue-600 hover:text-blue-800">
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:text-blue-800"
            >
              Privacy Policy
            </Link>
            <Link href="/returns" className="text-blue-600 hover:text-blue-800">
              Returns Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
