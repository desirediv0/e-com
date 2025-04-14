/**
 * API utility functions for connecting to the Strapi backend
 */

const API_URL = "http://localhost:1337/api";

/**
 * Fetch products with pagination
 */
export async function getProducts(page = 1, pageSize = 12) {
  try {
    const response = await fetch(
      `${API_URL}/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], meta: { pagination: { page, pageSize, total: 0 } } };
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}?populate=*`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts() {
  try {
    const response = await fetch(`${API_URL}/products/featured?populate=*`);

    if (!response.ok) {
      throw new Error("Failed to fetch featured products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category, page = 1, pageSize = 12) {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${category}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return { data: [], meta: { pagination: { page, pageSize, total: 0 } } };
  }
}

/**
 * Search products
 */
export async function searchProducts(query, page = 1, pageSize = 12) {
  try {
    const response = await fetch(
      `${API_URL}/products/search?query=${encodeURIComponent(
        query
      )}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    return { data: [], meta: { pagination: { page, pageSize, total: 0 } } };
  }
}

/**
 * Get all categories
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories?populate=*`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [] };
  }
}

/**
 * Create order
 */
export async function createOrder(orderData, token) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/**
 * Get user's orders
 */
export async function getMyOrders(token) {
  try {
    const response = await fetch(`${API_URL}/orders/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

/**
 * Update order to paid
 */
export async function updateOrderToPaid(orderId, paymentResult, token) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/pay`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentResult }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order payment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order payment:", error);
    throw error;
  }
}

/**
 * Register a new user
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message[0].messages[0].message || "Registration failed"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

/**
 * Login a user
 */
export async function loginUser(identifier, password) {
  try {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message[0].messages[0].message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
