import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail", // ✅ Use 'service', not 'host'
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
