"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const QuantitySelector = ({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);

  // Validate the initial value
  useEffect(() => {
    const validValue = Math.max(min, Math.min(max, initialValue));
    if (validValue !== quantity) {
      setQuantity(validValue);
    }
  }, [initialValue, min, max]);

  // Notify parent component when quantity changes
  useEffect(() => {
    onChange?.(quantity);
  }, [quantity, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      setQuantity(min);
    } else {
      setQuantity(Math.max(min, Math.min(max, newValue)));
    }
  };

  const increment = () => {
    if (quantity < max) {
      setIsIncreasing(true);
      setQuantity((prevQuantity) => prevQuantity + 1);
      setTimeout(() => setIsIncreasing(false), 300);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      setIsDecreasing(true);
      setQuantity((prevQuantity) => prevQuantity - 1);
      setTimeout(() => setIsDecreasing(false), 300);
    }
  };

  return (
    <div className="inline-flex items-center rounded-md border border-gray-300 overflow-hidden">
      <motion.button
        className={`px-3 py-2 bg-gray-50 ${
          quantity <= min ? "text-gray-400" : "text-black"
        }`}
        onClick={decrement}
        whileHover={quantity > min ? { backgroundColor: "#f3f4f6" } : {}}
        whileTap={quantity > min ? { scale: 0.95 } : {}}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
      </motion.button>

      <div className="relative w-12 h-10">
        <motion.div
          className="h-full flex items-center justify-center absolute inset-0"
          animate={{
            y: isIncreasing ? [0, -20, 0] : isDecreasing ? [0, 20, 0] : 0,
            opacity: isIncreasing || isDecreasing ? [1, 0, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="number"
            min={min}
            max={max}
            value={quantity}
            onChange={handleInputChange}
            className="w-full h-full border-0 text-center focus:outline-none focus:ring-0 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
        </motion.div>
      </div>

      <motion.button
        className={`px-3 py-2 bg-gray-50 ${
          quantity >= max ? "text-gray-400" : "text-black"
        }`}
        onClick={increment}
        whileHover={quantity < max ? { backgroundColor: "#f3f4f6" } : {}}
        whileTap={quantity < max ? { scale: 0.95 } : {}}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
