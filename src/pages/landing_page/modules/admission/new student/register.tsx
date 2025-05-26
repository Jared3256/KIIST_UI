import { AppRegistrationRounded, CheckRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  Step,
  stepClasses,
  StepIndicator,
  stepIndicatorClasses,
  Stepper,
  Typography,
  typographyClasses,
} from "@mui/joy";
import { Button } from "@mui/material";
import React, { useState } from "react";
import PersonalDetails from "./pesonal_details";
import ContactAddress from "./contact.address";
import Academic from "./academic";
import Payment from "./payment";
import Review from "./review";

export default function RegisterStudent() {
  const resetActive = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  };
  const [activeStep, setActiveSteps] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [activePage, setActivePage] = useState(0);
  const sectionPages = [
    <PersonalDetails />,
    <ContactAddress />,
    <Academic />,
    <Review />,
    <Payment />,
  ];

  const handleActiveStep = () => {};
  return (
    <Box
      display={"flex"}
      flexDirection={{
        md: "column",
        sm: "row",
      }}
      gap={"20px"}
    >
      <Box gap={"20px"} display={"flex"} flexDirection={"column"}>
        <Box>
          <Typography>
            To get registered Kindly fill all the fields in each section.
          </Typography>
        </Box>
        <Divider />
        <Stepper
          orientation={"horizontal"}
          sx={(theme) => ({
            "--Stepper-verticalGap": "2.5rem",
            "--StepIndicator-size": "2.5rem",
            "--Step-gap": "1rem",
            "--Step-connectorInset": "0.5rem",
            "--Step-connectorRadius": "1rem",
            "--Step-connectorThickness": "4px",
            "--joy-palette-success-solidBg": "var(--joy-palette-success-400)",
            [`& .${stepClasses.completed}`]: {
              "&::after": { bgcolor: "success.solidBg" },
            },
            [`& .${stepClasses.active}`]: {
              [`& .${stepIndicatorClasses.root}`]: {
                border: "4px solid",
                borderColor: "#fff",
                boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
              },
            },
            [`& .${stepClasses.disabled} *`]: {
              color: "neutral.softDisabledColor",
            },
            [`& .${typographyClasses["title-sm"]}`]: {
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "10px",
            },
          })}
        >
          <StepComponent
            isSuccess={activePage + 1 === 1}
            isActive={activeStep[1]}
            title="Personal Details"
            stepNumber={1}
          />
          <StepComponent
            isSuccess={activePage + 1 === 2}
            isActive={activeStep[2]}
            title="Contact & Address"
            stepNumber={2}
          />
          <StepComponent
            isSuccess={activePage + 1 === 3}
            isActive={activeStep[3]}
            title="Academic Background"
            stepNumber={2}
          />

          <StepComponent
            isSuccess={activePage + 1 === 4}
            isActive={activeStep[4]}
            title="Details Review"
            stepNumber={2}
          />
          <StepComponent
            isSuccess={activePage + 1 === 5}
            isActive={activeStep[5]}
            title="Payment"
            stepNumber={2}
          />
        </Stepper>
      </Box>

      <Box
        gap={"20px"}
        display={"flex"}
        flexDirection={"column"}
        height={"100"}
        justifyContent={"space-between"}
      >
        <Box mt={"40px"}>{sectionPages[activePage]}</Box>
        <Box display={"flex"} gap={"20px"}>
          {activePage !== 0 && (
            <Button
              onClick={() => {
                if (activePage >= 0) {
                  setActivePage(activePage - 1);
                }
              }}
              variant="outlined"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={() => {
              if (activePage + 1 < sectionPages.length) {
                setActivePage(activePage + 1);
                handleActiveStep();
              }
            }}
            variant="contained"
            color="primary"
          >
            {activePage + 1 === sectionPages.length ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const StepComponent = ({
  isActive,
  isSuccess,
  stepNumber,
  title,
}: {
  isActive: boolean;
  isSuccess: boolean;
  stepNumber: number;
  title: string;
}) => {
  return (
    <Step
      active={isActive}
      completed={isSuccess}
      indicator={
        isSuccess || isActive ? (
          <StepIndicator
            variant="solid"
            color={isSuccess ? "primary" : "success"}
          >
            {isSuccess ? <AppRegistrationRounded /> : <CheckRounded />}
          </StepIndicator>
        ) : (
          <StepIndicator>{stepNumber}</StepIndicator>
        )
      }
    >
      <div>
        <Typography level="title-sm">
          {isSuccess}Step {stepNumber}
        </Typography>
        {title}
      </div>
    </Step>
  );
};
