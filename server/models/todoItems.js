const mongoose = require('mongoose');

const todoTask = new mongoose.Schema({
    item:{
    type:String,
    required: true
}
})

module.exports = mongoose.model('todo', todoTask);