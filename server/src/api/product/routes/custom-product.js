/**
 * Custom product routes
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products/featured",
      handler: "product.getFeaturedProducts",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/products/category/:category",
      handler: "product.getProductsByCategory",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/products/search",
      handler: "product.searchProducts",
      config: {
        auth: false,
      },
    },
  ],
};
