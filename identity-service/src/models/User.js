const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = await argon2.hash(this.password);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Method to verify password
userSchema.methods.verifyPassword = async function(password) {
    return await argon2.verify(this.password, password);
};

// Method to generate JWT
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { id: this._id, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const User = mongoose.model('User', userSchema);
module.exports = User;