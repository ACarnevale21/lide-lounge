const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Configure middleware to process form data
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes/index"));

// Configurar middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// Ruta para servir imágenes estáticas desde la carpeta "public"
app.get("/public/:img", (req, res) => {
  const img = req.params.img;
  res.sendFile(path.join(__dirname, "public", img));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
