/**
 * Custom order routes
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orders/my-orders",
      handler: "order.findMyOrders",
      config: {
        auth: true,
      },
    },
    {
      method: "PUT",
      path: "/orders/:id/pay",
      handler: "order.updateOrderToPaid",
      config: {
        auth: true,
      },
    },
  ],
};
