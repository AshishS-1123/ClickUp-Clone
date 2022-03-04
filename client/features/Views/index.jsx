import React from "react";
import HeaderBar from '../../components/Layout/HeaderBar';

function Views() {
  const styles = {
    width: 'calc(100vw - 199px)',
    float: 'right',
    position: 'absolute',
    top: '0px',
    left: '199px',
  }

  return (
    <div style={styles}>
      <HeaderBar />
    </div>
  )
}

export default Views;
