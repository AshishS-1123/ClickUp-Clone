import React, { useEffect, useState } from 'react';
import accentColorPalette from '../../../utils/constants/accentColorPalette';
import styles from './ColorChooserWidget.module.css';

function ColorChooserWidget({ onColorSelect }) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(accentColorPalette[0]);
    onColorSelect(accentColorPalette[0]);
  }, [])

  const handleColorSelected = (color) => {
    setSelected(color);
    onColorSelect(color);
  }

  return (
    <div className={styles.container}>
      {
        accentColorPalette.map(color => {
          return (
            <span
              key={color}
              onClick={() => handleColorSelected(color)}
              style={{
                background: color,
                outlineColor: selected == color && color,
              }}
              className={selected == color && styles.selectedColor}
            >
            </span>
          )
        })
      }
    </div>
  )
}

export default ColorChooserWidget;
