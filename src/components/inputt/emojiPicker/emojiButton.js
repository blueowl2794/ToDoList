import styles from "./emojiPicker.module.scss";

export default function EmojiButton({handleInputChange2, emoji, onClick, inputRef }) {

  function handleOnClick() {
    // console.log("soy emoji007", emoji)
    onClick(emoji);
    // console.log("soy inputRef", inputRef)
    handleInputChange2(inputRef);
  }

  return (
    <button onClick={handleOnClick} className={styles.emojiButton}>
      {emoji.symbol}
    </button>
  );
}
