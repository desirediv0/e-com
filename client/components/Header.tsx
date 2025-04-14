"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";

// Dynamically import components with hydration issues and disable SSR
const ShoppingCart = dynamic(() => import("./ShoppingCart"), { ssr: false });
const AuthModal = dynamic(
  () => import("./AuthModal").then((mod) => mod.AuthModal),
  { ssr: false }
);

const Header = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Use our custom navigation hook
  const {
    isScrolled,
    isMenuOpen,
    activeSubmenu,
    isSearchOpen,
    isSearchExpanded,
    searchQuery,
    headerRef,
    searchInputRef,
    setSearchQuery,
    toggleMenu,
    toggleSubmenu,
    toggleSearch,
    handleSearch,
  } = useNavigation({
    scrollThreshold: 10,
  });

  // Handle client-side only features
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const navigationItems = [
    {
      name: "PROTEINS",
      href: "/proteins",
      submenu: [
        {
          title: "WHEY PROTEIN",
          items: [
            { name: "ISOLATE PROTEIN", href: "/proteins/isolate" },
            { name: "CONCENTRATE PROTEIN", href: "/proteins/concentrate" },
            { name: "HYDROLYZED PROTEIN", href: "/proteins/hydrolyzed" },
          ],
        },
        {
          title: "PLANT PROTEIN",
          items: [
            { name: "PEA PROTEIN", href: "/proteins/pea" },
            { name: "SOY PROTEIN", href: "/proteins/soy" },
            { name: "HEMP PROTEIN", href: "/proteins/hemp" },
          ],
        },
        {
          title: "PROTEIN SETS",
          items: [
            { name: "STARTER PACKS", href: "/proteins/starter-packs" },
            { name: "BULK SAVINGS", href: "/proteins/bulk-savings" },
          ],
        },
      ],
    },
    {
      name: "VITAMINS",
      href: "/vitamins",
      submenu: [
        {
          title: "MULTIVITAMINS",
          items: [
            { name: "DAILY MULTIVITAMINS", href: "/vitamins/daily" },
            { name: "WOMEN'S HEALTH", href: "/vitamins/women" },
            { name: "MEN'S HEALTH", href: "/vitamins/men" },
          ],
        },
        {
          title: "SINGLE VITAMINS",
          items: [
            { name: "VITAMIN D", href: "/vitamins/d" },
            { name: "VITAMIN C", href: "/vitamins/c" },
            { name: "VITAMIN B COMPLEX", href: "/vitamins/b" },
          ],
        },
      ],
    },
    {
      name: "PERFORMANCE",
      href: "/performance",
      submenu: [
        {
          title: "WORKOUT SUPPORT",
          items: [
            { name: "PRE-WORKOUT", href: "/performance/pre-workout" },
            { name: "CREATINE", href: "/performance/creatine" },
            { name: "BCAA", href: "/performance/bcaa" },
          ],
        },
        {
          title: "RECOVERY",
          items: [
            { name: "POST-WORKOUT", href: "/performance/post-workout" },
            { name: "JOINT SUPPORT", href: "/performance/joint-support" },
            { name: "SLEEP SUPPORT", href: "/performance/sleep-support" },
          ],
        },
      ],
    },
    {
      name: "WEIGHT MANAGEMENT",
      href: "/weight",
      submenu: [
        {
          title: "WEIGHT LOSS",
          items: [
            { name: "FAT BURNERS", href: "/weight/fat-burners" },
            { name: "METABOLISM BOOSTERS", href: "/weight/metabolism" },
            { name: "APPETITE CONTROL", href: "/weight/appetite-control" },
          ],
        },
        {
          title: "WEIGHT GAIN",
          items: [
            { name: "MASS GAINERS", href: "/weight/mass-gainers" },
            { name: "CALORIE BOOSTERS", href: "/weight/calorie-boosters" },
          ],
        },
      ],
    },
    {
      name: "WELLNESS",
      href: "/wellness",
      submenu: [
        {
          title: "DAILY WELLNESS",
          items: [
            { name: "OMEGA-3", href: "/wellness/omega" },
            { name: "PROBIOTICS", href: "/wellness/probiotics" },
            { name: "IMMUNITY", href: "/wellness/immunity" },
          ],
        },
        {
          title: "SPECIALIZED HEALTH",
          items: [
            { name: "DIGESTIVE HEALTH", href: "/wellness/digestive" },
            { name: "BRAIN HEALTH", href: "/wellness/brain" },
            { name: "HEART HEALTH", href: "/wellness/heart" },
          ],
        },
      ],
    },
    {
      name: "STACKS",
      href: "/stacks",
      submenu: [
        {
          title: "GOAL STACKS",
          items: [
            { name: "MUSCLE BUILDING", href: "/stacks/muscle" },
            { name: "WEIGHT LOSS", href: "/stacks/weight-loss" },
            { name: "ENDURANCE", href: "/stacks/endurance" },
            { name: "OVERALL HEALTH", href: "/stacks/health" },
          ],
        },
      ],
    },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Top Bar - only visible when not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-200/30 py-1.5 text-gray-100 text-xs relative overflow-hidden"
          >
            <motion.div
              className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
              animate={{
                x: ["100%", "-100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "linear",
              }}
            />
            <div className="container px-4 mx-auto flex justify-between">
              <div className="flex items-center space-x-6">
                <p>Free shipping on orders over ₹1000</p>
                <span className="text-gray-400">|</span>
                <p>30-day money-back guarantee</p>
              </div>
              <div className="flex items-center space-x-6">
                <Link
                  href="/track-order"
                  className="hover:text-red-400 transition-colors duration-200"
                >
                  Track Order
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/faq"
                  className="hover:text-red-400 transition-colors duration-200"
                >
                  Help
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <div className="container px-4 mx-auto">
        <nav className="flex items-center justify-between">
          {/* Mobile Menu Toggle with animation */}
          <motion.div className="lg:hidden" whileTap={{ scale: 0.9 }}>
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className={`text-${
                isScrolled ? "gray-700" : "white"
              } hover:text-red-500 transition-colors p-2 rounded-full`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Logo */}
          <Link href="/" className="mr-8">
            <motion.img
              src={isScrolled ? "/images/logo.svg" : "/images/logo-white.svg"}
              alt="NutriPulse Logo"
              className="h-8 md:h-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`text-${
                    isScrolled ? "gray-700" : "white"
                  } group-hover:text-red-500 font-medium text-sm py-2 flex items-center transition-colors duration-200`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>

                {/* Mega Menu */}
                {item.submenu && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 pt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 ease-in-out z-40">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 shadow-xl rounded-lg min-w-[650px] grid grid-cols-3 gap-6 border border-gray-100"
                    >
                      {item.submenu.map((submenuItem) => (
                        <div key={submenuItem.title} className="space-y-3">
                          <h4 className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-2">
                            {submenuItem.title}
                          </h4>
                          <ul className="space-y-2.5">
                            {submenuItem.items.map((subItem) => (
                              <motion.li
                                key={subItem.name}
                                whileHover={{ x: 5 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 17,
                                }}
                              >
                                <Link
                                  href={subItem.href}
                                  className="block text-gray-600 hover:text-red-500 text-xs py-1 transition-colors duration-200 flex items-center"
                                >
                                  <span className="w-0 h-0.5 bg-red-500 mr-0 transition-all duration-300 group-hover:w-2 group-hover:mr-1.5"></span>
                                  {subItem.name}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Navigation - Search, Account, Cart */}
          <div className="flex items-center space-x-4">
            {/* Animated Search */}
            <div className="relative">
              <motion.div
                initial={false}
                animate={{ width: isSearchExpanded ? "200px" : "40px" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`flex items-center ${
                  isSearchExpanded
                    ? "bg-white/10 backdrop-blur-md rounded-full border border-gray-200/30"
                    : ""
                }`}
              >
                <button
                  onClick={toggleSearch}
                  aria-label="Search"
                  className={`text-${
                    isScrolled ? "gray-700" : "white"
                  } hover:text-red-500 transition-colors p-2 rounded-full overflow-hidden flex items-center justify-center`}
                >
                  <Search className="h-5 w-5 flex-shrink-0" />
                </button>
                {isSearchExpanded && (
                  <motion.form
                    onSubmit={handleSearch}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm px-2 py-1 focus:outline-none"
                    />
                  </motion.form>
                )}
              </motion.div>
            </div>

            {/* Account - Only render auth components when client-side mounted */}
            {hasMounted && (
              <>
                {isAuthenticated ? (
                  <div className="relative group">
                    <button
                      className={`flex items-center text-${
                        isScrolled ? "gray-700" : "white"
                      } hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-gray-100/10`}
                    >
                      <User className="h-5 w-5" />
                    </button>
                    <div className="absolute right-0 mt-2 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-50">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-3 shadow-xl rounded-lg min-w-[200px] border border-gray-100"
                      >
                        <div className="px-2 py-1.5 mb-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <ul className="space-y-1">
                          <motion.li whileHover={{ x: 3 }}>
                            <Link
                              href="/profile"
                              className="block text-gray-600 hover:text-red-500 text-sm py-1.5 px-2 rounded hover:bg-gray-50 transition-colors duration-200"
                            >
                              My Profile
                            </Link>
                          </motion.li>
                          <motion.li whileHover={{ x: 3 }}>
                            <Link
                              href="/my-orders"
                              className="block text-gray-600 hover:text-red-500 text-sm py-1.5 px-2 rounded hover:bg-gray-50 transition-colors duration-200"
                            >
                              My Orders
                            </Link>
                          </motion.li>
                          <motion.li whileHover={{ x: 3 }}>
                            <Link
                              href="/wishlist"
                              className="block text-gray-600 hover:text-red-500 text-sm py-1.5 px-2 rounded hover:bg-gray-50 transition-colors duration-200"
                            >
                              Wishlist
                            </Link>
                          </motion.li>
                          <motion.li whileHover={{ x: 3 }}>
                            <button
                              onClick={logout}
                              className="w-full text-left text-gray-600 hover:text-red-500 text-sm py-1.5 px-2 rounded hover:bg-gray-50 transition-colors duration-200"
                            >
                              Sign Out
                            </button>
                          </motion.li>
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block">
                    <AuthModal
                      trigger={
                        <button
                          className={`text-${
                            isScrolled ? "gray-700" : "white"
                          } hover:text-red-500 text-sm font-medium transition-colors flex items-center space-x-1`}
                        >
                          <User className="h-4 w-4" />
                          <span>Sign In</span>
                        </button>
                      }
                    />
                  </div>
                )}
              </>
            )}

            {/* Shopping Cart - Render only on client side */}
            {hasMounted && <ShoppingCart scrollState={isScrolled} />}
          </div>
        </nav>
      </div>

      {/* Mobile Menu with slide animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/" onClick={toggleMenu}>
                  <Image
                    width={100}
                    height={100}
                    src="/images/logo.svg"
                    alt="NutriPulse Logo"
                    className="h-8"
                  />
                </Link>
                <button
                  className="p-2 text-gray-700 hover:text-red-500 transition-colors rounded-full"
                  onClick={toggleMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 space-y-1 flex-1 overflow-y-auto">
                <div className="mb-4">
                  <form
                    onSubmit={handleSearch}
                    className="flex bg-gray-100 rounded-full overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent py-2 px-4 text-sm w-full focus:outline-none"
                    />
                    <button type="submit" className="px-4 text-gray-500">
                      <Search className="h-4 w-4" />
                    </button>
                  </form>
                </div>

                <ul className="space-y-1 pb-6">
                  {navigationItems.map((item) => (
                    <motion.li
                      key={item.name}
                      className="border-b border-gray-100"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between py-3">
                        <Link
                          href={item.href}
                          className="text-gray-800 font-medium"
                          onClick={() => {
                            if (!item.submenu) toggleMenu();
                          }}
                        >
                          {item.name}
                        </Link>
                        {item.submenu && (
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-expanded={activeSubmenu === item.name}
                          >
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                activeSubmenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Submenu with animation */}
                      <AnimatePresence>
                        {item.submenu && activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mb-3 space-y-4"
                          >
                            {item.submenu.map((submenuItem) => (
                              <div
                                key={submenuItem.title}
                                className="space-y-1"
                              >
                                <h4 className="text-gray-600 font-medium text-sm">
                                  {submenuItem.title}
                                </h4>
                                <ul className="space-y-1 ml-2">
                                  {submenuItem.items.map((subItem) => (
                                    <motion.li
                                      key={subItem.name}
                                      whileHover={{ x: 2 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <Link
                                        href={subItem.href}
                                        className="text-gray-500 hover:text-red-500 text-sm block py-1.5"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-t border-gray-200 p-4 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-gray-600 hover:text-red-500 text-sm py-2"
                      onClick={toggleMenu}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/my-orders"
                      className="block text-gray-600 hover:text-red-500 text-sm py-2"
                      onClick={toggleMenu}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="w-full text-left text-gray-600 hover:text-red-500 text-sm py-2"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <AuthModal
                    defaultTab="login"
                    trigger={
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => toggleMenu()}
                      >
                        Sign In / Register
                      </Button>
                    }
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Full-screen Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-lg z-50 pt-16"
          >
            <div className="container mx-auto px-4 pt-8">
              <div className="flex justify-end mb-4">
                <button
                  className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                  onClick={() => toggleSearch()}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                <div className="flex items-center border-b-2 border-gray-300 pb-2">
                  <Search className="h-5 w-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-black text-xl placeholder:text-gray-400 focus:outline-none"
                    ref={searchInputRef}
                    autoFocus
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-sm text-gray-500 mb-2">
                    Popular Searches:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Whey Protein",
                      "Creatine",
                      "Pre-Workout",
                      "BCAA",
                      "Mass Gainer",
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          searchInputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
