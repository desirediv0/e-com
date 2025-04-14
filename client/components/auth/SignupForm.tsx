"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Github, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
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

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to safely handle client-side only code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Watch the password value to calculate strength
  const password = form.watch("password");

  useEffect(() => {
    // Calculate password strength
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains number
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  }, [password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (!password) return "";
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setSignupError("");

    try {
      const success = await signup(data.name, data.email, data.password);
      if (success) {
        onSuccess();
      } else {
        setSignupError("Email already exists. Please try another one.");
      }
    } catch (error) {
      setSignupError("An error occurred during signup. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLoginVariants = {
    hover: {
      y: -3,
      transition: { duration: 0.2 },
    },
    tap: {
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  // Render a non-motion version during SSR and until client hydration completes
  const SocialButton = ({
    children,
    icon,
  }: {
    children: React.ReactNode;
    icon: React.ReactNode;
  }) => {
    if (!isMounted) {
      return (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded text-sm text-white/80 transition-colors"
        >
          {icon}
          <span>{children}</span>
        </button>
      );
    }

    return (
      <motion.button
        type="button"
        variants={socialLoginVariants}
        whileHover="hover"
        whileTap="tap"
        className="w-full flex items-center justify-center gap-2 p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded text-sm text-white/80 transition-colors"
      >
        {icon}
        <span>{children}</span>
      </motion.button>
    );
  };

  return (
    <div>
      {signupError && (
        <motion.div
          className="mb-6 p-3 bg-red-500/10 text-red-300 text-sm border border-red-500/30 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {signupError}
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                  FULL NAME
                </FormLabel>
                <FormControl>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={
                      isMounted ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }
                    }
                    transition={{ delay: 0.1 }}
                  >
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                  EMAIL ADDRESS
                </FormLabel>
                <FormControl>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={
                      isMounted ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }
                    }
                    transition={{ delay: 0.2 }}
                  >
                    <Input
                      placeholder="your.email@example.com"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white/70 tracking-wide">
                  PASSWORD
                </FormLabel>
                <FormControl>
                  <motion.div
                    className="relative"
                    initial={{ x: -10, opacity: 0 }}
                    animate={
                      isMounted ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }
                    }
                    transition={{ delay: 0.3 }}
                  >
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="●●●●●●●●"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs animate-[slideDown_0.2s_ease-in-out]" />

                {/* Password strength indicator */}
                {password && isMounted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-white/60">
                        Password strength
                      </div>
                      <div
                        className={`text-xs ${
                          passwordStrength <= 1
                            ? "text-red-400"
                            : passwordStrength <= 3
                            ? "text-yellow-400"
                            : "text-green-400"
                        } transition-colors duration-300`}
                      >
                        {getStrengthText()}
                      </div>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getStrengthColor()} transition-all duration-500`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-0.5 rounded-full ${
                            passwordStrength >= level
                              ? getStrengthColor()
                              : "bg-white/10"
                          } transition-colors duration-300`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </FormItem>
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4 }}
            className="pt-2"
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Create Account
                  <UserPlus className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-black/90 text-white/50">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <SocialButton icon={<Github className="h-4 w-4" />}>
            GitHub
          </SocialButton>

          <SocialButton icon={<Twitter className="h-4 w-4" />}>
            Twitter
          </SocialButton>
        </div>
      </div>
    </div>
  );
}
