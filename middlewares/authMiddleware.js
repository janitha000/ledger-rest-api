const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    }))
}