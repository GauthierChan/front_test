import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import {Box, Button, Card, Chip, Grid, styled, TextField, Typography,} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {Item} from "../../models/Items";
import NextLink from "../../utils/Link";
import {MaterialImage} from "../common/MaterialImage";
import {useTypedSelector} from "../../components/hooks/use-typed-selector";
import {addItemsToCart, decreaseItemsFromCart, setCartItemQuantity} from "../../redux/session/cart.actions";

const StyledCard = styled(Card)(() => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    margin: "auto",
    overflow: "hidden",
    transition: "all 250ms ease-in-out",
    borderRadius: "20px",

    "&:hover": {
        boxShadow: "0 1px 8px 1px rgba(33, 56, 97, 0.3)",
        "& .css-1i2n18j": {
            display: "flex",
        },
    },
}));

const ImageWrapper = styled(Box)(({theme}) => ({
    position: "relative",
    display: "inline-block",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
        display: "block",
    },
}));

const Textfield_quantity = styled(TextField)(({ theme }) => ({
    flex: 1,
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

const ContentWrapper = styled(Box)(() => ({
    padding: "1rem",
    "& .title, & .categories": {
    },
}));

export interface ItemComponentProps {
    item: Item;
}
export const ItemComponent: React.FC<ItemComponentProps> = (props) => {

    const {item} = props

    const dispatch = useDispatch()

    const itemQuantity = useTypedSelector((state) => state.cartReducer.cart.find((cartItem) => cartItem.item.id === item.id)?.quantity);

    const renderImage = () =>{
        if(item.image){
            return <MaterialImage
                key={item.image}
                src={item.image}
                showLoading
                errorIcon={<img src={"/assets/market_item_placeholder.png"} alt={item.title} width={200} height={200}/>}
                alt={item.title}
                width={200}  height={200}/>
        }else{
            return <img src={"/assets/market_item_placeholder.png"} alt={item.title} width={200} height={200}/>
        }
    }

    return (
        <StyledCard >

            <ImageWrapper sx={{mt: 2}}>
                <NextLink href={'/'+item.id}>
                    <a>
                        {renderImage()}
                    </a>
                </NextLink>
            </ImageWrapper>

            <ContentWrapper>
                <Box flex="1 1 0" minWidth="0px" mr={1}>
                    <NextLink href={'/'+item.id} underline={'none'}>
                        <Typography variant={"body2"} className="title" sx={{fontSize: '14px', textAlign: 'left', color: 'text.secondary', mt: 1}}>
                            {item.title}
                        </Typography>
                        <Typography paragraph sx={{ color: '#213861', fontWeight: '400', fontSize: '10px',
                            mb: 1, textTransform: 'uppercase'}}>
                            {item.category}
                        </Typography>
                    </NextLink>

                    {/* TODO Show rating here? */}

                </Box>

                <Box sx={{mt: 2}}>
                    <Grid container justifyContent={"space-between"}>
                        <Box display={"flex"} alignItems="center" mt={0.5}>
                            <Box fontSize={'13px'} color="primary.secondary">
                                prix/unité:
                            </Box>
                            <Box pl={1} fontSize={'13px'} fontWeight="bold" color="primary.secondary">
                                {item.price} €
                            </Box>
                        </Box>

                        <Box sx={{display: 'flex'}}
                             className="add-cart"
                             alignItems="center"
                             justifyContent={!!itemQuantity ? "space-between" : "flex-start"}

                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{padding: "3px", borderRadius:'15px'}}
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
                                                value={itemQuantity ? itemQuantity.toString() : '0'}
                            /> {/** See https://github.com/mui-org/material-ui/issues/15697 because of the emotion styling to remove arrows, Typescript thinks the only allowed variant is 'filled'  **/}

                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{padding: "3px", borderRadius:'15px'}}
                                onClick={() => dispatch(addItemsToCart({item: item, quantity: 1}, 1))}
                            >
                                <Add fontSize="small" sx={{color: '#FFFFFF'}}/>
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </ContentWrapper>

        </StyledCard>
    );
};
