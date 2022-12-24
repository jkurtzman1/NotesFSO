import Note from "./components/Note";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () =>
{
  // State controllers
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("A New Note...");
  const [showAll, setShowAll] = useState(true);

  //Effect to run once each re-render to get the data from the db.json server
  useEffect(() => {
    axios.get("http://localhost:3001/notes")
    .then(response => {
      setNotes(response.data);
    })
  }, []);
  const notesToShow = showAll ? notes : notes.filter(note => note.import);

  // Here's the branch test
  const addNote = (event) =>
  {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      import: Math.random() < 0.5
    };

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }
  //Controller for the text box as it is a controlled component
  const handleNoteChange = (event) =>
  {
    setNewNote(event.target.value);
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
            <Note key={note.id} note={note} />
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
