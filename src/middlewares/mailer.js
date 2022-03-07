require("dotenv").config({ path: "./src/.env" });

const nodemailer = require("nodemailer");
const EMAIL_ADRESS = process.env.EMAIL_ADRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const createAccountMail = async (userEmail) => {
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    logger: false,
    debug: false,
    secureConnection: false,
    auth: {
      user: `${EMAIL_ADRESS}`,
      pass: `${EMAIL_PASSWORD}`,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });
  const Options = {
    from: `ChatSystem`,
    to: userEmail,
    subject: "Account Creation",
    text: "Your account has been Successfully Created",
    html: `<font color="black">
                    <center>
                        <h2> Congratulations Your account has been Successfully Created </h2><br>
                    </center>
              </font>`,
  };

  Transporter.sendMail(Options, (err) => {
    if (!err) {
      console.log(`Mail has been Send to ${userEmail}.`);
      Transporter.close();
    } else {
      console.log(`Mail sending Failed .. !`, err);
      Transporter.close();
    }
  });
};

const updateAccountMail = async (userEmail) => {
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    logger: false,
    debug: false,
    secureConnection: false,
    auth: {
      user: `${EMAIL_ADRESS}`,
      pass: `${EMAIL_PASSWORD}`,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });
  const Options = {
    from: `ChatSystem`,
    to: userEmail,
    subject: "Account Information Update",
    text: "Your account ingformation has been Successfully Updated",
    html: `<font color="black">
                    <center>
                        <h2> Congratulations Your account information has been Successfully Updated </h2><br>
                    </center>
              </font>`,
  };

  Transporter.sendMail(Options, (err) => {
    if (!err) {
      console.log(`Mail has been Send to ${userEmail}.`);
      Transporter.close();
    } else {
      console.log(`Mail sending Failed .. !`, err);
      Transporter.close();
    }
  });
};

module.exports = { 
  createAccountMail,
  updateAccountMail,
};
