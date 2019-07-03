const express = require("express");
const mongoose = require("mongoose");

const app = express();

//bodyParser
app.use(express.json());

// db
const db = require("./config/keys").mongoURI;

//connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
