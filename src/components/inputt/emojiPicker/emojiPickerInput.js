import { useRef } from "react";
import EmojiPicker from "./emojiPicker";

import styles from "./emojiPicker.module.scss";

export default function EmojiPickerInput({handleInputChange, handleInputChange2, handleSubmit, title}) {
  const inputRef = useRef(null);//hook para acceder a la referencia de un objeto
  return (
    <div className={styles.inputContainer}>
      <EmojiPicker handleInputChange2={handleInputChange2} ref={inputRef} />
      <form  onSubmit={handleSubmit} >
        <span className={styles.span}>
          <input className={styles.todoCreateForm} placeholder={"description"} name={"description"} value={title.description} onChange={handleInputChange} ref={inputRef} />
          <input className={styles.todoCreateForm} placeholder={"title"} name={"title"} value={title.title} onChange={handleInputChange}  />
          <input value="Create todo" type={"submit"} className="buttonCreate" />
        </span>
      </form>
    </div>
  );
}
