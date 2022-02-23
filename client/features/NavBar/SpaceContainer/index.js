import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
import SpaceItem from "../../../components/HierarchyItems/SpaceItem";
import Stack from "@mui/material/Stack";
import CreateSpaceButton from "../../../components/HierarchyItems/CreateSpaceButton";
import "./SpaceContainer.module.css";
import computeSpaceTree from "../../../utils/computeSpaceTree";

const spaceContainerStyles = {
  bgcolor: "#20262b",
  boxShadow: "none",
  height: "48px",
  "> div": {
    color: "white",
  }
}

/*
const spaceData = {
  "spaceData": [
    {
      "_id": "61e6e4cc54940295e4a57bfa",
      "name": "Space 1",
      "workspaceId": "61e6e4aa54940295e4a57bf0",
      "userId": "61e6e48154940295e4a57bea",
      "children": [
        {
          "childType": "FOLDER",
          "id": "61e6e7bd433622bf9b41b039",
          "_id": "61e6e7bd433622bf9b41b03c"
        },
        {
          "childType": "FOLDER",
          "id": "61e6e822418b1cd439d71583",
          "_id": "61e6e822418b1cd439d71586"
        }
      ],
      "spaceColor": "red",
      "spaceAvatar": "icon",
      "enabledViews": [
        "LIST_VIEW"
      ],
      "activeStatuses": [
        {
          "_id": "61e6e4cc54940295e4a57bfb",
          "label": "TODO",
          "color": "#aeaeae"
        }
      ],
      "doneStatuses": [],
      "closedStatuese": [
        {
          "_id": "61e6e4cc54940295e4a57bfc",
          "label": "DONE",
          "color": "#00ee00"
        }
      ],
      "__v": 2
    }
  ],
  "folderData": [
    {
      "_id": "61e6e7bd433622bf9b41b039",
      "name": "Folder 1 :: Space",
      "userId": "61e6e48154940295e4a57bea",
      "parent": {
        "parentId": "61e6e4cc54940295e4a57bfa",
        "parentType": "SPACE",
        "_id": "61e6e7bd433622bf9b41b03a"
      },
      "children": [
        {
          "childType": "LIST",
          "id": "61e6fc3e8dcaccd0ed80c820",
          "_id": "61e6fc3f8dcaccd0ed80c823"
        }
      ],
      "__v": 1
    },
    {
      "_id": "61e6e822418b1cd439d71583",
      "name": "Folder 1 :: Space",
      "userId": "61e6e48154940295e4a57bea",
      "parent": {
        "parentId": "61e6e4cc54940295e4a57bfa",
        "parentType": "SPACE",
        "_id": "61e6e822418b1cd439d71584"
      },
      "children": [],
      "__v": 0
    }
  ],
  "listData": [
    {
      "_id": "61e6fc3e8dcaccd0ed80c820",
      "name": "List Under Space 1",
      "userId": "61e6e48154940295e4a57bea",
      "parent": {
        "parentId": "61e6e7bd433622bf9b41b039",
        "parentType": "FOLDER",
        "_id": "61e6fc3f8dcaccd0ed80c821"
      },
      "children": [],
      "__v": 0
    }
  ]
}
*/


function SpaceContainer() {
  const spaceData = useSelector(state => state.spaceReducer);
  console.log(spaceData);
  const tree = computeSpaceTree(spaceData)()
  console.log("space tree ", tree)

  return (
    <>
      <Accordion sx={spaceContainerStyles} square disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography
            variant="caption"
            sx={{
              textTransform: "uppercase",
              color: "white", fontWeight: "900",
            }}
          >
            Spaces
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ padding: "0px" }}>
          <Stack spacing={2}>
            <CreateSpaceButton />
            {
              tree.map(item => {
                return <SpaceItem spaceName={item.name} contents={item.contents} id={item.id} key={item.id} />
              })
            }
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default SpaceContainer;
