import { Box } from "@mui/joy";
import { Image } from "antd";
import Shan from "../assets/Shan.png"
import {Loader} from "lucide-react"

export default function PageLoader() {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      height={"100vh"}
      alignItems={"center"}
    >
      <Image src={Shan} height={"200px"} alt="Kiist Image" preview={false} />
      {/* <div className="flex justify-center items-center w-full mt-10">
        <div className="bg-blue-600 rounded-full h-20 w-20 bg-primary animate-ping"></div>
      </div> */}
      <Loader color={"blue"} className="w-6 h-6 animate-spin" />
    </Box>
  );
}
