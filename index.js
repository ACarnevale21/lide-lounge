const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware to process form data
app.use(express.urlencoded({ extended: false }));
app.use("/public/assets", express.static("assets"));
app.use(require("./routes/index"));

// Configure middleware to process form data
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/assets/:nombreImagen", (req, res) => {
  const nombreImagen = req.params.nombreImagen;
  res.sendFile(__dirname + "/assets/" + nombreImagen);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
