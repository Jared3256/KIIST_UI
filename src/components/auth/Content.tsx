import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import SitemarkIcon from "../landing_page/SiteMark";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Hands-On Curriculum",
    description:
      "Dive into real-world projects—from community health bots to agro-tech dashboards—so you graduate with skills, not just slides.",
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "State-of-the-Art Labs",
    description:
      "Our Kisii campus labs are decked out with modern gear and open 24/7—because breakthroughs don’t wait for office hours.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Mentorship & Community",
    description:
      "Join a network of local innovators and global partners; here, you’re more than a student—you’re a collaborator in Kisii’s tech renaissance.",
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Global Pathways",
    description:
      "Through exchange programs and industry tie-ups, your code today could power tomorrow’s smart farms—whether in Kisii or Copenhagen.",
  },
];


export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "bold" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
