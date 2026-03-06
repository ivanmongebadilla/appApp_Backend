import nodemailer from nodemailer;

const sendEmail = async options => {
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
    });

    // 2) Define email options

    // 3) Send email 
}