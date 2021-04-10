const dotenv = require('dotenv');

dotenv.config();


module.exports.generateToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports.verifyToken = () => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    }))
}