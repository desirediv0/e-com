"use strict";

/**
 * Order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { v4: uuidv4 } = require("uuid");

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      const { user } = ctx.state;

      if (!user) {
        return ctx.unauthorized("You must be logged in to create an order");
      }

      const { orderItems, shippingAddress, paymentMethod } = ctx.request.body;

      if (!orderItems || orderItems.length === 0) {
        return ctx.badRequest("No order items");
      }

      // Calculate prices
      let itemsPrice = 0;
      for (const item of orderItems) {
        const product = await strapi.entityService.findOne(
          "api::product.product",
          item.id
        );
        if (!product) {
          return ctx.badRequest(`Product not found: ${item.id}`);
        }

        // Check stock
        if (product.stock < item.quantity) {
          return ctx.badRequest(`Product ${product.name} is out of stock`);
        }

        // Use discountPrice if available, otherwise use regular price
        const price = product.discountPrice || product.price;
        itemsPrice += price * item.quantity;

        // Update stock
        await strapi.entityService.update("api::product.product", item.id, {
          data: {
            stock: product.stock - item.quantity,
          },
        });
      }

      // Calculate tax and shipping
      const taxPrice = itemsPrice * 0.15;
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      const totalPrice = itemsPrice + taxPrice + shippingPrice;

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${uuidv4().substring(0, 8)}`;

      // Create order
      const order = await strapi.entityService.create("api::order.order", {
        data: {
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          isPaid: false,
          isDelivered: false,
          status: "pending",
          orderNumber,
          user: user.id,
        },
      });

      return order;
    } catch (err) {
      ctx.body = err;
    }
  },

  async findMyOrders(ctx) {
    try {
      const { user } = ctx.state;

      if (!user) {
        return ctx.unauthorized("You must be logged in to view your orders");
      }

      const orders = await strapi.entityService.findMany("api::order.order", {
        filters: { user: user.id },
        sort: { createdAt: "desc" },
      });

      return orders;
    } catch (err) {
      ctx.body = err;
    }
  },

  async updateOrderToPaid(ctx) {
    try {
      const { id } = ctx.params;
      const { paymentResult } = ctx.request.body;

      const order = await strapi.entityService.findOne("api::order.order", id);

      if (!order) {
        return ctx.notFound("Order not found");
      }

      const updatedOrder = await strapi.entityService.update(
        "api::order.order",
        id,
        {
          data: {
            isPaid: true,
            paidAt: new Date(),
            status: "processing",
            paymentResult,
          },
        }
      );

      return updatedOrder;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
