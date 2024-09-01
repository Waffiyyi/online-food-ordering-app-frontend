import React, {useState} from 'react';
import {Box, Button, Card, Divider, Grid, Modal, TextField} from "@mui/material";
import CartItem from "./CartItem.jsx";
import AddressCard from "./AddressCard.jsx";
import AddLocationIcon from '@mui/icons-material/AddLocationAlt';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../State/Order/Action.js";

const items = [1, 1]
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none'
}
const initialValues = {
    streetAddress: "",
    state: "",
    pincode: "",
    city: ""
}
// const validationSchema = Yup.object.shape({
//     streetAddress: Yup.string().required("Street address is required"),
//     state: Yup.string().required("State address is required"),
//     pincode: Yup.required("pincode address is required"),
//     city: Yup.string().required("City is required")
// })

const Cart = () => {
    const {auth, cart} = useSelector(store=>store);
    const dispatch = useDispatch();
    const createOrderUsingSelectedAddress = () => {
    }

    const [open, setOpen] = useState(false);
    const handleOpenAddressModal = () => setOpen(true);
    //const handleOpen=()=> setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (value) => {
        const data = {
            jwt:localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: value.streetAddress,
                    city: value.city,
                    state: value.state,
                    postalCode: value.postalCode
                }
            }
        }
        dispatch(createOrder(data))
        console.log("helpppp", cart.cartItems[0].food?.restaurant.id)

        console.log("vakkeuueueueue",value)
    }
    return (
        <>
            <main className={'lg:flex justify-between'}>
                <section className={'lg:w-[30%] space-y-6 lg:min-h-screen pt-10'}>
                    {cart.cartItems.map((item) => <CartItem key={item.id} item={item}/>)}
                    <Divider/>
                    <div className={'billDetails px-5 text-sm'}>
                        <p className={'font-semibold py-5'}>Bill Details</p>
                        <div className={'space-y-3'}>
                            <div className={'flex justify-between text-gray-400'}>
                                <p>Item Total</p>
                                <p>₦{cart.cart?.total}</p>
                            </div>
                            <div className={'flex justify-between text-gray-400'}>
                                <p>Delivery Fee</p>
                                <p>₦21</p>
                            </div>
                            <div className={'flex justify-between text-gray-400'}>
                                <p>GST and Restaurant Charges</p>
                                <p>₦33</p>
                            </div>
                            <Divider/>
                        </div>
                        <div className={'flex justify-between text-gray-400'}>
                            <p>Total pay</p>
                            <p>₦{cart.cart?.total+33+21}</p>
                        </div>
                    </div>
                </section>
                <Divider orientation={"vertical"} flexItem/>
                <section className={'lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'}>
                    <div>
                        <h1 className={'text-center font-semibold text-2xl py-10'}>
                            Choose Delivery Address
                        </h1>
                        <div className={'flex gap-5 flex-wrap justify-center'}>
                            {[1, 1, 1].map((i) => <AddressCard key={i} item={i}
                                                               handleSelectAddress={createOrderUsingSelectedAddress}/>
                            )}
                            <Card className={'flex gap-5 w-64 p-5'}>
                                <AddLocationIcon/>
                                <div className={'space-y-3 text-gray-400'}>
                                    <h1 className={'font-semibold text-lg text-white'}>Add New Address</h1>
                                    <Button variant={'outlined'} fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                </section>

            </main>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                            onSubmit={handleSubmit}
                                    // validationSchema={validationSchema}>
                        >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name={"streetAddress"}
                                        label={"Street Address"}
                                        fullWidth
                                        variant={"outlined"}/>

                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name={"state"}
                                        label={"state"}
                                        fullWidth
                                        variant={"outlined"}/>

                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name={"city"}
                                        label={"city"}
                                        fullWidth
                                        variant={"outlined"}/>

                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name={"pincode"}
                                        label={"pincode"}
                                        fullWidth
                                        variant={"outlined"}/>

                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant={'contained'} type={'submit'} color={'primary'} >Deliver Here</Button>

                                </Grid>
                            </Grid>
                        </Form>

                    </Formik>

                </Box>
            </Modal>
        </>
    );
};

export default Cart;