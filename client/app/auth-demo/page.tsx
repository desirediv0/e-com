"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { motion } from "framer-motion";
import "./styles.css";

export default function AuthDemoPage() {
  const [selectedTab, setSelectedTab] = useState<
    "login" | "signup" | "recovery"
  >("login");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black auth-demo-gradient">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Authentication Flow Demo
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience smooth, animated authentication flows with form
              validation, social login options, and password recovery
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Modal Authentication
              </h2>
              <p className="text-slate-400 mb-6">
                The modal authentication provides a seamless experience without
                navigating away from the current page.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-white text-sm font-medium mb-2">
                    Open with different tabs:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => {
                        setSelectedTab("login");
                        setIsOpen(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 button-hover-effect"
                    >
                      Login Modal
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedTab("signup");
                        setIsOpen(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 button-hover-effect"
                    >
                      Signup Modal
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedTab("recovery");
                        setIsOpen(true);
                      }}
                      className="bg-amber-600 hover:bg-amber-500 button-hover-effect"
                    >
                      Password Recovery
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-sm font-medium mb-2">
                    Or with custom triggers:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <AuthModal
                      defaultTab="login"
                      trigger={
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-500 button-hover-effect">
                          Custom Trigger
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Description list */}
              <div className="mt-8 text-sm">
                <h3 className="text-white font-medium mb-2">Features:</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Modal-based authentication that keeps the user on the
                    current page
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Smooth transitions between login, signup, and password
                    recovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Real-time form validation with animated feedback
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Social login options with hover effects
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Password Recovery Flow
                </h2>
                <p className="text-slate-400 mb-6">
                  Multi-step password recovery process with clear progress
                  indicators.
                </p>
                <Button
                  onClick={() => {
                    setSelectedTab("recovery");
                    setIsOpen(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-500 w-full button-hover-effect"
                >
                  Try Password Recovery
                </Button>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Password Strength Meter
                </h2>
                <p className="text-slate-400 mb-6">
                  Intuitive password strength indicator with color transitions.
                </p>
                <Button
                  onClick={() => {
                    setSelectedTab("signup");
                    setIsOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 w-full button-hover-effect"
                >
                  Check on Signup Form
                </Button>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Social Login Options
                </h2>
                <p className="text-slate-400 mb-6">
                  Quick authentication via popular social platforms with hover
                  effects.
                </p>
                <Button
                  onClick={() => {
                    setSelectedTab("login");
                    setIsOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 w-full button-hover-effect"
                >
                  See Social Options
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Credits */}
          <div className="mt-16 text-center text-slate-500 text-sm">
            <p>
              Built with Next.js, Tailwind CSS, Framer Motion, and React Hook
              Form
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controlled modal */}
      <AuthModal
        defaultTab={selectedTab}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
