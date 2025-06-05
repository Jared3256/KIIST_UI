import React from "react";
import { alpha, Container, styled, Toolbar } from "@mui/material";
import { Button, Drawer, IconButton } from "@mui/material";
import { CloseRounded, TapAndPlayRounded } from "@mui/icons-material";
import {
  Dropdown,
  Layout,
  Input,
  Menu,
  Select,
  Button as AntButton,
} from "antd";

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
  Box,
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
  const { Header } = Layout;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Header
      style={{
        backgroundColor: "white",
      }}
      className='shadow-md px-8 flex items-center justify-between h-20 sticky top-0 z-30'>
      <div className='flex items-center'>
        <div className='flex items-center mr-8'>
          <div className='hidden md:hidden lg:flex lg:text-3xl text-2xl mr-5 font-bold text-blue-900 mr-2'>
            <BankOutlined />
          </div>
          <div className="hidden sm:flex md:flex lg:hidden xl:hidden">
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
            <MenuIcon  color="blue"/>
          </IconButton>
          </div>
          
          <div >
            <h1 className='lg:text-2xl text-xl font-bold text-blue-900 m-0'>
              Kisii Impact
            </h1>
            <div className='hidden lg:flex'>
              <p className='text-xs md:text-lg text-gray-600 m-0'>
                Institute of Science and Technology
              </p>
            </div>
          </div>
        </div>
        <div className='hidden md:flex'>
          <MenuItem mode={"horizontal"} />
        </div>
      </div>
      <div className='flex items-center'>
        <div className='relative mr-4 hidden md:block'>
          <Input
            placeholder='Search here...'
            prefix={<SearchOutlined className='text-gray-400' />}
            className='rounded-full border-gray-300 w-40'
          />
        </div>
        <Link to={"/h/admission/register"}>
          <AntButton
            type='primary'
            size='large'
            className='bg-blue-800 hover:bg-blue-700 border-0 !rounded-button whitespace-nowrap cursor-pointer'>
            Apply Now
          </AntButton>
        </Link>
      </div>
      <Drawer
        anchor='top'
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: "var(--template-frame-height, 0px)",
          },
        }}>
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRounded />
            </IconButton>
          </Box>
          <Box width={"100%"} mb={6}>
            <MenuItem mode={"vertical"} />

            <Box
              mt={6}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color='primary' variant='contained' fullWidth>
                Register
              </Button>
              <Button
                onClick={() => {
                  navigate("/auth/login");
                }}
                color='primary'
                variant='outlined'
                fullWidth>
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Header>
  );
}

const MenuItem = ({mode}) => {
  return (
    <Menu mode={mode} className='border-0'>
      <Menu.Item
        // onClick={() => navigate("/")}
        key='home'
        className='font-medium text-gray-800 hover:text-purple-700'>
        Home
      </Menu.Item>
      <Menu.Item
        key='about'
        className='font-medium text-gray-800 hover:text-purple-700'>
        About
      </Menu.Item>
      <Menu.Item
        key='courses'
        className='font-medium text-gray-800 hover:text-purple-700'>
        Courses
      </Menu.Item>
      <Menu.Item
        key='admissions'
        className='font-medium text-gray-800 hover:text-purple-700'>
        Admissions
      </Menu.Item>
      <Menu.Item
        key='research'
        className='font-medium text-gray-800 hover:text-purple-700'>
        Research
      </Menu.Item>
      <Menu.Item
        key='campus'
        className='font-medium text-gray-800 hover:text-purple-700'>
        Campus Life
      </Menu.Item>
      <Menu.Item
        key='contact'
        className='font-medium text-gray-800 hover:text-purple-700'>
        Contact
      </Menu.Item>
    </Menu>
  );
}