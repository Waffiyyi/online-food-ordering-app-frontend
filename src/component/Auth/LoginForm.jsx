import React from 'react';
import {Button, Typography, TextField, Box} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../State/Authenthication/Action.js";

const initialValues = {
    username: "",
    password: ""
};

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        console.log("credentials", values)
        dispatch(loginUser({userData:values, navigate}))
    };


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
                Login
            </Typography>
            <Box
                component="div"
                width="100%"
                maxWidth={400}
                mt={2}
            >
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    <Form>
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
                        <Button sx={{mt: 5, padding: "1rem"}} fullWidth type={'submit'} variant={'contained'}>Login</Button>
                    </Form>
                </Formik>
                <Typography variant={"body2"} align={"center"} sx={{mt: 3}}>
                    Don't have an account?
                    <Button size={"small"} onClick={() => navigate("/account/register")}>Register</Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;