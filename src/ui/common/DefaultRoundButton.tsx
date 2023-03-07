import {styled} from "@mui/system";
import {LoadingButton} from "@mui/lab";

export interface DefaultRoundButtonProps{

}

export const DefaultRoundButton = styled(LoadingButton)<DefaultRoundButtonProps>(({theme}) => ({
    display: 'block',
    backgroundColor: '#00FFB3',
    borderRadius: '54px',
    transition: 'all 200ms ease',
    cursor: 'pointer',
    opacity: '1',
    boxShadow: '0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)',
    border: 'none',

    '&:hover':{
        // color: hoverTextColor,
        backgroundColor: '#00FFB3',
    },
    '&:focus': {
        // boxShadow: '0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5)',
        outline: 'none',
    },
}));