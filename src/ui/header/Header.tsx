import React, {useState, useEffect, FC} from "react";
import AppBar from "@mui/material/AppBar";
import {Alert, Badge, Box, Button, Drawer, Grid, Snackbar, useMediaQuery, useTheme} from '@mui/material';
import {useTypedSelector} from "../../components/hooks/use-typed-selector";
import {SideCartDialog} from "./SideCartDialog";
import {useDispatch} from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NextLink from "../../utils/Link";
import {ScrollToElevate} from "../common/ScrollToElevate";
import {HeaderHeight} from "../theme";
import {resetCart} from "../../redux/session/cart.actions";

interface HeaderProps{
}
export const Header: FC<HeaderProps> = (props) => {

    const {} = props

    const theme = useTheme();
    const dispatch = useDispatch()

    const [openCartDialog, setOpenCartDialog] = useState(false)
    const [openCartValidatedSnackbar, setOpenCartValidatedSnackbar] = React.useState<boolean>(false)

    const cartPriceValue = useTypedSelector((state) => state.cartReducer.cart
        .map((cartItem) => cartItem.quantity * cartItem.item.price)
        .reduce((prev, next) => prev + next, 0));

    const uniqueItemsCount = useTypedSelector((state) => state.cartReducer.cart.length)


    return (
        <>
            <ScrollToElevate threshold={100} elevation={1}>
                <AppBar position="sticky" sx={{
                    height: HeaderHeight,
                    zIndex: theme.zIndex.drawer + 1,
                    justifyContent:'center',
                    alignItems: "center",
                    backgroundColor: '#F9F8F8'
                }}>


                    <Grid container xl={10} lg={11} md={11} sm={10} xs={10} justifyContent={"space-between"} alignItems={"center"}>

                        <Grid item >
                            <NextLink href="/" sx={{textDecoration: "none"}}>
                                <Button>
                                    <img src="/assets/images/sedeo_small.png" alt="Home" width={117} height={57}/>
                                </Button>
                            </NextLink>

                        </Grid>

                        <Grid item >
                            <Grid container direction={"row"} alignItems={"center"}>
                                <Badge badgeContent={uniqueItemsCount > 0 ? (`${cartPriceValue}€`) : null}
                                       sx={{
                                           "& .MuiBadge-badge": {
                                               color: "white",
                                               backgroundColor: "#FF0000",
                                               mr: 0.5
                                           }
                                       }}>
                                    <Box
                                        component={Button}
                                        ml={2.5}
                                        bgcolor="#FFFFFF"
                                        borderRadius={35}
                                        p={1.25}
                                        px={2.5}
                                        aria-label={"cart"}
                                        onClick={() => setOpenCartDialog(true)}
                                    >
                                        <ShoppingCartIcon sx={{ color: '#00FFB3'}}/>
                                    </Box>
                                </Badge>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
            </ScrollToElevate>

            <Drawer sx={{zIndex: theme.zIndex.drawer + 2}} open={openCartDialog} anchor="right"
                    onClose={() => setOpenCartDialog(false)}>
                <SideCartDialog
                    toggleSidenav={() => setOpenCartDialog(false)}
                    onCartValidated={() => {
                        setOpenCartDialog(false)
                        setOpenCartValidatedSnackbar(true)
                        dispatch(resetCart())
                    }}
                />
            </Drawer>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openCartValidatedSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenCartValidatedSnackbar(false)}
            >
                <Alert
                    severity={"success"}
                    sx={{
                        backgroundColor: '#00FFB3',
                        color:'#213861',
                        "& .MuiAlert-icon": {
                            color: '#213861'
                        }
                    }}>
                    Panier validé. Yay!
                </Alert>
            </Snackbar>
        </>
    );
}
