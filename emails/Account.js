const nodemailer = require('nodemailer')
require('dotenv').config();

const sender =  process.env.NODEMAILER_EMAIL
var transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:465,
  secure:true,
  auth: {
    user:sender,     
    pass: process.env.NODEMAILER_PASSWORD         
  }
});

const accountCreated = (username, email) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Thanks for joining in!',
    text: `Welcome to the App, ${username}. Let me know how you get along with the app.`
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) console.log(error);
  });
};

const accountDeleted = (username, email) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Sorry to see you go!',
    text: `GoodBye, ${username}. I hope to see you back sometime soon.`
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};
const passwordResetToken = (email, resetURL) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Reset Account Password',
    text: `You can reset your account password using this link  ${resetURL}  .Please update your password to get access to your account...  `
  };
  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

const passwordReset = (email, username, newPassword) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Reset Password Successfull',
    text: `Dear ${username}, your account password is reset successfully. Your new password is ${newPassword} . Please keep it save don't expose it to anyone. Have a nice day ~`
  };
  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

module.exports = {
  accountCreated,
  passwordResetToken,
  passwordReset,
  accountDeleted
};
