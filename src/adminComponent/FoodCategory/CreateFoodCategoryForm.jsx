import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createCategory} from "../../State/Restaurant/Action.js";

const CreateFoodCategoryForm = () => {
  const { restaurant, loading } = useSelector(store => store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({categoryName: "", restaurantId: ""});
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: formData.categoryName,
      restaurantId: restaurant.usersRestaurant.id,
    };
    dispatch(createCategory({reqData:data, jwt: localStorage.getItem("jwt")}))
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
        <h1 className={'text-gray-400 text-center text-xl pb-10'}>Create Food
                                                                  Category</h1 >
        <form  className={'space-y-5'} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id={"categoryName"}
            name={"categoryName"}
            label={"Food Category"}
            variant={"outlined"}
            onChange={handleInputChange}
            value={FormData.categoryName}
          >

          </TextField >
          <Button variant={'contained'} type={'submit'}>
            Create Category
          </Button>

        </form >
      </div >
    </div >
  );
};

export default CreateFoodCategoryForm;