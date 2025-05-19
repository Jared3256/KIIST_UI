import React from 'react' 
import AppBar from "@mui/material/AppBar";
import { alpha, Container, styled, Toolbar } from '@mui/material';
import {Box,Button, Divider, Drawer, IconButton, Menu, MenuItem} from "@mui/material"
import { CloseRounded } from "@mui/icons-material"
import {Dropdown, Space} from "antd"

import MenuIcon from "@mui/icons-material/Menu";
import SitemarkIcon from './SiteMark';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { about, administration, admission, programmes } from './LandingPAgeBarConstants';
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
                <DropdownMenu title={"ADMISSION"} items={admission} />

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
                  <Menu>
                    <MenuItem>Features</MenuItem>
                    <MenuItem>Testimonials</MenuItem>
                    <MenuItem>Highlights</MenuItem>
                    <MenuItem>Pricing</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                    <MenuItem>Blog</MenuItem>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth>
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth>
                        Sign in
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </div>
  );
}



const DropdownMenu = ({ items, title }) => {
  return (
    <Dropdown menu={{ items }} className="mr-4">
      <a onClick={(e) => e.preventDefault()}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
         
          <Button variant="text" color="info" size="small">
           {title}
          </Button>
          <ChevronDown  color='lightblue'/>
        </Box>
      </a>
    </Dropdown>
  );
};