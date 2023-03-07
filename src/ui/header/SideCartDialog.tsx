import Add from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import Remove from '@mui/icons-material/Remove'
import {Box, Button, Divider, Grid, IconButton, TextField, Typography} from '@mui/material'
import {styled, useTheme} from '@mui/material/styles'
import React from 'react'
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../components/hooks/use-typed-selector";
import {ShoppingBagOutlined} from "@mui/icons-material";
import {MaterialImage} from "../common/MaterialImage";
import {useRouter} from "next/router";
import {CartItem} from "../../models/CartItem";
import {addItemsToCart, decreaseItemsFromCart, removeItemFromCart, setCartItemQuantity} from "../../redux/session/cart.actions";
import NextLink from "../../utils/Link";
import {DefaultRoundButton} from "../common/DefaultRoundButton";

type SideCartDialogProps = {
    toggleSidenav?: () => void
    onCartValidated: () => void
}

const Textfield_quantity = styled(TextField)(({ theme }) => ({
    flex: 1,
    width: '70px',
    input: {
        // This block removes the arrows from the input. See https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp, for Firefox it is set in the globals.css until we find a way to do it here
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    },
    justifyContent: 'center'
}))


export const SideCartDialog: React.FC<SideCartDialogProps> = ({ toggleSidenav, onCartValidated }) => {

    const theme = useTheme()
    const { palette } = useTheme()
    const router = useRouter()

    const dispatch = useDispatch()

    const cartItems = useTypedSelector((state) => state.cartReducer.cart);
    const cartPriceValue = useTypedSelector((state) => state.cartReducer.cart
        .map((cartItem) => cartItem.quantity * cartItem.item.price)
        .reduce((prev, next) => prev + next, 0));
    const eventState = useTypedSelector((state) => state.cartReducer);

    const renderImage = (cartItem: CartItem) =>{
        if(cartItem.item.image){
            return <MaterialImage
                key={cartItem.item.image}
                src={cartItem.item.image}
                showLoading
                errorIcon={<img src={"../../assets/market_item_placeholder.png"} alt={cartItem.item.title} style={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: '76px', height: '76px' }}/>}
                alt={cartItem.item.title}
                duration={0}
                style={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: '76px', height: '76px' }}/>
        }else{
            return <img src={"../../assets/market_item_placeholder.png"} alt={"placeholder"} style={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: '76px', height: '76px' }}/>
        }
    }
    function getCartPriceWithoutTaxes(): number {
        return cartPriceValue
    }

    function getCartTaxes(): number {
        return cartPriceValue * 0.2
    }

    function getCartPriceWithTaxes(): number {
        return cartPriceValue * 1.2
    }

    return (
        <Box sx={{maxWidth: '400px'}}>
            <Box
                overflow="auto"
                height={`calc(100vh - ${!!cartItems.length ? '215px - 1.25rem' : '0px'})`}
            >
                <Box
                    display={"flex"}
                    alignItems="center"
                    m="0px 20px"
                    height="74px"
                    color="secondary.main"
                >
                    <Grid container direction={"row"}>
                        <ShoppingBagOutlined color="inherit" />
                        <Box fontWeight={600} fontSize="16px" ml={1}>
                            {cartItems.length} Objet{cartItems.length>1 ? 's' : ''}
                        </Box>
                    </Grid>
                    <Grid item >
                        <IconButton
                            sx={{color: '#213861'}}
                            size="medium"
                            onClick={toggleSidenav}
                        >
                            <Close fontSize="medium" />
                        </IconButton>
                    </Grid>

                </Box>

                <Divider />

                {!cartItems.length && (
                    <Box
                        display={"flex"}
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="calc(100% - 74px)"
                    >
                        <Box
                            component="p"
                            mt={2}
                            color="grey.600"
                            textAlign="center"
                            maxWidth="200px"
                        >
                            Votre panier est vide
                        </Box>
                    </Box>
                )}
                {cartItems.map((cartItem: CartItem) => (
                    <Box
                        display={"flex"}
                        alignItems="center"
                        py={2}
                        px={2.5}
                        borderBottom={`1px solid ${palette.divider}`}
                        key={cartItem.item.id}
                    >
                        <Box display={"flex"} alignItems="center" flexDirection="column">
                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#213861',
                                    minWidth: 0,
                                    minHeight: 0,
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '300px',
                                }}
                                onClick={() => dispatch(addItemsToCart(cartItem, 1))}
                            >
                                <Add fontSize="small" />
                            </Button>
                            <Textfield_quantity type={"number"} variant={'outlined' as any}
                                sx={{my: 1, padding: 0}}
                                inputProps={{style:{textAlign: "center"}}}
                                InputProps={{ disableUnderline: true }}
                                onWheel={e => e.target instanceof HTMLElement && e.target.blur()} // Prevent scroll changing number input. See https://github.com/mui/material-ui/issues/7960
                                onBlur={(event) => {
                                    if(parseInt(event.target.value) >= 0) {
                                        dispatch(setCartItemQuantity(cartItem, parseInt(event.target.value)))
                                    }else {
                                        dispatch(setCartItemQuantity(cartItem, 0))
                                    }
                                }}
                                onChange={(event) => {
                                    if(parseInt(event.target.value) >= 0) {
                                        dispatch(setCartItemQuantity(cartItem, parseInt(event.target.value)))
                                    }else {
                                        dispatch(setCartItemQuantity(cartItem, 0))
                                    }
                                }}
                                value={cartItem.quantity ? cartItem.quantity.toString() : '0'}/> {/** See https://github.com/mui-org/material-ui/issues/15697 because of the emotion styling to remove arrows, Typescript thinks the only allowed variant is 'filled'  **/}

                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#213861',
                                    minWidth: 0,
                                    minHeight: 0,
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '300px',
                                }}
                                onClick={() => dispatch(decreaseItemsFromCart(cartItem.item.id, 1))}
                                disabled={cartItem.quantity === 1}
                            >
                                <Remove fontSize="small" />
                            </Button>
                        </Box>

                        <NextLink href={`/${cartItem.item.id}`}>
                            <a>
                                {renderImage(cartItem)}
                            </a>
                        </NextLink>

                        <Box flex="1 1 0">
                            <NextLink href={`/${cartItem}`}>
                                <a style={{color:'#213861'}}>
                                    <Typography sx={{ color: '#213861', opacity: cartItem.quantity > 0 ? 1 : 0.5, fontWeight: 'bold'}}>
                                        {cartItem.item.title}
                                    </Typography>
                                </a>
                            </NextLink>

                            {
                                cartItem.quantity > 0?
                                    <>
                                        <Typography variant={"body2"}>
                                            {(cartItem.item.price).toFixed(2)}€ HT x {cartItem.quantity}
                                        </Typography>
                                        <Box fontWeight={600} fontSize="14px" color="#213861" mt={0.5}>
                                            {(cartItem.quantity * cartItem.item.price).toFixed(2)}€ HT
                                        </Box>
                                    </>
                                    :null
                            }
                        </Box>

                        <IconButton
                            sx={{
                                color: '#213861',
                                ml: 2.5
                            }}
                            size="small"
                            onClick={() => dispatch(removeItemFromCart(cartItem.item.id))}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            {!!cartItems.length && (
                <Box sx={{px: 2.5, py: 1}}>

                    <Grid container alignItems="center" sx={{mt: 2}}>
                        <Grid container xs={8} justifyContent={"start"}>
                            <Typography sx={{fontSize: '14px', textAlign: 'end'}}>Total matériel HT</Typography>
                        </Grid>

                        <Grid item xs={4} sx={{pl: 1}}>
                            <Typography sx={{fontSize: '14px',}} textAlign={"end"}>
                                {`${(getCartPriceWithoutTaxes()).toFixed(2)}€`}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" sx={{mt: 2}}>
                        <Grid container xs={8} justifyContent={"start"}>
                            <Typography sx={{fontSize: '14px', textAlign: 'end'}}>TVA (20%)</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{pl: 1}}>
                            <Typography sx={{fontSize: '14px',}} textAlign={"end"}>
                                {`${(getCartTaxes()).toFixed(2)}€`}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{py: 1, borderColor:'#213861'}}/>

                    <Grid container alignItems="center" sx={{mt: 2}}>
                        <Grid container xs={8} justifyContent={"start"}>
                            <Typography sx={{fontSize: '14px', fontWeight: 'bold', textAlign: 'end'}}>Total TTC</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{pl: 1}}>
                            <Typography sx={{fontSize: '14px', fontWeight: 'bold',}} textAlign={"end"}>
                                {`${(getCartPriceWithTaxes()).toFixed(2)}€`}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Box sx={{px: 2.5, py: 1}}>
                        <DefaultRoundButton
                            sx={{ color: '#213861', mt: 1, mb: 2, py: 1, width:'100%', textTransform:'none'}}
                            style={{whiteSpace: 'pre-line'}}
                            onClick={() => {
                                if(toggleSidenav) toggleSidenav()
                                onCartValidated()
                            }}
                        >
                            Valider mon panier
                        </DefaultRoundButton>
                    </Box>
                </Box>
            )}
        </Box>
    )
}
