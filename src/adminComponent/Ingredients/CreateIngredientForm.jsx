import React, { useState } from 'react';
import {
  FormControl,
  InputLabel, MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../State/Ingredients/Action.js";
import CustomButton from "../../CustomButton.jsx";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Ingredient name is required'),
  categoryId: Yup.string().required('Ingredient category is required'),
});

const CreateIngredientForm = ({ onSuccess }) => {
  const { restaurant, ingredients } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        restaurantId: restaurant.usersRestaurant.id
      };
      dispatch(createIngredient({
        data: data,
        jwt: jwt,
      })).then(() => {
        if (onSuccess) onSuccess();
      });
    },
  });

  return (
    <div className={''}>
      <div className={'p-5'}>
        <h1 className={'text-gray-400 text-center text-xl pb-10'}>Create Ingredient</h1>
        <form className={'space-y-5'} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id={"name"}
            name={"name"}
            label={"Ingredient Name"}
            variant={"outlined"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Ingredient Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='categoryId'
              value={formik.values.categoryId}
              label='Ingredient Category'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='categoryId'
              error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
            >
              {ingredients.category.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p style={{ color: 'red' }}>{formik.errors.categoryId}</p>
            )}
          </FormControl>
          <CustomButton isLoading={ingredients.loading} fullWidth={false} text={`Create Ingredient`} type={'submit'} style={{ mt: 0, padding: 1 }} />
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;