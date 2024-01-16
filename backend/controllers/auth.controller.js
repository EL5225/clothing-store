const prisma = require("../libs/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar:
          "https://res.cloudinary.com/dbnzivsz9/image/upload/v1705377774/default_image_clothing_store.png",
        carts: {
          create: {
            name: `Cart of ${name}`,
            grand_total: 0,
          },
        },
      },
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    return res.status(200).json({
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone_number: user.phone_number,
        created_at: user.created_at,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
