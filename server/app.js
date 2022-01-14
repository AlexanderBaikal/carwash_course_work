require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();
const path = require("path");
const fillData = require("./models/fillData");

// parse application/json
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors({ origin: "http://localhost:8081", credentials: true }));
app.use("/api", require("./routes/index.routes"));
app.use(errorMiddleware); // Подключается последним

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await fillData();
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (error) {
    console.log("server error", error.message);
    process.exit(1);
  }
}

start();
