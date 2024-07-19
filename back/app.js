const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const notesRoutes = require("./routes/notes");

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);

module.exports = app;
