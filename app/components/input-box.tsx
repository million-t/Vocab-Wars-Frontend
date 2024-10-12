import React, { forwardRef } from "react";
import style from "./input-box.module.css";

const InputCard = forwardRef<
  HTMLInputElement,
  { content: string; onInputChange: () => void }
>(({ content, onInputChange }, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.toUpperCase();
    onInputChange();
  };
  return (
    <div className={style.flipCard}>
      <div className={style.flipCardFront}>
        <input
          className={style.charInput}
          type="text"
          maxLength={1}
          defaultValue={content}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default InputCard;
