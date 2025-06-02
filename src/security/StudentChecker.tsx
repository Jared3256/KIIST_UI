import {Outlet} from "react-router"
import {Box} from "@mui/joy";

export default function StudentChecker() {
    return (
        <Box width={"100%"}>

            <Outlet/>
        </Box>
    )
}
