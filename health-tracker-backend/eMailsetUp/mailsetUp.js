const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:`${process.env.USER}`,
        pass:`${process.env.PASS}`,
    }
});

const mailOptions = {
    from:`${process.env.USER}`,
    to:'',
    subject:'Your OTP for Health-tracker Verfication',
    html:'Welcome to Health-tracker',
    attachments:[]
};

module.exports = {
    transporter,mailOptions
}