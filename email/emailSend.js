const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const dotnev = require("dotenv");
dotnev.config();
const handlebarsOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };
  
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      // user: "aatif13698@gmail.com",
      // user : "spkdevteam@gmail.com",//changed by rahul
      user : process.env.EMAIL_FROM,//changed by rahul
      // pass: "rnklewuogajnhsgt",
      // pass : "ysbj yxrt qoqb ybho",//changed by rahul
      pass : process.env.EMAIL_PASS,
    },
  });
  
  transporter.use("compile", hbs(handlebarsOptions));
  

// mail sender
exports.mailSender  = async (mailOptions) => {
   
    await  transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log("Email not send", error);
        } else {
        console.log("mail sent");
        }
      });
}


exports.formatCustomDate = (date) =>  {
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
  return date.toLocaleString('en-US', options);
}