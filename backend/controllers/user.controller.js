const prisma = require("../libs/prisma");
const cloudinary = require("../libs/cloudinary");

const getAllUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        phone_number: true,
        created_at: true,
      },
    });

    res.status(200).json({
      message: "Get all user success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const userMe = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: "Get user success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, email, phone_number, address } = req.body;

    const timestamp = Date.now();
    const public_id = `avatar_${timestamp}_clothing_store`;

    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", public_id },
        async (error, result) => {
          if (error) {
            if (error.message === "empty file") {
              const newProduct = await prisma.users.update({
                where: {
                  id: user.id,
                },
                data: {
                  name: name ? name : user.name,
                  email: email ? email : user.email,
                  phone_number: phone_number ? phone_number : user.phone_number,
                  address: address ? address : user.address,
                },
              });

              return res.status(200).json({
                message: "Update user success",
                data: newProduct,
              });
            }
          }

          const newProduct = await prisma.users.update({
            where: {
              id: user.id,
            },
            data: {
              name: name ? name : user.name,
              email: email ? email : user.email,
              avatar: result?.secure_url,
              phone_number: phone_number ? phone_number : user.phone_number,
              address: address ? address : user.address,
            },
          });

          return res.status(200).json({
            message: "Update user success",
            data: newProduct,
          });
        }
      )
      .end(req?.file?.buffer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  userMe,
  updateUser,
};
