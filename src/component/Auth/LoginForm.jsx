import React from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../State/Authenthication/Action.js";
import CustomButton from "../../CustomButton.jsx";

const initialValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth} = useSelector((store) => store);

  const handleSubmit = (values) => {
    dispatch(loginUser({userData: values, navigate}))
  };


  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      width={"100%"}
      padding={2}
    >
      <Typography variant={'h5'} align={'center'}>
        Login
      </Typography >
      <Box
        component='div'
        width='100%'
        maxWidth={400}
        mt={2}
      >
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form >
            <Field
              as={TextField}
              name={"username"}
              label={"username"}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
            />
            <Field
              as={TextField}
              name={"password"}
              label={"password"}
              fullWidth
              variant={"outlined"}
              type={"password"}
              margin={"normal"}
            />
         <CustomButton isLoading={auth.isLoading} text={"Login"} type={'submit'}/>
          </Form >
        </Formik >
        <Typography variant={"body2"} align={"center"} sx={{mt: 3}}>
          Don't have an account?
          <Button
            size={"small"}
            onClick={() => navigate("/account/register")}
          >Register</Button >
        </Typography >
        <Typography variant={"body2"} align={"center"} sx={{mt: 1}}>
          Forgot your password?
          <Button
            size={"small"}
            onClick={() => navigate("/account/reset-password")}
            sx={{fontSize:"11px"}}
          >
            Reset Password
          </Button >
        </Typography >
      </Box >
    </Box >
  );
};

export default LoginForm;