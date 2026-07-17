const mongoose = require("mongoose");

const directorySchema = new mongoose.Schema(
{
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entity"
    },

    privateMetadata: {
        createdBy: String,
        internalNote: String
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Directory", directorySchema);