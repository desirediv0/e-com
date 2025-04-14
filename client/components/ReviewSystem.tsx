import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Check,
  Image as ImageIcon,
  Camera,
  X,
  MessageSquare,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Types
interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  isVerified: boolean;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  unhelpful: number;
  images?: string[];
  videos?: string[];
  isReply?: boolean;
  replies?: Review[];
}

interface ReviewSystemProps {
  productId: string | number;
  initialReviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

// Star Rating Input Component
export const StarRatingInput = ({
  value,
  onChange,
  readOnly = false,
  size = "md",
}: StarRatingInputProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (newRating: number) => {
    if (!readOnly) {
      onChange(newRating);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = (!readOnly && hoverRating >= star) || value >= star;

        return (
          <motion.button
            key={star}
            type="button"
            className={`focus:outline-none ${
              readOnly ? "cursor-default" : "cursor-pointer"
            }`}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            onClick={() => handleStarClick(star)}
            whileHover={!readOnly ? { scale: 1.2 } : {}}
            whileTap={!readOnly ? { scale: 0.9 } : {}}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isActive ? "text-yellow-400 fill-current" : "text-gray-300"
              } transition-colors duration-150`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

// Review Card Component
export const ReviewCard = ({
  review,
  onVote,
}: {
  review: Review;
  onVote: (id: string, type: "up" | "down") => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showFullImages, setShowFullImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState<"up" | "down" | null>(null);

  const hasMediaContent =
    (review.images && review.images.length > 0) ||
    (review.videos && review.videos.length > 0);

  const handleVote = (type: "up" | "down") => {
    if (hasVoted === type) return;

    onVote(review.id, type);
    setHasVoted(type);
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const needsExpansion = () => {
    if (!contentRef.current) return false;
    return contentRef.current.scrollHeight > 100;
  };

  return (
    <motion.div
      className={`p-4 rounded-lg border border-gray-200 mb-4 ${
        review.isReply ? "ml-8 bg-gray-50" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Review header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-3">
            {review.userAvatar ? (
              <Image
                src={review.userAvatar}
                alt={review.userName}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium">
                  {review.userName.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            {review.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                <Check size={12} />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900">
                {review.userName}
              </span>
              {review.isVerified && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">{review.date}</div>
          </div>
        </div>
        <StarRatingInput
          value={review.rating}
          onChange={() => {}}
          readOnly
          size="sm"
        />
      </div>

      {/* Review title */}
      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>

      {/* Review content with expand/collapse */}
      <div className="relative">
        <div
          ref={contentRef}
          className={`text-gray-700 overflow-hidden ${
            !expanded ? "max-h-[100px]" : "max-h-none"
          }`}
        >
          {review.content}
        </div>

        {needsExpansion() && (
          <AnimatePresence>
            {!expanded && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        )}

        {needsExpansion() && (
          <motion.button
            className="text-sm text-indigo-600 mt-2 flex items-center hover:text-indigo-800"
            onClick={() => setExpanded(!expanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {expanded ? "Show less" : "Read more"}
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        )}
      </div>

      {/* Media attachments */}
      {hasMediaContent && (
        <div className="mt-4">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {review.images?.map((img, index) => (
                <CarouselItem key={`img-${index}`} className="basis-1/2">
                  <div
                    className="relative aspect-square rounded-md overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setShowFullImages(true);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </CarouselItem>
              ))}
              {review.videos?.map((video, index) => (
                <CarouselItem key={`video-${index}`} className="basis-1/2">
                  <div className="relative aspect-square rounded-md overflow-hidden">
                    <video
                      src={video}
                      className="w-full h-full object-cover"
                      controls
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
      )}

      {/* Voting and actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => handleVote("up")}
            className={`flex items-center space-x-1 text-sm ${
              hasVoted === "up"
                ? "text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThumbsUp
              size={16}
              className={hasVoted === "up" ? "fill-current" : ""}
            />
            <span>{review.helpful + (hasVoted === "up" ? 1 : 0)}</span>
          </motion.button>

          <motion.button
            onClick={() => handleVote("down")}
            className={`flex items-center space-x-1 text-sm ${
              hasVoted === "down"
                ? "text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThumbsDown
              size={16}
              className={hasVoted === "down" ? "fill-current" : ""}
            />
            <span>{review.unhelpful + (hasVoted === "down" ? 1 : 0)}</span>
          </motion.button>
        </div>

        {!review.isReply && (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-gray-500 hover:text-gray-700 -mr-2"
          >
            <MessageSquare size={14} className="mr-1" />
            Reply
          </Button>
        )}
      </div>

      {/* Replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-4 pt-2 border-t border-gray-100">
          <AnimatePresence>
            {review.replies.map((reply) => (
              <ReviewCard key={reply.id} review={reply} onVote={onVote} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Image view dialog */}
      <Dialog open={showFullImages} onOpenChange={setShowFullImages}>
        <DialogContent className="max-w-3xl p-0 bg-black overflow-hidden">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setShowFullImages(false)}
            >
              <X size={18} />
            </Button>

            <Carousel
              className="w-full"
              opts={{
                startIndex: selectedImageIndex,
                loop: true,
              }}
            >
              <CarouselContent>
                {review.images?.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video h-[80vh] flex items-center justify-center">
                      <Image
                        src={img}
                        alt={`Review image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1" />
              <CarouselNext className="right-1" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// Main Review System Component
const ReviewSystem = ({
  initialReviews = [],
  averageRating = 0,
  totalReviews = 0,
}: ReviewSystemProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [sortOption, setSortOption] = useState<string>("recent");
  const [newReview, setNewReview] = useState<{
    rating: number;
    title: string;
    content: string;
    images: string[];
    videos: string[];
  }>({
    rating: 0,
    title: "",
    content: "",
    images: [],
    videos: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Calculate rating distribution
  const ratingDistribution = Array(5)
    .fill(0)
    .map((_, index) => {
      const star = 5 - index;
      const count = reviews.filter(
        (review) => Math.round(review.rating) === star
      ).length;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { star, count, percentage };
    });

  // Handle review sorting
  const sortReviews = (reviews: Review[], option: string) => {
    switch (option) {
      case "recent":
        return [...reviews].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return [...reviews].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "highest":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case "lowest":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case "helpful":
        return [...reviews].sort((a, b) => b.helpful - a.helpful);
      default:
        return reviews;
    }
  };

  // Handle voting
  const handleVote = (reviewId: string, voteType: "up" | "down") => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpful: voteType === "up" ? review.helpful + 1 : review.helpful,
            unhelpful:
              voteType === "down" ? review.unhelpful + 1 : review.unhelpful,
          };
        }
        return review;
      })
    );
  };

  // Handle review filter by rating
  const filterReviewsByRating = (rating: string) => {
    if (rating === "all") {
      return reviews;
    }
    return reviews.filter(
      (review) => Math.round(review.rating) === parseInt(rating)
    );
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload these files to a server
      // Here we just create object URLs for demonstration
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setNewReview({
        ...newReview,
        images: [...newReview.images, ...newImages],
      });
    }
  };

  // Handle review submission
  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      alert("Please rate this product");
      return;
    }

    if (newReview.title.trim() === "") {
      alert("Please add a review title");
      return;
    }

    if (newReview.content.trim() === "") {
      alert("Please add a review content");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newReviewObj: Review = {
        id: `review-${Date.now()}`,
        userId: "current-user",
        userName: "You",
        isVerified: true,
        rating: newReview.rating,
        title: newReview.title,
        content: newReview.content,
        date: new Date().toLocaleDateString(),
        helpful: 0,
        unhelpful: 0,
        images: newReview.images,
        videos: newReview.videos,
      };

      setReviews([newReviewObj, ...reviews]);
      setNewReview({
        rating: 0,
        title: "",
        content: "",
        images: [],
        videos: [],
      });
      setIsSubmitting(false);
      setIsWritingReview(false);
    }, 1000);
  };

  // Filter and sort reviews
  const displayedReviews = sortReviews(
    filterReviewsByRating(activeTab),
    sortOption
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="mb-2">
            <StarRatingInput
              value={averageRating}
              onChange={() => {}}
              readOnly
              size="md"
            />
          </div>
          <div className="text-sm text-gray-600">
            Based on {totalReviews} reviews
          </div>
        </div>

        <div className="col-span-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center mb-2">
              <div className="flex items-center w-24">
                <span className="text-sm font-medium text-gray-700 mr-1">
                  {star}
                </span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.1 * (5 - star) }}
                />
              </div>
              <div className="w-16 text-right text-sm text-gray-600 ml-2">
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a review button */}
      <div className="mb-6">
        <Button
          onClick={() => setIsWritingReview(true)}
          className="bg-black text-white hover:bg-gray-800"
        >
          Write a Review
        </Button>
      </div>

      {/* Review form */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <StarRatingInput
                  value={newReview.rating}
                  onChange={(rating) => setNewReview({ ...newReview, rating })}
                  size="lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  type="text"
                  placeholder="Summarize your experience"
                  value={newReview.title}
                  onChange={(e) =>
                    setNewReview({ ...newReview, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review
                </label>
                <textarea
                  placeholder="Share your experience with this product"
                  value={newReview.content}
                  onChange={(e) =>
                    setNewReview({ ...newReview, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black min-h-[120px]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos/Videos
                </label>

                {/* Image preview */}
                {newReview.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newReview.images.map((img, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <Image
                          src={img}
                          alt={`Upload preview ${index}`}
                          fill
                          className="object-cover rounded-md"
                        />
                        <button
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 text-white"
                          onClick={() => {
                            const newImages = [...newReview.images];
                            newImages.splice(index, 1);
                            setNewReview({ ...newReview, images: newImages });
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-12 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      <ImageIcon size={18} className="mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700">Add Photos</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>

                  <label className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-12 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      <Camera size={18} className="mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700">Add Videos</span>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const newVideos = Array.from(e.target.files).map(
                            (file) => URL.createObjectURL(file)
                          );
                          setNewReview({
                            ...newReview,
                            videos: [...newReview.videos, ...newVideos],
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsWritingReview(false);
                    setNewReview({
                      rating: 0,
                      title: "",
                      content: "",
                      images: [],
                      videos: [],
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review filters and sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="5">5 Star</TabsTrigger>
            <TabsTrigger value="4">4 Star</TabsTrigger>
            <TabsTrigger value="3">3 Star</TabsTrigger>
            <TabsTrigger value="2">2 Star</TabsTrigger>
            <TabsTrigger value="1">1 Star</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center">
          <Filter size={16} className="mr-2 text-gray-500" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border-none bg-transparent text-sm focus:outline-none cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews list */}
      <div>
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onVote={handleVote} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No reviews yet.</p>
            <Button
              onClick={() => setIsWritingReview(true)}
              variant="outline"
              className="mt-4"
            >
              Be the first to write a review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
