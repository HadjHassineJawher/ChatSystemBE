require("dotenv").config({ path: "./src/.env" });

const nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');
const EMAIL_ADRESS = process.env.EMAIL_ADRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const path = require('path');
 
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

    const handlebarOptions = {
        viewEngine: {
          extName: ".hbs",
        partialsDir: path.resolve(__dirname, "mails"),
          defaultLayout: false,
        },
      viewPath:  path.resolve(__dirname, "mails"),
        extName: ".hbs",
  };
  
 Transporter.use("compile", hbs(handlebarOptions));

  const Options = {
    from: `ChatSystem`,
    to: userEmail,
    subject: "Account Creation",
    template :'accountCreation'
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
    text: "Your account information has been Successfully Updated",
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

const resetCodeMail = async (userEmail,code) => {
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

    const handlebarOptions = {
        viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve(__dirname, "mails"),
        defaultLayout: false,
        },
        viewPath:  path.resolve(__dirname, "mails"),
        extName: ".hbs",
  };
  
 Transporter.use("compile", hbs(handlebarOptions));

  const Options = {
    from: `ChatSystem`,
    to: userEmail,
    subject: "Reset Code",
    template: 'passwordResetCode',
    context: {
      Code: `${code}`
    }
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

const resetPasswordMail = async (userEmail) => {
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

    const handlebarOptions = {
        viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve(__dirname, "mails"),
        defaultLayout: false,
        },
        viewPath:  path.resolve(__dirname, "mails"),
        extName: ".hbs",
  };
  
 Transporter.use("compile", hbs(handlebarOptions));

  const Options = {
    from: `ChatSystem`,
    to: userEmail,
    subject: "Password Reset",
    template: 'passwordReset',
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
  resetCodeMail,
  resetPasswordMail
};
