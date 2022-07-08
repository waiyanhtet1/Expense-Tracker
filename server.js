const express = require("express");
const morgan = require("morgan");
const dotnev = require("dotenv").config();
const colors = require("colors");
const path = require("path");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ express: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v2/transcations", require("./routes/transcation_route"));
app.use("/api/v2/user", require("./routes/user_route"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build/")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Set to production"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .blue.italic
  );
});
