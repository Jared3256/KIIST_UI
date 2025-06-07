import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
} from "@mui/joy";
import { FormEvent, useEffect } from "react";
// import { Helmet } from "react-helmet";
import {
  Link,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router";
import { Input as AntInput } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { Loader } from "lucide-react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "src/redux/auth/selectors";
import { login } from "src/redux/auth/actions";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SigninCard() {
  const location = useLocation();
  const navigate = useNavigate();

  // create a Url to route to
  const fromUrl = location.state?.from?.pathname || "/v1/dashboard";
  // console.log(fromUrl);
  // // redux Configurations and details
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectAuth);

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
      {/* <Helmet>
        <title>The KIIST | Login</title>
      </Helmet> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Loading isLoading={isLoading}>
          <Stack sx={{ gap: 4, mt: 2 }}>
            <form
              onSubmit={(event: FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;

                handleLogin(
                  formElements.email.value,
                  formElements.password.value
                );
              }}>
              <FormControl required>
                <FormLabel>Email or Registration Number</FormLabel>
                <Input type='t' name='email' size={"lg"} />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <AntInput.Password name='password' size='large' />
              </FormControl>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  {/*<Checkbox size="sm" label="Remember me" name="persistent"/>*/}
                  <RouterLink to={"/auth/forgot_password"}>
                    <JoyLink level='title-sm'>Forgot your password ?</JoyLink>
                  </RouterLink>
                  <Typography level='title-sm'>
                    <Link to={"/admission/register"}>
                      <JoyLink href='/admission/register' level='title-sm'>
                        Register!
                      </JoyLink>
                    </Link>
                  </Typography>
                </Box>

                <Button type='submit' fullWidth>
                  {isLoading ? (
                    <Loader color={"white"} className='w-6 h-6 animate-spin' />
                  ) : (
                    <>Sign In</>
                  )}
                </Button>
              </Stack>
              <Divider />
              <div className='text-center'>
                <span className='text-gray-600'>Account locked? </span>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-800'
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("activate");
                  }}>
                  Activate Account
                </a>
              </div>
            </form>
          </Stack>
        </Loading>
      </motion.div>
    </Box>
  );
}
