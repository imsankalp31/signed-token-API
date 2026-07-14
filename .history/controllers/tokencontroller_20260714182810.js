const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

exports.generateToken = (req, res) => {

    const { resourceId, expiresIn } = req.body;

    // Validation
    if (!resourceId) {
        return res.status(400).json({
            success: false,
            message: "resourceId is required."
        });
    }

    const token = jwt.sign(
        {
            rid: resourceId
        },
        SECRET,
        {
            expiresIn: expiresIn || 900
        }
    );

    res.status(201).json({
        success: true,
        token
    });

};

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