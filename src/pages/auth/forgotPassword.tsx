import {ArrowLeftOutlined, MailOutlined} from "@ant-design/icons";
import {Box, Stack} from "@mui/joy";
import {Button, Card, Form, Input} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router";
import Loading from "src/components/Loading";
import {admin_crud_request} from "src/service/crud.service.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";

export default function ForgotPassword() {
    const [resetStep, setResetStep] = useState<number>(0);
    const navigate = useNavigate()
    const hotAxiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordReset = async (values: any) => {

        try {
            setIsLoading(true);
            const data = await admin_crud_request.post_spc({
                url: "/auth/reset-password", hotAxiosPrivate: hotAxiosPrivate, data: values
            })

            if (data.success) {
                setResetStep(1);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e)

        }

    };
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
                                    {resetStep === 0 ? (
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
                                                    onFinish={handlePasswordReset}
                                                    layout='vertical'>
                                                    <Form.Item
                                                        name='email'
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please input your email!",
                                                            },
                                                            {
                                                                type: "email",
                                                                message: "Please enter a valid email address!",
                                                            },
                                                        ]}>
                                                        <Input
                                                            prefix={<MailOutlined className='text-gray-400'/>}
                                                            placeholder='Email Address'
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
                                                            Send Reset Link
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </Loading>

                                    ) : (
                                        <div className='text-center w-full'>
                                            <div className='flex justify-center mb-6'>
                                                <div
                                                    className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center'>
                                                    <MailOutlined className='text-4xl text-green-500'/>
                                                </div>
                                            </div>

                                            <h2 className='text-2xl font-semibold'>
                                                Check Your Email
                                            </h2>
                                            <p className='text-gray-600 mt-2 mb-6'>
                                                We've sent a password reset link to your email address.
                                                Please check your inbox and follow the instructions.
                                            </p>

                                            <Button
                                                type='primary'
                                                className='mb-4 bg-[#1a4b8f] hover:bg-[#0d3b7a] !rounded-button whitespace-nowrap cursor-pointer'
                                                onClick={() => setResetStep(0)}>
                                                Resend Link
                                            </Button>

                                            <div>
                                                <Button
                                                    type='link'
                                                    onClick={() => {

                                                        setResetStep(0);
                                                    }}
                                                    className='text-gray-600 hover:text-gray-800 cursor-pointer'>
                                                    Back to login
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            </Box>
                        </Card>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
