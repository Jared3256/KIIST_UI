import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "src/redux/auth/selectors";
import { Avatar, Layout, Typography as AntTypography } from "antd";
import { MoneyRounded } from "@mui/icons-material";
import { useNavigate } from "react-router";
import {
  BookUser,
  CalendarCogIcon,
  GraduationCap,
  Hotel,
  Signature,
} from "lucide-react";
import { logout } from "src/redux/auth/actions";
import { studentData } from "./mockdata";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}>
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title, Text, Paragraph } = AntTypography;
  // Configure the select state of the list items
  let selected = {
    home: true,
    dashboard: false,
    users: false,
    finance: false,
    programmes: false,
    files: false,
    support: false,
    settings: false,
  };

  const resetSelected = {
    home: false,
    dashboard: false,
    users: false,
    finance: false,
    programmes: false,
    files: false,
    support: false,
    settings: false,
  };
  // selected handler
  const selectedHandler = (item: string) => {
    selected = { ...resetSelected };
    selected[item] = true;
  };
  // User module
  const { current } = useSelector(selectAuth);
  const role = current.UserInfo.role;

  // navigation mechanism
  const navigate = useNavigate();

  // Navigation handler method
  const handleNavigation = (link: string) => {
    navigate(link);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}>
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box mb={2}>
        <div className='text-center'>
          <div className='flex items-center justify-center'>
            <div className='bg-blue-500 text-white p-2 rounded-full mr-2'>
              <GraduationCap />
              <i className='fas fa-graduation-cap text-xl'></i>
            </div>
            <Title level={4} className='mb-0 text-blue-500'>
              KIIST Ease
            </Title>
          </div>
          <Text type='secondary'>
            {role === "student" ? "Student" : "Admin"} Portal
          </Text>
        </div>
      </Box>

      <Input
        size='sm'
        startDecorator={<SearchRoundedIcon />}
        placeholder='Search'
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}>
        <List
          size='sm'
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}>
          <ListItem>
            <ListItemButton
              onClick={() => {
                selectedHandler("dashboard");
                navigate(`/v1/${role}/dashboard`);
              }}
              selected={selected["dashboard"]}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level='title-sm'>Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          {role === "admin" && (
            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton
                    selected={selected["users"]}
                    onClick={() => setOpen(!open)}>
                    <GroupRoundedIcon />
                    <ListItemContent>
                      <Typography level='title-sm'>Users</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}>
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton
                      role='menuitem'
                      onClick={() => navigate(`/v1/${role}/tutors`)}>
                      Tutors
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() =>
                        navigate(`/v1/${role}/student-management`)
                      }>
                      Students
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
          )}

          {/* Finance Section only visible to the admin */}
          {role === "admin" && (
            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton
                    selected={selected["finance"]}
                    onClick={() => setOpen(!open)}>
                    <MoneyRounded />
                    <ListItemContent>
                      <Typography level='title-sm'>Finance</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}>
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton disabled role='menuitem'>
                      Expenses
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton disabled>Expense Category</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton disabled>Payment Mode</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton disabled>Invoices</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
          )}

          {/* Programmes only for the admin and tutors */}
          {(role === "admin" || role === "tutor") && (
            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton
                    selected={selected["programmes"]}
                    onClick={() => setOpen(!open)}>
                    <BookUser />
                    <ListItemContent>
                      <Typography level='title-sm'>Programmes</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}>
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton
                      onClick={() => navigate(`/v1/${role}/course`)}
                      role='menuitem'>
                      Courses
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton disabled>Schedule</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
          )}

          {/* Academics only for students */}
          {role === "student" && (
            <>
              <ListItem nested>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton
                      selected={selected["programmes"]}
                      onClick={() => setOpen(!open)}>
                      <BookUser />
                      <ListItemContent>
                        <Typography level='title-sm'>Academics</Typography>
                      </ListItemContent>
                      <KeyboardArrowDownIcon
                        sx={[
                          open
                            ? {
                                transform: "rotate(180deg)",
                              }
                            : {
                                transform: "none",
                              },
                        ]}
                      />
                    </ListItemButton>
                  )}>
                  <List sx={{ gap: 0.5 }}>
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton role='menuitem' disabled>
                        Transcripts
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton role='menuitem' disabled>
                        My Courses
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => navigate("/v1/student/finance")}>
                        School fee
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Toggler>
              </ListItem>
              <ListItem nested>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton
                      selected={selected["programmes"]}
                      onClick={() => setOpen(!open)}>
                      <CalendarCogIcon />
                      <ListItemContent>
                        <Typography level='title-sm'>Schedule</Typography>
                      </ListItemContent>
                      <KeyboardArrowDownIcon
                        sx={[
                          open
                            ? {
                                transform: "rotate(180deg)",
                              }
                            : {
                                transform: "none",
                              },
                        ]}
                      />
                    </ListItemButton>
                  )}>
                  <List sx={{ gap: 0.5 }}>
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton
                        onClick={() => navigate("/v1/student/classes")}
                        role='menuitem'>
                        Classes
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton
                        role='menuitem'
                        onClick={() => navigate("/v1/student/history")}>
                        Attendance History
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => navigate("/v1/student/analytics")}>
                        Analytics
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => navigate("/v1/student/profile")}>
                        Profile
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Toggler>
              </ListItem>
            </>
          )}
          {role === "admin" && (
            <>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    selectedHandler("dashboard");
                    navigate(`/v1/${role}/department`);
                  }}
                  selected={selected["dashboard"]}>
                  <Hotel />
                  <ListItemContent>
                    <Typography level='title-sm'>Department</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    selectedHandler("dashboard");
                    navigate(`/v1/${role}/registration-approvals`);
                  }}
                  selected={selected["dashboard"]}>
                  <Signature />
                  <ListItemContent>
                    <Typography level='title-sm'>
                      Registration Approvals
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        <List
          size='sm'
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}>
          <ListItem>
            <ListItemButton selected={selected["support"]}>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton selected={selected["settings"]}>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
        {role === "admin" && (
          <Card
            invertedColors
            variant='soft'
            color='warning'
            size='sm'
            sx={{ boxShadow: "none" }}>
            <Stack
              direction='row'
              sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography level='title-sm'>Used space</Typography>
              <IconButton size='sm'>
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Typography level='body-xs'>
              Your team has used 80% of your available space. Need more?
            </Typography>
            <LinearProgress
              variant='outlined'
              value={80}
              determinate
              sx={{ my: 1 }}
            />
            <Button size='sm' variant='solid'>
              Upgrade plan
            </Button>
          </Card>
        )}
      </Box>

      {role !== "admin" && (
        <>
          {" "}
          <Divider />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar>
              {String(current.UserInfo.fullname).toUpperCase().charAt(0)}
              {String(current.UserInfo.fullname).split(" ")[1].charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography level='title-sm'>
                {current.UserInfo.fullname}
              </Typography>
              <Typography level='body-xs'>{current.UserInfo.email}</Typography>
            </Box>
            <IconButton
              onClick={() => handleLogout()}
              size='sm'
              variant='plain'
              color='neutral'>
              <LogoutRoundedIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Sheet>
  );
}
