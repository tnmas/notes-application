"use strict";
const client = require("../../storage/client");

module.exports.sessionUserSettings = (req, res, next) => {
    console.log("Wert von req.session.userSettings: " + req.session.userSettings);
    // default Wert oder aktueller Wert von der Session lesen
    if (req.session.userSettings === undefined) req.session.userSettings = {
        sortBy: 'importance',
        style: 'light',
        hideFinished: "false"
    };


    req.userSettings = req.session.userSettings;

    next();
};

module.exports.showIndex = function (req, res) {
    if (req.query["sortBy"]) req.session.userSettings.sortBy = req.query["sortBy"];
    if (req.query["style"]) req.session.userSettings.style = req.query["style"];
    if (req.query["hideFinished"]) req.session.userSettings.hideFinished = req.query["hideFinished"];

    const sortBy = req.session.userSettings.sortBy;
    const style = req.session.userSettings.style;
    const hideFinished = req.session.userSettings.hideFinished;

    // To Convert the Data from string to boolean (output from session is boolean)
    const hideFinishedForRender = hideFinished !== "false";

    // Invert for the correct value
    var styleForRender = (style === "light" ? "dark" : "light");

    let nameOfClassSortedByThis = " sortedByThis"
    let sortByImportance = sortBy === "importance" ? nameOfClassSortedByThis : "";
    let sortByCreateDate = sortBy === "createDate" ? nameOfClassSortedByThis : "";
    let sortByDueDate = sortBy === "dueDate" ? nameOfClassSortedByThis : "";
    const criteria = {sortBy: sortBy, hideFinishedForRender: hideFinishedForRender};
    client.getAll(criteria, function (err, notes) {
        res.render("index", {
            'notes': notes.notes,
            'css': style,
            'style': styleForRender,
            'hideFinished': hideFinishedForRender,
            'sortedByImportance': sortByImportance,
            'sortedByCreateDate': sortByCreateDate,
            'sortedByDueDate': sortByDueDate
        });
    });
}

module.exports.createNewNote = function (req, res) {
    res.render('newNote.hbs', {'css': req.session.userSettings.style});
}

module.exports.editNote = function (req, res) {
    client.getOne(req.params, function (err, note) {
        res.render('editNote.hbs', {'note': note, 'css': req.session.userSettings.style});
    });
}

module.exports.saveNewNote = function (req, res) {
    let note = req.body;
    note.createDate = String(Date.now());
    note.done = false;
    client.insert(note, function (err, note) {
        res.redirect("/");
    });
}

module.exports.updateNote = function (req, res) {
    let editNote = req.body;
    editNote.done = (editNote.done !== undefined);
    editNote.id = req.params.id;
    client.update(editNote, function (err, note) {
        res.redirect("/");
    });
}