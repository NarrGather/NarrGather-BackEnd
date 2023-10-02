const nodemailer = require("nodemailer");
const path = require("path");

// Function to send OTP via email
async function sendOTPByEmail(email, otp) {
  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP host
    port: 587, // Replace with your SMTP port
    secure: false, // Set to true if using a secure connection (TLS/SSL)
    auth: {
      user: "dnrfian168@gmail.com", // Replace with your email address
      pass: "ovumjotoncsjiuzw", // Replace with your email password
    },
  });

  // Define email options
  const mailOptions = {
    from: "NarrGather <noreply@example.com>", //
    to: email, // Recipient's email address
    subject: "OTP Verification", // Email subject
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container {
          background-color: #ffffff;
          border-radius: 5px;
          padding: 20px;
          text-align: center;
          margin-bottom: 20px;
          width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        h1 {
          color: #000000;
          margin-top: 0;
        }
        p {
          margin-bottom: 20px;
        }
        .otp {
          background-color:#343957;
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          padding: 10px;
          border-radius: 5px;
          width: fit-content;
          margin: 0 auto;
        }
        .box-purple {
          background-color: #343957;
          width: 100%;
          padding : 18px;
          height: 150px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .img-logo {
          max-width: 100%;
          max-height: 100%;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>OTP Verification</h1>
        <p>Use the following OTP to verify your account:</p>
        <div class="otp">${otp}</div>
      </div>
      <div class="box-purple">
        <img class="img-logo" src="cid:logo" alt="logo" />
      </div>
    </body>
  </html>
    `,
    attachments: [
      {
        filename: "narrgather123.png",
        path: path.join(__dirname, "../public/images/narrgather1234.png"),
        cid: "logo",
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendOTPByEmail;
