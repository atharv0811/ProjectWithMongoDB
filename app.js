const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("655de4e16a1f3be33b3bc421")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGOURL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Atharv",
          email: "atharv@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("Connected");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
