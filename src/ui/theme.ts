import { createTheme, Theme } from "@mui/material/styles";
import {error, primary, secondary, success, warning} from "./themeColors";

const fontFamily = [
    'DM Sans',
    'Open Sans',
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
].join(',')


export const HeaderHeight = '64px' // Height of the Toolbar of the website

export default createTheme({
    palette: {
        background: {
            default: "#F9F8F8"
        },
        primary: {
            ...primary,
            light: primary[100],
        },
        secondary,
        error,
        warning,
        success,
        text: {
            primary: '#213861',
            secondary: '#213861',
            disabled: '#C4C4C4',
        },
    },
    typography: {
        fontFamily,

    },
    components:{

        MuiToolbar:{
            styleOverrides: {
                root: {
                    height: HeaderHeight
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    minWidth: 0,
                    minHeight: 0,
                },
            }
        }

    }
});
