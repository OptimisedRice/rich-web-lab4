
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import {useState} from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [counter, setCounter] = useState(0);
  const handleSubmit = (input) => {
    let note = {
      id: counter + 1,
      text: input,
    }
    setNotes([...notes, note]);
    setCounter(counter + 1);
  }

  const handleDelete = (id) => {
    setNotes(notes.filter(note => {
      return note.id !== id
    }));
  }

  const handleEdit = (id, text) => {
    setNotes(notes.map(note => {
      if(note.id === id) note.text = text;
      return note;
    }))
  }
  return (
    <div className="App">
      <NoteInput onSubmit={handleSubmit}/>
      <NoteList data={notes} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  );
}

export default App;
