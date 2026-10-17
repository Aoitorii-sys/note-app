export default function NoteItem({
  note,
  onDelete,
  onEdit,
}) {
  return (
    <div className="note-card">
      <div>
        <h2>{note.title}</h2>
        <p>{note.description}</p>
      </div>

      <div className="note-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}