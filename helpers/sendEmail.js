const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDGRID_API_KEY, GMAIL_USER, GMAIL_PASSWORD } = process.env;

// sendgrid
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailUseSendgrid = async data => {
  try {
    const email = { ...data, from: GMAIL_USER };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

// nodemailer, use mail client like gmail, meta
const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: GMAIL_USER, pass: GMAIL_PASSWORD },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmailUseGmail = async data => {
  try {
    const email = { ...data, from: GMAIL_USER };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmailUseSendgrid, sendEmailUseGmail };
