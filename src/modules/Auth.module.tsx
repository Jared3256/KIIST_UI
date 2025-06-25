import {
    Box,
    CssBaseline,
    CssVarsProvider,
    GlobalStyles,
    IconButton,
    Typography,
} from "@mui/joy";
import {Outlet, useLocation, useNavigate} from "react-router";
import {BadgeOutlined} from "@mui/icons-material";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors";
import {Card, Layout} from "antd";
import {motion} from "framer-motion";

export default function AuthModule() {
    const {current, isLoggedIn} = useSelector(selectAuth);
    const location = useLocation();
    // create a Url to route to
    const fromUrl = location.state?.from?.pathname || "/v1";
    const navigate = useNavigate();
    useEffect(() => {
        console.log(location)

        if (!String(location.pathname).includes("reset_password")) {
            if (current.isLoggedIn) {
                navigate(fromUrl);
            }
        }
    }, []);

    useEffect(() => {
        if (!String(location.pathname).includes("reset_password")) {
            if (!isLoggedIn) {
                navigate("/auth/login", {state: {}});
            }
        }


    }, [isLoggedIn, navigate]);

    const {Footer} = Layout;
    return (
        <CssVarsProvider defaultMode='light' disableTransitionOnChange>
            <CssBaseline/>
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Form-maxWidth": "800px",
                        "--Transition-duration": "0.4s", // set to `none` to disable transition
                    },
                }}
            />

            <Box
                sx={(theme) => ({
                    width: "100%",
                    transition: "width var(--Transition-duration)",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255 255 255 / 0.2)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.4)",
                    },
                })}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100%",
                        width: "100%",
                        px: 2,
                    }}>
                    <Box
                        component='header'
                        sx={{py: 3, display: "flex", justifyContent: "space-between"}}>
                        {/* <ColorSchemeToggle /> */}
                    </Box>
                    {/* Outlet Child components */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}>
                        <Outlet/>
                    </motion.div>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
