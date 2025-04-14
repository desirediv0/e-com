# E-commerce Platform

This is a full-stack e-commerce platform with a Next.js frontend and a Strapi backend with PostgreSQL database.

## Project Structure

- `/client`: Next.js frontend application
- `/server`: Strapi backend API

## Features

- Product catalog with categories
- Product search and filtering
- Shopping cart
- User authentication and registration
- Order processing and tracking
- Review system

## Prerequisites

- Node.js (>=16.0.0, <=20.x.x)
- npm (>=6.0.0)
- PostgreSQL

## Getting Started

### 1. Server Setup (Strapi Backend)

1. First, make sure PostgreSQL is installed and running

2. Create a database named 'ecom'

3. Configure the server:

```bash
cd server
npm install
```

4. Update the `.env` file with your database credentials

5. Start the Strapi server:

```bash
npm run develop
```

6. On first run, Strapi will ask you to create an admin user. Follow the instructions to set up your admin account.

7. After setting up the admin account, you can access the Strapi admin panel at http://localhost:1337/admin

8. Configure user permissions:
   - Go to Settings > Roles > Public
   - Allow find and findOne operations for products, categories, and reviews
   - Save changes

### 2. Client Setup (Next.js Frontend)

1. Install dependencies:

```bash
cd client
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. The frontend will be available at http://localhost:3000

## API Integration

The client and server communicate through the Strapi API. The API utility functions are defined in `client/lib/api.js`.

## Deployment

### Server (Strapi)

1. Build the Strapi application:

```bash
cd server
npm run build
```

2. Start the production server:

```bash
npm run start
```

### Client (Next.js)

1. Build the Next.js application:

```bash
cd client
npm run build
```

2. Start the production server:

```bash
npm run start
```

## Content Management

1. Access the Strapi admin panel at http://localhost:1337/admin
2. From here, you can:
   - Create and manage products
   - Organize categories
   - Monitor orders
   - Manage users

## License

MIT
