import type {AppProps} from 'next/app'
import React from "react";
import Head from "next/head";
import Theme from "../src/ui/theme";
import {Provider} from "react-redux";
import {store} from "../src/redux/store";
import {ThemeProvider} from '@mui/material/styles';
import {StyledEngineProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {Header} from "../src/ui/header/Header";

function MyApp({Component, pageProps}: AppProps) {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!!.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Sedeo</title>
                <meta name="description" content="Probably not the right text" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={Theme}>
                    <Provider store={store}>
                        <div>
                            <CssBaseline/>
                            <Header/>

                            <Component
                                {...pageProps}
                            />
                        </div>
                    </Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        </React.Fragment>
    )
}
export default MyApp