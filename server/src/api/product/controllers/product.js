"use strict";

/**
 * Product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async getFeaturedProducts(ctx) {
    try {
      // Get featured products
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          filters: { featured: true },
          populate: ["images", "categories"],
        }
      );

      return products;
    } catch (err) {
      ctx.body = err;
    }
  },

  async getProductsByCategory(ctx) {
    try {
      const { category } = ctx.params;

      // Find category by slug
      const categoryEntity = await strapi.entityService.findMany(
        "api::category.category",
        {
          filters: { slug: category },
        }
      );

      if (!categoryEntity.length) {
        return ctx.notFound("Category not found");
      }

      // Get products in this category
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          filters: { categories: { slug: category } },
          populate: ["images", "categories"],
        }
      );

      return products;
    } catch (err) {
      ctx.body = err;
    }
  },

  async searchProducts(ctx) {
    try {
      const { query } = ctx.query;

      if (!query) {
        return ctx.badRequest("Query parameter is required");
      }

      // Search products by name or description
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          filters: {
            $or: [
              { name: { $containsi: query } },
              { shortDescription: { $containsi: query } },
              { description: { $containsi: query } },
            ],
          },
          populate: ["images", "categories"],
        }
      );

      return products;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
