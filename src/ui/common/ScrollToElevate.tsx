//props.threshold     : threshold for scroll event to call function. default: 100
//props.elevation     : amount to elevate between 1-24

import React, {FC} from "react";
import {useScrollTrigger} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export interface ScrollToElevateProps {
    threshold: number;
    elevation: number;
    children: React.ReactElement<any>
}

// Taken from https://codesandbox.io/s/material-ui-usescrolltrigger-963ov
export const ScrollToElevate: FC<ScrollToElevateProps> = (props) => {
    const theme = useTheme();

    const { threshold, elevation, children, ...other } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: undefined
    });
    return React.cloneElement(children as React.ReactElement<any>, {
        style: {
            boxShadow: trigger ? theme.shadows[elevation] : "none",
            transition: theme.transitions.create("box-shadow", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        ...other
    });
}
