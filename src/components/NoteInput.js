import React, {useState} from 'react';

const NoteInput = ({onSubmit}) => {
  const [input, setInput] = useState("");

  const updateInput = (e) => {
    setInput(e.target.value);
  }
  return (
    <div>
      <label>Description:</label>
      <input name="note_text" type="text" value={input} onChange={updateInput}/>

      <button onClick={() => onSubmit(input)}>Add Note</button>
    </div>
  );
};

export default NoteInput;