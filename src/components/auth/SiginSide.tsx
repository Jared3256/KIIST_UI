import {Stack} from "@mui/material";
import React from "react";
import SignInCard from "./SignInCard";
import {Card} from "antd";
import Shan from "../../assets/Shan.png"

export default function SiginSide(props: { disableCustomTheme?: boolean }) {
    return (
        <Stack
            direction='column'
            component='root'
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
                                    src={Shan}
                                    alt='Kisii Impact Logo'
                                    className='h-24'
                                />
                            </div>

                            <p className='text-gray-600 mt-2'>
                                Sign in to access your portal
                            </p>
                        </div>
                        <SignInCard/>
                    </Card>
                </Stack>
            </Stack>
        </Stack>
    );
}
