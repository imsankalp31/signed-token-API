const express = require("express");

const router = express.Router();

const {
    generateToken,
    verifyToken,
    syncState
} = require("../controllers/tokenController");

router.post("/token", generateToken);
router.post("/verify", verifyToken);

// Track A endpoint
router.post("/state/sync", syncState);

module.exports = router;