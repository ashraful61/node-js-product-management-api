const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const productHandler = require("./routeHandler/productHandler");
const userHandler = require("./routeHandler/userHandler");

const port = process.env.PORT || 5000;

// express app initialization
const app = express();

const dotenv = require("dotenv").config();
app.use(express.json());
app.use(cors());

// database connection with mongoose
mongoose.set("strictQuery", false);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustertestashraf.z94m9ys.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    dbName: "ReduxSagaProduct",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connection successful"))
  .catch((err) => console.log(err));


// Application Routes

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//Product Route
app.use("/api/v1/product", productHandler);

//User Route
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening at port: ${port}`);
});
