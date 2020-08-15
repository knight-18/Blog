const mongoose = require("mongoose")
const User = require("./user")

const TableSchema = mongoose.Schema({
    event:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    },
    {
        timestamps: true
    }
)

const Table = mongoose.model('Table', TableSchema)

module.exports = Table