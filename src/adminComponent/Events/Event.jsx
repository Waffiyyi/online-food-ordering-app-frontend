import React, {useState} from 'react';
import {Box, Button, Grid, Modal, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useDispatch, useSelector} from "react-redux";
import {createEvent} from "../../State/Restaurant/Action.js";

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

const initialValues = {
  image: "",
  location: "",
  eventName: "",
  startsAt: null,
  endsAt: null,
};

const Event = () => {
  const [open, setOpen] = useState(false);
  const jwt = localStorage.getItem("jwt")
  const { restaurant} = useSelector((store) => store)

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedValues = {
      ...formValues,
      startsAt: formValues.startsAt ? formValues.startsAt.format("MM/DD/YYYY hh:mm A") : null,
      endsAt: formValues.endsAt ? formValues.endsAt.format("MM/DD/YYYY hh:mm A") : null,
    };
    dispatch(createEvent({
      data: formValues,
      restaurantId: restaurant.usersRestaurant?.id,
      jwt
    }))
    console.log("submit", formattedValues);
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value});
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({...formValues, [dateType]: date});
  };

  return (
    <div>
      <div className={'p-5'}>
        <Button onClick={handleOpen} variant={'contained'}>
          Create New Event
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id={"image"}
                    name={"image"}
                    label={"Image"}
                    variant={"outlined"}
                    onChange={handleFormChange}
                    value={formValues.image}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id={"location"}
                    name={"location"}
                    label={"Location"}
                    variant={"outlined"}
                    onChange={handleFormChange}
                    value={formValues.location}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id={"eventName"}
                    name={"eventName"}
                    label={"Event Name"}
                    variant={"outlined"}
                    onChange={handleFormChange}
                    value={formValues.eventName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label={"Start Date and Time"}
                      value={formValues.startsAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startsAt")
                      }
                      inputFormat={"MM/DD/YYYY hh:mm A"}
                      className={'w-full'}
                      sx={{width: "100%"}}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label={"End Date and Time"}
                      value={formValues.endsAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endsAt")
                      }
                      inputFormat={"MM/DD/YYYY hh:mm A"}
                      className={'w-full'}
                      sx={{width: "100%"}}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <div className={'mt-2'}>
                <Button variant={"contained"} color={"primary"} type={'submit'}>
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Event;