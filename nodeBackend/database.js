const mongoose = require('mongoose');
const bluebird = require('bluebird');
const mongoDB = 'mongodb://localhost:27017/nodeApi';
mongoose.Promise = bluebird;

module.exports = mongoose;
