import React, {useRef, useState} from 'react';
import styles from "../styles/NoteInput.module.css"
const NoteInput = ({onSubmit}) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(undefined);

  const refImageInput = useRef();
  const updateInput = (e) => {
    setInput(e.target.value);
  }
  const handleFile = (e) => {
    setImage(e.target.files[0])
  }

  const submit = () => {
    onSubmit(input, image)

    refImageInput.current.value = "";
    refImageInput.current.type = "text";
    refImageInput.current.type = "file";
    setImage(undefined);
  }
  return (
    <div className={styles.container}>
      <input name="note_text" type="text" value={input} placeholder={"type your note"}
             onChange={updateInput} className={styles.input}/>

      <label className={styles.fileUpload}>
        <input type="file" accept="image/*" style={{display: "none"}}
               onChange={handleFile}
                ref={refImageInput}/>
        Image +
      </label>
      <button className={styles.add} onClick={submit}>+</button>
    </div>
  );
};

export default NoteInput;