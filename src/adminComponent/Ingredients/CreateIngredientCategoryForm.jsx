import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { createIngredientCategory } from "../../State/Ingredients/Action.js";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../CustomButton.jsx";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Ingredient category name is required'),
});

const CreateIngredientCategoryForm = () => {
  const { restaurant} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        restaurantId: restaurant.usersRestaurant?.id
      };
      console.log("data", data);
      dispatch(createIngredientCategory({
        data: data,
        jwt: jwt,
      }));
    },
  });

  return (
    <div className={''}>
      <div className={'p-5'}>
        <h1 className={'text-gray-400 text-center text-xl pb-10'}>Create Ingredient Category</h1>
        <form className={'space-y-5'} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id={"name"}
            name={"name"}
            label={"Ingredient Category Name"}
            variant={"outlined"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <CustomButton
            isLoading={restaurant.loading}
            fullWidth={false}
            text={`Create Category`}
            type={'submit'}
            style={{ mt: 0, padding: 1 }}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;