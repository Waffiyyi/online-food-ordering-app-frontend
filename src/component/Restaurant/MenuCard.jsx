import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Snackbar,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from "../../util/categorizeIngredients.js";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, findCart } from "../../State/Cart/Action.js";

const MenuCard = ({ item }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const dispatch = useDispatch();
    const { menu} = useSelector(store => store);

    const handleCheckBoxChange = (itemName) => {
        if (selectedIngredients.includes(itemName)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName));
        } else {
            setSelectedIngredients([...selectedIngredients, itemName]);
        }
    };

    const handleAddItemToCart = async (e) => {
        e.preventDefault();
        const reqData = {
            jwt: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngredients
            }
        };
        const result = await dispatch(addItemToCart(reqData));
        if (result.isNewItem) {
            setPopupMessage('Item added to cart');
        } else {
            setPopupMessage('Item quantity updated in cart');
        }
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <div className={'lg:flex items-center justify-between'}>
                        <div className={'lg:flex items-center lg:gap-5'}>
                            <img className={'w-[7rem] h-[7rem] object-cover'}
                                 src={item.images[0]}
                                 alt={'food image'} />
                            <div className={'space-y-1 lg:space-y-5 lg:max-w-2xl'}>
                                <p className={'font-semibold text-xl'}>{item.name}</p>
                                <p>₦{item.price}</p>
                                <p className={'text-gray-400'}>{item.description}</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleAddItemToCart}>
                        <div className={"flex gap-5 flex-wrap"}>
                            {
                                Object.keys(categorizeIngredients(item.ingredientItems)).map((category) =>
                                    <div key={category}>
                                        <p>{category}</p>
                                        <FormGroup>
                                            {categorizeIngredients(item.ingredientItems)[category].map((ingredient) =>
                                                <FormControlLabel
                                                    key={ingredient.id}
                                                    control={<Checkbox onChange={() => handleCheckBoxChange(ingredient.name)} />}
                                                    label={ingredient.name} />
                                            )}
                                        </FormGroup>
                                    </div>
                                )}
                        </div>
                        <div className={'pt-5'}>
                            <Button
                                variant={"contained"}
                                disabled={false}
                                type={"submit"}>
                                Add to cart
                            </Button>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>
            <Snackbar
                open={popupOpen}
                autoHideDuration={3000}
                onClose={handleClosePopup}
                message={popupMessage}
            />
        </>
    );
};

export default MenuCard;