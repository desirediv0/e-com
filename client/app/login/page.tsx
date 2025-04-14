"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  // Handle form validation
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (validateForm()) {
      setIsLoading(true);

      try {
        const success = await login(email, password);

        if (success) {
          router.push("/"); // Redirect to home page after successful login
        } else {
          setLoginError("Invalid email or password");
        }
      } catch (error) {
        setLoginError("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl"
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

      <motion.div
        className="max-w-md w-full bg-black/50 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden shadow-[0_0_25px_rgba(0,0,255,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleX: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="px-6 py-10 sm:p-10">
          <motion.div
            className="text-center mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <h1 className="text-2xl font-bold text-white tracking-wider flex items-center justify-center">
                <LogIn className="h-5 w-5 mr-2 text-blue-500" />
                SIGN IN
              </h1>
              <motion.div
                className="h-0.5 w-12 bg-blue-600 mx-auto mt-2"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-2 text-white/60 text-sm"
            >
              Access your account to continue
            </motion.p>
          </motion.div>

          {loginError && (
            <motion.div
              className="mb-6 p-3 bg-blue-900/30 text-blue-300 text-sm border border-blue-500/30 rounded-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loginError}
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-5">
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                >
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-black/30 border ${
                      errors.email
                        ? "border-blue-500 focus:ring-blue-500"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500"
                    } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-blue-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-black/30 border ${
                      errors.password
                        ? "border-blue-500 focus:ring-blue-500"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500"
                    } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 pr-12`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-blue-400">
                    {errors.password}
                  </p>
                )}
                <div className="mt-2 text-right">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-white/50 hover:text-white transition-colors tracking-wide"
                  >
                    FORGOT PASSWORD?
                  </Link>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 transition-colors relative group overflow-hidden mt-8"
                disabled={isLoading}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Sign in to your account"
              >
                <span className="relative z-10 font-medium tracking-wide flex items-center justify-center">
                  {isLoading ? "SIGNING IN..." : "SIGN IN"}
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:scale-105 transition-transform duration-300"></span>
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            className="mt-10 text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-white/60">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-white hover:text-blue-400 transition-colors relative group"
              >
                <span>Sign up</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </p>
          </motion.div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white transition-colors flex items-center group"
          >
            <motion.span
              className="mr-1"
              initial={{ x: 0 }}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="h-3 w-3 transform rotate-180" />
            </motion.span>
            <span className="relative">
              RETURN TO HOME
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <Link
            href="/help"
            className="text-xs text-white/40 hover:text-white transition-colors relative group"
          >
            <span>NEED HELP?</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
