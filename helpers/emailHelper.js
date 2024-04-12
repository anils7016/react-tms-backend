// emailHelper.js
import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
  try {
    // Create a Nodemailer transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tms.kanhasoft@gmail.com",
        pass: "qaht sbfd mhkv xana",
      },
    });

    // Setup email data
    const mailOptions = {
      from: "dhruvil@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}
