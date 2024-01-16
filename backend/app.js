require("dotenv").config();
const express = require("express");
const router = require("./router");
const { notFoundHandler, internalError } = require("./middlewares");
const cors = require("cors");
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(notFoundHandler);
app.use(internalError);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
