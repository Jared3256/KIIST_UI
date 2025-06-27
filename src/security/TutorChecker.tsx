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

        <Layout
            className='sm:hidden md:hidden site-layout sm:mt-15 md:mt-15 lg:mt-0'
            style={{transition: "all 0.2s"}}>
            <Content className='p-2' style={{minHeight: "100%"}}>
                <div className='bg-white p-6 rounded-lg shadow-sm min-h-full'>
                    <Outlet/>
                </div>
            </Content>
        </Layout>


    )
}
