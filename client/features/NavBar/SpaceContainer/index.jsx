import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import SpaceItem from '../../../components/HierarchyItems/SpaceItem';
import CreateSpaceButton from '../../../components/Misc/CreateSpaceButton';
import './SpaceContainer.module.css';
import computeSpaceTree from '../../../utils/computeSpaceTree';
import { resetSlice, getSpaceDataAsync } from '../../../redux/slices/spaceSlice';
import themeColors from '../../../utils/contexts/themeContext';

const spaceContainerStyles = {
  bgcolor: themeColors.background,
  boxShadow: 'none',
  height: '48px',
  '> div': {
    color: themeColors.textColor,
  },
};

function SpaceContainer() {
  const [tree, setTree] = useState([]);
  const spaceData = useSelector((state) => state.spaceReducer);
  const { userId, token } = useSelector((state) => state.authReducer);
  const {
    activeWorkspace,
    activeWorkspaceChildren,
    workspaces
  } = useSelector((state) => state.workspaceReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    setTree(computeSpaceTree(spaceData)());
  }, [spaceData]);

  useEffect(() => {
    dispatch(resetSlice());
    activeWorkspaceChildren.forEach((spaceId) => {
      const workspaceId = workspaces[activeWorkspace].id;
      dispatch(getSpaceDataAsync({
        spaceId, workspaceId, userId, token,
      }));
    });
  }, [activeWorkspace]);

  return (
    <Accordion sx={spaceContainerStyles} square disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: themeColors.textColor }} />}
      >
        <Typography
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            color: themeColors.textBoldColor,
            fontWeight: 700,
            fontSize: '13px',
          }}
        >
          Spaces
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: '0px' }}>
        <Stack spacing={2}>
          <CreateSpaceButton />
          {
            tree && tree.map((item) => <SpaceItem
              spaceName={item.name}
              contents={item.contents}
              id={item.id}
              key={item.id}
            />)
          }
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default SpaceContainer;
