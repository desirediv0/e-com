"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  Grid,
  GridIcon,
  ArrowUpDown,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Placeholder for product type - update based on your actual data model
interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  variant?: string;
  discount?: number;
  flavors?: string[];
  sizes?: {
    name: string;
    price: number;
    salePrice?: number;
  }[];
  category: string;
  tags: string[];
}

// Mock data - replace with actual API call
const getProducts = (): Product[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 5000) + 500,
    salePrice:
      Math.random() > 0.5 ? Math.floor(Math.random() * 4000) + 400 : undefined,
    image: "",
    rating: Math.random() * 5,
    reviewCount: Math.floor(Math.random() * 500),
    variant: Math.random() > 0.5 ? "Variant A" : "Variant B",
    discount:
      Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : undefined,
    category: [
      "Supplements",
      "Protein",
      "Pre-Workout",
      "Recovery",
      "Accessories",
    ][Math.floor(Math.random() * 5)],
    tags: ["New", "Popular", "Sale"].filter(() => Math.random() > 0.7),
  }));
};

// Filter options
const PRICE_RANGES = [
  { label: "Under ₹500", value: "0-500" },
  { label: "₹500 - ₹1000", value: "500-1000" },
  { label: "₹1000 - ₹2000", value: "1000-2000" },
  { label: "₹2000 - ₹5000", value: "2000-5000" },
  { label: "Above ₹5000", value: "5000-999999" },
];

const CATEGORIES = [
  "Supplements",
  "Protein",
  "Pre-Workout",
  "Recovery",
  "Accessories",
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating: High to Low", value: "rating" },
  { label: "Popularity", value: "popularity" },
];

export default function ProductsPageWrapper() {
  return (
    <Suspense
      fallback={<div className="p-12 text-center">Loading products...</div>}
    >
      <ProductsPage />
    </Suspense>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState<number>(12);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Initialize filters from URL params
  useEffect(() => {
    if (searchParams) {
      const queryCategories = searchParams.get("categories")?.split(",") || [];
      const queryPriceRanges = searchParams.get("price")?.split(",") || [];
      const queryTags = searchParams.get("tags")?.split(",") || [];
      const query = searchParams.get("q") || "";
      const sort = searchParams.get("sort") || "newest";

      setSelectedCategories(queryCategories);
      setSelectedPriceRanges(queryPriceRanges);
      setSelectedTags(queryTags);
      setSearchQuery(query);
      setSortOption(sort);
    }
  }, [searchParams]);

  // Apply filters and update URL
  useEffect(() => {
    // Skip initial render when empty
    if (products.length === 0) return;

    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        // Check if product price falls within any selected range
        return selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          const price = product.salePrice || product.price;
          return price >= min && price <= max;
        });
      });
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        product.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortOption);

    setFilteredProducts(filtered);

    // Update URL params
    const params = new URLSearchParams();

    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));

    if (selectedPriceRanges.length > 0)
      params.set("price", selectedPriceRanges.join(","));

    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));

    if (searchQuery) params.set("q", searchQuery);

    if (sortOption !== "newest") params.set("sort", sortOption);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(newUrl, { scroll: false });
  }, [
    selectedCategories,
    selectedPriceRanges,
    selectedTags,
    searchQuery,
    sortOption,
    products,
    pathname,
    router,
  ]);

  // Infinite scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          visibleProducts < filteredProducts.length
        ) {
          // Load more products when scrolling to the bottom
          setVisibleProducts((prev) =>
            Math.min(prev + 8, filteredProducts.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, filteredProducts, visibleProducts]);

  // Sort products helper function
  const sortProducts = (products: Product[], option: string) => {
    const productsToSort = [...products];

    switch (option) {
      case "price_asc":
        return productsToSort.sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
        );
      case "price_desc":
        return productsToSort.sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
        );
      case "rating":
        return productsToSort.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "popularity":
        return productsToSort.sort(
          (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)
        );
      case "newest":
      default:
        // Assuming id correlates to newness
        return productsToSort.sort((a, b) => b.id - a.id);
    }
  };

  // Toggle filter handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedTags([]);
    setSearchQuery("");
    setSortOption("newest");
  };

  // Remove single filter tag
  const removeFilterTag = (
    type: "category" | "price" | "tag",
    value: string
  ) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    } else if (type === "price") {
      setSelectedPriceRanges((prev) => prev.filter((item) => item !== value));
    } else if (type === "tag") {
      setSelectedTags((prev) => prev.filter((item) => item !== value));
    }
  };

  // Get price range label from value
  const getPriceRangeLabel = (value: string) => {
    return PRICE_RANGES.find((range) => range.value === value)?.label || value;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
      },
    },
  };

  const filterTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 500 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  // Filter sidebar - both desktop and mobile versions
  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search within results */}
      <div>
        <h3 className="text-lg font-medium mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="rounded text-black focus:ring-black h-4 w-4"
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm text-gray-700"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <div key={range.value} className="flex items-center">
              <input
                type="checkbox"
                id={`price-${range.value}`}
                checked={selectedPriceRanges.includes(range.value)}
                onChange={() => togglePriceRange(range.value)}
                className="rounded text-black focus:ring-black h-4 w-4"
              />
              <label
                htmlFor={`price-${range.value}`}
                className="ml-2 text-sm text-gray-700"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-medium mb-3">Product Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["New", "Popular", "Sale"].map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-all ${
                selectedTags.includes(tag)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All Filters Button (mobile only) */}
      <div className="lg:hidden">
        <Button variant="outline" onClick={clearAllFilters} className="w-full">
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-600">
          {filteredProducts.length} products available
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />

              {/* Clear All Button - Desktop Only */}
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="w-full mt-6"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filter Button and Filter Sidebar */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="w-full mb-4 flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter Products
            </Button>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
              {isMobileSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  {/* Prevent clicks from bubbling up */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white p-6 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                    variants={sidebarVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold">Filters</h2>
                      <button
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <FilterSidebar />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
              <div className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4 text-gray-500" />
                <span className="mr-2 text-sm text-gray-700">Sort by:</span>
                <div className="w-48">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded ${
                    view === "grid" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded ${
                    view === "list" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <GridIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategories.length > 0 ||
              selectedPriceRanges.length > 0 ||
              selectedTags.length > 0) && (
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <span className="text-sm text-gray-500 my-auto">
                  Active filters:
                </span>

                <AnimatePresence>
                  {selectedCategories.map((category) => (
                    <motion.span
                      key={`cat-${category}`}
                      variants={filterTagVariants}
                      exit="exit"
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
                    >
                      {category}
                      <button
                        onClick={() => removeFilterTag("category", category)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}

                  {selectedPriceRanges.map((range) => (
                    <motion.span
                      key={`price-${range}`}
                      variants={filterTagVariants}
                      exit="exit"
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
                    >
                      {getPriceRangeLabel(range)}
                      <button
                        onClick={() => removeFilterTag("price", range)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}

                  {selectedTags.map((tag) => (
                    <motion.span
                      key={`tag-${tag}`}
                      variants={filterTagVariants}
                      exit="exit"
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
                    >
                      {tag}
                      <button
                        onClick={() => removeFilterTag("tag", tag)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>

                <motion.button
                  variants={filterTagVariants}
                  className="text-xs text-blue-600 hover:text-blue-800 my-auto"
                  onClick={clearAllFilters}
                >
                  Clear all
                </motion.button>
              </motion.div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <motion.div
                className={`grid ${
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <ProductCardSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg p-8 text-center"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Products Found
                </h2>
                <p className="text-gray-600">
                  We couldn&apos;t find any products matching your criteria. Try
                  adjusting your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className={`grid ${
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.slice(0, visibleProducts).map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Load More Trigger */}
            {!isLoading && filteredProducts.length > visibleProducts && (
              <div
                ref={loadMoreRef}
                className="flex justify-center items-center py-8"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              </div>
            )}

            {/* "Load More" button alternative to infinite scroll */}
            {!isLoading &&
              filteredProducts.length > visibleProducts &&
              filteredProducts.length - visibleProducts <= 8 && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => setVisibleProducts(filteredProducts.length)}
                    variant="outline"
                    className="flex items-center"
                  >
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Load All Remaining Products
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
