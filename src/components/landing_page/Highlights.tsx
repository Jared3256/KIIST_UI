import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Cutting-Edge Labs",
    description:
      "Hands-on access to modern equipment where theory meets real-world experiments.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Built on Tradition",
    description:
      "Rooted in Kisii’s legacy of excellence, our programs honor the past while forging future innovators.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Student-First Culture",
    description:
      "Mentors treat you like a partner—every question, every idea, every late-night breakthrough.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "Industry Partnerships",
    description:
      "Collaborations with leading tech firms keep your skills fresh—and your CV even fresher.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Community Engagement",
    description:
      "From hackathons to outreach, we empower Kisii’s next generation to solve local and global challenges.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Research Excellence",
    description:
      "Dive into projects that push boundaries—from sustainable agriculture to smart cities.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "grey.900",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Why Kisii Impact Institute?
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Discover our blend of time-honored values and forward-thinking tech
            education: from immersive labs and industry ties to a community that
            champions every student’s spark.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  backgroundColor: "grey.800",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
