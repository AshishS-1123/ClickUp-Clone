import React, { FC, ReactElement, ReactNode } from "react";
import CSS from "csstype";

const cardContainerStyles: CSS.Properties = {
  width: "100%",
  maxWidth: "400px",
  height: "100%",
  maxHeight: "400px",
  background: "red"
}

type CardProps = {
  children: ReactNode,
}

const Card: FC<CardProps> = (props: CardProps): ReactElement => {
  console.log(cardContainerStyles)
  return (
    <div styles={cardContainerStyles}>
      { props.children }
    </div>
    )
}

export default Card;
