const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const items = require("./routes/api/items");
const tickets = require("./routes/api/tickets");

const app = express();

// cors
app.use(cors());

//bodyParser
app.use(bodyParser.json());

// db
const db = require("./config/keys").mongoURI;

//connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("api/items", items);
app.use("/tickets", tickets);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.listen(port, () => console.log(`Listening on port ${port}`));
