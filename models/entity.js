const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema(
{
    referenceToken: {
        type: String,
        required: true,
        unique: true
    },

    directory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Directory"
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Entity", entitySchema);