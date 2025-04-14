"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Check,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import QuantitySelector from "@/components/QuantitySelector";
import AnimatedTabs from "@/components/AnimatedTabs";
import NutritionFacts from "@/components/NutritionFacts";
import ProductCard from "@/components/ProductCard";
import {
  getProductById,
  getRelatedProducts,
  NutrientInfo,
} from "@/data/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id as string);
  const relatedProducts = getRelatedProducts(id as string);

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<number | null>(
    product?.flavors &&
      product.flavors.length > 0 &&
      product.flavors[0].isAvailable
      ? product.flavors[0].id
      : null
  );
  const [selectedSize, setSelectedSize] = useState<number | null>(
    product?.sizes && product.sizes.length > 0 && product.sizes[0].stock > 0
      ? product.sizes[0].id
      : null
  );
  const [currentPrice, setCurrentPrice] = useState<{
    price: number;
    salePrice?: number;
  }>({
    price: product?.price || 0,
    salePrice: product?.salePrice,
  });
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [customNotes, setCustomNotes] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [premiumPackaging, setPremiumPackaging] = useState(false);

  const infoSectionRef = useRef<HTMLDivElement>(null);
  const relatedSectionRef = useRef<HTMLDivElement>(null);

  // Define addons
  const availableAddons = [
    { id: 1, name: "Creatine", price: 199, available: true },
    { id: 2, name: "BCAA", price: 149, available: true },
    { id: 3, name: "Glutamine", price: 99, available: true },
    { id: 4, name: "Digestive Enzymes", price: 79, available: true },
  ];

  // Toggle addon selection
  const toggleAddon = (addonId: number) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Calculate total addon price
  const calculateAddonPrice = () => {
    return selectedAddons.reduce((total, addonId) => {
      const addon = availableAddons.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const basePrice = (currentPrice.salePrice || currentPrice.price) * quantity;
    const addonPrice = calculateAddonPrice();
    const packagingPrice = premiumPackaging ? 99 : 0;

    return basePrice + addonPrice + packagingPrice;
  };

  // Calculate current price based on selections
  useEffect(() => {
    if (!product) return;

    let newPrice = { price: product.price, salePrice: product.salePrice };

    // Update price based on selected size
    if (selectedSize && product.sizes) {
      const size = product.sizes.find((s) => s.id === selectedSize);
      if (size) {
        newPrice = {
          price: size.price,
          salePrice:
            size.price !== size.originalPrice ? size.originalPrice : undefined,
        };
      }
    }

    setCurrentPrice(newPrice);
  }, [product, selectedSize]);

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!infoSectionRef.current) return;

      const infoSection = infoSectionRef.current;
      const infoRect = infoSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Make the info section sticky when there's enough space
      if (infoRect.height < windowHeight - 100) {
        infoSection.style.position = "sticky";
        infoSection.style.top = "100px";
      } else {
        infoSection.style.position = "relative";
        infoSection.style.top = "0";
      }
    };

    // Run once on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;

    // Get selected flavor and size information
    const flavorInfo = selectedFlavor
      ? product.flavors.find((f) => f.id === selectedFlavor)?.name
      : undefined;

    const sizeInfo = selectedSize
      ? product.sizes.find((s) => s.id === selectedSize)?.name
      : undefined;

    // Get selected addons
    const addonInfo = selectedAddons.map((addonId) => {
      const addon = availableAddons.find((a) => a.id === addonId);
      return {
        id: addon?.id,
        name: addon?.name,
        price: addon?.price,
      };
    });

    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice.salePrice || currentPrice.price,
      originalPrice: currentPrice.price,
      image: product.images[0].src,
      quantity,
      flavor: flavorInfo,
      size: sizeInfo,
      addons: addonInfo,
      premiumPackaging,
      notes: customNotes,
      totalPrice: calculateTotalPrice(),
    };

    console.log("Adding to cart:", cartItem);

    setIsAddingToCart(true);

    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      setAddedToCart(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }, 800);
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/products">
            <Button variant="outline">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const discountPercentage = currentPrice.salePrice
    ? Math.round(
        ((currentPrice.price - currentPrice.salePrice) / currentPrice.price) *
          100
      )
    : 0;

  // Create tabs content
  const tabsContent = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            {product.description}
          </p>

          {product.features && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "ingredients",
      label: "Ingredients",
      content: (
        <div>
          {product.ingredients ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No ingredients information available.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "nutrition",
      label: "Nutrition Facts",
      content: (
        <div>
          {product.nutritionFacts ? (
            "nutrients" in product.nutritionFacts ? (
              <NutritionFacts
                servingSize={product.nutritionFacts.servingSize}
                calories={product.nutritionFacts.calories}
                nutrients={product.nutritionFacts.nutrients as NutrientInfo[]}
              />
            ) : (
              <div className="prose max-w-none">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Nutrition Facts</h3>
                  <p className="text-sm mb-2">
                    Serving Size: {product.nutritionFacts.servingSize}
                  </p>
                  <div className="border-t border-b border-gray-200 py-2 mb-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Calories</span>
                      <span>{product.nutritionFacts.calories}</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 py-2 mb-2">
                    <div className="flex justify-between">
                      <span>Total Fat</span>
                      <span>{product.nutritionFacts.fat}g</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 py-2 mb-2">
                    <div className="flex justify-between">
                      <span>Total Carbohydrates</span>
                      <span>{product.nutritionFacts.carbs}g</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 py-2 mb-2">
                    <div className="flex justify-between">
                      <span>Sugar</span>
                      <span>{product.nutritionFacts.sugar}g</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 py-2 mb-2">
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span>{product.nutritionFacts.protein}g</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No nutrition information available.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "reviews",
      label: `Reviews (${product.reviewCount})`,
      content: (
        <div>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{review.title}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    By {review.userName} on{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gray-700">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product Details - Top Section */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Product Gallery */}
          <motion.div
            className="lg:w-3/5"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <ProductGallery
              images={product.images.map((image) => image.src)}
              alt={product.name}
            />
          </motion.div>

          {/* Product Information Panel */}
          <motion.div
            className="lg:w-2/5"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            ref={infoSectionRef}
          >
            {/* Product Title & Reviews */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* SKU */}
              <div className="text-sm text-gray-500">SKU: {product.sku}</div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end">
                {currentPrice.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-black">
                      {formatPrice(currentPrice.salePrice)}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      {formatPrice(currentPrice.price)}
                    </span>
                    <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      Save {discountPercentage}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-black">
                    {formatPrice(currentPrice.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6 flex items-center">
              {product.inStock ? (
                <>
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Flavors */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flavor
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor.id}
                      className={`px-3 py-2 rounded-md text-sm ${
                        flavor.isAvailable
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      } ${
                        flavor.id === selectedFlavor ? "ring-2 ring-black" : ""
                      }`}
                      disabled={!flavor.isAvailable}
                      onClick={() => setSelectedFlavor(flavor.id)}
                    >
                      {flavor.name}
                      {!flavor.isAvailable && " (Out of Stock)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`px-3 py-2 rounded-md text-sm ${
                        size.stock > 0
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      } ${size.id === selectedSize ? "ring-2 ring-black" : ""}`}
                      disabled={size.stock <= 0}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      {size.name}
                      {size.price !== product.price && (
                        <span className="block text-xs text-gray-500">
                          ₹{size.price.toLocaleString()}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex">
                <QuantitySelector
                  initialValue={1}
                  min={1}
                  max={10}
                  onChange={(value) => setQuantity(value)}
                />
              </div>
            </div>

            {/* Custom Options Toggle */}
            <button
              className="flex items-center text-black mb-6 hover:underline text-sm"
              onClick={() => setShowCustomOptions(!showCustomOptions)}
            >
              <motion.div
                className="mr-1"
                animate={{ rotate: showCustomOptions ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={16} />
              </motion.div>
              {showCustomOptions ? "Hide" : "Show"} Advanced Customization
            </button>

            {/* Advanced Customization Options */}
            {showCustomOptions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-4 border border-gray-200 rounded-md mb-4">
                  <h3 className="font-medium text-base mb-4">
                    Advanced Customization
                  </h3>

                  {/* Custom Mix-ins */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Supplements (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableAddons.map((addon) => (
                        <label
                          key={addon.id}
                          className="flex items-center space-x-2 bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            className="rounded text-black focus:ring-black"
                            checked={selectedAddons.includes(addon.id)}
                            onChange={() => toggleAddon(addon.id)}
                          />
                          <span className="text-sm">
                            {addon.name} (+₹{addon.price})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Premium Packaging */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-yellow-100 p-3 rounded cursor-pointer hover:from-amber-100 hover:to-yellow-200 border border-yellow-200">
                      <input
                        type="checkbox"
                        className="rounded text-amber-500 focus:ring-amber-500"
                        checked={premiumPackaging}
                        onChange={() => setPremiumPackaging(!premiumPackaging)}
                      />
                      <div>
                        <span className="text-sm font-medium">
                          Premium Gift Packaging (+₹99)
                        </span>
                        <p className="text-xs text-gray-600 mt-1">
                          Includes premium box, measuring scoop, and
                          personalized note
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Any special requirements for your order..."
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Selected Options Summary */}
            {(selectedFlavor || selectedSize) && (
              <div className="mb-6 bg-gray-50 p-4 rounded-md text-sm">
                <h3 className="font-medium text-gray-700 mb-2">
                  Selected Options:
                </h3>
                <div className="space-y-1">
                  {selectedFlavor && (
                    <div className="flex">
                      <span className="text-gray-500 w-20">Flavor:</span>
                      <span className="font-medium">
                        {
                          product.flavors.find((f) => f.id === selectedFlavor)
                            ?.name
                        }
                      </span>
                    </div>
                  )}
                  {selectedSize && (
                    <div className="flex">
                      <span className="text-gray-500 w-20">Size:</span>
                      <span className="font-medium">
                        {product.sizes.find((s) => s.id === selectedSize)?.name}
                      </span>
                    </div>
                  )}
                  <div className="flex">
                    <span className="text-gray-500 w-20">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex">
                      <span className="text-gray-500 w-20">Add-ons:</span>
                      <span className="font-medium">
                        {selectedAddons
                          .map(
                            (addonId) =>
                              availableAddons.find((a) => a.id === addonId)
                                ?.name
                          )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  {premiumPackaging && (
                    <div className="flex">
                      <span className="text-gray-500 w-20">Packaging:</span>
                      <span className="font-medium">Premium Gift Box</span>
                    </div>
                  )}
                  <div className="flex font-medium text-black mt-2 pt-2 border-t border-gray-200">
                    <span className="text-gray-500 w-20">Subtotal:</span>
                    <span>{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <motion.button
                  className="flex-1 bg-black text-white py-3 px-4 rounded-md font-medium flex items-center justify-center disabled:bg-gray-400"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || addedToCart || !product.inStock}
                  whileHover={product.inStock ? { scale: 1.02 } : {}}
                  whileTap={product.inStock ? { scale: 0.98 } : {}}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <motion.div
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Adding...
                    </div>
                  ) : addedToCart ? (
                    <motion.div
                      className="flex items-center"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart
                    </motion.div>
                  ) : (
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </div>
                  )}
                </motion.button>

                <motion.button
                  className={`p-3 rounded-md border ${
                    isWishlisted
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500"
                  }`}
                  onClick={toggleWishlist}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={isWishlisted ? "fill-red-500" : ""} />
                </motion.button>

                <motion.button
                  className="p-3 rounded-md border border-gray-300 text-gray-500 hover:text-blue-500 hover:border-blue-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 />
                </motion.button>
              </div>
            </div>

            {/* Short Description */}
            <div className="mb-6 text-gray-700">
              <p>{product.description.substring(0, 150)}...</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Link
                      href={`/products?tags=${tag}`}
                      key={index}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded-full text-gray-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Product Details - Tabs Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedTabs tabs={tabsContent} />
        </motion.div>

        {/* Related Products */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          ref={relatedSectionRef}
        >
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={{
                  id: relatedProduct.id,
                  name: relatedProduct.name,
                  price: relatedProduct.price,
                  salePrice: relatedProduct.salePrice,
                  image: relatedProduct.images[0].src,
                  rating: relatedProduct.rating,
                  reviewCount: relatedProduct.reviewCount,
                  discount: relatedProduct.discount,
                  flavors: relatedProduct.flavors?.map((f) => f.name),
                  sizes: relatedProduct.sizes?.map((s) => ({
                    name: s.name,
                    price: s.price,
                    salePrice:
                      s.price !== s.originalPrice ? s.originalPrice : undefined,
                  })),
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
