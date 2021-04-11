const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();


module.exports.generateToken = () => {
    return jwt.sign({ username: "admin", userRights: ["admin"] }, process.env.TOKEN_SECRET, { expiresIn: '7200s' });
}

console.log(this.generateToken())