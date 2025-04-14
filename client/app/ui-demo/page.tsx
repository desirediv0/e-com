"use client";
import ReviewSystem from "@/components/ReviewSystem";

const REVIEWS = [
  {
    id: "review-1",
    userId: "user-1",
    userName: "John Doe",
    userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isVerified: true,
    rating: 5,
    title: "Best protein powder I've tried!",
    content:
      "I've been using this protein powder for 3 months now and I can definitely see the results. The taste is great and it mixes really well. I take it after my workouts and it helps with recovery. Highly recommend to anyone looking for a quality protein supplement.",
    date: "2023-05-15",
    helpful: 24,
    unhelpful: 2,
    images: [
      "https://images.unsplash.com/photo-1579722861738-0ad50a7b917e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594498653385-d5172c532c76?w=500&h=500&fit=crop",
    ],
  },
  {
    id: "review-2",
    userId: "user-2",
    userName: "Sarah Johnson",
    userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    isVerified: true,
    rating: 4,
    title: "Good product but packaging could be better",
    content:
      "The protein itself is excellent - mixes well and tastes great. I've seen good results in my training. However, the packaging could be improved as the seal broke after a few uses.",
    date: "2023-04-22",
    helpful: 12,
    unhelpful: 1,
  },
  {
    id: "review-3",
    userId: "user-3",
    userName: "Michael Brown",
    isVerified: false,
    rating: 3,
    title: "Average taste but works well",
    content:
      "I've been using this for about a month. The results are good but the taste is just okay. I mix it with almond milk to make it better. Shipping was fast though.",
    date: "2023-03-10",
    helpful: 8,
    unhelpful: 3,
    replies: [
      {
        id: "reply-1",
        userId: "admin-1",
        userName: "Support Team",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        isVerified: true,
        rating: 0,
        title: "",
        content:
          "Hi Michael, thanks for your feedback. We're sorry to hear about the taste not meeting your expectations. We have several flavors available, would you be interested in trying a different one? Please contact our customer service team for options.",
        date: "2023-03-11",
        helpful: 3,
        unhelpful: 0,
        isReply: true,
      },
    ],
  },
];

export default function UIDemoPage() {
  return (
    <div className="container mx-auto py-12">
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Product Reviews System</h2>

        <ReviewSystem
          productId="demo-product"
          initialReviews={REVIEWS}
          averageRating={4.3}
          totalReviews={REVIEWS.length}
        />
      </section>
    </div>
  );
}
