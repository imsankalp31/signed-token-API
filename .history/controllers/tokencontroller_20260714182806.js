const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;



exports.verifyToken = (req, res) => {

    const { token } = req.body;

    try {

        const decoded = jwt.verify(token, SECRET);

        res.json({
            valid: true,
            resourceId: decoded.rid,
            expiresAt: decoded.exp
        });

    } catch (error) {

        res.status(400).json({
            valid: false,
            reason: error.message
        });

    }

};