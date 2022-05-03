const express = require("express");
const notes = express()
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("../helpers/util");

notes.get("/", (req, res) => {
    console.log('yaknow')
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    console.log('erik')
  const { text, title } = req.body;

  if (req.body) {
    const newNote = {
      text,
      title,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.status(200).json(`Note added successfully`);
  } else {
    res.status(404).send("Error in adding note");
  }
});

module.exports = notes;