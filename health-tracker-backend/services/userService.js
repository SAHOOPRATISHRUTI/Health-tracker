const User = require('../models/User'); // Assuming you have a Mongoose model for User
const messages=require('../constants/constMessage')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')


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






module.exports = {
    registerUser,
    loginUser
};




