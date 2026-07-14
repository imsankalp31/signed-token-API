const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

exports.generateToken = (req, res) => {

    const { resourceId, expiresIn } = req.body;

    const token = jwt.sign(
        {
            rid: resourceId
        },
        SECRET,
        {
            expiresIn: expiresIn || 900
        }
    );

    res.json({
        token
    });

};
