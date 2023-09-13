const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

const env = require("dotenv").config();
if (env.error) {
  throw env.error;
}
const emailService = process.env.EMAIL_SERVICE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

router.post("/enviar-consulta", async (req, res) => {
  const { nombre, email, telefono, cantpersonas, empresa } = req.body;
  console.log("Data: ", req.body);
  const htmlContent = `
  <html>
  <body>
      <h1>Lide Lounge</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Cantidad de personas:</strong> ${cantpersonas}</p>
      <p><strong>Telefono:</strong> ${telefono}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
  </body>
  </html>
`;
  const transporter = nodemailer.createTransport({
    host: emailService,
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const info = await transporter.sendMail({
    from: "canrevaleagustinj@gmail.com",
    to: "agustincarnevale1@gmail.com",
    subject: "Nueva consulta | Lide Lounge",
    html: htmlContent,
  });
  console.log(info.messageId); // ID generated after successful email send
  res.redirect("/index.html");
});
module.exports = router;
