import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid, IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../State/Restaurant/Action.js";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

const initialValues = {
  image: "",
  location: "",
  eventName: "",
  startDateTime: null,
  endDateTime: null,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CreateEvent = () => {
  const [open, setOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      data: formValues,
      restaurantId: restaurant.usersRestaurant?.id,
      jwt: jwt,
    }
    dispatch(createEvent({
      requestData,
    }))
    setOpen(false)
    setFormValues(initialValues);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      const uploadedImage = await uploadImageToCloudinary(file);
      setFormValues((prevState) => ({
        ...prevState,
        image: uploadedImage,
      }));
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormValues((prevState) => ({
      ...prevState,
      image: "",
    }));
  };

  const handleFormChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date, dateType) => {
    setFormValues((prevState) => ({
      ...prevState,
      [dateType]: date,
    }));
  };

  return (
    <div>
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create New Event
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} className="flex flex-wrap gap-5">
                  <input
                    accept=".jpg,.png,.webp"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    type="file"
                  />
                  <label className="relative" htmlFor="fileInput">
                    <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                      <AddPhotoAlternateIcon />
                    </span>
                    {uploadingImage && (
                      <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                        <CircularProgress />
                      </div>
                    )}
                  </label>
                  {formValues.image && (
                    <div className="relative">
                      <img
                        className="w-24 h-24 object-cover"
                        src={formValues.image}
                        alt=""
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          outline: "none",
                        }}
                        onClick={handleRemoveImage}
                      >
                        <CloseIcon sx={{ fontSize: "1rem", color: "red" }} />
                      </IconButton>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.location}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="eventName"
                    name="eventName"
                    label="Event Name"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.eventName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={formValues.startDateTime}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startDateTime")
                      }
                      inputFormat="MM/DD/YYYY hh:mm A"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      value={formValues.endDateTime}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endDateTime")
                      }
                      inputFormat="MM/DD/YYYY hh:mm A"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <div className="mt-2">
                <Button variant="contained" color="primary" type="submit">
                  Create Event
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CreateEvent;