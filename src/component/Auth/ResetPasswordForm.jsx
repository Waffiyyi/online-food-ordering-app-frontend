import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../CustomButton.jsx";
import { initiateResetPasswordRequest, ResetPasswordRequest } from "../../State/Authenthication/Action.js";

const initialValues = {
  email: "",
};

const resetPasscodeValues = {
  resetToken: "",
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSubmit = (values) => {
    dispatch(initiateResetPasswordRequest(values));
  };

  const handleResetPassword = (values) => {
    dispatch(ResetPasswordRequest({
      resetRequest: values,
      navigate
    }));
  };

  useEffect(() => {
    if (auth.success === "Password reset initiated. Check your email.") {
      setIsCodeSent(true);
    }
  }, [auth.success]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={"100%"}
      padding={2}
    >
      <Typography variant={'h5'} align={'center'}>
        {isCodeSent ? 'Enter Reset Code' : 'Reset Password'}
      </Typography>
      <Box
        component='div'
        width='100%'
        maxWidth={400}
        mt={2}
      >
        {auth.successMessage && (
          <Typography variant="body1" color="gray" align="center" sx={{ mb: 2 }}>
            {auth.successMessage}
          </Typography>
        )}
        {isCodeSent ? (
          <Formik
            initialValues={resetPasscodeValues}
            onSubmit={handleResetPassword}
          >
            {({ values }) => (
              <Form>
                <Field
                  as={TextField}
                  name="resetToken"
                  label="Enter reset code"
                  value={values.resetToken || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="newPassword"
                  label="New Password"
                  type="password"
                  value={values.newPassword || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={values.confirmPassword || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <CustomButton
                  fullWidth
                  isLoading={auth.isLoading}
                  text="Reset Password"
                  type="submit"
                  style={{ mt: 2 }}
                />
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  label="Enter your email"
                  value={values.email || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <CustomButton
                  fullWidth
                  isLoading={auth.isLoading}
                  text="Send reset code"
                  type="submit"
                  style={{ mt: 2 }}
                />
              </Form>
            )}
          </Formik>
        )}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Remembered your password?{" "}
          <Button size="small" onClick={() => navigate("/account/login")}>
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;