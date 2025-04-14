"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would send the form data to your backend here
      console.log("Form submitted:", formData);

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        "There was a problem submitting your message. Please try again."
      );
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="py-10 bg-black text-white relative min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Red glow effect */}
      <motion.div
        className="absolute top-1/4 -left-40 w-80 h-80 bg-red-600/20 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-40 w-80 h-80 bg-red-600/20 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contact Us
          </h1>
          <motion.div
            className="w-20 h-1 bg-red-600 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            We're here to help and answer any questions you might have. We look
            forward to hearing from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {/* Contact Form */}
          <motion.div
            className="col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.1)] p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Send Us a Message
              </h2>

              {submitSuccess && (
                <motion.div
                  className="bg-green-900/30 border border-green-500/30 text-green-400 px-4 py-3 rounded-sm mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  className="bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p>{submitError}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div variants={itemVariants}>
                    <label
                      className="block text-white/70 font-medium mb-2 text-sm tracking-wide"
                      htmlFor="name"
                    >
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-black/30 border ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/10 focus:border-red-500 focus:ring-red-500"
                      } focus:outline-none focus:ring-1 rounded-none text-white placeholder-white/30`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      className="block text-white/70 font-medium mb-2 text-sm tracking-wide"
                      htmlFor="email"
                    >
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-black/30 border ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/10 focus:border-red-500 focus:ring-red-500"
                      } focus:outline-none focus:ring-1 rounded-none text-white placeholder-white/30`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </motion.div>
                </div>

                <motion.div className="mb-6" variants={itemVariants}>
                  <label
                    className="block text-white/70 font-medium mb-2 text-sm tracking-wide"
                    htmlFor="subject"
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/30 border ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 focus:border-red-500 focus:ring-red-500"
                    } focus:outline-none focus:ring-1 rounded-none text-white placeholder-white/30`}
                    placeholder="Product Inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </motion.div>

                <motion.div className="mb-6" variants={itemVariants}>
                  <label
                    className="block text-white/70 font-medium mb-2 text-sm tracking-wide"
                    htmlFor="message"
                  >
                    YOUR MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/30 border ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 focus:border-red-500 focus:ring-red-500"
                    } focus:outline-none focus:ring-1 h-32 resize-none rounded-none text-white placeholder-white/30`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition-colors bg-red-600 hover:bg-red-700 rounded-none relative group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> SEND MESSAGE
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:scale-105 transition-transform duration-300"></span>
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.1)] p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Contact Information
              </h2>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <MapPin className="h-6 w-6 text-red-500 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Our Office</h3>
                    <address className="not-italic text-white/70">
                      PURIN Headquarters
                      <br />
                      123 Health Avenue, Wellness District
                      <br />
                      Mumbai, Maharashtra 400001
                      <br />
                      India
                    </address>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <Phone className="h-6 w-6 text-red-500 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Phone</h3>
                    <p className="text-white/70">+91 123 456 7890</p>
                    <p className="text-white/70">+91 987 654 3210</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <Mail className="h-6 w-6 text-red-500 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <p className="text-white/70">info@purin.com</p>
                    <p className="text-white/70">support@purin.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <Clock className="h-6 w-6 text-red-500 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Working Hours</h3>
                    <p className="text-white/70">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-white/70">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-white/70">Sunday: Closed</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="font-bold text-white mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 text-white/80 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 text-white/80 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 text-white/80 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 text-white/80 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.1)] p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Find Us On Map
            </h2>
            <div className="h-96 bg-black/30 border border-white/10 rounded-sm flex items-center justify-center">
              <p className="text-white/50 text-center px-4">
                Map placeholder - In a real application, embed your Google Maps
                or other map service here.
                <br />
                <span className="text-sm text-white/30">
                  For security reasons, the actual embed code is not included in
                  this demo.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question:
                  "How quickly will I receive a response to my inquiry?",
                answer:
                  "We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our customer service line.",
              },
              {
                question: "Can I visit your office in person?",
                answer:
                  "Yes, you're welcome to visit our office during working hours. We recommend scheduling an appointment to ensure that our team can assist you properly.",
              },
              {
                question: "Do you offer international shipping?",
                answer:
                  "Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location. Please check our shipping policy for more details.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the courier's website.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-sm shadow-[0_0_15px_rgba(255,0,0,0.05)] p-6 hover:border-red-500/30 transition-colors duration-300"
                variants={itemVariants}
              >
                <h3 className="text-lg font-bold mb-2 text-white">
                  {faq.question}
                </h3>
                <p className="text-white/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
