const { connect } = require("./src/utils/connectDB");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

connect();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

//ROUTES
const UserRoutes = require("./src/api/routes/User.routes");
const CamperRoutes = require("./src/api/routes/Camper.routes");

app.use("/api/v1/user/", UserRoutes);

app.use("/api/v1/camper/", CamperRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

app.use((req, res, error) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});
