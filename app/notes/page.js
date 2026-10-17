
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  function addNote(e) {
    e.preventDefault();

    if (!note.trim()) {
      return;
    }

    setNotes((previousNotes) => [
      ...previousNotes,
      {
        id: Date.now(),
        text: note.trim(),
        completed: false,
      },
    ]);

    setNote("");
  }

  function toggleNote(id) {
    setNotes((previousNotes) =>
      previousNotes.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteNote(id) {
    setNotes((previousNotes) =>
      previousNotes.filter((item) => item.id !== id)
    );
  }

  function logout() {
    sessionStorage.removeItem("isLoggedIn");
    router.push("/");
  }

  return (
    <main className="notes-page">
      <header className="notes-header">
        <div>
          <p className="system-label">SYSTEM INTERFACE</p>

          <h1>QuestLog</h1>

          <p className="subtitle">
            Your journey. Your quests. Your progress.
          </p>
        </div>

        <button
          className="logout-button"
          type="button"
          onClick={logout}
        >
          EXIT SYSTEM
        </button>
      </header>

      <section className="quest-panel">
        <div className="panel-heading">
          <div>
            <p className="system-label">DAILY MISSIONS</p>
            <h2>Quest List</h2>
          </div>

          <span className="quest-count">
            {notes.filter((item) => item.completed).length}
            {" / "}
            {notes.length} CLEARED
          </span>
        </div>

        <form className="note-form" onSubmit={addNote}>
          <label htmlFor="note">NEW QUEST OBJECTIVE</label>

          <textarea
            id="note"
            placeholder="Enter your quest objective..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />

          <button type="submit">
            + REGISTER QUEST
          </button>
        </form>

        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◇</div>

              <h3>NO QUESTS AVAILABLE</h3>

              <p>
                The System awaits your next objective, Player.
              </p>
            </div>
          ) : (
            notes.map((item, index) => (
              <article
                key={item.id}
                className={`note-item quest-line ${
                  item.completed ? "quest-completed" : ""
                }`}
              >
                <div className="quest-index">
                  QUEST {String(index + 1).padStart(2, "0")}
                </div>

                <div className="quest-marker">
                  {item.completed ? "✓" : "!"}
                </div>

                <div className="quest-content">
                  <p className="quest-objective">
                    {item.text}
                  </p>

                  <span className="quest-status">
                    {item.completed
                      ? "QUEST CLEARED"
                      : "QUEST IN PROGRESS"}
                  </span>
                </div>

                <div className="quest-actions">
                  <button
                    className="complete-button"
                    type="button"
                    onClick={() => toggleNote(item.id)}
                  >
                    {item.completed ? "UNDO" : "CLEAR"}
                  </button>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteNote(item.id)}
                    aria-label={`Delete quest ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <p className="footer-text dashboard-footer">
        QUESTLOG SYSTEM · PLAYER STATUS: ACTIVE
      </p>
    </main>
  );
}
