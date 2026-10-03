"use client";

import { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Check if the note already exists
  useEffect(() => {
    console.log("Notes updated:", notes);
  }, [notes]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter a title and description.");
      return;
    }

    // Check for existing note
    const existingNote = notes.find(
      (note) =>
        note.title.toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    if (existingNote) {
      alert("A note with this title already exists.");
      return;
    }

    if (editingId !== null) {
      // UPDATE
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
              }
            : note
        )
      );

      setEditingId(null);
    } else {
      // ADD
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setDescription("");
  }

  function handleDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
  }

  function handleCancel() {
    setTitle("");
    setDescription("");
    setEditingId(null);
  }

  return (
    <main className="container">
      <header className="header">
        <div>
          <p className="eyebrow">MY NOTES</p>
          <h1>
            Simple <span>Note App</span>
          </h1>
          <p className="subtitle">
            Create, organize, update, and manage your notes.
          </p>
        </div>
      </header>

      <section className="note-form-section">
        <div className="form-header">
          <h2>
            {editingId !== null ? "Update Note" : "Create a Note"}
          </h2>

          <span className="note-count">
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
          />

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {editingId !== null ? "Update Note" : "Add Note"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="notes-section">
        <div className="section-title">
          <h2>My Notes</h2>
          <p>All notes you have created</p>
        </div>

        {notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No notes yet</h3>
            <p>Create your first note above.</p>
          </div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
