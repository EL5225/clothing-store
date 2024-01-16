const prisma = require("../libs/prisma");

const getDelivery = async (req, res, next) => {
  try {
    const user = req.user;
    const delivery = await prisma.delivery.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        products: {
          select: {
            amount: true,
            total_price: true,
            products: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
        users: {
          select: {
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Get delivery success",
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

const finishDelivery = async (req, res, next) => {
  try {
    const user = req.user;
    const { delivery_id } = req.params;

    const existDelivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!existDelivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    if (existDelivery.user_id !== user.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    if (existDelivery.status === true) {
      return res.status(400).json({
        message: "Delivery already finished",
      });
    }

    await prisma.delivery.update({
      where: {
        id: delivery_id,
      },
      data: {
        status: true,
      },
    });

    const deliveryProducts = await prisma.deliveryProducts.findMany({
      where: {
        delivery_id,
      },
      include: {
        products: true,
      },
    });

    const products = await prisma.products.findMany({
      where: {
        deliveries: {
          some: {
            delivery_id,
          },
        },
      },
    });

    deliveryProducts.map(async (product, i) => {
      await prisma.products.update({
        where: {
          id: products[i].id,
        },
        data: {
          amount: {
            decrement: product.amount,
          },
        },
      });
    });

    return res.status(200).json({
      message: "Pembelian success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDelivery,
  finishDelivery,
};
