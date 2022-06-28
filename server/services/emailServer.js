const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abbasmirzawork@gmail.com',
    pass: 'skalvaeudgkwufhx'
  }
});


const sendEmail = (mailOptions)=>{
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
} 
const sender = {
    sendEmail,
}
module.exports =  sender;