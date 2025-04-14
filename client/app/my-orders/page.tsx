"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// Mock order data types
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("newest");

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Mock fetch orders data
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !isLoading) {
      router.push("/login?redirect=/my-orders");
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockOrders: Order[] = [
          {
            id: "ORD-12345",
            date: "2023-12-15T10:30:00Z",
            status: "delivered",
            items: [
              {
                id: 1,
                name: "Protein Powder - Chocolate",
                price: 2499,
                quantity: 1,
                image: "/images/products/protein-chocolate.jpg",
                totalPrice: 2499,
              },
              {
                id: 2,
                name: "BCAA - Berry Blast",
                price: 1299,
                quantity: 2,
                image: "/images/products/bcaa-berry.jpg",
                totalPrice: 2598,
              },
            ],
            total: 5097,
            paymentMethod: "Credit Card",
            shippingAddress: {
              name: "John Doe",
              street: "123 Main Street",
              city: "Mumbai",
              state: "Maharashtra",
              zipCode: "400001",
              country: "India",
            },
            trackingNumber: "IND12345678901",
            estimatedDelivery: "2023-12-18",
          },
          {
            id: "ORD-67890",
            date: "2023-11-20T14:22:00Z",
            status: "delivered",
            items: [
              {
                id: 3,
                name: "Pre-Workout - Blue Raspberry",
                price: 1999,
                quantity: 1,
                image: "/images/products/pre-workout.jpg",
                totalPrice: 1999,
              },
              {
                id: 4,
                name: "Creatine Monohydrate",
                price: 1499,
                quantity: 1,
                image: "/images/products/creatine.jpg",
                totalPrice: 1499,
              },
            ],
            total: 3498,
            paymentMethod: "UPI",
            shippingAddress: {
              name: "John Doe",
              street: "123 Main Street",
              city: "Mumbai",
              state: "Maharashtra",
              zipCode: "400001",
              country: "India",
            },
            trackingNumber: "IND98765432109",
            estimatedDelivery: "2023-11-25",
          },
          {
            id: "ORD-54321",
            date: "2023-12-05T09:15:00Z",
            status: "shipped",
            items: [
              {
                id: 5,
                name: "Vitamin D3 Supplements",
                price: 899,
                quantity: 1,
                image: "/images/products/vitamin-d3.jpg",
                totalPrice: 899,
              },
              {
                id: 6,
                name: "Fish Oil Omega-3",
                price: 1199,
                quantity: 1,
                image: "/images/products/fish-oil.jpg",
                totalPrice: 1199,
              },
            ],
            total: 2098,
            paymentMethod: "Debit Card",
            shippingAddress: {
              name: "John Doe",
              street: "123 Main Street",
              city: "Mumbai",
              state: "Maharashtra",
              zipCode: "400001",
              country: "India",
            },
            trackingNumber: "IND45678912345",
            estimatedDelivery: "2023-12-12",
          },
          {
            id: "ORD-09876",
            date: "2023-12-10T16:45:00Z",
            status: "processing",
            items: [
              {
                id: 7,
                name: "Multivitamin Complex",
                price: 1499,
                quantity: 1,
                image: "/images/products/multivitamin.jpg",
                totalPrice: 1499,
              },
            ],
            total: 1499,
            paymentMethod: "Net Banking",
            shippingAddress: {
              name: "John Doe",
              street: "123 Main Street",
              city: "Mumbai",
              state: "Maharashtra",
              zipCode: "400001",
              country: "India",
            },
            estimatedDelivery: "2023-12-15",
          },
          {
            id: "ORD-24680",
            date: "2023-12-18T11:30:00Z",
            status: "pending",
            items: [
              {
                id: 8,
                name: "Mass Gainer - Chocolate",
                price: 2999,
                quantity: 1,
                image: "/images/products/mass-gainer.jpg",
                totalPrice: 2999,
              },
              {
                id: 9,
                name: "Shaker Bottle",
                price: 399,
                quantity: 1,
                image: "/images/products/shaker.jpg",
                totalPrice: 399,
              },
            ],
            total: 3398,
            paymentMethod: "Cash on Delivery",
            shippingAddress: {
              name: "John Doe",
              street: "123 Main Street",
              city: "Mumbai",
              state: "Maharashtra",
              zipCode: "400001",
              country: "India",
            },
            estimatedDelivery: "2023-12-25",
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, isLoading]);

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <ShoppingBag className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      // Filter by status
      if (filterStatus !== "all" && order.status !== filterStatus) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          order.id.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query))
        );
      }

      return true;
    })
    .sort((a, b) => {
      // Sort orders
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In to View Your Orders
          </h1>
          <p className="text-gray-600 mb-8">
            Please sign in to view your order history and check order status.
          </p>
          <Button
            onClick={() => router.push("/login?redirect=/my-orders")}
            className="w-full"
          >
            Sign In
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            View and track all your orders in one place
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : orders.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search orders or products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-lg p-8 text-center"
              >
                <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Orders Found
                </h2>
                <p className="text-gray-600">
                  We couldn&apos;t find any orders matching your search
                  criteria. Try adjusting your filters.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div
                      className="p-6 border-b border-gray-200 cursor-pointer"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="mr-4">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {order.id}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Placed on {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                          <div className="mr-8 md:mr-12">
                            <p className="text-sm font-medium text-gray-900">
                              Total
                            </p>
                            <p className="text-base font-bold">
                              ₹{order.total.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-purple-100 text-purple-800"
                                    : order.status === "processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            <button className="mt-2 text-sm text-blue-600 flex items-center">
                              {expandedOrderId === order.id ? (
                                <>
                                  <span>Hide Details</span>
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                </>
                              ) : (
                                <>
                                  <span>View Details</span>
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedOrderId === order.id && (
                      <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-gray-900 mb-4">
                            Order Details
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 mb-2">
                                Shipping Address
                              </h5>
                              <address className="not-italic text-sm text-gray-600">
                                {order.shippingAddress.name}
                                <br />
                                {order.shippingAddress.street}
                                <br />
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.state}{" "}
                                {order.shippingAddress.zipCode}
                                <br />
                                {order.shippingAddress.country}
                              </address>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 mb-2">
                                Payment Method
                              </h5>
                              <p className="text-sm text-gray-600">
                                {order.paymentMethod}
                              </p>
                              {order.paymentMethod !== "Cash on Delivery" && (
                                <p className="text-sm text-gray-600 mt-1">
                                  •••• •••• •••• 1234
                                </p>
                              )}
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 mb-2">
                                Delivery Info
                              </h5>
                              {order.status === "shipped" ||
                              order.status === "delivered" ? (
                                <>
                                  <p className="text-sm text-gray-600">
                                    Tracking:{" "}
                                    <a
                                      href={`/track-order?id=${order.trackingNumber}`}
                                      target="_blank"
                                      className="text-blue-600 hover:underline"
                                    >
                                      {order.trackingNumber}
                                    </a>
                                  </p>
                                  {order.estimatedDelivery && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      Estimated delivery:{" "}
                                      {formatDate(order.estimatedDelivery)}
                                    </p>
                                  )}
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-gray-600">
                                    Status: {getStatusText(order.status)}
                                  </p>
                                  {order.estimatedDelivery && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      Estimated delivery:{" "}
                                      {formatDate(order.estimatedDelivery)}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-gray-900 mb-4">
                            Items in this order
                          </h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                  <Image
                                    width={100}
                                    height={100}
                                    src={
                                      item.image ||
                                      `https://via.placeholder.com/150?text=${encodeURIComponent(
                                        item.name
                                      )}`
                                    }
                                    alt={item.name}
                                    className="h-full w-full object-contain object-center"
                                    onError={(e) => {
                                      (
                                        e.target as HTMLImageElement
                                      ).src = `https://via.placeholder.com/150?text=${encodeURIComponent(
                                        item.name
                                      )}`;
                                    }}
                                  />
                                </div>
                                <div className="ml-4 flex-1">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </h5>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  ₹{item.price.toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between border-t border-gray-200 pt-6">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                            >
                              <Download className="mr-1 h-3 w-3" /> Invoice
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                            >
                              <FileText className="mr-1 h-3 w-3" /> Receipt
                            </Button>
                            {(order.status === "shipped" ||
                              order.status === "delivered") && (
                              <Link
                                href={`/track-order?id=${order.trackingNumber}`}
                                passHref
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <ExternalLink className="mr-1 h-3 w-3" />{" "}
                                  Track
                                </Button>
                              </Link>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span className="mr-12">Subtotal:</span>
                              <span>₹{order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span className="mr-12">Shipping:</span>
                              <span>₹0</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <span className="mr-12">Total:</span>
                              <span>₹{order.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-4 flex justify-end space-x-3 bg-gray-50 border-t border-gray-200">
                      {order.status === "delivered" && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                        >
                          Buy Again
                        </Button>
                      )}
                      {order.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 text-xs"
                        >
                          Cancel Order
                        </Button>
                      )}
                      <Link href="/contact">
                        <Button size="sm" variant="outline" className="text-xs">
                          Need Help?
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-lg p-8 text-center"
          >
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <Link href="/products">
              <Button className="px-6">Browse Products</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Search icon component
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
