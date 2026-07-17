const mongoose = require("mongoose");
const Entity = require("../models/Entity");
const Directory = require("../models/Directory");

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const SECRET = process.env.SECRET_KEY;

exports.generateToken = (req, res) => {

    const { expiresIn } = req.body;
    const resourceId = uuidv4();


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
exports.syncState = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token is required"
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, SECRET);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    const session = await mongoose.startSession();

    try {

        let entity;
        let directory;

        await session.withTransaction(async () => {const existing = await Entity.findOne({
        referenceToken: decoded.rid
    }).session(session);

    if (existing) {
        throw new Error("Reference already synced.");
    }

            entity = await Entity.create([{
                referenceToken: decoded.rid
            }], { session });

            directory = await Directory.create([{
                entity: entity[0]._id,
                privateMetadata: {
                    createdBy: "system",
                    internalNote: "Auto linked"
                }
            }], { session });

            entity[0].directory = directory[0]._id;

            await entity[0].save({ session });

            directory[0].entity = entity[0]._id;

            await directory[0].save({ session });

        });

        res.status(201).json({
            success: true,
            entity: entity[0],
            directory: directory[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    } finally {

        session.endSession();

    }

};