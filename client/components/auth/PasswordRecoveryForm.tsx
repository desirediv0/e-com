"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowLeft, KeyRound, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema for email step
const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

// Schema for verification code step
const verificationSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Verification code must be 6 characters" })
    .max(6, { message: "Verification code must be 6 characters" }),
});

// Schema for new password step
const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type VerificationFormValues = z.infer<typeof verificationSchema>;
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

interface PasswordRecoveryFormProps {
  onBackToLogin: () => void;
  onSuccess: () => void;
}

type RecoveryStep = "email" | "verification" | "new-password" | "success";

export function PasswordRecoveryForm({
  onBackToLogin,
}: PasswordRecoveryFormProps) {
  const [currentStep, setCurrentStep] = useState<RecoveryStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  // Email step form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Verification step form
  const verificationForm = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  // New password step form
  const newPasswordForm = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handle email step submission
  const onSubmitEmail = async (data: EmailFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes we'll just proceed to the next step
      setEmail(data.email);
      setCurrentStep("verification");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Password recovery error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification step submission
  const onSubmitVerification = async (data: VerificationFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes we'll just proceed if code is "123456"
      if (data.code === "123456") {
        setCurrentStep("new-password");
      } else {
        setError("Invalid verification code. Try 123456 for demo.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new password step submission
  const onSubmitNewPassword = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes we'll just proceed to success
      setCurrentStep("success");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
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
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
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
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex justify-center space-x-2 mb-8">
        {["email", "verification", "new-password", "success"].map(
          (step, index) => {
            const isCompleted =
              (step === "email" && currentStep !== "email") ||
              (step === "verification" &&
                (currentStep === "new-password" ||
                  currentStep === "success")) ||
              (step === "new-password" && currentStep === "success");

            const isActive = step === currentStep;

            return (
              <div key={step} className="flex items-center">
                {index > 0 && (
                  <div
                    className={`h-0.5 w-4 mx-1 ${
                      isCompleted ? "bg-blue-500" : "bg-white/20"
                    }`}
                  />
                )}
                <motion.div
                  className={`flex items-center justify-center h-6 w-6 rounded-full text-xs ${
                    isCompleted
                      ? "bg-blue-500 text-white"
                      : isActive
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500"
                      : "bg-white/10 text-white/50"
                  } transition-colors duration-300`}
                  initial={false}
                  animate={
                    isCompleted
                      ? { scale: [1, 1.2], backgroundColor: "#3b82f6" }
                      : isActive
                      ? { scale: 1, backgroundColor: "rgba(59, 130, 246, 0.2)" }
                      : {
                          scale: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }
                  }
                  transition={{
                    duration: 0.3,
                    scale: {
                      repeat: isCompleted ? Infinity : 0,
                      repeatType: "reverse",
                      duration: 0.6,
                    },
                  }}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                </motion.div>
              </div>
            );
          }
        )}
      </div>

      {error && (
        <motion.div
          className="p-3 bg-red-500/10 text-red-300 text-sm border border-red-500/30 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === "email" && (
          <motion.div
            key="email-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                          EMAIL ADDRESS
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30 pl-10"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      "Send Recovery Link"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onBackToLogin}
                    className="w-full text-white/70 hover:text-white py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        )}

        {currentStep === "verification" && (
          <motion.div
            key="verification-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm text-white/70 mb-4"
            >
              We've sent a 6-digit verification code to{" "}
              <span className="text-blue-400">{email}</span>
            </motion.p>

            <Form {...verificationForm}>
              <form
                onSubmit={verificationForm.handleSubmit(onSubmitVerification)}
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                          VERIFICATION CODE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123456"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30 text-center tracking-widest"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    onClick={() => {
                      // Simulate resending code
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                      }, 1500);
                    }}
                  >
                    <RefreshCw className="h-3 w-3" />
                    Resend code
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCurrentStep("email")}
                    className="w-full text-white/70 hover:text-white py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        )}

        {currentStep === "new-password" && (
          <motion.div
            key="new-password-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form {...newPasswordForm}>
              <form
                onSubmit={newPasswordForm.handleSubmit(onSubmitNewPassword)}
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <FormField
                    control={newPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                          NEW PASSWORD
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="●●●●●●●●"
                              {...field}
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30 pl-10"
                            />
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={newPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                          CONFIRM PASSWORD
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="●●●●●●●●"
                              {...field}
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30 pl-10"
                            />
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCurrentStep("verification")}
                    className="w-full text-white/70 hover:text-white py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        )}

        {currentStep === "success" && (
          <motion.div
            key="success-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center py-6"
          >
            <motion.div
              className="mx-auto h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Check className="h-8 w-8 text-green-500" />
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-xl font-semibold text-white mb-2"
            >
              Password Reset Complete
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-white/70 text-sm mb-6"
            >
              Your password has been successfully reset. You can now log in with
              your new password.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-3">
              <Button
                onClick={onBackToLogin}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition-all duration-200"
              >
                Back to Login
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
