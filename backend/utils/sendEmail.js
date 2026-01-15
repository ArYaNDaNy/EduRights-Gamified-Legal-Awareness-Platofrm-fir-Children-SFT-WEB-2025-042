const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create Transporter (Using Gmail for example, or Mailtrap for dev)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host/port for other providers
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your App Password (Not login password)
    },
  });

  // 2. Define Email Options
  const mailOptions = {
    from: `"EduRights Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message, // Plain text body
    // html: options.message // You can use HTML if you want pretty emails
  };

  // 3. Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;