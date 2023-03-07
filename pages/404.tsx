import {Card, Grid, Typography} from "@mui/material";
import {DefaultRoundButton} from "../src/ui/common/DefaultRoundButton";
import React from "react";
import {styled} from "@mui/material/styles";
import {useRouter} from "next/router";
import Head from "next/head";

const Div_Content = styled('div')(({ theme }) => ({
    backgroundColor: '#F9F8F8',
    display: 'flex',
    justifyContent: 'center'
}))

export default function Custom404() {
    const router = useRouter()

    return (
        <Div_Content>
            <Head>
                <meta name="robots" content="noindex"/>
            </Head>
            <Grid container lg={9} justifyContent={"center"}>
                <Card sx={{ mx: 2, my: 2, pt: '20px', px: 3, display:"flex", justifyContent: "center", flexDirection: "column"}} elevation={1}>
                    <Grid container direction={"row"} justifyContent={"center"} sx={{py: 3}}>

                        <img src={"/assets/market_item_placeholder.png"} alt={"placeholder"} width={200} height={200}/>

                        <Typography variant={"body2"} sx={{ width: '100%', mt: 4, px: '18px', color: '#213861', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', textTransform: 'none'}}>
                            Erreur 404 - Cette page n&apos;existe pas
                        </Typography>

                        <DefaultRoundButton
                            sx={{ color: '#213861', my: 5, px: 5, py: 1, textTransform: 'none'}}
                            onClick={() => {
                                // Clear the Event state and redirect the user to the Home
                                router.push({pathname: '/'})}
                            }
                        >
                            Revenir à l&apos;accueil
                        </DefaultRoundButton>
                    </Grid>
                </Card>
            </Grid>
        </Div_Content>
    )
}