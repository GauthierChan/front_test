import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Card, CircularProgress, circularProgressClasses, Container, Grid, Skeleton, Typography, useMediaQuery, useTheme} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {Router, useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import Head from "next/head";
import {ItemList} from "../src/ui/itemList/ItemList";
import {Item} from "../src/models/Items";
import {ItemFilterer, ItemNameFilterer} from "../src/utils/ItemFilterer";
import {Query} from "../src/ui/common/Query";
import {DefaultRoundButton} from "../src/ui/common/DefaultRoundButton";
import debounce from "@mui/utils/debounce";

interface ItemsState {
    error?: string;
    items?: Item[];
    isLoading: boolean;
}

const Div_Content = styled('div')(({ theme }) => ({
    backgroundColor: '#F9F8F8',
    display: 'flex',
    justifyContent: 'center'
}))

export default function Index() {

    const router = useRouter()
    const theme = useTheme()
    const [state, setState] = useState<ItemsState>({
        isLoading: true
    });

    // Search
    const [searchQuery, setSearchQuery] = React.useState<string|null>(null);
    const itemFilterer: ItemFilterer = new ItemNameFilterer()

    const screenDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {

        setState(() => ({isLoading: true}));
        try {
            fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=>{
                    let items: Item[] = json // That's unsafe
                    setState(() => ({
                        isLoading: false,
                        items: items
                    }));
                })
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

    const debouncedSearch = debounce(function (newQuery: string) {
        if(newQuery === ''){
            setSearchQuery(null)
        }else {
            setSearchQuery(newQuery)
        }
    }, 500);

    const handleSearchQueryChange = (newQuery: string): void => {
        debouncedSearch(newQuery)
    }

    // Return an object containing the list of filtered items depending on the searchQuery
    const filteredItems = useMemo(() => {
            if(searchQuery && state.items) {
                return itemFilterer.filter(searchQuery, state.items)
            }else{
                // Otherwise return an empty object as it won't be used anyway
                return [{ id: '', title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0}}]
            }
        },
        [searchQuery, state.items]
    );



    const renderContent = () => {
        if(!state){
            return (
                <Grid container sx={{minHeight:'50vh'}} justifyContent={"center"} alignItems={"center"}>
                    <Box sx={{ position: 'relative' }}>
                        <CircularProgress
                            variant="determinate"
                            sx={{ color: "#FFFFFF",}}
                            size={40}
                            thickness={4}
                            value={100}
                        />
                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            sx={{
                                color: '#00FFB3',
                                animationDuration: '550ms',
                                position: 'absolute',
                                left: 0,
                                [`& .${circularProgressClasses.circle}`]: {
                                    strokeLinecap: 'round',
                                },
                            }}
                            size={40}
                            thickness={4}
                        />
                    </Box>
                </Grid>
            );
        }

        if(state.items && state.items.length > 0) // Check if we have item for the active category. If the user tampered the url params we might have no items
        {
            return (
                <Div_Content>
                    {
                        screenDownSM?
                            <Grid container direction={"column"}>

                                <Box>
                                    <ItemList
                                        filteredItems={searchQuery ? filteredItems : state.items}
                                        searchQuery={searchQuery}
                                    />
                                </Box>
                            </Grid>
                            :
                            <Grid container xl={10} xs={11}>
                                <Grid item xs={12}
                                    sx={{mt: 3, mx: 2}}>
                                    <Box>
                                        <Query
                                            disabled={false}
                                            autoFocusOnMount={false}
                                            onChange={handleSearchQueryChange}
                                            onlyWhenEnterPressed={false}
                                            value={searchQuery??''}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box >
                                        <ItemList
                                            filteredItems={searchQuery ? filteredItems : state.items}
                                            searchQuery={searchQuery}
                                        />
                                    </Box>
                                </Grid>

                            </Grid>
                    }

                </Div_Content>

            );
        }

        if (state.isLoading) {
            return (
                <Container
                    maxWidth={false}
                    sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0}}
                >
                    <Toolbar />
                    <Box sx={{ py: 4 }}>
                        <Skeleton height={42} />
                        <Skeleton />
                        <Skeleton />
                    </Box>
                </Container>
            );
        }

        if (state.error) {
            return (
                <Div_Content>
                    <Grid container lg={9} justifyContent={"center"}>
                        <Card sx={{ mx: 2, my: 2, pt: '20px', px: 3, display:"flex", justifyContent: "center", flexDirection: "column"}} elevation={1}>
                            <Grid container direction={"row"} justifyContent={"center"} sx={{py: 3}}>
                                <Typography variant={"h1"} sx={{ width: '100%', mb: 3, px: '18px', color: '#213861', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase'}}>
                                    Erreur de chargement
                                </Typography>

                                <img src={"/assets/market_item_placeholder.png"} alt={"placeholder"} width={200} height={200}/>

                                <Typography variant={"body2"} sx={{ width: '100%', mt: 4, px: '18px', color: '#213861', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', textTransform: 'none'}}>
                                    Saperlipopette, nous n’avons pas réussi à charger les items :(
                                </Typography>

                                <DefaultRoundButton
                                    sx={{my: 5, px: 5, py: 1}}
                                    onClick={() => {
                                        router.push({pathname: '/'})}
                                    }
                                >
                                    Refaire une recherche
                                </DefaultRoundButton>
                            </Grid>
                        </Card>
                    </Grid>
                </Div_Content>
            );
        }


    };

    return (
        <>
            <Head>
                <title>Sedeo: Marketplace</title>
            </Head>
            <Box
                sx={{
                    backgroundColor: '#F9F8F8',
                    flexGrow: 1
                }}
            >
                {renderContent()}

            </Box>
        </>
    );
}
