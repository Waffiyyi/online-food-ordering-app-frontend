import React, {useState} from 'react';
import {
  Button,
  FormControl,
  InputLabel, MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  createIngredient,
  createIngredientCategory,
} from "../../State/Ingredients/Action.js";

const CreateIngredientForm = () => {
  const [formData, setFormData] = useState({name: "", categoryId: ""});
  const {restaurant, ingredients} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.id
    }
    dispatch(createIngredient({
      data: data, jwt: jwt,
    }))
    console.log("data", data)
  }
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
                                                                  Ingredient</h1 >
        <form className={'space-y-5'} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id={"name"}
            name={"name"}
            label={"Ingredient Name"}
            variant={"outlined"}
            onChange={handleInputChange}
            value={formData.name}
          >
          </TextField >
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Ingredient Category
            </InputLabel >
            <Select
              labelId='demo-simple-select-label'
              id='Category'
              value={formData.categoryId}
              label='Ingredient Category'
              onChange={handleInputChange}
              name={'categoryId'}
            >
              {ingredients.category.map((item) => <MenuItem
                key={item.id}
                value={item.id}
              >{item.name}</MenuItem >)}
            </Select >
          </FormControl >
          <Button variant={'contained'} type={'submit'}>
            Create Ingredient
          </Button >

        </form >
      </div >
    </div >
  );
};

export default CreateIngredientForm;