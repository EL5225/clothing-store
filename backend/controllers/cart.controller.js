const prisma = require("../libs/prisma");

const AddProductToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { product_id } = req.params;
    const { amount } = req.body;

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

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    if (amount > product.amount) {
      return res.status(400).json({
        message: "Amount must be less than or equal to the available amount",
      });
    }

    const existingProduct = await prisma.productsToCarts.findUnique({
      where: {
        product_id_cart_id: {
          product_id,
          cart_id: user?.carts?.id,
        },
      },
    });

    if (existingProduct) {
      const updatedProduct = await prisma.productsToCarts.update({
        where: {
          product_id_cart_id: {
            product_id,
            cart_id: user?.carts?.id,
          },
        },
        data: {
          amount: {
            increment: amount,
          },
        },
        include: {
          cart: true,
        },
      });

      const total_price = amount * product.price;
      const grand_total = updatedProduct?.cart?.grand_total + total_price;

      const updatedCart = await prisma.carts.update({
        where: {
          id: updatedProduct?.cart_id,
        },
        data: {
          grand_total,
          products: {
            update: {
              where: {
                product_id_cart_id: {
                  product_id,
                  cart_id: updatedProduct?.cart_id,
                },
              },
              data: {
                total_price: {
                  increment: total_price,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({
        message: "Product added to cart",
        data: updatedCart,
      });
    }

    const total_price = amount * product.price;
    const grand_total = user?.carts?.grand_total + total_price;

    const cart = await prisma.carts.update({
      where: {
        id: user?.carts?.id,
      },
      data: {
        grand_total,
        products: {
          create: {
            amount,
            total_price,
            product: {
              connect: {
                id: product_id,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await prisma.carts.findUnique({
      where: {
        id: user?.carts?.id,
      },
      include: {
        products: {
          select: {
            product_id: true,
            amount: true,
            total_price: true,
            created_at: true,
            product: {
              select: {
                image: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({
      message: "Get cart success",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const checkoutCarts = async (req, res, next) => {
  try {
    const user = req.user;

    const cartUser = await prisma.carts.findUnique({
      where: {
        id: user?.carts?.id,
      },
      include: {
        products: true,
      },
    });

    if (cartUser.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const cart = await prisma.carts.update({
      where: {
        id: user?.carts?.id,
      },
      data: {
        grand_total: 0,
      },
    });

    const cartProducts = await prisma.productsToCarts.findMany({
      where: {
        cart_id: user?.carts?.id,
      },
      select: {
        product_id: true,
        amount: true,
        total_price: true,
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    const createMany = cartProducts.map((product) => {
      return {
        amount: product.amount,
        total_price: product.total_price,
      };
    });

    const delivery = await prisma.delivery.create({
      data: {
        products: {
          createMany: {
            data: createMany,
          },
        },
        users: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    const deliveryPeoducts = await prisma.deliveryProducts.findMany({
      where: {
        delivery_id: delivery.id,
      },
    });

    deliveryPeoducts.map(async (deliver, i) => {
      await prisma.deliveryProducts.update({
        where: {
          id: deliver.id,
        },
        data: {
          products: {
            connect: {
              id: cartProducts[i].product_id,
            },
          },
        },
      });
    });

    await prisma.productsToCarts.deleteMany({
      where: {
        cart_id: user?.carts?.id,
      },
    });

    return res.status(200).json({
      message: "Checkout success",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  AddProductToCart,
  getCart,
  checkoutCarts,
};
