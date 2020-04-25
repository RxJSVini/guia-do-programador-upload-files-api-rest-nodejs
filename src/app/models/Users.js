const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config/jwt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String,
    role: { type: String, default: 'user' }

}, {
    timestamps: true
});

// Gera hash da senha antes de salvar no banco de dados
UserSchema.pre('save', function() {
    this.password = bcrypt.hash(this.password, 16)
})

// Checagem de senha
UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

// Retorna um JSON com os dados do usuário (name, email, role)
UserSchema.methods.getJson = function() {
    return {
        _id: this.id,
        name: this.username,
        email: this.email,
        role: this.role
    }
}

// Gera um token JWT
UserSchema.methods.generateToken = function() {
    return jwt.sign({
        id: this._id,
        expiresIn,
    }, secret);
};

// Retorna um JSON com os dados do usuário e o token JWT
UserSchema.methods.getAuthJson = function() {
    return {
        _id: this.id,
        name: this.username,
        email: this.email,
        role: this.role,
        token: this.generateToken()
    }
}



module.exports = mongoose.model('Users', UserSchema)