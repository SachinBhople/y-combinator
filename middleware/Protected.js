const jwt = require("jsonwebtoken")

exports.AdminProtected = async (req, res, next) => {
    try {


        if (!req.cookies.auth) {
            return res.status(401).json({ meassage: "no Cookie Found" })
        }

        jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                console.log(err)

                return res.status(401).json({ message: "jwt Error" })
            }
            req.body.userId = decode.UserId
            req.user = decode.UserId

            next()
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ meassage: error.meassage || "user Protected error" })
    }
}
