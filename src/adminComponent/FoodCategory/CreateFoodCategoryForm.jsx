import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../State/Restaurant/Action.js";
import CustomButton from "../../CustomButton.jsx";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  categoryName: Yup.string().required('Category name is required'),
});

const CreateFoodCategoryForm = () => {
  const { restaurant } = useSelector(store => store);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { categoryName: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.categoryName,
        restaurantId: restaurant.usersRestaurant.id,
      };
      dispatch(createCategory({ reqData: data, jwt: localStorage.getItem("jwt") }));
      console.log("data", data);
    },
  });

  return (
    <div className={''}>
      <div className={'p-5'}>
        <h1 className={'text-gray-400 text-center text-xl pb-10'}>Create Food Category</h1>
        <form className={'space-y-5'} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id={"categoryName"}
            name={"categoryName"}
            label={"Food Category"}
            variant={"outlined"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryName}
            error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
            helperText={formik.touched.categoryName && formik.errors.categoryName}
          />
          <CustomButton
            fullWidth={false}
            type={'submit'}
            text={'Create Category'}
            style={{ padding: 1 }}
            isLoading={restaurant.loading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;