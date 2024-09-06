import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

import { useState, useEffect } from "react";
const ErrorComponent = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`flex justify-center items-center my-4 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <Alert severity="error" className="w-full max-w-md shadow-lg">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default ErrorComponent;