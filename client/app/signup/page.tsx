"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const { signup } = useAuth();
  const router = useRouter();

  // Handle form validation
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate only the current step fields
  const validateStep = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (currentStep === 1) {
      // Name validation
      if (!name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }

      // Email validation
      if (!email) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid";
        isValid = false;
      }
    } else if (currentStep === 2) {
      // Password validation
      if (!password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }

      // Confirm password validation
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (validateForm()) {
      setIsLoading(true);

      try {
        const success = await signup(name, email, password);

        if (success) {
          router.push("/"); // Redirect to home page after successful signup
        } else {
          setSignupError("An account with this email already exists.");
        }
      } catch (error) {
        setSignupError(
          "An error occurred during registration. Please try again."
        );
        console.error("Signup error:", error);
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

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Red glow effect */}
      <motion.div
        className="absolute top-1/3 -right-40 w-80 h-80 bg-red-600/20 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/4 w-80 h-80 bg-red-600/20 rounded-full filter blur-3xl"
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
        className="max-w-md w-full bg-black/50 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden shadow-[0_0_25px_rgba(255,0,0,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent"
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
            className="text-center mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <h1 className="text-2xl font-bold text-white tracking-wider flex items-center justify-center">
                <UserPlus className="h-5 w-5 mr-2 text-red-500" />
                CREATE ACCOUNT
              </h1>
              <motion.div
                className="h-0.5 w-12 bg-red-600 mx-auto mt-2"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-2 text-white/60 text-sm"
            >
              Join PURIN for exclusive offers and faster checkout
            </motion.p>
          </motion.div>

          {/* Progress steps */}
          <div className="mb-8 flex justify-center">
            {[...Array(totalSteps)].map((_, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <motion.div
                  className={`h-2 w-2 rounded-full ${
                    index + 1 === currentStep
                      ? "bg-red-600"
                      : index + 1 < currentStep
                      ? "bg-white/70"
                      : "bg-white/20"
                  }`}
                  animate={{
                    scale: index + 1 === currentStep ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    repeat: index + 1 === currentStep ? Infinity : 0,
                    duration: 1.5,
                  }}
                />
                {index < totalSteps - 1 && (
                  <div
                    className={`h-[1px] w-10 ${
                      index + 1 < currentStep ? "bg-white/70" : "bg-white/20"
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {signupError && (
            <motion.div
              className="mb-6 p-3 bg-red-900/30 text-red-300 text-sm border border-red-500/30 rounded-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {signupError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative overflow-hidden">
              <motion.div
                key={`step-${currentStep}`}
                custom={currentStep}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {currentStep === 1 && (
                  <>
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                      >
                        FULL NAME
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full bg-black/30 border ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500"
                              : "border-white/10 focus:border-red-500 focus:ring-red-500"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                          placeholder="Your full name"
                          disabled={isLoading}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </motion.div>

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
                              ? "border-red-500 focus:ring-red-500"
                              : "border-white/10 focus:border-red-500 focus:ring-red-500"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1`}
                          placeholder="your@email.com"
                          disabled={isLoading}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 transition-colors relative group overflow-hidden mt-8"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 font-medium tracking-wide flex items-center justify-center">
                        CONTINUE
                        <motion.span
                          className="ml-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:scale-105 transition-transform duration-300"></span>
                    </motion.button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
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
                              ? "border-red-500 focus:ring-red-500"
                              : "border-white/10 focus:border-red-500 focus:ring-red-500"
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
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.password}
                        </p>
                      )}
                      <div className="mt-2">
                        <div className="text-xs text-white/40">
                          Password must be at least 6 characters
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-white/70 mb-1.5 tracking-wide"
                      >
                        CONFIRM PASSWORD
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full bg-black/30 border ${
                            errors.confirmPassword
                              ? "border-red-500 focus:ring-red-500"
                              : "border-white/10 focus:border-red-500 focus:ring-red-500"
                          } rounded-none px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 pr-12`}
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                        <motion.button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </motion.button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </motion.div>

                    <div className="flex mt-8 gap-4">
                      <motion.button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-1 border border-white/10 hover:border-white/30 text-white py-3 px-4 transition-colors relative group overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 font-medium tracking-wide flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                          BACK
                        </span>
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 transition-colors relative group overflow-hidden"
                        disabled={isLoading}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 font-medium tracking-wide flex items-center justify-center">
                          {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:scale-105 transition-transform duration-300"></span>
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </form>

          <motion.div
            className="mt-10 text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-white/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white hover:text-red-400 transition-colors relative group"
              >
                <span>Sign in</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
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
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <Link
            href="/help"
            className="text-xs text-white/40 hover:text-white transition-colors relative group"
          >
            <span>NEED HELP?</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
