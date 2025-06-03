import React from "react";
import AppBar from "@mui/material/AppBar";
import { alpha, Container, styled, Toolbar } from "@mui/material";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import {
  CloseRounded,
  TapAndPlayRounded,
} from "@mui/icons-material";
import { Dropdown, Layout, Input, Menu, Select , Button as AntButton} from "antd";

import MenuIcon from "@mui/icons-material/Menu";
import SitemarkIcon from "./SiteMark";
import { Link, useNavigate } from "react-router";
import {
  about,
  aboutData,
  administration,
  admission,
  admissionData,
  programmes,
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
import { BankOutlined, SearchOutlined } from "@ant-design/icons";


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
  const {Header} = Layout
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    
              <Header style={{
                backgroundColor:"white"
              }} className="shadow-md px-8 flex items-center justify-between h-20 sticky top-0 z-30">
                <div className="flex items-center">
                  <div className="flex items-center mr-8">
                    <div className="text-3xl font-bold text-blue-900 mr-2">
                      <BankOutlined />
                    </div>
                    <div >
                      <h1 className="text-xl font-bold text-blue-900 m-0">
                        Kisii Impact
                      </h1>
                      <p className="text-xs text-gray-600 m-0">
                        Institute of Science and Technology
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:flex">
                    <Menu mode="horizontal" className="border-0">
                      <Menu.Item
                      onClick={()=> navigate("/")}
                        key="home"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        Home
                      </Menu.Item>
                      <Menu.Item
                        key="about"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        About
                      </Menu.Item>
                      <Menu.Item
                        key="courses"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        Courses
                      </Menu.Item>
                      <Menu.Item
                        key="admissions"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        Admissions
                      </Menu.Item>
                      <Menu.Item
                        key="research"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        Research
                      </Menu.Item>
                      <Menu.Item
                        key="campus"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        Campus Life
                      </Menu.Item>
                      <Menu.Item
                        key="contact"
                        className="font-medium text-gray-800 hover:text-purple-700"
                      >
                        Contact
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>
                <div className="flex items-center">
                  
                  <div className="relative mr-4 hidden md:block">
                    <Input
                      placeholder="Search here..."
                      prefix={<SearchOutlined className="text-gray-400" />}
                      className="rounded-full border-gray-300 w-40"
                    />
                  </div>
                  <Link to={"/h/admission/register"}>
                  <AntButton
                      type="primary"
                      size="large"
                      className="bg-blue-800 hover:bg-blue-700 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      Apply Now
                    </AntButton>
                  </Link>
                 
                </div>
              </Header>
    // <div>
    //   <AppBar
    //     position="fixed"
    //     enableColorOnDark
    //     sx={{
    //       boxShadow: 0,
    //       bgcolor: "transparent",
    //       backgroundImage: "none",
    //       mt: "calc(var(--template-frame-height, 0px) + 28px)",
    //     }}
    //   >
        
    //     <Container maxWidth="lg" className="bg-white">
          
    //       <StyledToolbar variant="dense" disableGutters>
    //         <Box
    //           sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
    //         >
    //           <SitemarkIcon />
    //           <Box sx={{ display: { xs: "none", md: "flex" } }}>
    //             <DropdownMenu title={"ABOUT"} items={about} />
    //             <DropdownMenu
    //               title={"ADMISSION"}
    //               items={admission}
    //               url={"admission"}
    //             />

    //             <DropdownMenu title={"ADMINISTRATION"} items={administration} />
    //             <DropdownMenu title={"PROGRAMMES"} items={programmes} />
    //           </Box>
    //         </Box>
    //         <Box
    //           sx={{
    //             display: { xs: "none", md: "flex" },
    //             gap: 1,
    //             alignItems: "center",
    //           }}
    //         >
    //           <Button
    //             color="primary"
    //             onClick={() => navigate("/auth/login")}
    //             variant="text"
    //             size="small"
    //           >
    //             Sign in
    //           </Button>
    //           <Button color="primary" variant="contained" size="small">
    //             Sign up
    //           </Button>
    //           {/* <ColorModeIconDropdown /> */}
    //         </Box>
    //         <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
    //           {/* <ColorModeIconDropdown size="medium" /> */}
    //           <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
    //             <MenuIcon />
    //           </IconButton>
    //           <Drawer
    //             anchor="top"
    //             open={open}
    //             onClose={toggleDrawer(false)}
    //             PaperProps={{
    //               sx: {
    //                 top: "var(--template-frame-height, 0px)",
    //               },
    //             }}
    //           >
    //             <Box sx={{ p: 2, backgroundColor: "background.default" }}>
    //               <Box
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "flex-end",
    //                 }}
    //               >
    //                 <IconButton onClick={toggleDrawer(false)}>
    //                   <CloseRounded />
    //                 </IconButton>
    //               </Box>
    //               <Box width={"100%"} mb={6}>
    //                 <AccordionGroup>
    //                   <DrawerMenuItem2 title="About" data={aboutData} />
    //                   <DrawerMenuItem2 title="Admission" data={admissionData} />
    //                   {/* <DrawerMenuItem2
    //                     title="Programmes"
    //                     data={programmesData}
    //                   /> */}
    //                 </AccordionGroup>

    //                 <Box
    //                   mt={6}
    //                   sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    //                 >
    //                   <Button color="primary" variant="contained" fullWidth>
    //                     Register
    //                   </Button>
    //                   <Button
    //                     onClick={() => {
    //                       navigate("/auth/login");
    //                     }}
    //                     color="primary"
    //                     variant="outlined"
    //                     fullWidth
    //                   >
    //                     Sign in
    //                   </Button>
    //                 </Box>
    //               </Box>
    //             </Box>
    //           </Drawer>
    //         </Box>
    //       </StyledToolbar>
    //     </Container>
    //   </AppBar>
    // </div>
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
