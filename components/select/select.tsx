import { useRef, useState } from "react";
import { urlToHttpOptions } from "url";
import styles from "./select.module.css";

export function Select<valueType>(props: {
  options: { 
    key: string
    value: valueType
  }[]
  initialSelectedIndex: number
  onSelect: (selectedValue: valueType) => void
  className?: string
})  {

  const selectedRef = useRef(null);
  const [toggledState, setToggledState] = useState(false); // this determines whether or not the options are shown or not

  return <div className={styles.Select + " " + props.className}>
    <p 
      className={styles.selected}
      ref={selectedRef}
      onClick={() => {
        setToggledState(!toggledState);
      }}
    >
      {props.options[props.initialSelectedIndex].key}
    </p>
    <ul 
      className={styles.options}
      style={{
        display: toggledState ? "block" : "none"
      }}
    >
      {
        props.options.map((option) => {
          return <li key={option.key} onClick={
            () => {
              const selectedElement: any = selectedRef.current;
              selectedElement.innerHTML = option.key;

              setToggledState(false); // hiding the options.

              props.onSelect(option.value);
            }
          }>
            {option.key}
          </li>
        })
      } 
    </ul>
  </div>;

}