"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Package,
  CreditCard,
  LogOut,
  Save,
  Edit,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || "",
        country: user.address?.country || "",
      });
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");

    try {
      const updatedUser = {
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      };

      const success = await updateProfile(updatedUser);

      if (success) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute top-1/4 -right-40 w-80 h-80 bg-white/20 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/4 w-80 h-80 bg-white/20 rounded-full filter blur-3xl"
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

      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white tracking-wider flex items-center">
            <span>MY ACCOUNT</span>
            <motion.div
              className="h-0.5 w-12 bg-white ml-4"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </h1>
          <div className="flex items-center text-sm text-white/50 mt-2">
            <Link
              href="/"
              className="hover:text-white transition-colors relative group"
            >
              <span>Home</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <ChevronRight className="mx-2 h-3 w-3 text-white/30" />
            <span className="text-white">Profile</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:w-72 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-medium">{user?.name}</h2>
                    <p className="text-white/50 text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full p-3 flex items-center text-sm ${
                      activeTab === "profile"
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    } transition-colors`}
                  >
                    <User
                      className={`h-5 w-5 mr-3 ${
                        activeTab === "profile" ? "text-white" : "text-white/60"
                      }`}
                    />
                    <span>Profile Information</span>
                    {activeTab === "profile" && (
                      <ChevronRight className="ml-auto h-4 w-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full p-3 flex items-center text-sm ${
                      activeTab === "orders"
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    } transition-colors`}
                  >
                    <Package
                      className={`h-5 w-5 mr-3 ${
                        activeTab === "orders" ? "text-white" : "text-white/60"
                      }`}
                    />
                    <span>My Orders</span>
                    {activeTab === "orders" && (
                      <ChevronRight className="ml-auto h-4 w-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full p-3 flex items-center text-sm ${
                      activeTab === "payment"
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    } transition-colors`}
                  >
                    <CreditCard
                      className={`h-5 w-5 mr-3 ${
                        activeTab === "payment" ? "text-white" : "text-white/60"
                      }`}
                    />
                    <span>Payment Methods</span>
                    {activeTab === "payment" && (
                      <ChevronRight className="ml-auto h-4 w-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={logout}
                    className="w-full p-3 flex items-center text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3 text-white/60" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeTab === "profile" && (
              <motion.div
                className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
                    <User className="h-5 w-5 mr-2 text-white" />
                    <span>PERSONAL INFORMATION</span>
                  </h2>
                  {!isEditing ? (
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-white/10 hover:border-white text-white text-sm flex items-center bg-black/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="h-4 w-4 mr-2 text-white" />
                      <span>Edit</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-white/10 hover:border-white/30 text-white text-sm flex items-center bg-black/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Cancel</span>
                    </motion.button>
                  )}
                </div>

                {successMessage && (
                  <motion.div
                    className="m-6 p-4 bg-white/10 text-white text-sm border border-white/30 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    {successMessage}
                  </motion.div>
                )}

                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          FULL NAME
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          disabled={isSaving}
                          className={`w-full bg-black/30 border ${
                            !isEditing
                              ? "border-white/5 text-white/50"
                              : "border-white/10 focus:border-white focus:ring-white"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          EMAIL ADDRESS
                        </label>
                        <input
                          id="email"
                          name="email"
                          value={formData.email}
                          readOnly={true}
                          disabled={true}
                          className="w-full bg-black/30 border border-white/5 text-white/50 rounded-none px-4 py-3"
                        />
                        <p className="mt-1 text-xs text-white/40">
                          Email cannot be changed
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          PHONE NUMBER
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30" />
                          <input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            disabled={isSaving}
                            className={`w-full bg-black/30 border ${
                              !isEditing
                                ? "border-white/5 text-white/50"
                                : "border-white/10 focus:border-white focus:ring-white"
                            } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 pl-12`}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="col-span-1 md:col-span-2"
                      >
                        <div className="border-t border-white/10 pt-4 mb-4">
                          <h3 className="text-white flex items-center text-sm font-medium mb-4">
                            <MapPin className="h-4 w-4 mr-2 text-white" />
                            <span className="tracking-wide">
                              SHIPPING ADDRESS
                            </span>
                          </h3>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          STREET ADDRESS
                        </label>
                        <input
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          disabled={isSaving}
                          className={`w-full bg-black/30 border ${
                            !isEditing
                              ? "border-white/5 text-white/50"
                              : "border-white/10 focus:border-white focus:ring-white"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          CITY
                        </label>
                        <input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          disabled={isSaving}
                          className={`w-full bg-black/30 border ${
                            !isEditing
                              ? "border-white/5 text-white/50"
                              : "border-white/10 focus:border-white focus:ring-white"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          STATE/PROVINCE
                        </label>
                        <input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          disabled={isSaving}
                          className={`w-full bg-black/30 border ${
                            !isEditing
                              ? "border-white/5 text-white/50"
                              : "border-white/10 focus:border-white focus:ring-white"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          ZIP/POSTAL CODE
                        </label>
                        <input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          disabled={isSaving}
                          className={`w-full bg-black/30 border ${
                            !isEditing
                              ? "border-white/5 text-white/50"
                              : "border-white/10 focus:border-white focus:ring-white"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                        >
                          COUNTRY
                        </label>
                        <input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          disabled={isSaving}
                          className={`w-full bg-black/30 border ${
                            !isEditing
                              ? "border-white/5 text-white/50"
                              : "border-white/10 focus:border-white focus:ring-white"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                        />
                      </motion.div>

                      {isEditing && (
                        <motion.div
                          variants={itemVariants}
                          className="col-span-1 md:col-span-2 mt-4"
                        >
                          <motion.button
                            type="submit"
                            className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-white hover:bg-white/80 text-black transition-colors"
                            disabled={isSaving}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSaving ? (
                              <>
                                <motion.div
                                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                />
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                <span>Save Changes</span>
                              </>
                            )}
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
                    <Package className="h-5 w-5 mr-2 text-white" />
                    <span>MY ORDERS</span>
                  </h2>
                </div>

                <div className="p-10 text-center">
                  <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-white/30" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-white/60 mb-6">
                    You haven't placed any orders yet. Start shopping to see
                    your orders here.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-5 py-2 border border-white/10 hover:border-white bg-white/5 hover:bg-white/10 text-white text-sm transition-colors"
                  >
                    <span>Browse Products</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}

            {activeTab === "payment" && (
              <motion.div
                className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-white" />
                    <span>PAYMENT METHODS</span>
                  </h2>
                </div>

                <div className="p-10 text-center">
                  <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-white/30" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    No Payment Methods
                  </h3>
                  <p className="text-white/60 mb-6">
                    You haven't added any payment methods yet. Add a payment
                    method for faster checkout.
                  </p>
                  <button className="inline-flex items-center px-5 py-2 border border-white/10 hover:border-white bg-white/5 hover:bg-white/10 text-white text-sm transition-colors">
                    <span>Add Payment Method</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
