const jwt = require("jsonwebtoken");

const accessTokenSecret = 'mysupercoolsecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

const authenticateWithClaims = (claims) => (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log("Does include? " + user.claims.includes(claims));
        //NOTE: Changed the code of this portion to make it work with the claims
        if (user.claims.includes(claims)) {
            req.user = user;
            return next();
        }
        return res.sendStatus(403);
    });
}

module.exports = { authenticateJWT, authenticateWithClaims };