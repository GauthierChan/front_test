import React, {FC} from "react";
import {Card} from "@mui/material";
import {styled} from "@mui/material/styles";
import {MaterialImage} from "../common/MaterialImage";
import {Item} from "../../models/Items";

interface ItemDetailImageGalleryProps{
    item: Item
}

const Div_thumbnails_container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '8px'
}))

const Div_thumbnail = styled('div')(({ theme }) => ({
    width: '25%',
    cursor: 'pointer',
}))
export const ItemDetailImageGallery: FC<ItemDetailImageGalleryProps> = (props) => {

    const {item} = props

    return (
        <>
            <Card elevation={1}>
                <MaterialImage
                    key={item.image}
                    src={item.image}
                    showLoading
                    errorIcon={<img src={"../../assets/market_item_placeholder.png"} alt={item.title} style={{ width: '100%', aspectRatio: '1' }}/>}
                    alt={item.title}
                    duration={0}
                    style={{ width: '100%', aspectRatio: '1' }}/>
            </Card>

            <Div_thumbnails_container>
                <Div_thumbnail>
                    <Card elevation={1} sx={{ margin: '8px'}}>
                        <MaterialImage
                            key={item.image}
                            src={item.image}
                            showLoading
                            errorIcon={<img src={"../../assets/market_item_placeholder.png"} alt={'error'} style={{ width: '100%', aspectRatio: '1' }}/>}
                            alt={item.title}
                            duration={0}
                            style={{ width: '100%', aspectRatio: '1' }}
                        />
                    </Card>
                </Div_thumbnail>
            </Div_thumbnails_container>

        </>
    )
}