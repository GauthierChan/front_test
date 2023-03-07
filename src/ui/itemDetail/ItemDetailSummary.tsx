import React, {FC, useState} from "react";
import {Button, Divider, Grid, TextField, Typography, Box, styled} from "@mui/material";
import {useDispatch} from "react-redux";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import {useRouter} from "next/router";
import {Item} from "../../models/Items";
import {useTypedSelector} from "../../components/hooks/use-typed-selector";
import {addItemsToCart, decreaseItemsFromCart, setCartItemQuantity} from "../../redux/session/cart.actions";
import {DefaultRoundButton} from "../common/DefaultRoundButton";

interface ItemDetailSummaryProps{
    item: Item
}

const Textfield_quantity = styled(TextField)(({ theme }) => ({
    width: '50px',
    input: {
        // This block removes the arrows from the input. See https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp, for Firefox it is set in the globals.css until we find a way to do it here
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    },
    justifyContent: 'center'
}))

export const ItemDetailSummary: FC<ItemDetailSummaryProps> = (props) => {

    const {item} = props

    const router = useRouter()
    const dispatch = useDispatch()

    const itemQuantityInCart = useTypedSelector((state) => state.cartReducer.cart.find((cartItem) => cartItem.item.id === item.id)?.quantity);

    return (
        <Grid container direction={"column"} sx={{ pl: 2, p: '0px 18px 27px' }}>
            <Typography variant={"h5"} sx={{ color: '#213861', fontWeight: 'bold', fontSize: '24px'}}>
                {item.title}
            </Typography>
            <Typography paragraph sx={{ color: '#213861', fontWeight: '400', fontSize: '12px',
                mb: 1, textTransform: 'uppercase'}}>
                {item.category}
            </Typography>

            <Typography paragraph sx={{ color: '#213861', fontWeight: 'regular', fontSize: '16px', whiteSpace: 'pre-line', mt: 2}}>
                {item.description}
            </Typography>

            <Divider sx={{ borderColor: '#6c757d', my: 3}}/>

            <>


                <Grid container >
                    <Typography display={"inline-block"} sx={{ color: '#213861', fontWeight: 'regular', fontSize: '16px'}}>
                        Prix/unité HT :
                    </Typography>
                    <Typography display={"inline-block"} sx={{ color: '#213861', fontWeight: 'bold', fontSize: '16px', ml: 1}}>
                        {item.price}€
                    </Typography>
                </Grid>

                <Box sx={{mt: 0}}>
                    <Grid container
                          className="add-cart"
                          alignItems="center"
                          justifyContent={"flex-start"}
                          sx={{mt: 3}}
                    >
                        <Typography display={"inline"} sx={{ color: '#213861', fontWeight: 'regular', fontSize: '15px', textAlign: 'center'}}>
                            Quantité :
                        </Typography>

                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ml: 2, padding: "3px", borderRadius:'15px'}}
                            onClick={() => dispatch(decreaseItemsFromCart(item.id, 1))}
                        >
                            <Remove fontSize="small" sx={{color: '#FFFFFF'}}/>
                        </Button>
                        <Textfield_quantity type={"number"} variant={'outlined' as any}
                                            sx={{mx: 1, padding: 0}}
                                            inputProps={{style:{color: "text.primary", fontWeight: "600", textAlign: "center", paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px'}}}
                                            InputProps={{ disableUnderline: true }}
                                            onWheel={e => e.target instanceof HTMLElement && e.target.blur()} // Prevent scroll changing number input. See https://github.com/mui/material-ui/issues/7960
                                            onBlur={(event) => {
                                                if(parseInt(event.target.value) >= 0) {
                                                    dispatch(setCartItemQuantity({item: item, quantity: parseInt(event.target.value)}, parseInt(event.target.value)))
                                                }else {
                                                    dispatch(setCartItemQuantity({item: item, quantity: 0}, 0))
                                                }
                                            }}
                                            onChange={(event) => {
                                                if(parseInt(event.target.value) >= 0) {
                                                    dispatch(setCartItemQuantity({item: item, quantity: parseInt(event.target.value)}, parseInt(event.target.value)))
                                                }else {
                                                    dispatch(setCartItemQuantity({item: item, quantity: 0}, 0))
                                                }
                                            }}
                                            value={itemQuantityInCart ? itemQuantityInCart.toString() : '0'}/> {/** See https://github.com/mui-org/material-ui/issues/15697 because of the emotion styling to remove arrows, Typescript thinks the only allowed variant is 'filled'  **/}

                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{padding: "3px", borderRadius:'15px'}}
                            onClick={() => dispatch(addItemsToCart({item: item, quantity: 1}, 1))}
                        >
                            <Add fontSize="small" sx={{color: '#FFFFFF'}}/>
                        </Button>
                    </Grid>
                </Box>

                {
                    itemQuantityInCart?
                        <Grid container sx={{mt: 3}}>
                            <Typography display={"inline-block"} sx={{ color: '#213861', fontWeight: 'regular', fontSize: '16px'}}>
                                Montant total HT :
                            </Typography>
                            <Typography display={"inline-block"} sx={{ color: '#213861', fontWeight: 'bold', fontSize: '16px', ml: 1, textDecoration: 'underline'}}>
                                {(itemQuantityInCart * item.price).toFixed(2)} €
                            </Typography>
                        </Grid>
                        :null
                }

                <DefaultRoundButton
                    sx={{ mt: 3, mb: 2, p: 2, width: 'fit-content'}}
                    style={{whiteSpace: 'pre-line'}}
                    onClick={() => { router.back() }}
                >
                    <Typography sx={{ color: '#213861', fontSize: '14px', fontWeight: 'bold'}}>
                        Revenir au catalogue
                    </Typography>
                </DefaultRoundButton>
            </>

        </Grid>
    )
}