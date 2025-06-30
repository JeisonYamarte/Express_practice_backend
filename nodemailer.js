const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'jeisonjoseyamartenaranjo@gmail.com',
    pass: 'qrexsoyjcaezftsn',
  }
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: "jeisonyamartedev@gmail.com",
    subject: "Funciona nodemailer?", // Subject line
    text: "Hello otro yo", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})();
