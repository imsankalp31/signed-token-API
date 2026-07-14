const express = require("express");

const router = express.Router();


const {
    generateToken,
    verifyToken
} = require("../controllers/tokenController");


router.post("/token", generateToken);
router.post("/verify", verifyToken);

module.exports = router;