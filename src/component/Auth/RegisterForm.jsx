import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../State/Authenthication/Action.js";
import {useDispatch, useSelector} from "react-redux";
import CustomButton from "../../CustomButton.jsx";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth} = useSelector((store) => store);

  const handleSubmit = (values) => {
    dispatch(registerUser({userData: values, navigate}))
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
        Register
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
              name={"fullName"}
              label={"Full Name"}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
            />
            <Field
              as={TextField}
              name={"email"}
              label={"Email"}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
            />
            <Field
              as={TextField}
              name={"password"}
              label={"Password"}
              fullWidth
              variant={"outlined"}
              type={"password"}
              margin={"normal"}
            />
            <FormControl fullWidth margin={"normal"}>
              <InputLabel >Role</InputLabel >
              <Field as={Select} label={'Role'} name={"role"}>
                <MenuItem value={"ROLE_CUSTOMER"}>
                  Customer
                </MenuItem >
                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
                  Restaurant Owner
                </MenuItem >
              </Field >

            </FormControl >
            <CustomButton isLoading={auth.isLoading} text={"Create Account"} type={'submit'}/>
          </Form >
        </Formik >
        <Typography variant={"body2"} align={"center"} sx={{mt: 3}}>
          Already have an account?
          <Button
            size={"small"}
            onClick={() => navigate("/account/login")}
          >Login</Button >
        </Typography >
      </Box >
    </Box >
  );
};

export default RegisterForm;