import React, {useEffect} from 'react';
import {
    Box,
    Card, CardActions,
    CardHeader, IconButton, Modal,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow, Typography,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create'
import CreateFoodCategoryForm from "./CreateFoodCategoryForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurantCategory} from "../../State/Restaurant/Action.js";
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
const FoodCategoryTable = () => {
    const { restaurant} = useSelector(store => store);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const jwt = localStorage.getItem("jwt")

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    console.log("is this the bug ", restaurant.usersRestaurant?.id)
    useEffect(() => {
        dispatch(getRestaurantCategory({
            jwt: jwt,
            restaurantId: restaurant.usersRestaurant?.id}))
    }, [])
    return (
        <div>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={handleOpen} aria-label={"settings"}>
                            <CreateIcon/>
                        </IconButton>
                    }
                    title={"Food Category"}
                    sx={{pt:2, alignItems: "Center"}}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.categories.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                 <CreateFoodCategoryForm/>
                </Box>
            </Modal>
        </div>
    );
};

export default FoodCategoryTable;