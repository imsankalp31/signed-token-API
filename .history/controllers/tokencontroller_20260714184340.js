const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const SECRET = process.env.SECRET_KEY;

exports.generateToken = (req, res) => {

    
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

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token is required."
        });
    }

    try {

        const decoded = jwt.verify(token, SECRET);

        res.status(200).json({
            success: true,
            valid: true,
            resourceId: decoded.rid,
            expiresAt: decoded.exp
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            valid: false,
            message: error.message
        });

    }

};