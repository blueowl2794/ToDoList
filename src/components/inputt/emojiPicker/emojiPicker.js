import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";

import styles from "./emojiPicker.module.scss";
import EmojiSearch from "./emojiSearch";
import EmojiList from "./emojiList";

export default forwardRef(({handleInputChange2}, inputRef) => {//forwardRef funcion especifica que recibe un callback(props, referencia)
  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState([...emojiList]);

  const containerRef = useRef(null);
  // console.log("inputdeemoji",inputRef)

  useEffect(() => {
    let target = document.querySelector('#search');
    // console.log("soy target", target)
    target.addEventListener("click", (e) => {
      // console.log("soy containerRef",containerRef)
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setEmojis([...emojiList]);
      }
    });
  }, []);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleEmojiClick(emoji) {
    const cursorPos = inputRef.current.selectionStart;
    const text = inputRef.current.value;
    const prev = text.slice(0, cursorPos);
    const next = text.slice(cursorPos);
    // console.log('text', text);

    inputRef.current.value = prev + emoji.symbol + next;
    inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
    inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
    inputRef.current.focus();
    // handleInputChange(text)
  }

  function handleSearch(e) {
    const q = e.target.value;

    if (!!q) {
      const search = emojiList.filter((emoji) => {
        return (
          emoji.name.toLowerCase().includes(q) ||
          emoji.keywords.toLowerCase().includes(q)
        );
      });

      setEmojis([...search]);
    } else {
      setEmojis([...emojiList]);
    }
  }

  return (
    <div id="search" ref={containerRef} style={{ /*width:"1em", height:"1em", position:"relative",top:"1.44em",left:"8em",*/ }}>
      <button className={styles.emojiPickerButton} onClick={handleClick}>
        😊
      </button>
      {isOpen ? (
        <div className={styles.emojiPickerContainer}>
          <EmojiSearch onSearch={handleSearch} />
          <EmojiList>
            {emojis.map((emoji) => (
              <EmojiButton
                key={emoji.symbol}
                emoji={emoji}
                onClick={handleEmojiClick}
                handleInputChange2={handleInputChange2}
                inputRef={inputRef}
              />
            ))}
          </EmojiList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});
