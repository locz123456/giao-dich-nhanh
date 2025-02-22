const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (to, username, verifyLink) => {
    const subject = "Xác nhận Email"
    const html =
        `
            <h3>Chào ${username},</h3>
            <p>Vui lòng xác nhận email bằng cách nhấn vào link dưới đây:</p>
            <a href="${verifyLink}">Xác nhận Email</a>
          `
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: `<${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    });
};

module.exports = sendEmail;