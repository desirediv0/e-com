import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    salePrice?: number;
    rating?: number;
    image: string;
    reviewCount?: number;
    variant?: string;
    discount?: number;
    flavors?: string[];
    sizes?: {
      name: string;
      price: number;
      salePrice?: number;
    }[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    price,
    salePrice,
    rating,
    reviewCount,
    variant,
    discount,
    flavors,
    sizes,
  } = product;

  const [selectedFlavor, setSelectedFlavor] = useState(
    flavors ? flavors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(
    sizes ? sizes[0].name : null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showQuickAddButton, setShowQuickAddButton] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showQuickAddSuccess, setShowQuickAddSuccess] = useState(false);

  // Calculate the current price based on selections
  const getCurrentPrice = () => {
    if (!sizes) {
      return { price, salePrice };
    }

    const size = sizes.find((s) => s.name === selectedSize);
    if (size) {
      return {
        price: size.price,
        salePrice: size.salePrice,
      };
    }

    return { price, salePrice };
  };

  const { price: currentPrice, salePrice: currentSalePrice } =
    getCurrentPrice();

  // Get product initials for placeholder
  const getProductInitials = () => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Get background color based on product name
  const getPlaceholderColor = () => {
    const colors = [
      "bg-mono-100 text-mono-900",
      "bg-mono-200 text-mono-900",
      "bg-mono-300 text-mono-800",
      "bg-mono-400 text-mono-800",
      "bg-mono-500 text-mono-900",
      "bg-mono-600 text-mono-100",
    ];

    // Use product id or name to get a consistent color
    const index = id ? id % colors.length : name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Quick add to cart functionality
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowQuickAddSuccess(true);

      // Reset success message after 2 seconds
      setTimeout(() => {
        setShowQuickAddSuccess(false);
      }, 2000);
    }, 800);
  };

  return (
    <motion.div
      className="group"
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      onHoverStart={() => {
        setIsHovered(true);
        setShowQuickAddButton(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        // Delay hiding the button slightly to make transition smoother
        setTimeout(() => setShowQuickAddButton(false), 300);
      }}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 group-hover:shadow-md relative">
        {/* Product Image */}
        <Link href={`/products/${id}`}>
          <div className="relative overflow-hidden aspect-square">
            {imageError ? (
              // Placeholder with product initials
              <motion.div
                className={`w-full h-full ${getPlaceholderColor()} transition-transform duration-500 flex items-center justify-center`}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl font-bold">
                  {getProductInitials()}
                </span>
              </motion.div>
            ) : (
              // Try to load image, fallback to placeholder on error
              <motion.div
                className="w-full h-full transition-transform duration-500"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`h-full w-full ${getPlaceholderColor()} flex items-center justify-center`}
                  onError={() => setImageError(true)}
                >
                  <span className="text-4xl font-bold">
                    {getProductInitials()}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Display discount badge if available */}
            {discount && (
              <div className="absolute top-2 left-2 bg-black text-white text-xs font-medium py-1 px-2 rounded">
                Save {discount}%
              </div>
            )}

            {/* Quick Add Button - Visible on hover */}
            <AnimatePresence>
              {showQuickAddButton && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {showQuickAddSuccess ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white text-black font-medium rounded-full px-4 py-2 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Added to Cart
                    </motion.div>
                  ) : (
                    <motion.button
                      className="bg-white text-black font-medium rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleQuickAdd}
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Quick Add"
                      )}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-3">
          <Link href={`/products/${id}`} className="block">
            <h3 className="text-sm md:text-base font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-black transition-colors">
              {name}
            </h3>
          </Link>

          {variant && <p className="text-xs text-gray-500 mb-2">{variant}</p>}

          {/* Rating */}
          {rating && (
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(rating) ? "text-black" : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviewCount && (
                <span className="text-xs text-gray-500 ml-1">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Flavor Selection */}
          {flavors && flavors.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1 mt-1">
                {flavors.map((flavor) => (
                  <button
                    key={flavor}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedFlavor === flavor
                        ? "bg-mono-200 text-mono-900 border border-mono-400"
                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedFlavor(flavor);
                    }}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizes && sizes.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1 mt-1">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedSize === size.name
                        ? "bg-mono-200 text-mono-900 border border-mono-400"
                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size.name);
                    }}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2">
            {currentSalePrice ? (
              <>
                <span className="font-medium text-black">
                  ₹{currentSalePrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{currentPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-medium">
                ₹{currentPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Always visible */}
        <div className="px-3 pb-3">
          <motion.button
            className="w-full bg-black text-white text-sm font-medium py-2 rounded hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              handleQuickAdd(e);
            }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
