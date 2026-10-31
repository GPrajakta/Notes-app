import { useState } from 'react'

function NoteCard({ id, title, content, date, onDelete, onUpdate }) {
  const [pinned, setPinned] = useState(false)
  const [likes, setLikes] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editContent, setEditContent] = useState(content)

  function handleSave() {
    if (editTitle.trim() === '') return
    onUpdate(id, editTitle, editContent)
    setIsEditing(false)
  }

  function handleCancel() {
    setEditTitle(title)
    setEditContent(content)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="note-card editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <br />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <br />
        <div className="note-actions">
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-primary" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`note-card ${pinned ? 'pinned' : ''}`}>
      <h3>{pinned ? '📌 ' : ''}{title}</h3>
      <p>{content}</p>
      <small className="note-date">{date}</small>
      <div className="note-actions">
        <button className="btn btn-ghost" onClick={() => setPinned(!pinned)}>
          {pinned ? 'Unpin' : 'Pin'}
        </button>
        <button className="btn btn-ghost" onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
        <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
      )
}

export default NoteCard