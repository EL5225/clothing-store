const cloudinary = require("../libs/cloudinary");
const prisma = require("../libs/prisma");
const getPagination = require("../utils/pagination");

const createProduct = async (req, res, next) => {
  try {
    const { name, amount, price } = req.body;

    if (!name || !amount || !price) {
      return res.status(400).json({
        message: "Name, amount and price are required",
      });
    }

    const existingProduct = await prisma.products.findUnique({
      where: {
        name,
      },
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    const timestamp = Date.now();
    const public_id = `image_${timestamp}_clothing_store`;

    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", public_id },
        async (error, result) => {
          if (error) {
            res.status(500).json({
              message: error.message,
            });
          }

          const newProduct = await prisma.products.create({
            data: {
              name,
              amount: Number(amount),
              price: Number(price),
              image: result?.secure_url,
            },
          });

          res.status(201).json({
            message: "Product created successfully",
            data: newProduct,
          });
        }
      )
      .end(req?.file?.buffer);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    let { search, limit = 8, page = 1 } = req.query;
    limit = Number(limit);
    page = Number(page);

    const whereClause = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };

    const { _count } = await prisma.products.aggregate({
      where: whereClause,
      _count: { id: true },
    });

    const products = await prisma.products.findMany({
      where: whereClause,
      take: limit,
      skip: (page - 1) * limit,
    });

    const pagination = getPagination(req, _count.id, page, limit);

    return res.status(200).json({
      message: "Get all products success",
      data: { products, meta: pagination },
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, amount, price } = req.body;

    const product = await prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    const timestamp = Date.now();
    const public_id = `image_${timestamp}_clothing_store`;

    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", public_id },
        async (error, result) => {
          if (error) {
            if (error.message === "empty file") {
              const newProduct = await prisma.products.update({
                where: {
                  id,
                },
                data: {
                  name: name ? name : product.name,
                  amount: product ? product.amount : Number(amount),
                  price: product ? product.price : Number(price),
                },
              });

              return res.status(200).json({
                message: "Product updated successfully",
                data: newProduct,
              });
            }
          }

          const newProduct = await prisma.products.update({
            where: {
              id,
            },
            data: {
              name: name ? name : product.name,
              amount: product ? product.amount : Number(amount),
              price: product ? product.price : Number(price),
              image: result?.secure_url,
            },
          });

          return res.status(200).json({
            message: "Product created successfully",
            data: newProduct,
          });
        }
      )
      .end(req?.file?.buffer);
  } catch (error) {
    next(error);
  }
};

const deleteProductFromCart = async (req, res, next) => {
  try {
    const { cart_id, product_id } = req.params;

    if (!cart_id || !product_id) {
      return res.status(400).json({
        message: "Cart id and product id are required",
      });
    }

    const product = await prisma.products.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const productCart = await prisma.productsToCarts.findUnique({
      where: {
        product_id_cart_id: {
          product_id,
          cart_id,
        },
      },
    });

    if (!productCart) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    await prisma.carts.update({
      where: {
        id: cart_id,
      },
      data: {
        grand_total: {
          decrement: productCart.total_price,
        },
      },
    });

    const cart = await prisma.productsToCarts.delete({
      where: {
        product_id_cart_id: {
          cart_id,
          product_id,
        },
      },
    });

    return res.status(200).json({
      message: "Delete product from cart success",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProductFromCart,
  updateProduct,
};
