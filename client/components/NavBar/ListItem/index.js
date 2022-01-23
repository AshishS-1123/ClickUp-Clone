import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { setActive } from "../../../redux/slices/spaceSlice";
import styles from "../SpaceItem/SpaceItem.module.css";

function ListItem({ id, listName, nestingLevel = 10 }) {
  const isActive = useSelector(state => state.spaceReducer.activeItem) == id;
  const dispatch = useDispatch();

  let containerStyle = {
    paddingLeft: `${nestingLevel}px`,
    color: "white",
  };

  if (isActive) {
    containerStyle = {
      ...containerStyle,
      background: "#3c3d39",
      borderLeft: "3px solid #ffa12f"
    }
  }

  const setCurrentAsActive = (event) => {
    dispatch(setActive({ id }));
  }

  return (
    <div className={styles.item__container} style={containerStyle}>
      <div className={styles.item__titleContainer} onClick={setCurrentAsActive}>
        <RadioButtonUncheckedIcon sx={{ width: "10px", height: "10px", color: "lightgrey" }} />
        <div className={styles.list__title}>{listName}</div>
      </div>
    </div>
  )
}

export default ListItem;
