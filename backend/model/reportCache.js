// models/ReportCache.js
const mongoose = require('mongoose');
const User=require('../model/user')
const reportCacheSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  report:      { type: String },           // the markdown string
  jobsHash:    { type: String },           // hash of job list at generation time
  generatedAt: { type: Date },             // when it was made
});

module.exports = mongoose.model('ReportCache', reportCacheSchema);