import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

import Search from "./components/Search";
import Header from "./components/Header";
import NotesList from "./components/NotesList";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes-app-data", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
