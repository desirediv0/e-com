"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product, ProductSize, ProductFlavor } from "@/data/products";

// Define the cart item type
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  flavor: string;
  totalPrice: number;
}

// Define the cart state type
interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  shipping: number;
}

// Define actions for the reducer
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_DISCOUNT"; payload: { discount: number } }
  | { type: "SET_SHIPPING"; payload: { shipping: number } };

// Calculate shipping cost based on subtotal
const calculateShipping = (subtotal: number): number => {
  return subtotal > 1000 ? 0 : 99;
};

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
};

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if item already exists with same product, size, and flavor
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.flavor === action.payload.flavor
      );

      let newItems: CartItem[];

      // If item exists, update quantity
      if (existingItemIndex !== -1) {
        newItems = [...state.items];
        const existingItem = newItems[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
          totalPrice:
            (existingItem.quantity + action.payload.quantity) *
            existingItem.price,
        };
        newItems[existingItemIndex] = updatedItem;
      } else {
        // Otherwise add new item
        newItems = [...state.items, action.payload];
      }

      // Calculate totals
      const totalItems = newItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const subtotal = newItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      const shipping = calculateShipping(subtotal);
      const total = subtotal - state.discount + shipping;

      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        shipping,
        total,
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const totalItems = newItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const subtotal = newItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      const shipping = calculateShipping(subtotal);
      const total = subtotal - state.discount + shipping;

      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        shipping,
        total,
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
            totalPrice: action.payload.quantity * item.price,
          };
        }
        return item;
      });

      const totalItems = newItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const subtotal = newItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      const shipping = calculateShipping(subtotal);
      const total = subtotal - state.discount + shipping;

      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        shipping,
        total,
      };
    }

    case "CLEAR_CART":
      return initialState;

    case "APPLY_DISCOUNT": {
      const total = state.subtotal - action.payload.discount + state.shipping;

      return {
        ...state,
        discount: action.payload.discount,
        total,
      };
    }

    case "SET_SHIPPING": {
      const total = state.subtotal - state.discount + action.payload.shipping;

      return {
        ...state,
        shipping: action.payload.shipping,
        total,
      };
    }

    default:
      return state;
  }
};

// Create the context
interface CartContextType extends CartState {
  addItem: (
    product: Product,
    quantity: number,
    selectedSize: ProductSize,
    selectedFlavor: ProductFlavor
  ) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discount: number) => void;
  setShipping: (shipping: number) => void;
}

// Create a default context value
const defaultCartContext: CartContextType = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  applyDiscount: () => {},
  setShipping: () => {},
};

// Create the context with default value
const CartContext = createContext<CartContextType>(defaultCartContext);

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize the reducer with persisted state if available
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : initialState;
    }
    return initialState;
  });

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state]);

  // Add item to cart
  const addItem = (
    product: Product,
    quantity: number,
    selectedSize: ProductSize,
    selectedFlavor: ProductFlavor
  ) => {
    const cartItem: CartItem = {
      id: Date.now(), // Generate unique ID for cart item
      productId: product.id,
      name: product.name,
      price: selectedSize.price,
      image: product.images[0].src,
      quantity,
      size: selectedSize.name,
      flavor: selectedFlavor.name,
      totalPrice: selectedSize.price * quantity,
    };

    dispatch({ type: "ADD_ITEM", payload: cartItem });
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Apply discount
  const applyDiscount = (discount: number) => {
    dispatch({ type: "APPLY_DISCOUNT", payload: { discount } });
  };

  // Set shipping
  const setShipping = (shipping: number) => {
    dispatch({ type: "SET_SHIPPING", payload: { shipping } });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyDiscount,
        setShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
