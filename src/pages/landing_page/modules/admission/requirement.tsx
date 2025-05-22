import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import React from "react";
export default function Requirements() {
  return (
    <Box width={"100%"} display={"flex"}>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}
      >
        <Box
          display={"flex"}
          gap={{
            sm: "20px",
            xs: "20px",
            md: "80px",
          }}
          flexDirection={{
            sm: "column",
            xs: "column",
            md: "row",
          }}
        >
          <Box gap={"10px"}>
            <Typography level="h3" color="primary">
              Admission Requirements
            </Typography>
            <Box>
              <List aria-labelledby="decorated-list-demo">
                <ListItem>
                  <Typography>
                    1. Photocopy of National Identity Card or
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    &nbsp;&nbsp;&nbsp;Photocopy of Birth certificate
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>2. Photocopy of KCSE Result Slip</Typography>
                </ListItem>
                <ListItem>
                  <Typography>3. 2-Coloured passports</Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    4. Application fee of 1000 (Non refundable)
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box>
            <Typography level="h3" color="primary">
              Tuition Fee
            </Typography>
            <Box>
              <List aria-labelledby="decorated-list-demo">
                <ListItem>
                  <Typography>Diploma: Ksh. 20,000 per semester</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Certificate: Ksh. 18,000 per semester</Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} gap={"10px"}>
          <Box
            display={"flex"}
            gap={{
              sm: "20px",
              xs: "20px",
              md: "180px",
            }}
            flexDirection={{
              sm: "column",
              xs: "column",
              md: "row",
            }}
          >
            <Box gap={"10px"}>
              <Typography level="h3" color="primary">
                Entry Grade
              </Typography>
              <Box>
                <List aria-labelledby="decorated-list-demo">
                  <ListItem>
                    <Typography>Diploma : C- and Above</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Certificate : D plain and Above</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box>
              <Typography level="h3" color="primary">
                Duration
              </Typography>
              <Box>
                <List aria-labelledby="decorated-list-demo">
                  <ListItem>
                    <Typography>Diploma: 2 years</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Certificate: 12 months</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Divider />
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography>
            Minimum Eligibility Criteria Contact Admission office for more
            details programmed wise eligibility
          </Typography>
          <Typography>
            All our programmes are accredited and approved by{" "}
            <Link>
              <a href="https://tveta.go.ke" target="_blank">
                TVET
              </a>
            </Link>
          </Typography>
          <Typography>
            Located in Kisii Town Twin Towers Building 8th floor along Kisii
            Migori Highway
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
