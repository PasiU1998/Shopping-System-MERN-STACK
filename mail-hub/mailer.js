const sgMail = require("@sendgrid/mail");
const emailConfig = require("../config/email.config");
const mailTemplates = require("./email.templates");



sgMail.setApiKey("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");


const setConfigurationsAndSendEmail = (receiver, subject, mailBody, attachments) => {
    const mailOptions = {
        from: emailConfig.email, // Sender
        to: receiver, // List of receivers
        subject, // Subject line
        html: mailBody, // Mail body
        attachments,
    };
    return sgMail.send(mailOptions);
};

module.exports.sendNewAccountCreated = async (receiver, username, password) => {
    const mailSubject = "Welcome to Online Shopping";
    return setConfigurationsAndSendEmail(
        receiver,
        mailSubject,
        mailTemplates.newAccountCreated(username,password),
    );
};

module.exports.sendUpdatedPassword = async (receiver, username, password) => {
    const mailSubject = "Your Password had been recently changed.Please reply to this message if it is not you";
    return setConfigurationsAndSendEmail(
        receiver,
        mailSubject,
        mailTemplates.newAccountCreated(username,password),
    );
};
