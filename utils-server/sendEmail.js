const nodemailer = require("nodemailer");
// const sendGrid = require("nodemailer-sendgrid-transport");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};

module.exports = sendEmail;
