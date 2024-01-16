const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  getAllUser,
  userMe,
  updateUser,
} = require("../controllers/user.controller");
const { authorizationHeader } = require("../middlewares");
const {
  createProduct,
  getAllProducts,
  deleteProductFromCart,
  updateProduct,
} = require("../controllers/product.controller");
const { imageUpload } = require("../libs/multer");
const {
  AddProductToCart,
  getCart,
  checkoutCarts,
} = require("../controllers/cart.controller");
const {
  getDelivery,
  finishDelivery,
} = require("../controllers/delivery.controller");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from API!",
  });
});

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);

// Users
router.get("/users", getAllUser);
router.get("/users/me", authorizationHeader, userMe);
router.patch(
  "/users/me",
  authorizationHeader,
  imageUpload.single("image"),
  updateUser
);

// Products
router.get("/products", getAllProducts);
router.post(
  "/products",
  authorizationHeader,
  imageUpload.single("image"),
  createProduct
);
router.patch(
  "/products/:id",
  authorizationHeader,
  imageUpload.single("image"),
  updateProduct
);

// Carts
router.get("/carts", authorizationHeader, getCart);
router.patch("/carts/:product_id", authorizationHeader, AddProductToCart);
router.delete(
  "/carts/:cart_id/products/:product_id",
  authorizationHeader,
  deleteProductFromCart
);
router.get("/carts/checkout", authorizationHeader, checkoutCarts);

// Delivery
router.get("/delivery", authorizationHeader, getDelivery);
router.get(
  "/delivery/:delivery_id/finish",
  authorizationHeader,
  finishDelivery
);

module.exports = router;
