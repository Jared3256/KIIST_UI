import React from "react";
import AppBar from "@mui/material/AppBar";
import { alpha, Container, styled, Toolbar } from "@mui/material";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import {
  CloseRounded,
  TapAndPlayRounded,
} from "@mui/icons-material";
import { Dropdown} from "antd";

import MenuIcon from "@mui/icons-material/Menu";
import SitemarkIcon from "./SiteMark";
import { useNavigate } from "react-router";
import {
  about,
  aboutData,
  administration,
  admission,
  admissionData,
  programmes,
  programmesData,
} from "./LandingPAgeBarConstants";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Avatar,
  ListItemContent,
  Stack,
  Typography,
} from "@mui/joy";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function LandingPageBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: "calc(var(--template-frame-height, 0px) + 28px)",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            >
              <SitemarkIcon />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <DropdownMenu title={"ABOUT"} items={about} />
                <DropdownMenu
                  title={"ADMISSION"}
                  items={admission}
                  url={"admission"}
                />

                <DropdownMenu title={"ADMINISTRATION"} items={administration} />
                <DropdownMenu title={"PROGRAMMES"} items={programmes} />
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                onClick={() => navigate("/auth/login")}
                variant="text"
                size="small"
              >
                Sign in
              </Button>
              <Button color="primary" variant="contained" size="small">
                Sign up
              </Button>
              {/* <ColorModeIconDropdown /> */}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
              {/* <ColorModeIconDropdown size="medium" /> */}
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    top: "var(--template-frame-height, 0px)",
                  },
                }}
              >
                <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton onClick={toggleDrawer(false)}>
                      <CloseRounded />
                    </IconButton>
                  </Box>
                  <Box width={"100%"} mb={6}>
                    <AccordionGroup>
                      <DrawerMenuItem2 title="About" data={aboutData} />
                      <DrawerMenuItem2 title="Admission" data={admissionData} />
                      <DrawerMenuItem2
                        title="Programmes"
                        data={programmesData}
                      />
                    </AccordionGroup>

                    <Box
                      mt={6}
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Button color="primary" variant="contained" fullWidth>
                        Register
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/auth/login");
                        }}
                        color="primary"
                        variant="outlined"
                        fullWidth
                      >
                        Sign in
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </div>
  );
}

type MenuItem = {
  key: string;
  label?: string;
  url?: string;
  children?: MenuItem[];
};

function findLabel(items: MenuItem[], targetKey: string): string | undefined {
  for (const item of items) {
    if (item.key === targetKey) return item.url;
    if (item.children) {
      const found = findLabel(item.children, targetKey);
      if (found) return found;
    }
  }
}
const DropdownMenu = ({
  items,
  title,
}: {
  title: string;
  url?: string;
  items: any;
}) => {
  const navigate = useNavigate();

  const handleMenuItemClick: MenuProps["onClick"] = ({ key }) => {
    const label = findLabel(items, key);
    if (label) {
      navigate(label);
    }
  };

  return (
    <Dropdown
      menu={{ items: items, onClick: handleMenuItemClick }}
      className="mr-4"
    >
      <a
        onClick={(e) => {
          e.preventDefault();
          handleMenuItemClick();
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="text" color="info" size="small">
            {title}
          </Button>
        </Box>
      </a>
    </Dropdown>
  );
};

const DrawerMenuItem2 = ({ title, data }: { title: string; data: [] }) => {
  const navigate = useNavigate();
  const handleMenuItemClick = (url) => {
    if (url) {
      navigate(url);
    }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Avatar color="primary" size="sm">
          <TapAndPlayRounded fontSize="12px" />
        </Avatar>
        <ListItemContent>
          <Typography level="title-md">{title}</Typography>
          <Typography level="body-sm">
            Check and manage your admissions
          </Typography>
        </ListItemContent>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.5}>
          {data.map((item) => (
            <Button
              disabled={item.disabled}
              onClick={() => handleMenuItemClick(item.url)}
              key={item.key}
              sx={{
                justifyContent: "flex-start",
              }}
              fullWidth
              variant="text"
              color="info"
              size="small"
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const DrawerMenuItem = ({ title, url }: { title: string; url?: string }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    if (url) {
      navigate(`/h/${url}`);
      console.log("/url", url);
    }
  };
  return (
    <Box
      onClick={() => handleMenuItemClick()}
      width={"100%"}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Button
        sx={{
          justifyContent: "flex-start",
        }}
        fullWidth
        variant="text"
        color="info"
        size="small"
      >
        {title}
      </Button>
    </Box>
  );
};
