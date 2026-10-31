import { useState, useEffect } from 'react'
import Header from './components/Header'
import NoteCard from './components/NoteCard'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : []
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function handleAdd(title, content) {
    const newNote = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    }
    setNotes([newNote, ...notes])
  }

  function handleDelete(id) {
    setNotes(notes.filter((note) => note.id !== id))
  }

  function handleUpdate(id, newTitle, newContent) {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title: newTitle, content: newContent } : note
      )
    )
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
  <div className="app">
    <Header />
    <p className="stats">Showing {filteredNotes.length} of {notes.length} notes</p>

    <NoteForm onAdd={handleAdd} />

    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button className="btn btn-ghost" onClick={() => setSearch('')}>Clear</button>
      )}
    </div>

    {notes.length === 0 && <p className="empty">No notes yet. Add your first one above.</p>}
    {notes.length > 0 && filteredNotes.length === 0 && (
      <p className="empty">No notes match "{search}".</p>
    )}

    <div className="notes-grid">
      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          date={note.date}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>

    <Footer />
  </div>
)
}

export default App