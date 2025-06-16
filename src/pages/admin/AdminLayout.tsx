import {Outlet} from "react-router";
import {Avatar, Badge, Button, Dropdown, Layout, Typography} from "antd";
import {
    BellOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import {logout} from "src/redux/auth/actions.ts";

export default function AdminLayout() {
    const {Header, Content, Footer} = Layout;
    const {Text} = Typography;
    const {current} = useSelector(selectAuth)

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Layout
            className='sm:hidden md:hidden site-layout sm:mt-15 md:mt-15 lg:mt-0'
            style={{transition: "all 0.2s"}}>
            <Header
                className='bg-white p-0 flex justify-between items-center shadow-sm'
                style={{
                    backgroundColor: "#0096c7",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                }}>
                <div className='flex items-center'>
                    <div className='ml-4'>
                        <Text
                            strong
                            style={{
                                color: "white",
                                fontSize: "15px",
                            }}>
                            KIIST - ADMIN PANEL
                        </Text>
                    </div>
                </div>
                <div className='flex items-center mr-6'>
                    <Badge count={5} className='mr-4'>
                        <Button
                            type='text'
                            icon={<BellOutlined/>}
                            className='text-gray-600 cursor-pointer !rounded-button whitespace-nowrap'
                        />
                    </Badge>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "1",
                                    label: "Profile",
                                    icon: <UserOutlined/>,
                                },
                                {
                                    key: "2",
                                    label: "Settings",
                                    icon: <SettingOutlined/>,
                                },
                                {
                                    type: "divider",
                                },
                                {
                                    key: "3",
                                    label: "Logout",
                                    onClick: () => handleLogout(),
                                    icon: <LogoutOutlined style={{color: "red"}}/>,
                                },
                            ],
                        }}
                        placement='bottomRight'>
                        <div className='flex items-center cursor-pointer direction-row'>
                            <Avatar
                                src='https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20African%20male%20administrator%20in%20formal%20attire%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=40&height=40&seq=12&orientation=squarish'
                                className='mr-2'
                            />
                            <div className='ml-2 hidden md:flex items-center gap-3'>
                                <Text
                                    strong
                                    style={{
                                        color: "white",
                                    }}>
                                    {current.UserInfo.fullname}
                                </Text>
                                <div>
                                    <Text
                                        type='secondary'
                                        style={{
                                            color: "white",
                                        }}
                                        className='text-xs'>
                                        Administrator
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </Header>
            <Content className='p-6' style={{minHeight: "calc(100vh - 64px)"}}>
                <div className='bg-white p-6 rounded-lg shadow-sm min-h-full'>
                    <Outlet/>
                </div>
            </Content>
            <Footer style={{textAlign: "center"}}>
                <div className='flex justify-center items-center mb-2'>
                    <img
                        src='https://readdy.ai/api/search-image?query=modern%20educational%20institution%20logo%20with%20blue%20and%20gold%20colors%2C%20professional%20design%2C%20minimalist%20style%2C%20clean%20background%2C%20high%20quality%20vector%20graphic&width=30&height=30&seq=13&orientation=squarish'
                        alt='Logo'
                        className='h-6 mr-2'
                    />
                    <Text strong>Kisii Impact Institute of Science and Technology</Text>
                </div>
                <Text type='secondary'>
                    Admin Portal © {new Date().getFullYear()} All Rights Reserved
                </Text>
            </Footer>
        </Layout>
    );
}
