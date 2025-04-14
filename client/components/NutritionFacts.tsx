"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface NutrientInfo {
  name: string;
  amount: string;
  dailyValue?: string;
  subNutrients?: {
    name: string;
    amount: string;
    dailyValue?: string;
  }[];
}

interface NutritionFactsProps {
  servingSize: string;
  calories: number;
  nutrients: NutrientInfo[];
}

const NutritionFacts = ({
  servingSize,
  calories,
  nutrients,
}: NutritionFactsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    collapsed: { height: "180px" },
    expanded: { height: "auto" },
  };

  const chevronVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 },
  };

  const overlayVariants = {
    collapsed: { opacity: 1 },
    expanded: { opacity: 0 },
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold">Nutrition Facts</h3>
        <div className="text-sm text-gray-500 mt-1">
          Per {servingSize} serving
        </div>
      </div>

      <div className="relative">
        <motion.div
          className="overflow-hidden"
          variants={containerVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            {/* Calories */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="text-lg font-bold">Calories</div>
              <div className="text-lg">{calories}</div>
            </div>

            {/* Daily value percentage note */}
            <div className="text-xs text-right text-gray-500 mt-2 mb-4">
              % Daily Value*
            </div>

            {/* Nutrients */}
            {nutrients.map((nutrient, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <div className="font-medium">{nutrient.name}</div>
                  <div className="flex items-center">
                    <span className="mr-4">{nutrient.amount}</span>
                    {nutrient.dailyValue && (
                      <span className="text-gray-700 font-medium w-10 text-right">
                        {nutrient.dailyValue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub-nutrients */}
                {nutrient.subNutrients?.map((subNutrient, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex justify-between items-center py-1 pl-4 text-sm text-gray-600"
                  >
                    <div>{subNutrient.name}</div>
                    <div className="flex items-center">
                      <span className="mr-4">{subNutrient.amount}</span>
                      {subNutrient.dailyValue && (
                        <span className="text-gray-600 w-10 text-right">
                          {subNutrient.dailyValue}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Footnote */}
            <div className="mt-4 text-xs text-gray-500">
              * Percent Daily Values are based on a 2,000 calorie diet. Your
              daily values may be higher or lower depending on your calorie
              needs.
            </div>
          </div>
        </motion.div>

        {/* Gradient overlay when collapsed */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"
              variants={overlayVariants}
              initial="collapsed"
              animate="collapsed"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <motion.button
        className="w-full p-3 flex items-center justify-center text-sm font-medium text-gray-700 border-t border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{isExpanded ? "Show Less" : "Show More"}</span>
        <motion.div
          className="ml-2"
          variants={chevronVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default NutritionFacts;
