"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { PasswordRecoveryForm } from "@/components/auth/PasswordRecoveryForm";
import { X } from "lucide-react";

interface AuthModalProps {
  defaultTab?: "login" | "signup" | "recovery";
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AuthModal({
  defaultTab = "login",
  trigger,
  open,
  onOpenChange,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "recovery">(
    defaultTab
  );
  const [controlledOpen, setControlledOpen] = useState(false);

  // Update activeTab when defaultTab changes from props
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : controlledOpen;
  const setIsOpen = isControlled ? onOpenChange : setControlledOpen;

  // Switch to recovery mode
  const handleForgotPassword = () => {
    setActiveTab("recovery");
  };

  // Switch back to login from recovery
  const handleBackToLogin = () => {
    setActiveTab("login");
  };

  // Prevent excessive re-renders by memoizing UI content based on activeTab
  const renderContent = () => {
    if (activeTab !== "recovery") {
      return (
        <motion.div
          key="tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
            className="w-full"
          >
            <div className="mb-8 text-center">
              <motion.div
                className="inline-block"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold tracking-wider text-white">
                  {activeTab === "login" ? "WELCOME BACK" : "JOIN US"}
                </h2>
                <motion.div
                  className="h-0.5 w-12 bg-blue-600 mx-auto mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.div>
            </div>

            <TabsList className="flex w-full mb-6">
              <TabsTrigger
                value="login"
                className="flex-1 py-3 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none bg-transparent text-white/70 hover:text-white"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 py-3 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none bg-transparent text-white/70 hover:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0 p-0">
              <LoginForm
                onSuccess={() => setIsOpen(false)}
                onForgotPassword={handleForgotPassword}
              />
            </TabsContent>

            <TabsContent value="signup" className="mt-0 p-0">
              <SignupForm onSuccess={() => setIsOpen(false)} />
            </TabsContent>
          </Tabs>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="recovery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="p-6"
      >
        <div className="mb-8 text-center">
          <motion.div
            className="inline-block"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold tracking-wider text-white">
              RECOVER PASSWORD
            </h2>
            <motion.div
              className="h-0.5 w-12 bg-blue-600 mx-auto mt-2"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.div>
        </div>
        <PasswordRecoveryForm
          onBackToLogin={handleBackToLogin}
          onSuccess={() => setIsOpen(false)}
        />
      </motion.div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border border-white/10 bg-black/90 backdrop-blur-lg text-white shadow-[0_0_25px_rgba(0,0,255,0.1)]">
        <div className="absolute right-4 top-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {renderContent()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
