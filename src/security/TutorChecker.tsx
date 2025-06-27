import {Box} from "@mui/joy";
import {Outlet} from "react-router";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import {useEffect} from "react";
import {Layout} from "antd";

export default function TutorChecker() {

    const {current} = useSelector(selectAuth)

    const {Content} = Layout

    useEffect(() => {
        if (current.UserInfo.role !== "tutor") {
            return
        }
    }, []);
    return (

        <Box width={"100%"}>
            <Outlet/>
        </Box>


    )
}
