import React from "react";

const containerStyles = {
  width: "100%",
  height: "32px",
  padding: "0px 10px",
  lineHeight: "2.2",
  textTransform: "uppercase",
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(0,0,0,0.25)"
}

const titleStyles = {
  float: "left",
  width: "65%",
  color: "white"
}

const titleCardStyles = {
  padding: "5px 10px",
  borderTopRightRadius: "5px",
  borderTopLeftRadius: "5px",
}

const columnStyles = {
  float: "right",
  width: "35%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}

const spanStyles = {
  width: "33%",
  textAlign: "center",
}

function ListGroupTitle ({groupTitle, groupColor, columnNames}) {
  return (
    <div style={containerStyles}>
      <div style={titleStyles}>
        <span style={{...titleCardStyles, background: groupColor}}>
          {groupTitle}
        </span>
      </div>

      <div style={columnStyles}>
        {
          columnNames.map ((item) => {
            return <span style={spanStyles}>{item}</span>
          })
        }
      </div>
    </div>
  )
}

export default ListGroupTitle;