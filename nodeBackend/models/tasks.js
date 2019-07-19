const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
 userid: {
  type: String, 
  required: true
 },
 task: {
     type: String,
     required: true
 },
 completed: {
     type: Boolean
 }
});

module.exports = mongoose.model('Task', TaskSchema);