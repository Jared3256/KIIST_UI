import { ArrowLeftOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Box, Stack } from "@mui/joy";
import { Button, Card, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ActivateAccount() {
  const [activationStep, setActivationStep] = useState<number>(0);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [activationCode, setActivationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);

  const handleActivationCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...activationCode];
      newCode[index] = value;
      setActivationCode(newCode);

      // Auto-advance to next input
      if (value && index < 5) {
        const nextInput = document.getElementById(
          `activation-code-${index + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  const [countdown, setCountdown] = useState<number>(60);

  const handleActivation = () => {
    const code = activationCode.join("");
    if (code.length === 6) {

      setActivationStep(1);
      messageApi
        .open({
          type: "success",
          content: "Action in progress..",
          duration: 2.5,
        })
        .then(() => message.success("Loading finished", 2.5))
        .then(() => message.info("Loading finished", 2.5));
      //   message.success("Account activated successfully!");
    } else {
      message.error("Please enter a valid 6-digit code");
    }
  };

  const handleResendCode = () => {
    setActivationCode(Array.of("", ","));
    message.info("New activation code sent!");
    setResendDisabled(true);

    let timer = countdown;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer <= 0) {
        clearInterval(interval);
        setResendDisabled(false);
        setCountdown(60);
      }
    }, 1000);
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
      {contextHolder} 
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
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}>
          <Stack
            gap={"10px"}
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}>
            <Card
              className='w-full shadow-lg rounded-xl border-0'
              bodyStyle={{ padding: "2rem" }}>
              <div className='text-center mb-8'>
                <div className='mb-4 flex justify-center'>
                  <img
                    src='https://readdy.ai/api/search-image?query=A%20professional%20and%20elegant%20college%20logo%20for%20Kisii%20Impact%20College%20featuring%20a%20stylized%20shield%20or%20emblem%20with%20blue%20and%20gold%20colors%2C%20academic%20symbols%20like%20books%20or%20a%20torch%2C%20and%20the%20college%20name%20incorporated%20in%20a%20modern%20serif%20font.%20The%20logo%20should%20appear%20clean%2C%20authoritative%2C%20and%20suitable%20for%20educational%20branding.&width=200&height=200&seq=1&orientation=squarish'
                    alt='Kisii Impact Logo'
                    className='h-24'
                  />
                </div>

                <p className='text-gray-600 mt-2 mb-2'>
                  Activate your student Portal
                </p>
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
                  {activationStep === 0 ? (
                    <div className='w-full'>
                      <div className='mb-6'>
                        <Button
                          type='link'
                          icon={<ArrowLeftOutlined />}
                          onClick={() => navigate("/auth/login")}
                          className='p-0 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer'>
                          Back to login
                        </Button>
                        <h2 className='text-2xl font-semibold mt-2'>
                          Activate Your Account
                        </h2>
                        <p className='text-gray-600 mt-1'>
                          Enter the 6-digit activation code sent to your email
                          address.
                        </p>
                      </div>

                      <div className='mb-8 mt-10'>
                        <div className='flex justify-between mb-2 gap-2'>
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Input
                              id={`activation-code-${index}`}
                              key={index}
                              className='w-12 h-12 text-center text-lg rounded-lg uppercase text-bold'
                              value={activationCode[index]}
                              onChange={(e) =>
                                handleActivationCodeChange(
                                  index,
                                  e.target.value
                                )
                              }
                              maxLength={1}
                              autoComplete='off'
                            />
                          ))}
                        </div>
                      </div>

                      <Button
                        type='primary'
                        onClick={handleActivation}
                        className='w-full h-12 bg-[#1a4b8f] hover:bg-[#0d3b7a] mb-4 !rounded-button whitespace-nowrap cursor-pointer'
                        size='large'>
                        Verify Code
                      </Button>

                      <div className='text-center'>
                        <Button
                          type='link'
                          disabled={resendDisabled}
                          onClick={handleResendCode}
                          className='text-gray-600 hover:text-gray-800 cursor-pointer'>
                          {resendDisabled
                            ? `Resend code in ${countdown}s`
                            : "Resend activation code"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className='text-center w-full'>
                      <div className='flex justify-center mb-6'>
                        <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center'>
                          <CheckCircleOutlined className='text-4xl text-green-500' />
                        </div>
                      </div>

                      <h2 className='text-2xl font-semibold'>
                        Account Activated!
                      </h2>
                      <p className='text-gray-600 mt-2 mb-6'>
                        Your account has been successfully activated. You can
                        now log in with your credentials.
                      </p>

                      <Button
                        type='primary'
                        className='bg-[#1a4b8f] hover:bg-[#0d3b7a] !rounded-button whitespace-nowrap cursor-pointer'
                        onClick={() => {
                          setActivationStep(0);
                        }}>
                        Go to Login
                      </Button>
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
