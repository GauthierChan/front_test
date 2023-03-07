import React, {FC, useEffect} from "react";
import {Card, Grid, Typography} from "@mui/material";
import {Item} from "../../models/Items";
import {ItemComponent} from "./ItemComponent";

interface MarketListProps{
    filteredItems: Item[]
    searchQuery: string|null
}
export const ItemList: FC<MarketListProps> = (props) => {

    const {filteredItems, searchQuery} = props

    const renderContent = () => {

        // if user made a search and there was no result
        if(searchQuery && filteredItems.length === 0){
            return (
                <Grid container alignContent={"center"} sx={{py: 20, mt: 2, height: '100%'}}>
                    <Typography variant={"body2"} sx={{ width: '100%', mt: 0, px: '18px', color: '#213861', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', textTransform: 'none'}}>
                       Pas de matériel correspondant à vôtre recherche :(
                    </Typography>
                </Grid>
            )
        }

        return(
            <Card sx={{ mx: 2, mt: 2, mb: 0, borderRadius: '20px', display:"flex", flexDirection: "column"}} elevation={1}>
                <Grid container sx={{pt: 0}}>

                    {
                        <Grid container sx={{mx: 2}}>
                            {
                                filteredItems.map((item) => (
                                    <Grid item xl={4} lg={4} md={6} xs={12} key={item.id} sx={{p: 1}}>
                                        <ItemComponent item={item}/>
                                    </Grid>
                                ))
                            }
                        </Grid>

                    }
                </Grid>


            </Card>
        )
    }
    return (
        <>
            {renderContent()}
        </>
    )
}