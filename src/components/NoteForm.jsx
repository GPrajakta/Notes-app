import { useState } from 'react'

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (title.trim() === '') return
    onAdd(title, content)
    setTitle('')
    setContent('')
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type="submit" className="btn btn-primary">Add note</button>
    </form>
  )
}

export default NoteForm