import { Circle } from "phosphor-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./carousel.module.css";

export const Carousel = (props: {
  children: ReactNode[],
  uniqueClassName: string,
  initialSelectedIndex: number,
  rotationCycleDuration: number,
}) => {

  useEffect(() => {

    // creating carousel animations dynamically
    const imageAmount = props.children.length;
    for (let i=0; i<imageAmount; i++) {
      const imageListItem: HTMLDataListElement = document.querySelector(`#${props.uniqueClassName + i}`)!;
      const keyframeList: Keyframe[] = [];

      if (i == 0) {

        keyframeList.push({opacity: 1});

        for (let j=0; j<imageAmount-1; j++) {
          keyframeList.push({opacity: 0});
        }

        keyframeList.push({opacity: 1});

      } else {

        for (let j=0; j<imageAmount; j++) {
          if (j == i) {
            keyframeList.push({opacity: 1});
          } else {
            keyframeList.push({opacity: 0});
          }
        }
        keyframeList.push({opacity: 0});

      }

      imageListItem.animate(keyframeList, {
        duration: props.rotationCycleDuration,
        iterations: Infinity
      });
    }

  });
  
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
  </div>

}