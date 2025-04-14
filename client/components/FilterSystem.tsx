import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}

interface PriceRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatPrice?: (price: number) => string;
}

interface ColorOptionProps {
  color: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

interface TagProps {
  label: string;
  onRemove: () => void;
}

interface SearchSuggestionProps {
  suggestions: string[];
  query: string;
  onSelect: (suggestion: string) => void;
}

export const FilterGroup = ({
  title,
  children,
  defaultExpanded = true,
}: FilterGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full py-2 font-medium text-gray-900"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-2 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <Separator className="mt-1" />
    </div>
  );
};

export const CheckboxFilter = ({
  label,
  checked,
  onChange,
  count,
}: CheckboxFilterProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <motion.div
          className={`w-5 h-5 border rounded flex items-center justify-center ${
            checked ? "border-black bg-black" : "border-gray-300 bg-white"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence initial={false}>
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check size={14} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <span className="text-sm text-gray-700 group-hover:text-black">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-gray-500 ml-auto">{count}</span>
      )}
    </label>
  );
};

export const PriceRangeSlider = ({
  min,
  max,
  value,
  onChange,
  formatPrice = (price) => `₹${price}`,
}: PriceRangeProps) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  const handleChange = (index: 0 | 1, newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    const newLocalValue: [number, number] = [...localValue] as [number, number];
    newLocalValue[index] = clampedValue;

    // Ensure min <= max
    if (index === 0 && clampedValue > newLocalValue[1]) {
      newLocalValue[0] = newLocalValue[1];
    } else if (index === 1 && clampedValue < newLocalValue[0]) {
      newLocalValue[1] = newLocalValue[0];
    }

    setLocalValue(newLocalValue);
  };

  const calculateLeftStyle = () => {
    return `${((localValue[0] - min) / (max - min)) * 100}%`;
  };

  const calculateRightStyle = () => {
    return `${100 - ((localValue[1] - min) / (max - min)) * 100}%`;
  };

  useEffect(() => {
    // Update parent component when slider is released
    const handleMouseUp = () => {
      onChange(localValue);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [localValue, onChange]);

  return (
    <div className="mt-6 px-2">
      <div className="relative h-1 bg-gray-200 rounded-full mb-6">
        {/* Range highlight */}
        <div
          className="absolute h-full bg-black rounded-full"
          style={{
            left: calculateLeftStyle(),
            right: calculateRightStyle(),
          }}
        />

        {/* Min thumb */}
        <motion.div
          className="absolute w-5 h-5 -mt-2 -ml-2.5 bg-black border-2 border-white rounded-full shadow cursor-pointer"
          style={{ left: calculateLeftStyle() }}
          whileTap={{ scale: 1.2 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDrag={(_, info) => {
            const newValue =
              min + (info.point.x / window.innerWidth) * (max - min);
            handleChange(0, newValue);
          }}
        />

        {/* Max thumb */}
        <motion.div
          className="absolute w-5 h-5 -mt-2 -ml-2.5 bg-black border-2 border-white rounded-full shadow cursor-pointer"
          style={{ left: calculateRightStyle() }}
          whileTap={{ scale: 1.2 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDrag={(_, info) => {
            const newValue =
              min + (info.point.x / window.innerWidth) * (max - min);
            handleChange(1, newValue);
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">{formatPrice(localValue[0])}</div>
        <div className="text-sm font-medium">{formatPrice(localValue[1])}</div>
      </div>
    </div>
  );
};

export const ColorOption = ({
  color,
  label,
  selected,
  onClick,
}: ColorOptionProps) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center group">
      <motion.div
        className={`relative w-8 h-8 rounded-full border-2 ${
          selected ? "border-black" : "border-transparent"
        } p-0.5`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: color }}
        >
          <AnimatePresence>
            {selected && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Check
                  size={14}
                  className={`${
                    color === "#FFFFFF" || color === "#F9F9F9"
                      ? "text-black"
                      : "text-white"
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <span className="mt-1 text-xs text-gray-600 group-hover:text-black">
        {label}
      </span>
    </button>
  );
};

export const FilterTag = ({ label, onRemove }: TagProps) => {
  return (
    <motion.div
      className="inline-flex items-center px-2 py-1 mr-2 mb-2 text-sm bg-gray-100 rounded-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ backgroundColor: "#f3f4f6" }}
      transition={{ duration: 0.2 }}
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-1 p-0.5 rounded-full hover:bg-gray-200"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export const SearchSuggestions = ({
  suggestions,
  query,
  onSelect,
}: SearchSuggestionProps) => {
  if (!query || suggestions.length === 0) return null;

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-100 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <motion.li
            key={index}
            whileHover={{ backgroundColor: "#f9fafb" }}
            className="px-3 py-2 cursor-pointer text-sm"
            onClick={() => onSelect(suggestion)}
          >
            {highlightMatch(suggestion, query)}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  suggestions = [],
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  suggestions?: string[];
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(value);
              setShowSuggestions(false);
            }
          }}
          className="pr-10"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0"
          onClick={() => onSearch(value)}
        >
          <Search size={18} />
        </Button>
      </div>
      <AnimatePresence>
        {showSuggestions && (
          <SearchSuggestions
            suggestions={suggestions.filter((s) =>
              s.toLowerCase().includes(value.toLowerCase())
            )}
            query={value}
            onSelect={(suggestion) => {
              onChange(suggestion);
              onSearch(suggestion);
              setShowSuggestions(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
