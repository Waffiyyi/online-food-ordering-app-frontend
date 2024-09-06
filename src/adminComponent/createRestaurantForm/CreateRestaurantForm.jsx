import React, {useState} from 'react';
import {useFormik} from "formik";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from '@mui/icons-material/Close';
import {uploadImageToCloudinary} from "../util/UploadToCloudinary.js";
import {useDispatch} from "react-redux";
import {createRestaurant} from "../../State/Restaurant/Action.js";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  email: "",
  phoneNumber: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun : 9:00 AM - 9:00 PM",
  images: [],

}
const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const formik = useFormik({
      initialValues,
      onSubmit: (values) => {
        const data = {
          restaurantName: values.name,
          description: values.description,
          address: {
            streetAddress: values.streetAddress,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            country: values.country,
          },
          contactInformation: {
            cuisineType: values.cuisineType,
            email: values.email,
            mobile: values.phoneNumber,
            twitter: values.twitter,
            instagram: values.instagram,
          },
          openingHours: values.openingHours,
          images: values.images,
        };
        console.log("data", data)

        dispatch(createRestaurant({data, jwt:jwt}))
      },
    },
  );
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploadImage(true)
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        return await uploadImageToCloudinary(file);
      })
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
  return (
    <div className={'py-10 lg:flex items-center justify-center min-h-screen'}>
      <div className={'lg: max-w-4xl'}>
        <h1 className={'font-bold text-2xl text-center py-2'}>
          Add New Restaurant
        </h1 >
        <form
          onSubmit={formik.handleSubmit}
          className={'space-y-4 px-5'}
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
                  <div key={index} className={'relative'}>
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
                id={"cuisineType"}
                name={"cuisineType"}
                label={"Cuisine Type"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
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
                id={"openingHours"}
                name={"openingHours"}
                label={"Opening Hours"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                id={"streetAddress"}
                name={"streetAddress"}
                label={"Street Address"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                id={"city"}
                name={"city"}
                label={"City"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.city}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}
            >
              <TextField
                fullWidth
                id={"state"}
                name={"state"}
                label={"State"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.state}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}
            >
              <TextField
                fullWidth
                id={"postalCode"}
                name={"postalCode"}
                label={"Postal Code"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}
            >
              <TextField
                fullWidth
                id={"country"}
                name={"country"}
                label={"Country"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.country}
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
                id={"email"}
                name={"email"}
                label={"Email"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.email}
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
                id={"phoneNumber"}
                name={"phoneNumber"}
                label={"Phone Number"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}
            >
              <TextField
                fullWidth
                id={"instagram"}
                name={"instagram"}
                label={"Instagram"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.instagram}
              >

              </TextField >

            </Grid >

            <Grid
              item
              xs={12}
              lg={4}
            >
              <TextField
                fullWidth
                id={"twitter"}
                name={"twitter"}
                label={"Twitter"}
                variant={"outlined"}
                onChange={formik.handleChange}
                value={formik.values.twitter}
              >

              </TextField >

            </Grid >

          </Grid >
          <Button
            color={'primary'}
            variant={'contained'}
            type={'submit'}
          >
            Create Restaurant
          </Button >

        </form >
      </div >
    </div >
  );
};

export default CreateRestaurantForm;