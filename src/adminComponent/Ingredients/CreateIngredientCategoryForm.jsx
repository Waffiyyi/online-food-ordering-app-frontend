import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {createIngredientCategory} from "../../State/Ingredients/Action.js";
import {useDispatch, useSelector} from "react-redux";

const CreateIngredientCategoryForm = () => {
  const [formData, setFormData] = useState({name: ""});
  const {restaurant, loading} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name : formData.name,
      restaurantId: restaurant.usersRestaurant?.id
    }
    console.log("data", data)
    dispatch(createIngredientCategory({
        data: data,
        jwt: jwt,
      },
    ))

  };
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData, [name]: value,
    })
  }
  return (
    <div className={''}>
      <div className={'p-5'}>
        <h1 className={'text-gray-400 text-center text-xl pb-10'}>Create
                                                                  Ingredient
                                                                  Category</h1 >
        <form className={'space-y-5'} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id={"name"}
            name={"name"}
            label={"Ingredient Category Name"}
            variant={"outlined"}
            onChange={handleInputChange}
            value={formData.name}
          >

          </TextField >
          <Button variant={'contained'} type={'submit'}>
            Create Category
          </Button >

        </form >
      </div >
    </div >
  );
};

export default CreateIngredientCategoryForm;