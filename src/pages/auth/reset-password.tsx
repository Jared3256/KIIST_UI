import {Box, Stack} from "@mui/joy";
import {Button, Card, Form, Input} from "antd";
import Loading from "src/components/Loading.tsx";
import {ArrowLeftOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Typography} from "@mui/joy"
import {admin_crud_request} from "src/service/crud.service";
import useAxiosPrivate from "src/service/useAxiosPrivate";

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [sameAsPassword, setSameAsPassword] = useState(true);
    const {token} = useParams();
    const hotAxiosPrivate = useAxiosPrivate()


    const handleResetPassword = async (values) => {
        if (values.password !== values.password1) {
            setSameAsPassword(true)
            return
        } else {
            setSameAsPassword(false)
            try {
                const data = await admin_crud_request.post_spc({
                    url: `/auth/change-password?token=${token}`,
                    data: {password: values.password},
                    hotAxiosPrivate: hotAxiosPrivate
                })

                if (data.success) {
                    navigate("/auth/login")
                }
            } catch (e) {
                console.log(e)

            }
        }

    }
    return (
        <Box
            component='main'
            sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                },
                [`& .MuiFormLabel-asterisk`]: {
                    visibility: "hidden",
                },
            }}>
            <Stack
                direction='column'
                sx={[
                    {
                        justifyContent: "center",
                        height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
                        marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
                        minHeight: "100%",
                    },
                    (theme) => ({
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            zIndex: -1,
                            inset: 0,
                            backgroundImage:
                                "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
                            backgroundRepeat: "no-repeat",
                            ...theme.applyStyles("dark", {
                                backgroundImage:
                                    "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
                            }),
                        },
                    }),
                ]}>
                <Stack
                    direction={{xs: "column-reverse", md: "row"}}
                    sx={{
                        justifyContent: "center",
                        gap: {xs: 6, sm: 12},
                        p: 2,
                        mx: "auto",
                    }}>
                    <Stack
                        gap={"10px"}
                        direction={{xs: "column-reverse", md: "row"}}
                        sx={{
                            justifyContent: "center",
                            gap: {xs: 6, sm: 12},
                            p: {xs: 2, sm: 4},
                            m: "auto",
                        }}>
                        <Card
                            className='w-full shadow-lg rounded-xl border-0'
                            bodyStyle={{padding: "2rem"}}>
                            <div className='text-center mb-8'>
                                <div className='mb-4 flex justify-center'>
                                    <img
                                        src='https://readdy.ai/api/search-image?query=A%20professional%20and%20elegant%20college%20logo%20for%20Kisii%20Impact%20College%20featuring%20a%20stylized%20shield%20or%20emblem%20with%20blue%20and%20gold%20colors%2C%20academic%20symbols%20like%20books%20or%20a%20torch%2C%20and%20the%20college%20name%20incorporated%20in%20a%20modern%20serif%20font.%20The%20logo%20should%20appear%20clean%2C%20authoritative%2C%20and%20suitable%20for%20educational%20branding.&width=200&height=200&seq=1&orientation=squarish'
                                        alt='Kisii Impact Logo'
                                        className='h-24'
                                    />
                                </div>

                                <p className='text-gray-600 mt-2 mb-2'>Reset your password</p>
                            </div>
                            <Box
                                component='main'
                                sx={{
                                    my: "auto",
                                    py: 2,
                                    pb: 5,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    width: 400,
                                    maxWidth: "100%",
                                    mx: "auto",
                                    borderRadius: "sm",
                                    "& form": {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    },
                                    [`& .MuiFormLabel-asterisk`]: {
                                        visibility: "hidden",
                                    },
                                }}>
                                <>

                                    <Loading isLoading={isLoading}>
                                        <div className='w-full'>
                                            <div className='mb-6'>
                                                <Button
                                                    type='link'
                                                    icon={<ArrowLeftOutlined/>}
                                                    onClick={() => navigate("/auth/login")}
                                                    className='p-0 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer'>
                                                    Back to login
                                                </Button>
                                                <h2 className='text-2xl font-semibold mt-2'>
                                                    Reset Password
                                                </h2>
                                                <p className='text-gray-600 mt-1'>
                                                    Enter your email address and we'll send you a link to
                                                    reset your password.
                                                </p>
                                            </div>


                                            <Form
                                                name='reset_password_form'
                                                onFinish={handleResetPassword}
                                                layout='vertical'>
                                                <Form.Item
                                                    label={'Password'}
                                                    name='password'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter password!",
                                                        },
                                                    ]}>
                                                    <Input.Password

                                                        prefix={<LockOutlined className='text-gray-400'/>}
                                                        placeholder='enter password'
                                                        size='large'
                                                        className='rounded-lg'
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label={'Confirm Password'}
                                                    name='password1'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter password confirmation!",
                                                        },
                                                    ]}>
                                                    <Input.Password

                                                        prefix={<LockOutlined className='text-gray-400'/>}
                                                        placeholder='enter password'
                                                        size='large'
                                                        className='rounded-lg'
                                                    />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button
                                                        type='primary'
                                                        htmlType='submit'
                                                        className='w-full h-12 bg-[#1a4b8f] hover:bg-[#0d3b7a] !rounded-button whitespace-nowrap cursor-pointer'
                                                        size='large'>
                                                        Set New Password
                                                    </Button>
                                                </Form.Item>
                                            </Form>

                                            {sameAsPassword && <Typography sx={{marginY: "10px"}} color="danger">
                                                * Passwords do not march
                                            </Typography>}
                                        </div>
                                    </Loading>


                                </>
                            </Box>
                        </Card>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
