
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import {useEffect, useState} from "react";
import Clock from "./components/Clock";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // <-- this will be fired on component's loading

  }, []);
  const handleSubmit = (input, image) => {
    let note = {
      id: counter,
      text: input,
      image: image
    }
    setNotes([...notes, note]);
    setCounter(counter + 1);
  }

  const handleDelete = (id) => {
    console.log(notes)
    console.log(id)
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
    <div style={styles.container}>
      <Clock />
      <NoteInput onSubmit={handleSubmit}/>
      <NoteList data={notes} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: `rgba(120, 120, 120, 0.3)`,
    width: "100%",
    height: "100vh",
  }
}
export default App;
