const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const Note = new Schema({
    _id: {type: Number, default: 0, required: true, unique: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    importance: {type: String, required: true},
    createDate: {type: String, required: true},
    dueDate: {type: String, required: true},
    done: {type: Boolean}
});

autoIncrement.initialize(mongoose.connection);
Note.plugin(autoIncrement.plugin, "Note");


module.exports = mongoose.model('Note', Note);