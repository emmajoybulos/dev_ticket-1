const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const items = require("./routes/api/items");
const tickets = require("./routes/api/tickets");
const calendar = require("./routes/api/calendar");
const user = require("./routes/api/users");
const auth = require("./routes/api/auth");
const brands = require("./routes/api/brands");
const positions = require("./routes/api/positions");

const app = express();

// cors
app.use(cors());

//bodyParser
app.use(express.json());

// db
const db = config.get("mongoURI");

//connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", items);
app.use("/tickets", tickets);
app.use("/calendar", calendar);
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/brands", brands);
app.use("/api/positions", positions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
