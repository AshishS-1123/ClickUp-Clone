import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpaceItem from "../../../components/NavBar/SpaceItem";
import ListItem from "../../../components/NavBar/ListItem";
import "./SpaceContainer.module.css";
import FolderItem from "../../../components/NavBar/FolderItem";

const spaceContainerStyles = {
  bgcolor: "#20262b",
  boxShadow: "none",
  height: "48px",
  "> div": {
    color: "white",
  }
}

function SpaceContainer() {
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
          <SpaceItem spaceName="Space 1" />
          <ListItem listName="List 1" />
          <FolderItem folderName="Folder 1" />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default SpaceContainer;
