const User = require('../models/User'); 
const OTP = require('../models/Otp')
const messages=require('../constants/constMessage')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const { sendEmail }= require('../services/emailService')

const registerUser = async (data) => {
    try{
        const {email,password} = data;

        const exitingUser = await User.findOne({email});

        if(exitingUser){
            return {isDuplicateEmail:true}
        }
        const HashedPassword = await bcrypt.hash(password,10);
        const user = new User({...data,password:HashedPassword})
        await user.save();

        return user;

    }
    catch(error){
        console.error('Error registering User',error)
        throw new Error(messages.registrationError)
    }
};

const loginUser = async(data) =>{
    try{
        const {email,password} = data;
        const user = await User.findOne({email});

        if(!user){
            return{error:messages.invaildCredentials}
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return{error:messages.invaildCredentials}
        }
        const token = jwt.sign({id:user._id},process.env.JWT_USER_SECRET,{expiresIn:'1h'})
        return {token,user}
    }
    catch(error){
        console.error('error Logging User',error)
        throw new Error(messages.loginUserError)
    }
}


const requestOTP = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(messages.userNotFound);
        }

        // Generate OTP and save it
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
        const otpData = new OTP({
            email,
            otp,
            expiresAt: Date.now() + 15 * 60 * 1000, // Valid for 15 minutes
        });
        await otpData.save();

        // Define email subject and mail data
        const emailSubject = "Your OTP for Health-tracker Verfication";
        const mailData = `<p>Your OTP is: ${otp}</p>`;

        // Send email with OTP
        await sendEmail(email, emailSubject, mailData);

        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error('Error requesting OTP:', error);
        throw new Error(messages.otpRequesterror);
    }
};



const verifyOTP = async (data) => {
    try {
        const { email, otp } = data;
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord || otpRecord.expiresAt < Date.now()) {
            throw new Error(messages.otpInvalidOrExpired);
        }

        // If valid, delete the OTP record
        await OTP.deleteOne({ _id: otpRecord._id });
        return { success: true };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error(messages.otpVerificationError);
    }
};


module.exports = {
    registerUser,
    loginUser,
    requestOTP,
    verifyOTP
};




