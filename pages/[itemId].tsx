import React, {useEffect, useState} from "react";
import {Grid, Box, Container, Typography, useTheme, Skeleton, Button, Card} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {Router, useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from "next/head";
import {Item} from "../src/models/Items";
import {ItemDetailSummary} from "../src/ui/itemDetail/ItemDetailSummary";
import {ItemDetailImageGallery} from "../src/ui/itemDetail/ItemDetailImageGallery";

interface ItemDetailState {
    item?: Item;
    error?: string;
    isLoading: boolean;
}

const Div_Content = styled('div')(({ theme }) => ({
    backgroundColor: '#F9F8F8',
    display: 'flex',
    justifyContent: 'center'
}))

const Box_Image_container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
    },
    [theme.breakpoints.up('sm')]: {
        width: '250px'
    },
    [theme.breakpoints.up('md')]: {
        minWidth: '250px',
        maxWidth: '350px'
    },
    [theme.breakpoints.up('lg')]: {
        minWidth: '350px',
        maxWidth: '500px'
    }
}))

export default function Index() {

    const router = useRouter()
    const [itemId, setItemId] = React.useState<string | null>(null);
    const [pathToCheck, setPathToCheck] = React.useState<string | null>(null) // This is the url to be checked when user changes url or load a page
    const [state, setState] = useState<ItemDetailState>({ isLoading: true });

    useEffect(() => {
        if(router.query.itemId){
            setItemId(router.query.itemId as string)
        }
    },[pathToCheck])

    useEffect(() => {
        Router.events.on("routeChangeComplete", url => {
            setPathToCheck(url)
        });
        console.log(router)
    }, [])

    useEffect(() => {
        getItem().catch(console.error);
    }, [itemId]);

    const getItem = async () => {
        setState(() => ({ isLoading: true }));
        try {
            if(itemId){
                fetch(`https://fakestoreapi.com/products/${itemId}`)
                    .then(res=>res.json())
                    .then(json=>{
                        console.log(json)
                        let item: Item = json // That's unsafe
                        setState(() => ({
                            isLoading: false,
                            item: item
                        }));
                    })
            }else{
                setState(() => ({ isLoading: true })); // TODO should show some UI to refresh
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                setState(() => ({
                    isLoading: false,
                    error: (err as Error).message
                }));
            } else {
                setState(() => ({
                    isLoading: false,
                    error: "Error"
                }));
            }
        }
    };


    const renderContent = () => {
        if (state.isLoading) {
            return (
                <>
                    <Toolbar />
                    <Box sx={{ py: 4 }}>
                        <Skeleton height={42} />
                        <Skeleton />
                        <Skeleton />
                    </Box>
                </>
            );
        }

        if (state.error || !state.item) {
            return (
                <Div_Content>
                    <Grid container lg={8} sx={{m: 1}}>
                        <Card elevation={1} sx={{display: 'flex', p: 2, width: '100%'}}>
                            <Grid container direction={"column"}>
                                <Box >
                                    <Button
                                        sx={{
                                            textTransform:"none",
                                            fontSize: '16px',
                                            color: '#213861'
                                        }}
                                        size={"large"}
                                        onClick={() => router.back()}
                                        variant = "text"
                                        startIcon={<ArrowBackIcon sx={{color:'#00FFB3'}}/>}>
                                        Retour
                                    </Button>
                                </Box>

                                <Box sx={{ py: 16 }}>
                                    <Typography color="textSecondary" sx={{ fontSize: '18px' }} align={"center"} variant="body2">
                                        {state.error}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Card>
                    </Grid>
                </Div_Content>
            );
        }

        return (
            <Div_Content>
                <Head>
                    <title>Sedeo: détail de {state.item.title}</title>
                </Head>
                <Grid container lg={8} sx={{m: 1}}>
                    <Card elevation={1} sx={{display: 'flex', p: 2, width: '100%'}}>
                        <Grid container direction={"column"}>
                            <Box >
                                <Button
                                    sx={{
                                        textTransform:"none",
                                        fontSize: '16px',
                                        color: '#213861'
                                    }}
                                    size={"large"}
                                    onClick={() => router.back()}
                                    variant = "text"
                                    startIcon={<ArrowBackIcon sx={{color:'#00FFB3'}}/>}>
                                    Retour
                                </Button>
                            </Box>

                            <Grid container sx={{ mt: 2}}>
                                <Box_Image_container >
                                    <ItemDetailImageGallery item={state.item}/>
                                </Box_Image_container>

                                <Box sx={{ flex: 1 }}>
                                    <ItemDetailSummary item={state.item}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Div_Content>
        );
    };

    return (
        <>
            <Head>
                <title>Sedeo: détail de</title>
            </Head>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    flexGrow: 1
                }}
            >
                {renderContent()}
            </Box>
        </>
    );
}
