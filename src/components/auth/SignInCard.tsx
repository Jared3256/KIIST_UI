import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
} from "@mui/joy";
import React, { FormEvent, useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import {
  Link,
  Link as RouterLink,
  useLocation,
  useNavigate,
  // useLocation,
  // useNavigate,
} from "react-router";
// import useAuth from "../../../services/hooks/useAuth";
import { Input as AntInput } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAuth } from "../../../redux/auth/selectors";
// import { login } from "../../../redux/auth/actions";
// import Loading from "../../../components/Loading/Loading";
import { GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { Loader } from "lucide-react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "src/redux/auth/selectors";
import { login } from "src/redux/auth/actions";
// import color from "../../../services/utils/color";
// import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SigninCard() {
  // const [color, setColor] = useState();
  // const [snackIcon, setSnackIcon] = useState(<CheckCircleOutlined />);
  // const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // create a Url to route to
  const fromUrl = location.state?.from?.pathname || "/v1/dashboard";
  // console.log(fromUrl);
  // // redux Configurations and details
  const dispatch = useDispatch();
  console.log(useSelector(selectAuth));
  const { isLoading, isSuccess, current } = useSelector(selectAuth);

  console.log("Current from the login module", current);
  
  useEffect(() => {
    handleSuccessLogin();
  }, [isSuccess]);

  const handleSuccessLogin = () => {
    if (isSuccess) {
      navigate(fromUrl, { replace: true });
    }
  };
  const handleLogin = async (username, password) => {
    const data = JSON.stringify({ email: username, password });

    dispatch(login({ loginData: data }));
    // handlePersistToggle(persist);
  };

  // const handlePersistToggle = (value) => {
  //   setPersist(value);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, [persis]);
  return (
    <Box
      component="main"
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
      }}
    >
      {/* <Helmet>
        <title>The KIIST | Login</title>
      </Helmet> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Loading isLoading={isLoading}>
          <Stack sx={{ gap: 4, mb: 2 }}>
            <Stack sx={{ gap: 1 }}>
              <Typography component="h1" level="h3">
                Sign in
              </Typography>
              <Typography level="body-md">
                New to the school ?{" "}
                <Link to={"/admission/register"}>
                  <JoyLink href="/admission/register" level="title-md">
                    Register!
                  </JoyLink>
                </Link>
              </Typography>
            </Stack>
            <Button
              disabled
              variant="soft"
              color="neutral"
              fullWidth
              startDecorator={<GoogleOutlined />}
            >
              Continue with Gmail
            </Button>
          </Stack>
          <Divider
            sx={(theme) => ({
              [theme.getColorSchemeSelector("light")]: {
                color: { xs: "#FFF", md: "text.tertiary" },
              },
            })}
          >
            or
          </Divider>
          <Stack sx={{ gap: 4, mt: 2 }}>
            <form
              onSubmit={(event: FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;

                handleLogin(
                  formElements.email.value,
                  formElements.password.value
                  // formElements.persistent.checked
                );
              }}
            >
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <AntInput.Password name="password" size="medium" />
              </FormControl>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Checkbox size="sm" label="Remember me" name="persistent" />
                  <RouterLink to={"/auth/forgot_password"}>
                    <JoyLink level="title-sm">Forgot your password?</JoyLink>
                  </RouterLink>
                </Box>

                <Button type="submit" fullWidth>
                  {isLoading ? (
                    <Loader color={"white"} className="w-6 h-6 animate-spin" />
                  ) : (
                    <>Sign In</>
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Loading>
      </motion.div>
    </Box>
  );
}
