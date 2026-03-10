import nodemailer from 'nodemailer';
import { AppError } from './apperror.js';

export const sendEmail = async (options, resetUrl) => {
    // Generate a test account
    const testAccount = await nodemailer.createTestAccount();

    console.log("Test account created:");
    console.log("  User: %s", testAccount.user);
    console.log("  Pass: %s", testAccount.pass);

    // 1) Create transporter
    const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
        user: testAccount.user,
        pass: testAccount.pass,
        },
        tls: {
            rejectUnauthorized: false //TODO just for DEV!!!
        }
    });

    const mailOptions = {
        from: `"Test App" <${testAccount.user}>`,
        to: options.email,
        subject: "Reset Password for appApp",
        text: `Password reset url: ${resetUrl}`,
        html: "<p>This message was sent using <b>Ethereal</b>.</p>",
    }

    try{
        // Send a test message
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview: %s", nodemailer.getTestMessageUrl(info));
    } 
    catch (err){
        throw(new AppError(err, 503))
    }

    // 2) Define email options

    // 3) Send email 
}