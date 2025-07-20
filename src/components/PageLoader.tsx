import {Box} from "@mui/joy";
import {Image} from "antd";
import Shan from "../assets/Shan.avif";
import {Loader} from "lucide-react";

export default function PageLoader() {
    return (
        <Box
            height={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
        >
            <Image src={Shan} preview={false} width={300} height={300}/>

            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                <Loader color={"blue"} className="w-6 h-6 animate-spin"/>
            </Box>
        </Box>
    );
}
