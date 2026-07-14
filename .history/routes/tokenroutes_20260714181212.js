const express = require("express");

const router = express.Router();

// Import controller functions
const {
    generateToken,
    verifyToken
} = require("../controllers/tokenController");

// Route to generate a token
router.post("/token", generateToken);

// Route to verify a token
router.post("/verify", verifyToken);

module.exports = router;