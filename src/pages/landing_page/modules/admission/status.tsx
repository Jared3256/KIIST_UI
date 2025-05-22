import { Box, Chip, Divider } from "@mui/joy";
import {
  Button,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Collapse from "@mui/material/Collapse";

import visuallyHidden from "@mui/utils/visuallyHidden";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Loading from "src/components/Loading";

interface RowData {
  name: string;
  level: string;
  course: string;
  status: "Approved" | "Declined" | "Pending";
  department: string;
  registrationDate: string;
}
function createData(
  name: string,
  level: string,
  course: string,
  status: RowData["status"],
  department: string,
  registrationDate: string
): RowData {
  return { name, level, course, status, department, registrationDate };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: open ? "unset" : undefined } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.level}</TableCell>
        <TableCell>{row.course}</TableCell>
        <TableCell>
          <Chip>
            <Typography
              component="span"
              sx={{
                color:
                  row.status === "Approved"
                    ? "success.main"
                    : row.status === "Declined"
                    ? "error.main"
                    : "warning.main",
                fontWeight: "medium",
              }}
            >
              {row.status}
            </Typography>
          </Chip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ py: 0, borderBottom: "unset" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Registration Date</TableCell>
                    <TableCell>{row.registrationDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Processing Dept.</TableCell>
                    <TableCell>{row.department}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
  // return (
  //   <React.Fragment>
  //     <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
  //       <TableCell>
  //         <IconButton
  //           aria-label="expand row"
  //           size="small"
  //           onClick={() => setOpen(!open)}
  //         >
  //           {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  //         </IconButton>
  //       </TableCell>
  //       <TableCell component="th" scope="row">
  //         {row.name}
  //       </TableCell>
  //       <TableCell align="right">{row.calories}</TableCell>
  //       <TableCell align="right">{row.fat}</TableCell>
  //       <TableCell align="right">{row.carbs}</TableCell>
  //       <TableCell align="right">{row.protein}</TableCell>
  //     </TableRow>
  //     <TableRow>
  //       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
  //         <Collapse in={open} timeout="auto" unmountOnExit>
  //           <Box sx={{ margin: 1 }}>
  //             <Typography variant="h6" gutterBottom component="div">
  //               History
  //             </Typography>
  //             <Table size="small" aria-label="purchases">
  //               <TableHead>
  //                 <TableRow>
  //                   <TableCell>Date</TableCell>
  //                   <TableCell>Customer</TableCell>
  //                   <TableCell align="right">Amount</TableCell>
  //                   <TableCell align="right">Total price ($)</TableCell>
  //                 </TableRow>
  //               </TableHead>
  //               <TableBody>
  //                 {row.history.map((historyRow) => (
  //                   <TableRow key={historyRow.date}>
  //                     <TableCell component="th" scope="row">
  //                       {historyRow.date}
  //                     </TableCell>
  //                     <TableCell>{historyRow.customerId}</TableCell>
  //                     <TableCell align="right">{historyRow.amount}</TableCell>
  //                     <TableCell align="right">
  //                       {Math.round(historyRow.amount * row.price * 100) / 100}
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </Box>
  //         </Collapse>
  //       </TableCell>
  //     </TableRow>
  //   </React.Fragment>
  // );
}

const rows = [
  createData(
    "Jared Odhiambo",
    "Diploma",
    "Computer Science",
    "Pending",
    "Admissions Office",
    "2025-05-10 14:32"
  ),
  createData(
    "Jared Odhiambo",
    "Diploma",
    "Information Technology",
    "Approved",
    "Academic Affairs",
    "2025-05-08 09:15"
  ),
  createData(
    "Jared Odhiambo",
    "Diploma",
    "Data Analytics",
    "Declined",
    "Department Review",
    "2025-05-09 11:47"
  ),
];

export default function AdmissionStatus() {
  const [loading, setIsLoading] = useState(true)
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"40px"}>
      <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
        <Typography component={"h4"}>
          Check Your admission status here
        </Typography>
        <Box display={"flex"}>
          <Box width={"100%"} display={"flex"} gap={"4-px"}>
            {/* <InputLabel required>Id number</InputLabel> */}
            <TextField
              sx={{
                marginRight: "40px",
              }}
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter Your ID number"
              placeholder="Your Id number or birth certicate"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: "on",
                  "aria-label": "Enter Id number or Birth Certicate number",
                },
              }}
            />
          </Box>

          <Button
            onClick={()=>setIsLoading(!loading)}
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: "fit-content" }}
          >
            Check Admission
          </Button>
        </Box>
        <Divider />
      </Box>
      {loading ? (
        <Loading isLoading={loading}/>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="admission status table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Student Name</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={`${row.name}-${row.course}`} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
