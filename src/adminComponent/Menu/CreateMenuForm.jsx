import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {
  Box,
  Button, Chip,
  CircularProgress, FormControl,
  Grid,
  IconButton, InputLabel, MenuItem, OutlinedInput, Select,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from '@mui/icons-material/Close';
import {uploadImageToCloudinary} from "../util/UploadToCloudinary.js";
import {useDispatch, useSelector} from "react-redux";
import {createMenuItem} from "../../State/Menu/Action.js";
import {getIngredientsOfRestaurant} from "../../State/Ingredients/Action.js";
import {useNavigate} from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  quantity: "",
  vegetarian: false,
  seasonal: true,
  nonveg: true,
  ingredientItems: [],
  images: [],
};
const CreateMenuForm = () => {
  const {restaurant, ingredients} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
      initialValues,
      onSubmit: (values) => {
        values.restaurantId = restaurant.usersRestaurant.id
        dispatch(createMenuItem({menu: values, jwt}))
        navigate("/admin/restaurant/menu")
      },
    },
  );
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploadImage(true)
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        return await uploadImageToCloudinary(file);
      }),
    );
    formik.setFieldValue("images", [...formik.values.images, ...uploadedImages])
    setUploadImage(false);
    e.target.value = null;
  }
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images]
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages)
  }

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({jwt, restaurantId: restaurant.usersRestaurant.id}))
  }, [])
  return (
    <div className={'py-1o lg:flex items-center justify-center min-h-screen'}>
      <div className={'lg: max-w-4xl'}>
        <h1 className={'font-bold text-2xl text-center py-2'}>
          Add New Menu
        </h1 >
        <form
          onSubmit={formik.handleSubmit}
          className={'space-y-4'}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              className={'flex flex-wrap gap-5'}
              item
              xs={12}
            >
              <input
                accept={'.jpg,.png,.webp'}
                id={'fileInput'}
                style={{display: "none"}}
                onChange={handleImageChange}
                type={"file"}
                multiple
              />
              <label
                className={'relative'}
                htmlFor={'fileInput'}
              >
              <span
                className={'w-24 h-24 cursor-pointer flex items-center' +
                  ' justify-center p-3 border rounded-md border-gray-600'}
              >
                <AddPhotoAlternateIcon />
              </span >
                {
                  uploadImage && <div
                    className={'absolute left-0 right-0' +
                      ' top-0 bottom-0 w-24 h-24 flex justify-center items-center'}
                  >
                    <CircularProgress />
                  </div >
                }
              </label >
              <div className={'flex flex-wrap gap-2'}>
                {formik.values.images.map((image, index) =>
                  <div key={image} className={'relative'}>
                    <img
                      className={'w-24 h-24 object-cover'}
                      src={image}
                      alt={''}
                      key={index}
                    />
                    <IconButton
                      size={'small'}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{fontSize: "1rem", color: "red"}}/>
                    </IconButton >

                  </div >,
                )}
              </div >

            </Grid >

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                id={"name"}
                name={"name"}
                label={"Name"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.name}
              >

              </TextField >

            </Grid >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                id={"description"}
                name={"description"}
                label={"Description"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.description}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={6}
            >
              <TextField
                fullWidth
                id={"price"}
                name={"price"}
                label={"Price"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.price}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={6}

            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'> Food
                                                          Category</InputLabel >
                <Select
                  labelId='demo-simple-select-label'
                  id='category'
                  value={formik.values.category}
                  label='Food Category'
                  onChange={formik.handleChange}
                  name={'category'}
                >
                  {restaurant.categories?.map((item) => <MenuItem
                    key={item.id}
                    value={item}
                  >{item.name}</MenuItem >)}
                </Select >
              </FormControl >

            </Grid >

            <Grid
              item
              xs={12}
            >
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>Ingredients</InputLabel >
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  name={"ingredientItems"}
                  multiple
                  value={formik.values.ingredientItems}
                  onChange={formik.handleChange}
                  input={<OutlinedInput
                    id='select-multiple-chip'
                    label='Ingredients'
                  />}
                  renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name}/>
                      ))}
                    </Box >
                  )}
                >
                  {ingredients.ingredients?.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item}
                    >
                      {item.name}
                    </MenuItem >
                  ))}
                </Select >
              </FormControl >

            </Grid >


            <Grid
              item
              xs={12}
              lg={4}

            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Is
                                                          Seasonal</InputLabel >
                <Select
                  labelId='seasonal'
                  id='seasonal'
                  value={formik.values.seasonal}
                  label='Is Seasonal'
                  onChange={formik.handleChange}
                  name={'seasonal'}
                >
                  <MenuItem value={true}>Yes</MenuItem >
                  <MenuItem value={false}>No</MenuItem >
                </Select >
              </FormControl >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}

            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Is
                                                          Vegetarian</InputLabel >
                <Select
                  labelId='demo-simple-select-label'
                  id='vegetarian'
                  value={formik.values.vegetarian}
                  label='Is Vegetarian'
                  onChange={formik.handleChange}
                  name={'vegetarian'}
                >
                  <MenuItem value={true}>Yes</MenuItem >
                  <MenuItem value={false}>No</MenuItem >
                </Select >
              </FormControl >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}

            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Is
                                                          Non-Vegetarian</InputLabel >
                <Select
                  labelId='demo-simple-select-label'
                  id='nonveg'
                  value={formik.values.nonveg}
                  label='Is Non-Vegetarian'
                  onChange={formik.handleChange}
                  name={'nonveg'}
                >
                  <MenuItem value={true}>Yes</MenuItem >
                  <MenuItem value={false}>No</MenuItem >
                </Select >
              </FormControl >

            </Grid >


          </Grid >


          <Button
            color={'primary'}
            variant={'contained'}
            type={'submit'}
          >
            Create Menu Item
          </Button >

        </form >
      </div >
    </div >
  );
};

export default CreateMenuForm;