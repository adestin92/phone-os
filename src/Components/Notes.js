import React, { useState, useEffect } from "react";
import "./Notes.css";

const NotesComponent = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [activeNote, setActiveNote] = useState(null); // null = list view
  const [draft, setDraft] = useState({ title: "", body: "" });

  // Load notes from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Filter notes by search text
  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.body.toLowerCase().includes(search.toLowerCase()),
  );

  const startNewNote = () => {
    setDraft({ title: "", body: "" });
    setActiveNote("new");
  };

  const openNote = (note) => {
    setDraft(note);
    setActiveNote(note.id);
  };

  const saveNote = () => {
    if (activeNote === "new") {
      const newNote = { ...draft, id: Date.now() };
      setNotes([newNote, ...notes]);
    } else {
      setNotes(notes.map((n) => (n.id === activeNote ? draft : n)));
    }
    setActiveNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    setActiveNote(null);
  };

  // ===== List View =====
  if (activeNote === null) {
    return (
      <div className="notes-container">
        <div className="notes-header">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="notes-search"
          />
        </div>

        <div className="notes-list">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="note-item"
              onClick={() => openNote(note)}
            >
              <h4>{note.title || "Untitled"}</h4>
              <p>
                {note.body.slice(0, 40)}
                {note.body.length > 40 ? "…" : ""}
              </p>
            </div>
          ))}
          {filtered.length === 0 && <p className="empty">No notes found</p>}
        </div>
        <div className="notes-icon-container">
          <button className="new-note-btn" onClick={startNewNote}>
            <img className="icon-notes" src="./icon-notes.png" alt="New note" />
          </button>
        </div>
      </div>
    );
  }

  // ===== Edit/New View =====
  return (
    <div className="notes-editor">
      <input
        className="note-title"
        placeholder="Title"
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />
      <textarea
        className="note-body"
        placeholder="Start typing…"
        value={draft.body}
        onChange={(e) => setDraft({ ...draft, body: e.target.value })}
      />
      <div className="editor-actions">
        <button onClick={saveNote}>Save</button>
        {activeNote !== "new" && (
          <button className="delete" onClick={() => deleteNote(activeNote)}>
            Delete
          </button>
        )}
        <button onClick={() => setActiveNote(null)}>Back</button>
      </div>
    </div>
  );
};

export default NotesComponent;
