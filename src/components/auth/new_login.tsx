import {Box} from "@mui/joy"
import { motion } from "framer-motion";
export default function Loginv2() {
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
                <Typography level="body-sm">
                  New to company?{" "}
                  <Link to={"/auth/register"}>
                    <JoyLink href="/auth/register" level="title-sm">
                      Sign up!
                    </JoyLink>
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleOutlined />}
              >
                Continue with Google
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
                    formElements.password.value,
                    formElements.persistent.checked
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
                      <Loader
                        color={"white"}
                        className="w-6 h-6 animate-spin"
                      />
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
