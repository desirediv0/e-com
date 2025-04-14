# E-commerce Backend API

This is a backend API for an e-commerce application built with Strapi and PostgreSQL.

## Prerequisites

- Node.js (>= 16.0.0, <= 20.x.x)
- npm (>= 6.0.0)
- PostgreSQL

## Features

- Product management
- Category management
- User authentication and management
- Order processing
- Review system

## Getting Started

### Database Setup

1. Install PostgreSQL
2. Create a database named `ecom`
3. Update the `.env` file with your database credentials

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run develop
```

### Environment Variables

Copy the `.env.example` file to `.env` and update the variables:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=myKeyA,myKeyB
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=ecom
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

### First Run

On first run, Strapi will create an admin panel where you can:

1. Create an administrator account
2. Set up user roles and permissions
3. Create content types and manage data

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?query=keyword` - Search products

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/my-orders` - Get user's orders
- `PUT /api/orders/:id/pay` - Update order payment status

### Authentication

- `POST /api/auth/local/register` - Register a new user
- `POST /api/auth/local` - Login a user

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```
