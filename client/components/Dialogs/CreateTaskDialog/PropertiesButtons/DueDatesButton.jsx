import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import themeColors from "../../../../utils/contexts/themeContext";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";

function DueDatesButton({ onDateSelect }) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date());
    onDateSelect((new Date()).toDateString());
  }, []);

  const iconStyles = {
    color: date ? themeColors.accentColor : themeColors.textBoldColor,
    width: "34px",
    height: "34px",
    border: `1px dashed ${date ? themeColors.accentColor : themeColors.textColor}`,
    borderRadius: "50%",
    padding: "5px",
    margin: "0 5px",
    marginLeft: "0px",
  }

  const CalendarIcon = () => <CalendarTodayIcon sx={iconStyles} />

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Basic example"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            onDateSelect(newValue);
          }}
          renderInput={({ inputRef, InputProps }) => (
            <Box ref={inputRef}>
              {InputProps?.endAdornment}
            </Box>
          )}
          components={{
            OpenPickerIcon: CalendarIcon,
          }}
        />
      </LocalizationProvider>
    </>
  )
}

export default DueDatesButton;
