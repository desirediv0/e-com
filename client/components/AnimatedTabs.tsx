"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

const AnimatedTabs = ({ tabs, defaultTabId }: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 relative font-medium text-sm transition-colors duration-200 whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="tab-indicator"
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="py-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {tab.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
