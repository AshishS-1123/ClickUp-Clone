import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ViewTypes from '../../../utils/ViewTypes';
import { mapViewToIcon } from '../../Layout/HeaderBar/ViewList';
import themeColors from '../../../utils/contexts/themeContext';

function ViewDialog({ open, closeDialog, handleViewSettings }) {
  return (
    <Dialog
      open={open}
      onBackdropClick={closeDialog}
      sx={{
        '& .MuiDialog-paper': {
          width: '550px',
          position: 'absolute',
          top: '10px',
          background: themeColors.background,
        },
      }}
    >
      <Box sx={{
        height: '100%',
        width: '35%',
        background: themeColors.backgroundDark,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h5
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: themeColors.textBoldColor,
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >Task Views</h5>

        {
          ViewTypes.map((viewName, idx) => {
            const Icon = mapViewToIcon(viewName.toUpperCase());
            return (
              <Button
                key={idx}
                startIcon={<Icon />}
                fullWidth={true}
                variant='text'
                sx={{
                  color: themeColors.textColor,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  textTransform: 'capitalize',
                  marginBottom: '10px',
                  paddingLeft: '20px',
                  background: themeColors.accentColor,
                  '&:hover': {
                    background: themeColors.accentColor,
                  }
                }}
              >
                {viewName}
              </Button>
            )
          })
        }
      </Box>

      <Box sx={{
        height: '100%',
        width: '35%',
        background: 'red',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}>

      </Box>
    </Dialog>
  )
}

export default ViewDialog;
