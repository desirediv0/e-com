import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardSkeletonProps {
  /**
   * Whether to show the hover animation effect
   */
  animate?: boolean;
}

const ProductCardSkeleton = ({ animate = true }: ProductCardSkeletonProps) => {
  return (
    <motion.div
      className="group bg-white rounded-lg shadow-sm overflow-hidden"
      whileHover={animate ? { y: -5, transition: { duration: 0.3 } } : {}}
    >
      {/* Product Image Placeholder */}
      <div className="relative overflow-hidden aspect-square">
        <Skeleton className="w-full h-full" />

        {/* Discount badge placeholder */}
        <Skeleton className="absolute top-2 left-2 h-5 w-14 rounded" />
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Title */}
        <Skeleton className="h-4 w-4/5 mb-2" />
        <Skeleton className="h-3 w-3/5 mb-2" />

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-3 w-10 ml-1" />
        </div>

        {/* Flavor/Options Selection Buttons */}
        <div className="mb-2">
          <div className="flex flex-wrap gap-1 mt-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-14 rounded" />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-3 pb-3">
        <Skeleton className="h-9 w-full rounded" />
      </div>

      {/* Quick view button that appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Skeleton className="h-8 w-28 rounded" />
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;
