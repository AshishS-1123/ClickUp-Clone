import React from "react";
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';

const containerStyles = {
    width: "100%",
    height: "40px",
    padding: "0px 10px",
    lineHeight: "3.2",
    fontSize: "12px",
    fontWeight: 500,
    color: "rgb(83, 87, 94)",
    borderRadius: "5px",
}

const titleStyles = {
    float: "left",
    width: "65%",
    display: "flex",
    flexDirection: "row",
}

const titleCardStyles = {
    marginLeft: "20px",
}

const columnStyles = {
    float: "right",
    width: "35%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textTransform: "capitalize",
}

const spanStyles = {
    width: "33%",
    textAlign: "center",
}

function ListItem ({taskName, dueDate, priority, list}) {
    console.log("Priority is", priority );
    return (
        <div style={containerStyles}>
            <div style={titleStyles}>
                <span style={titleCardStyles}>
                    {taskName}
                </span>
            </div>

            <div style={columnStyles}>
                <span style={spanStyles}>{dueDate}</span>
                <span style={spanStyles}>{list}</span>
                <span style={spanStyles}>
                    <AssistantPhotoIcon sx={{color: priority, marginTop: "5px"}} />
                </span>
            </div>
        </div>
    );
}

export default ListItem;