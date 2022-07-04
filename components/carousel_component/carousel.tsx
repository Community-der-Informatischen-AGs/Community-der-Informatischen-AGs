import { Circle } from "phosphor-react";
import { ReactNode, useEffect, useState } from "react";
import styles from "./carousel.module.css";

export const Carousel = (props: {
  children: ReactNode[],
  uniqueClassName: string,
  initialSelectedIndex: number
}) => {

  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(props.initialSelectedIndex);
  
  return <div className={styles.Carousel + " " + props.uniqueClassName}>
    <ul className={styles.imageList}> 
      {
        props.children.map((element, index) => {
          return <li key={index} id={props.uniqueClassName + index}>
            {element}
          </li>;
        })
      }
    </ul>
    <ul className={styles.selectorList}>
      {
        props.children.map((_, index) => {
          return <li key={index} onClick={() => {
            setCurrentSelectedIndex(index);
          }}>
            <a href={"#" + props.uniqueClassName + index}>
              <Circle size={30} color="white" weight={
                currentSelectedIndex == index ? "fill" : "light"
              } />
            </a>
          </li>
        })
      }
    </ul>
  </div>

}