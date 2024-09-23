const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    email: { type: String, required: true, unique: true,  validator:validator.isEmail,
        message:`{VALUE} is not a valid Email .Please Enter a Valid Email`,},
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
