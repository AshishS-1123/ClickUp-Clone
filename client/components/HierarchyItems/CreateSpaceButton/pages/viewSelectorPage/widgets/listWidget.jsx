import React, { useEffect, useState } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import './listWidget.module.css';

let listContainerStyles = {
  width: '235px',
  height: '46px',
  background: '#384047',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: '10px 10px 10px 20px',
  outline: '2px solid #828588',
  borderRadius: '2px',
};

function ListWidget() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log('change');
    if (active) {
      console.log('\tactive');
      // listContainerStyles = {
      //   ...listContainerStyles,
      //   outline: "2px solid #ffa12f"
      // }
    } else {
      console.log('\tInactive');
      listContainerStyles = {
        ...listContainerStyles,
        outline: '2px solid #828588',
      };
    }
  }, [active]);

  return (
    <div style={listContainerStyles}>
      <FormatListBulletedIcon />
      List
      <label className="switch">
        <input type="checkbox" onChange={() => { setActive((prev) => !prev); }} checked={active} />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default ListWidget;
