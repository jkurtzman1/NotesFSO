import Note from "./components/Note";
import { useEffect, useState } from "react";
import noteService from "./services/notes.js"
const App = () =>
{
  // State controllers
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("A New Note...");
  const [showAll, setShowAll] = useState(true);

  //Effect to run once each re-render to get the data from the db.json server
  useEffect(() => {
    noteService.getAll()
    .then(initalNotes => {
      setNotes(initalNotes);
    })
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  // Here's the branch test
  const addNote = (event) =>
  {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    //setNotes(notes.concat(noteObject));
    //Using axios now to update the note object
    noteService.create(noteObject)
         .then(returnedNote => {setNotes([...notes, returnedNote])});
    setNewNote('');
  }
  //Controller for the text box as it is a controlled component
  const handleNoteChange = (event) =>
  {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = id => {
    //const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important: !note.important};

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    });

  }

  return(
    <>
      <div>
        <h1>Notes</h1>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Important" : "All"}
        </button>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
      </div>
      <div>
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default App;
