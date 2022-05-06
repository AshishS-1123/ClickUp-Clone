import React from "react";
import ListGroupTitle from "../ListGroupTitle";
import ListItem from "../ListItem";

const groupStyles = {
    marginBottom: "20px",
    boxShadow:"1px 1px 3px 1px rgb(242, 241, 241)",
    padding: "10px 5px",
}

function LaneGroupItem ({group, groupTitle, groupColor}) {
    console.log("Group", group);

    if (group.length === 0) {
        return <></>;
    }

    return (
        <div style={groupStyles}>
            <ListGroupTitle groupTitle={groupTitle} groupColor={groupColor} columnNames={["due date", "list", "priority"]} />
            {
                group.map(item => {
                    const date = new Date(item.dueDate);
                    return (
                        <>
                        <ListItem 
                            taskName={item.name} 
                            dueDate={date.toDateString()} 
                            priority={item.priority.color} 
                            list={item.parent.parentName} 
                            statusColor={groupColor}
                        />
                        <hr style={{borderTop: "0.5px solid rgba(0,0,0,0.1)", borderBottom: "none", width: "100%"}}/>
                        </>
                    )
                })
            }
        </div>
    );
}

export default LaneGroupItem;