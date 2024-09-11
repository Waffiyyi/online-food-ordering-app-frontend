import React from 'react';
import {Button, CircularProgress} from "@mui/material";

const CustomButton = ({isLoading, text, type, style = {}, fullWidth = true}) => {
  return (
      <Button
        sx={{
          mt: 5,
          padding: "1rem",
          cursor: isLoading ? 'not-allowed' : 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
        fullWidth={fullWidth}
        variant={'contained'}
        disabled={isLoading}
        type={type}
      >
        {text}
        {isLoading && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
      </Button>

  );
};

export default CustomButton;