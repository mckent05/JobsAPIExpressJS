const moongose = require("mongoose")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")


const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: 50,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6
    }
})

UserSchema.pre('save', async function() {
    const salt = await bycrpt.genSalt(10)
    this.password = bycrpt.hash(this.password, salt)
})

UserSchema.methods.createJWT = async function () {
    return jwt.sign({
        userId: this._id, name: this.name
    }, process.env.JWT_SECRET,
    { expiresIn: '1h'}
    )
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = bycrpt.compare(candidatePassword, this.password)
    return isMatch
}

const User = new moongose.model("User", UserSchema)

module.exports = User
    
