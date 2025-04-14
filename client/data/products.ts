export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductSize {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
}

export interface ProductFlavor {
  id: number;
  name: string;
  isAvailable: boolean;
}

export interface NutrientInfo {
  name: string;
  amount: string;
  dailyValue?: string;
  subNutrients?: {
    name: string;
    amount: string;
    dailyValue?: string;
  }[];
}

export interface NutritionFact {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  sodium: number;
  [key: string]: string | number;
}

export interface EnhancedNutritionFacts {
  servingSize: string;
  calories: number;
  nutrients: NutrientInfo[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  images: ProductImage[];
  description: string;
  features: string[];
  flavors: ProductFlavor[];
  sizes: ProductSize[];
  nutritionFacts?: NutritionFact | EnhancedNutritionFacts;
  rating: number;
  reviewCount: number;
  category: string;
  subcategory: string;
  isNew?: boolean;
  isPopular?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  stock: number;
  discount?: number;
  sku: string;
  inStock: boolean;
  ingredients?: string;
  reviews?: {
    id: number;
    userName: string;
    rating: number;
    date: string;
    title: string;
    comment: string;
  }[];
}

// Sample product data
export const products: Product[] = [
  // WHEY PROTEINS
  {
    id: 1,
    slug: "premium-whey-protein-isolate",
    name: "Premium Whey Protein Isolate",
    price: 1499,
    salePrice: 1299,
    images: [
      {
        id: 1,
        src: "/images/whey-protein-1.jpg",
        alt: "Whey protein isolate container",
      },
      {
        id: 2,
        src: "/images/whey-protein-2.jpg",
        alt: "Whey protein nutritional facts",
      },
      {
        id: 3,
        src: "/images/whey-protein-3.jpg",
        alt: "Whey protein in a shaker",
      },
    ],
    description:
      "Our premium whey protein isolate delivers 27g of protein per serving with minimal carbs and fat. Sourced from grass-fed cows and filtered using an advanced process to preserve the native protein structure, providing optimal nutritional benefits for muscle recovery and growth.",
    features: [
      "27g protein per serving",
      "Less than 1g of fat and carbs",
      "No artificial sweeteners",
      "Informed Choice Certified",
      "Grass-fed source",
      "Enzyme enhanced for better digestion",
    ],
    flavors: [
      { id: 1, name: "Chocolate", isAvailable: true },
      { id: 2, name: "Vanilla", isAvailable: true },
      { id: 3, name: "Strawberry", isAvailable: true },
      { id: 4, name: "Cookies & Cream", isAvailable: false },
    ],
    sizes: [
      {
        id: 1,
        name: "1kg (33 servings)",
        price: 1299,
        originalPrice: 1499,
        stock: 15,
      },
      {
        id: 2,
        name: "2kg (67 servings)",
        price: 2399,
        originalPrice: 2699,
        stock: 10,
      },
      {
        id: 3,
        name: "5kg (167 servings)",
        price: 5499,
        originalPrice: 6299,
        stock: 5,
      },
    ],
    nutritionFacts: {
      servingSize: "30g (1 scoop)",
      calories: 120,
      nutrients: [
        {
          name: "Total Fat",
          amount: "1.5g",
          dailyValue: "2%",
        },
        {
          name: "Saturated Fat",
          amount: "0.5g",
          dailyValue: "3%",
        },
        {
          name: "Trans Fat",
          amount: "0g",
        },
        {
          name: "Cholesterol",
          amount: "50mg",
          dailyValue: "17%",
        },
        {
          name: "Sodium",
          amount: "75mg",
          dailyValue: "3%",
        },
        {
          name: "Total Carbohydrate",
          amount: "2g",
          dailyValue: "1%",
          subNutrients: [
            {
              name: "Dietary Fiber",
              amount: "0g",
              dailyValue: "0%",
            },
            {
              name: "Total Sugars",
              amount: "1g",
            },
            {
              name: "Includes Added Sugars",
              amount: "0g",
              dailyValue: "0%",
            },
          ],
        },
        {
          name: "Protein",
          amount: "25g",
          dailyValue: "50%",
        },
        {
          name: "Vitamin D",
          amount: "0mcg",
          dailyValue: "0%",
        },
        {
          name: "Calcium",
          amount: "170mg",
          dailyValue: "15%",
        },
        {
          name: "Iron",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Potassium",
          amount: "125mg",
          dailyValue: "2%",
        },
      ],
    },
    rating: 4.8,
    reviewCount: 124,
    category: "proteins",
    subcategory: "isolate",
    stock: 30,
    isPopular: true,
    tags: ["protein", "isolate", "muscle building"],
    discount: 13,
    sku: "PRTN-WPI-001",
    inStock: true,
    ingredients:
      "Whey Protein Isolate (Milk), Natural and Artificial Flavors, Soy Lecithin, Sucralose, Acesulfame Potassium.",
    reviews: [
      {
        id: 101,
        userName: "JohnD",
        rating: 5,
        date: "2023-09-15",
        title: "Best protein I've ever used",
        comment:
          "I've tried many protein powders over the years, but this is by far the best. Mixes easily, tastes great, and gives me great results. Highly recommend!",
      },
      {
        id: 102,
        userName: "FitnessFanatic",
        rating: 4,
        date: "2023-08-22",
        title: "Great value for the quality",
        comment:
          "The protein quality is excellent, and it's helped my recovery significantly. Only giving 4 stars because the chocolate flavor is a bit too sweet for my taste.",
      },
      {
        id: 103,
        userName: "GymGuru",
        rating: 5,
        date: "2023-07-10",
        title: "Perfect for post-workout",
        comment:
          "This protein mixes perfectly and tastes amazing. I've seen significant improvements in my recovery since starting with this product. Will definitely buy again!",
      },
    ],
  },
  {
    id: 2,
    slug: "whey-protein-concentrate",
    name: "Whey Protein Concentrate",
    price: 1299,
    salePrice: 1099,
    images: [
      {
        id: 1,
        src: "/images/whey-concentrate-1.jpg",
        alt: "Whey protein concentrate container",
      },
      {
        id: 2,
        src: "/images/whey-concentrate-2.jpg",
        alt: "Whey protein concentrate nutritional facts",
      },
    ],
    description:
      "Our 100% Whey Protein Concentrate provides 24g of protein per serving with a complete amino acid profile. Perfect for supporting muscle growth and recovery after workouts.",
    features: [
      "24g protein per serving",
      "Rich in BCAAs and glutamine",
      "Great tasting formula",
      "Mixability guaranteed",
      "Suitable for vegetarians",
    ],
    flavors: [
      { id: 1, name: "Chocolate", isAvailable: true },
      { id: 2, name: "Vanilla", isAvailable: true },
      { id: 3, name: "Banana", isAvailable: true },
    ],
    sizes: [
      {
        id: 1,
        name: "1kg (30 servings)",
        price: 1099,
        originalPrice: 1299,
        stock: 25,
      },
      {
        id: 2,
        name: "2kg (60 servings)",
        price: 1999,
        originalPrice: 2299,
        stock: 15,
      },
    ],
    nutritionFacts: {
      servingSize: "33g (1 scoop)",
      calories: 130,
      nutrients: [
        {
          name: "Total Fat",
          amount: "2g",
          dailyValue: "3%",
        },
        {
          name: "Saturated Fat",
          amount: "0.5g",
          dailyValue: "3%",
        },
        {
          name: "Trans Fat",
          amount: "0g",
        },
        {
          name: "Cholesterol",
          amount: "50mg",
          dailyValue: "17%",
        },
        {
          name: "Sodium",
          amount: "80mg",
          dailyValue: "3%",
        },
        {
          name: "Total Carbohydrate",
          amount: "3g",
          dailyValue: "1%",
          subNutrients: [
            {
              name: "Dietary Fiber",
              amount: "0g",
              dailyValue: "0%",
            },
            {
              name: "Total Sugars",
              amount: "1.5g",
            },
            {
              name: "Includes Added Sugars",
              amount: "0g",
              dailyValue: "0%",
            },
          ],
        },
        {
          name: "Protein",
          amount: "24g",
          dailyValue: "48%",
        },
        {
          name: "Vitamin D",
          amount: "0mcg",
          dailyValue: "0%",
        },
        {
          name: "Calcium",
          amount: "170mg",
          dailyValue: "15%",
        },
        {
          name: "Iron",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Potassium",
          amount: "125mg",
          dailyValue: "2%",
        },
      ],
    },
    rating: 4.6,
    reviewCount: 98,
    category: "proteins",
    subcategory: "concentrate",
    stock: 40,
    isOnSale: true,
    tags: ["protein", "concentrate", "muscle recovery"],
    discount: 15,
    sku: "PRTN-WPC-002",
    inStock: true,
    ingredients:
      "Whey Protein Concentrate, Natural and Artificial Flavors, Sucralose, Acesulfame Potassium.",
    reviews: [
      {
        id: 101,
        userName: "JohnD",
        rating: 5,
        date: "2023-09-15",
        title: "Best protein I've ever used",
        comment:
          "I've tried many protein powders over the years, but this is by far the best. Mixes easily, tastes great, and gives me great results. Highly recommend!",
      },
      {
        id: 102,
        userName: "FitnessFanatic",
        rating: 4,
        date: "2023-08-22",
        title: "Great value for the quality",
        comment:
          "The protein quality is excellent, and it's helped my recovery significantly. Only giving 4 stars because the chocolate flavor is a bit too sweet for my taste.",
      },
      {
        id: 103,
        userName: "GymGuru",
        rating: 5,
        date: "2023-07-10",
        title: "Perfect for post-workout",
        comment:
          "This protein mixes perfectly and tastes amazing. I've seen significant improvements in my recovery since starting with this product. Will definitely buy again!",
      },
    ],
  },

  // PLANT PROTEINS
  {
    id: 3,
    slug: "organic-pea-protein",
    name: "Organic Pea Protein",
    price: 1199,
    salePrice: 999,
    images: [
      { id: 1, src: "/images/pea-protein-1.jpg", alt: "Pea protein container" },
      {
        id: 2,
        src: "/images/pea-protein-2.jpg",
        alt: "Pea protein nutritional facts",
      },
    ],
    description:
      "Our plant-based pea protein is derived from high-quality yellow peas, providing 24g of complete protein per serving. Perfect for vegans and those with dairy allergies.",
    features: [
      "24g plant protein per serving",
      "Complete amino acid profile",
      "Easily digestible",
      "100% vegan",
      "Non-GMO certified",
      "Free from common allergens",
    ],
    flavors: [
      { id: 1, name: "Chocolate", isAvailable: true },
      { id: 2, name: "Vanilla", isAvailable: true },
      { id: 3, name: "Unflavored", isAvailable: true },
    ],
    sizes: [
      {
        id: 1,
        name: "1kg (30 servings)",
        price: 999,
        originalPrice: 1199,
        stock: 20,
      },
      {
        id: 2,
        name: "2kg (60 servings)",
        price: 1899,
        originalPrice: 2199,
        stock: 10,
      },
    ],
    nutritionFacts: {
      servingSize: "33g (1 scoop)",
      calories: 120,
      nutrients: [
        {
          name: "Total Fat",
          amount: "2g",
          dailyValue: "3%",
        },
        {
          name: "Saturated Fat",
          amount: "0.5g",
          dailyValue: "3%",
        },
        {
          name: "Trans Fat",
          amount: "0g",
        },
        {
          name: "Cholesterol",
          amount: "50mg",
          dailyValue: "17%",
        },
        {
          name: "Sodium",
          amount: "330mg",
          dailyValue: "50%",
        },
        {
          name: "Total Carbohydrate",
          amount: "1g",
          dailyValue: "1%",
          subNutrients: [
            {
              name: "Dietary Fiber",
              amount: "0g",
              dailyValue: "0%",
            },
            {
              name: "Total Sugars",
              amount: "0g",
            },
            {
              name: "Includes Added Sugars",
              amount: "0g",
              dailyValue: "0%",
            },
          ],
        },
        {
          name: "Protein",
          amount: "24g",
          dailyValue: "48%",
        },
        {
          name: "Vitamin D",
          amount: "0mcg",
          dailyValue: "0%",
        },
        {
          name: "Calcium",
          amount: "170mg",
          dailyValue: "15%",
        },
        {
          name: "Iron",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Potassium",
          amount: "125mg",
          dailyValue: "2%",
        },
      ],
    },
    rating: 4.5,
    reviewCount: 76,
    category: "proteins",
    subcategory: "pea",
    stock: 30,
    isNew: true,
    tags: ["protein", "plant-based", "vegan", "pea protein"],
    discount: 17,
    sku: "PRTN-PEA-003",
    inStock: true,
    ingredients:
      "Pea Protein, Natural and Artificial Flavors, Sucralose, Acesulfame Potassium.",
    reviews: [
      {
        id: 101,
        userName: "JohnD",
        rating: 5,
        date: "2023-09-15",
        title: "Best protein I've ever used",
        comment:
          "I've tried many protein powders over the years, but this is by far the best. Mixes easily, tastes great, and gives me great results. Highly recommend!",
      },
      {
        id: 102,
        userName: "FitnessFanatic",
        rating: 4,
        date: "2023-08-22",
        title: "Great value for the quality",
        comment:
          "The protein quality is excellent, and it's helped my recovery significantly. Only giving 4 stars because the chocolate flavor is a bit too sweet for my taste.",
      },
      {
        id: 103,
        userName: "GymGuru",
        rating: 5,
        date: "2023-07-10",
        title: "Perfect for post-workout",
        comment:
          "This protein mixes perfectly and tastes amazing. I've seen significant improvements in my recovery since starting with this product. Will definitely buy again!",
      },
    ],
  },

  // VITAMINS
  {
    id: 4,
    slug: "daily-multivitamin-complex",
    name: "Daily Multivitamin Complex",
    price: 899,
    salePrice: 799,
    images: [
      { id: 1, src: "/images/multivitamin-1.jpg", alt: "Multivitamin bottle" },
      {
        id: 2,
        src: "/images/multivitamin-2.jpg",
        alt: "Multivitamin nutritional facts",
      },
    ],
    description:
      "Our comprehensive multivitamin formula provides 100% of your daily essential vitamins and minerals in one convenient tablet. Supports overall health, immunity and wellbeing.",
    features: [
      "23 essential vitamins and minerals",
      "Supports immune function",
      "Promotes energy production",
      "Vegetarian friendly",
      "Once-daily dosage",
    ],
    flavors: [{ id: 1, name: "Unflavored", isAvailable: true }],
    sizes: [
      { id: 1, name: "60 tablets", price: 799, originalPrice: 899, stock: 35 },
      {
        id: 2,
        name: "120 tablets",
        price: 1499,
        originalPrice: 1699,
        stock: 20,
      },
    ],
    rating: 4.7,
    reviewCount: 112,
    category: "vitamins",
    subcategory: "daily",
    stock: 55,
    isPopular: true,
    tags: ["vitamins", "daily", "health", "immunity"],
    discount: 12,
    sku: "MULT-004",
    inStock: true,
    ingredients:
      "Vitamin A, Vitamin C, Vitamin D3, Vitamin E, Vitamin K, Thiamine, Riboflavin, Niacin, Vitamin B6, Folate, Vitamin B12, Biotin, Calcium, Iron, Magnesium, Zinc, Selenium, Copper, Manganese, Potassium, Sodium, Chloride, Chromium, Molybdenum, Iodine, Caffeine, Taurine, L-Carnitine, Inositol, PABA, L-Glutamine, L-Arginine, L-Glycine, L-Proline, L-Alanine, L-Aspartic Acid, L-Cysteine, L-Glutamic Acid, L-Histidine, L-Isoleucine, L-Leucine, L-Lysine, L-Methionine, L-Phenylalanine, L-Threonine, L-Tryptophan, L-Valine, L-Tyrosine, Pyridoxine, Pyridine, Cyanocobalamin, Folic Acid, D-Biotin, D-Calcium Pantothenate, D-Choline, D-Inositol, D-Methionine, D-Phenylalanine, D-Pyridoxine, D-Riboflavin, D-Threonine, D-Tryptophan, D-Valine, D-Xylitol, L-Ascorbic Acid, L-Glutamic Acid, L-Hydroxyproline, L-Isomalt, L-Lactic Acid, L-Malic Acid, L-Mannitol, L-Pyrroloquinoline Carboxylic Acid, L-Sorbitol, L-Threonine, L-Xylitol, Sucralose, Acesulfame Potassium.",
    nutritionFacts: {
      servingSize: "1 tablet",
      calories: 0,
      nutrients: [
        {
          name: "Total Fat",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Saturated Fat",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Trans Fat",
          amount: "0g",
        },
        {
          name: "Cholesterol",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Sodium",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Total Carbohydrate",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Protein",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Vitamin A",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Vitamin C",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Vitamin D",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Vitamin E",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Vitamin K",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Thiamine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Riboflavin",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Niacin",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Vitamin B6",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Folate",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Vitamin B12",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Biotin",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Calcium",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Iron",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Magnesium",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Zinc",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Selenium",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Copper",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Manganese",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Potassium",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Sodium",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Chloride",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Chromium",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Molybdenum",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Iodine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Caffeine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Taurine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Inositol",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "PABA",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Glutamine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Arginine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Glycine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Proline",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Alanine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Aspartic Acid",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Cysteine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Glutamic Acid",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Histidine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Isoleucine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Leucine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Lysine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Methionine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Phenylalanine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Threonine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Tryptophan",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Valine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Tyrosine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Pyridoxine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Pyridine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Cyanocobalamin",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Biotin",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Calcium Pantothenate",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Choline",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Inositol",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Methionine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Phenylalanine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Pyridoxine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Riboflavin",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Threonine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Tryptophan",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Valine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "D-Xylitol",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Ascorbic Acid",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Hydroxyproline",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Isomalt",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Lactic Acid",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Malic Acid",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Mannitol",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Pyrroloquinoline Carboxylic Acid",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Sorbitol",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Threonine",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Xylitol",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Sucralose",
          amount: "100%",
          dailyValue: "0%",
        },
        {
          name: "Acesulfame Potassium",
          amount: "100%",
          dailyValue: "0%",
        },
      ],
    },
  },

  // PERFORMANCE
  {
    id: 5,
    slug: "pre-workout-energy-booster",
    name: "Pre-Workout Energy Booster",
    price: 999,
    salePrice: 849,
    images: [
      { id: 1, src: "/images/pre-workout-1.jpg", alt: "Pre-workout container" },
      { id: 2, src: "/images/pre-workout-2.jpg", alt: "Pre-workout in use" },
    ],
    description:
      "Our advanced pre-workout formula combines caffeine, beta-alanine, and L-citrulline to enhance energy, focus, and pump during workouts. Take your training to the next level.",
    features: [
      "200mg caffeine per serving",
      "Enhances energy and focus",
      "Increases blood flow and pump",
      "Delays muscle fatigue",
      "No artificial colors",
    ],
    flavors: [
      { id: 1, name: "Blue Raspberry", isAvailable: true },
      { id: 2, name: "Fruit Punch", isAvailable: true },
      { id: 3, name: "Watermelon", isAvailable: true },
    ],
    sizes: [
      {
        id: 1,
        name: "300g (30 servings)",
        price: 849,
        originalPrice: 999,
        stock: 25,
      },
      {
        id: 2,
        name: "600g (60 servings)",
        price: 1599,
        originalPrice: 1899,
        stock: 15,
      },
    ],
    nutritionFacts: {
      servingSize: "10g",
      servingsPerContainer: 30,
      calories: 5,
      protein: 0,
      fat: 0,
      carbs: 1,
      sugar: 0,
      sodium: 20,
    },
    rating: 4.6,
    reviewCount: 98,
    category: "performance",
    subcategory: "pre-workout",
    stock: 40,
    isOnSale: true,
    tags: ["performance", "pre-workout", "energy", "focus"],
    discount: 15,
    sku: "PRE-NRG-005",
    inStock: true,
    ingredients:
      "Caffeine Anhydrous, Beta-Alanine, L-Citrulline Malate, Natural and Artificial Flavors, Taurine, Silicon Dioxide, Sucralose, Acesulfame Potassium, FD&C Red #40.",
  },

  // WEIGHT MANAGEMENT
  {
    id: 6,
    slug: "thermogenic-fat-burner",
    name: "Thermogenic Fat Burner",
    price: 1299,
    salePrice: 1099,
    images: [
      { id: 1, src: "/images/fat-burner-1.jpg", alt: "Fat burner container" },
      { id: 2, src: "/images/fat-burner-2.jpg", alt: "Fat burner capsules" },
    ],
    description:
      "Our thermogenic formula combines green tea extract, caffeine, and L-carnitine to boost metabolism and support fat loss while maintaining energy levels throughout the day.",
    features: [
      "Boosts metabolism",
      "Increases thermogenesis",
      "Provides clean energy",
      "Supports appetite control",
      "No proprietary blends",
    ],
    flavors: [{ id: 1, name: "Unflavored", isAvailable: true }],
    sizes: [
      {
        id: 1,
        name: "60 capsules",
        price: 1099,
        originalPrice: 1299,
        stock: 30,
      },
      {
        id: 2,
        name: "120 capsules",
        price: 1999,
        originalPrice: 2299,
        stock: 20,
      },
    ],
    rating: 4.4,
    reviewCount: 85,
    category: "weight",
    subcategory: "fat-burners",
    stock: 50,
    tags: ["weight loss", "fat burner", "metabolism", "thermogenic"],
    discount: 15,
    sku: "FAT-BURN-006",
    inStock: true,
    ingredients:
      "Green Tea Extract, Caffeine Anhydrous, L-Carnitine, Natural and Artificial Flavors, Sucralose, Acesulfame Potassium.",
    nutritionFacts: {
      servingSize: "1 capsule",
      calories: 0,
      nutrients: [
        {
          name: "Total Fat",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Saturated Fat",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Trans Fat",
          amount: "0g",
        },
        {
          name: "Cholesterol",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Sodium",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Total Carbohydrate",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Protein",
          amount: "0g",
          dailyValue: "0%",
        },
        {
          name: "Vitamin D",
          amount: "0mcg",
          dailyValue: "0%",
        },
        {
          name: "Calcium",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Iron",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Potassium",
          amount: "0mg",
          dailyValue: "0%",
        },
        {
          name: "Green Tea Extract",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "Caffeine Anhydrous",
          amount: "100%",
          dailyValue: "100%",
        },
        {
          name: "L-Carnitine",
          amount: "100%",
          dailyValue: "100%",
        },
      ],
    },
  },

  // WELLNESS
  {
    id: 7,
    slug: "omega-3-fish-oil",
    name: "Omega-3 Fish Oil",
    price: 899,
    salePrice: 749,
    images: [
      { id: 1, src: "/images/omega-3-1.jpg", alt: "Omega-3 bottle" },
      { id: 2, src: "/images/omega-3-2.jpg", alt: "Omega-3 capsules" },
    ],
    description:
      "Our high-potency Omega-3 fish oil provides 1,000mg of combined EPA and DHA per serving to support heart health, brain function, and joint flexibility.",
    features: [
      "1,000mg EPA & DHA per serving",
      "Supports cardiovascular health",
      "Enhances brain function",
      "Promotes joint health",
      "Sustainably sourced",
      "Lemon flavored to prevent fishy aftertaste",
    ],
    flavors: [
      { id: 1, name: "Lemon", isAvailable: true },
      { id: 2, name: "Unflavored", isAvailable: true },
    ],
    sizes: [
      { id: 1, name: "90 softgels", price: 749, originalPrice: 899, stock: 40 },
      {
        id: 2,
        name: "180 softgels",
        price: 1399,
        originalPrice: 1699,
        stock: 25,
      },
    ],
    rating: 4.8,
    reviewCount: 152,
    category: "wellness",
    subcategory: "omega",
    stock: 65,
    isPopular: true,
    tags: ["wellness", "omega-3", "heart health", "brain health"],
    discount: 17,
    sku: "OMEGA-3-007",
    inStock: true,
    ingredients:
      "EPA and DHA, Lemon Flavor, Gelatin, Glycerin, Water, Natural Lemon Flavor, Mixed Tocopherols (to preserve freshness), Sucralose, FD&C Yellow #5, FD&C Blue #1.",
  },

  // STACKS
  {
    id: 8,
    slug: "muscle-building-stack",
    name: "Ultimate Muscle Building Stack",
    price: 3999,
    salePrice: 2999,
    images: [
      {
        id: 1,
        src: "/images/muscle-stack-1.jpg",
        alt: "Muscle building supplement stack",
      },
      {
        id: 2,
        src: "/images/muscle-stack-2.jpg",
        alt: "Muscle building supplements",
      },
    ],
    description:
      "Our comprehensive muscle building stack combines whey protein isolate, creatine monohydrate, pre-workout, and BCAAs to maximize your muscle growth and recovery.",
    features: [
      "Premium Whey Protein Isolate (2kg)",
      "Pure Creatine Monohydrate (300g)",
      "Pre-Workout Energy Booster (300g)",
      "BCAA Recovery Formula (300g)",
      "Free shaker bottle",
      "Training guide included",
    ],
    flavors: [
      { id: 1, name: "Chocolate Bundle", isAvailable: true },
      { id: 2, name: "Vanilla Bundle", isAvailable: true },
      { id: 3, name: "Mixed Flavors", isAvailable: true },
    ],
    sizes: [
      {
        id: 1,
        name: "1 Month Supply",
        price: 2999,
        originalPrice: 3999,
        stock: 10,
      },
    ],
    rating: 4.9,
    reviewCount: 48,
    category: "stacks",
    subcategory: "muscle",
    stock: 10,
    isOnSale: true,
    tags: ["stack", "muscle building", "bundle", "complete solution"],
    discount: 25,
    sku: "STACK-MUSCLE-008",
    inStock: true,
  },

  // NEW PRODUCTS
  {
    id: 9,
    slug: "vegan-protein-cookies",
    name: "Vegan Protein Cookies",
    price: 599,
    images: [
      {
        id: 1,
        src: "/images/protein-cookies-1.jpg",
        alt: "Protein cookies package",
      },
      { id: 2, src: "/images/protein-cookies-2.jpg", alt: "Protein cookies" },
    ],
    description:
      "Our delicious protein cookies pack 15g of plant protein per cookie with all-natural ingredients. The perfect on-the-go protein snack for any time of day.",
    features: [
      "15g plant protein per cookie",
      "100% vegan ingredients",
      "No artificial sweeteners",
      "Great taste and texture",
      "Individually wrapped for freshness",
    ],
    flavors: [
      { id: 1, name: "Chocolate Chip", isAvailable: true },
      { id: 2, name: "Double Chocolate", isAvailable: true },
      { id: 3, name: "Peanut Butter", isAvailable: true },
    ],
    sizes: [
      { id: 1, name: "Box of 12", price: 599, originalPrice: 599, stock: 50 },
      { id: 2, name: "Box of 24", price: 1099, originalPrice: 1099, stock: 30 },
    ],
    nutritionFacts: {
      servingSize: "60g (1 cookie)",
      servingsPerContainer: 12,
      calories: 220,
      protein: 15,
      fat: 10,
      carbs: 20,
      sugar: 5,
      sodium: 180,
    },
    rating: 4.5,
    reviewCount: 32,
    category: "new",
    subcategory: "",
    stock: 80,
    isNew: true,
    tags: ["protein", "vegan", "snack", "cookies", "new"],
    sku: "COOKIES-VEGAN-009",
    inStock: true,
  },
];

// Function to get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

// Function to get products by subcategory
export const getProductsBySubcategory = (
  category: string,
  subcategory: string
) => {
  return products.filter(
    (product) =>
      product.category === category && product.subcategory === subcategory
  );
};

// Function to get product by slug
export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

// Function to get new products
export const getNewProducts = (limit: number = 4) => {
  return products.filter((product) => product.isNew).slice(0, limit);
};

// Function to get popular products
export const getPopularProducts = (limit: number = 4) => {
  return products.filter((product) => product.isPopular).slice(0, limit);
};

// Function to get products on sale
export const getProductsOnSale = (limit: number = 4) => {
  return products
    .filter((product) => product.isOnSale || product.salePrice)
    .slice(0, limit);
};

// Get all products
export const getProducts = (): Product[] => {
  return products;
};

// Get a single product by ID
export const getProductById = (id: string | number): Product | undefined => {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return products.find((product) => product.id === numericId);
};

// Get related products (exclude current product)
export const getRelatedProducts = (
  id?: string | number,
  limit: number = 4
): Product[] => {
  if (!id) return products.slice(0, limit);

  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return products.filter((product) => product.id !== numericId).slice(0, limit);
};
