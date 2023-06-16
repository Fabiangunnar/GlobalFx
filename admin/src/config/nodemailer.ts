// create reusable transporter object using the default SMTP transport
import nodemailer from "nodemailer";
const email = process.env.EMAIL;
const email2 = process.env.EMAIL_TWO;

const pass = process.env.EMAIL_PASS;
export let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email, // generated ethereal user
    pass, // generated ethereal password
  },
});

export const mailOptions = {
  from: email2,
  to: email,
};
