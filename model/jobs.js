const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
},
{ timestamps: true })

const Jobs = new mongoose.model('Jobs', JobSchema)

module.exports = Jobs