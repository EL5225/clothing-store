const prisma = require("../libs/prisma");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    message: "Not Found",
  });
};

const internalError = (err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
};

const authorizationHeader = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
      error: "missing token",
    });
  }

  if (authorization.split(" ")[0] !== "Bearer") {
    return res.status(400).send({
      auth: false,
      message: "Bad Request",
      errors: "invalid token",
    });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        error: err.message,
      });
    }

    req.user = await prisma.users.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        phone_number: true,
        address: true,
        carts: true,
        deliveries: {
          select: {
            id: true,
            status: true,
            created_at: true,
          },
        },
      },
    });
    next();
  });
};

module.exports = {
  notFoundHandler,
  internalError,
  authorizationHeader,
};
