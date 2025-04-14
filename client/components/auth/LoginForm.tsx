"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Github, Twitter } from "lucide-react";
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

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSuccess, onForgotPassword }: LoginFormProps) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to safely handle client-side only code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const success = await login(data.email, data.password);
      if (success) {
        onSuccess();
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
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
      {loginError && (
        <motion.div
          className="mb-6 p-3 bg-red-500/10 text-red-300 text-sm border border-red-500/30 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loginError}
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    transition={{ delay: 0.1 }}
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
                    transition={{ delay: 0.2 }}
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
              </FormItem>
            )}
          />

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4 }}
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
                  Sign In
                  <LogIn className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
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
              Or continue with
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
