require("dotenv").config();

const express = require("express");
const restaurantRoutes = require("./routes/restaurants");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use("/api/restaurants", restaurantRoutes);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
