const NoteDB = require("./models/noteTakingApp");

class Note {
    constructor(title, description, importance, createDate, dueDate, done) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.createDate = createDate;
        this.dueDate = dueDate;
        this.done = done;
    }
}

function add(note_params, callback) {
    let note = new Note(note_params.title, note_params.description, note_params.importance, note_params.createDate, note_params.dueDate, note_params.done);
    let newNote = new NoteDB(note);
    newNote.save(function (err, newDoc) {
        if (callback) callback(err, newDoc);
    });
}

function deleteNote(id, callback) {
    NoteDB.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
        if (callback) callback(err, doc);
    });
}

function set(id, note, callback) {
    NoteDB.update({_id: id}, note, {}, function (err) {
        get(id, callback);
    });
}

function get(id, callback) {
    NoteDB.findOne({_id: id}, function (err, doc) {
        if (callback) callback(err, doc);
    });
}

function all(sortBy, hideFinished, callback) {
    let ascOrDesc = 1;
    if (sortBy === 'importance') ascOrDesc = -1;  // the highest importance should be on top

    let query = (hideFinished === true ? {done: false} : {});

    NoteDB.find(query).sort({[sortBy]: ascOrDesc}).exec(function (err, docs) {
        console.log(docs);
        if (callback) callback(err, {'notes': docs});
    });
}

module.exports = {add, deleteNote, set, get, all};
