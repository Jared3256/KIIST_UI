import {Outlet} from "react-router"
import {Box} from "@mui/joy";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";

export default function StudentChecker() {


    return (
        <Box width={"100%"}>

            <Outlet/>
        </Box>
    )
}
