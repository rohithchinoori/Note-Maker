const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(express.json()); // This is sufficient for JSON bodies
app.use(bodyParser.json()); // Ensure body-parser is used correctly

app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
