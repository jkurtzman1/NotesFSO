import Note from "./components/Note";
import Notification from "./components/Notification";
import { useEffect, useState } from "react";
import noteService from "./services/notes.js"

// This is my new Branch!
//Aint this so cool!

const Footer = () =>
{
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return(
    <div style={footerStyle}>
      <br />
      <em>Note App, Jason Kurtzman</em>
    </div>
  );
}

const App = () =>
{
  // State controllers
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("A New Note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Some Error...");

  //Effect to run once each re-render to get the data from the db.json server
  useEffect(() => {
    noteService.getAll()
    .then(initalNotes => {
      setNotes(initalNotes);
    })
  }, []);

  if(notes == null)
  {
    return null;
  }
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
    }).catch(error => {setErrorMessage(`Note ${note.content} was already deleted!`)
                       setTimeout(() => {setErrorMessage(null)}, 5000)
                       setNotes(notes.filter(n => n.id !== id))
    });

  }

  return(
    <>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
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
      <Footer />
    </>
  );
}

export default App;
