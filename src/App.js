import Note from "./components/Note";
import { useState } from "react";

const App = ({notesProp}) =>
{
  const [notes, setNotes] = useState(notesProp);
  const [newNote, setNewNote] = useState("A New Note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter(note => note.import);

  //console.log(notes);
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

  const handleNoteChange = (event) =>
  {
    console.log(event.target.value);
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