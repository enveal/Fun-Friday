const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Employee', employeeSchema)