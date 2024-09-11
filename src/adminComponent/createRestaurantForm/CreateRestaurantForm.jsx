import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRestaurant,
  updateRestaurant,
} from '../../State/Restaurant/Action.js';
import { useNavigate } from 'react-router-dom';
import CustomButton from "../../CustomButton.jsx";

const initialValues = {
  name: '',
  description: '',
  cuisineType: '',
  streetAddress: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: '',
  email: '',
  phoneNumber: '',
  twitter: '',
  instagram: '',
  openingHours: 'Mon-Sun : 9:00 AM - 9:00 PM',
  images: [],
};


const validationSchema = Yup.object({
  name: Yup.string().required('Restaurant name is required'),
  description: Yup.string().required('Description is required'),
  cuisineType: Yup.string().required('Cuisine type is required'),
  streetAddress: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  stateProvince: Yup.string().required('State/Province is required'),
  postalCode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const CreateRestaurantForm = ({ type }) => {
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);
  const navigate = useNavigate();
  const { restaurant, loading } = useSelector((store) => store);

  const jwt = localStorage.getItem('jwt');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const data = {
        restaurantName: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.phoneNumber,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };

      if (type === 'Create') {
        dispatch(createRestaurant({ data, jwt }));
      }

      if (type === 'Update') {
        dispatch(updateRestaurant({
          restaurantId: restaurant.usersRestaurant.id,
          restaurantData: data,
          jwt,
        }));
      }

      navigate('/admin/restaurant/details');
    },
  });

  useEffect(() => {
    if (type === 'Update' && restaurant) {
      formik.setValues({
        name: restaurant.usersRestaurant.restaurantName || '',
        description: restaurant.usersRestaurant.description || '',
        cuisineType: restaurant.usersRestaurant.cuisineType || '',
        streetAddress: restaurant.usersRestaurant.address.streetAddress || '',
        city: restaurant.usersRestaurant.address.city || '',
        stateProvince: restaurant.usersRestaurant.address.stateProvince || '',
        postalCode: restaurant.usersRestaurant.address.postalCode || '',
        country: restaurant.usersRestaurant.address.country || '',
        email: restaurant.usersRestaurant.contactInformation.email || '',
        phoneNumber: restaurant.usersRestaurant.contactInformation.mobile || '',
        twitter: restaurant.usersRestaurant.contactInformation.twitter || '',
        instagram: restaurant.usersRestaurant.contactInformation.instagram || '',
        openingHours: restaurant.usersRestaurant.openingHours || 'Mon-Sun : 9:00 AM - 9:00 PM',
        images: restaurant.usersRestaurant.images || [],
      });
    }
  }, [type, restaurant]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploadImage(true);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        return await uploadImageToCloudinary(file);
      })
    );
    formik.setFieldValue('images', [...formik.values.images, ...uploadedImages]);
    setUploadImage(false);
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  };

  return (
    <div className="py-10 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          {type} Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4 px-5">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                accept=".jpg,.png,.webp"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                type="file"
                multiple
              />
              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternateIcon />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        outline: 'none',
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: '1rem', color: 'red' }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
                error={formik.touched.cuisineType && Boolean(formik.errors.cuisineType)}
                helperText={formik.touched.cuisineType && formik.errors.cuisineType}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
                error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                helperText={formik.touched.streetAddress && formik.errors.streetAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State/Province"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
                error={formik.touched.stateProvince && Boolean(formik.errors.stateProvince)}
                helperText={formik.touched.stateProvince && formik.errors.stateProvince}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomButton isLoading={restaurant.loading} fullWidth={false} text={`${type} Restaurant`} type={'submit'} style={{mt: 0, padding:1}}/>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;