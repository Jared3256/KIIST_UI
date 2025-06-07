import { Box } from "@mui/joy";
import { motion } from "framer-motion";
import SiginSide from "src/components/auth/SiginSide";
export default function Loginv2() {
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
      <SiginSide />
    </Box>
  );
}
