const { Router } = require("express");
const { getUsers, getUserById, editUserData } = require("../controllers/users");
const { createRole, getRoles } = require("../controllers/role");
const { createCategory, getCategories, editCategoryData, getCategoryById } = require("../controllers/category");
const { createProduct, getProducts, getProductById, editProduct } = require("../controllers/product");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

// USERS

// Get Users
router.get("/users", getUsers);

// Get User by ID
router.get("/users/:id", getUserById);

// Edit User
router.put(
  "/users/:id",
  [
    check("username", "username is required").isLength({ min: 3 }),
    check("lastname", "lastname is required").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("birthday", "birthday is required").not().isEmpty(),
    check("position", "position is required").isLength({ min: 3 }),
    check("roles", "roles is required").not().isEmpty(),
    check("isActive", "This status is required").not().isEmpty(),
    validateFields,
  ],
  editUserData
);

// ROLES

// Create Role

router.post("/create/roles", [
    check("role_name", "Role name is required").not().isEmpty(),
    check("role_name", "Role name must be at least 3 characters").isLength({ min: 3 }),
    check("isActive", "Status is required").not().isEmpty(),
    validateFields
], createRole)

// Get Roles
router.get("/roles", getRoles);

// CATEGORIES

// Create Category

router.post(
  "/create/categories",
  [
    check("category_name", "Category name is required").not().isEmpty(),
    check(
      "category_name",
      "Category name must be at least 3 characters"
    ).isLength({ min: 3 }),
    check("category_description", "Category description is required")
      .not()
      .isEmpty(),
    check("isActive", "Status is required")
      .not()
      .isEmpty(),
    check(
      "category_description",
      "Category description must be at least 5 characters"
    ).isLength({
      min: 5,
    }),
    validateFields,
  ],
  createCategory
);

// Get Categories
router.get("/categories", getCategories);

// Get Category by ID
router.get("/categories/:id", getCategoryById);

// Edit Category

router.put(
  "/categories/:id",
  [
    check("category_name", "Category name is required").not().isEmpty(),
    check("category_name", "Category name must be at least 3 characters").isLength({ min: 3}),
    check("category_description", "Category description is required").not().isEmpty(),
    check(
      "category_description",
      "Category description must be at least 5 characters"
    ).isLength({
      min: 5,
    }),
    validateFields,
  ],
  editCategoryData
);

// PRODUCTS

// Create Product

router.post(
  "/create/products",
  [
    check("product_name", "Product name is required").not().isEmpty(),
    check(
      "product_name",
      "Product name must be at least 3 characters"
    ).isLength({ min: 3 }),
    check("description", "Product description is required").not().isEmpty(),
    check(
      "description",
      "Product description must be at least 5 characters"
    ).isLength({
      min: 5,
    }),
    check("price", "Price is required").not().isEmpty(),
    check("price", "Price must be minimum 1").isLength({ min: 1 }),
    check("quantity", "Quantity is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("isActive", "Status is required").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

// Get Products
router.get("/products", getProducts);

// Get product by ID
router.get("/products/:id", getProductById);

// Edit Product

router.put(
  "/products/:id",
  [
    check("product_name", "Product name is required").not().isEmpty(),
    check(
      "product_name",
      "Product name must be at least 3 characters"
    ).isLength({ min: 3 }),
    check("description", "Product description is required").not().isEmpty(),
    check(
      "description",
      "Product description must be at least 5 characters"
    ).isLength({
      min: 5,
    }),
    check("price", "Price is required").not().isEmpty(),
    check("price", "Price must be minimum 1").isLength({ min: 1 }),
    check("quantity", "Quantity is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("isActive", "Status is required").not().isEmpty(),
    validateFields,
  ],
  editProduct
);

module.exports = router;
