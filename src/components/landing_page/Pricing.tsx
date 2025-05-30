
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { FloatButton, Tag} from "antd"
import { MessageOutlined, PlusOutlined } from "@ant-design/icons";

const tiers = [
  {
    title: "Certificate Course",
    price: "18,000",
    description: [
      "12-months intensive curriculum",
      "Hands-on lab access",
      "Dedicated mentorship",
      "Career readiness workshop",
    ],
    buttonText: "Enroll now",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
  {
    title: "Diploma Program",
    subheader: "Most Popular",
    price: "20,000",
    description: [
      "2-year comprehensive syllabus",
      "Everything in Certificate",
      "Industry internship placement",
      "Capstone research project",
    ],
    buttonText: "Apply now",
    buttonVariant: "contained",
    buttonColor: "secondary",
  },
  {
    title: "ISBAT Advanced Diploma",
    price: "50,000",
    description: [
      "3-year accredited degree",
      "Full access to all facilities",
      "Scholarship & exchange options",
      "Alumni network support",
    ],
    buttonText: "Contact admissions",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
];

export default function Pricing() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Tuition Plans
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Choose your pathway at Kisii Impact Institute of Science and
          Technology—whether a short certificate, an in-depth diploma, or a full
          advanced diploma. Each plan combines hands-on learning, expert mentorship, and
          industry connections to launch your career.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        {tiers.map((tier) => (
          <Grid
            size={{
              xs: 12,
              sm: tier.title === "Degree Program" ? 12 : 6,
              md: 4,
            }}
            key={tier.title}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                },
                tier.title === "Diploma Program" &&
                  ((theme) => ({
                    border: "none",
                    background:
                      "radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))",
                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                    ...theme.applyStyles("dark", {
                      background:
                        "radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))",
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    },
                    tier.title === "Diploma Program"
                      ? { color: "grey.100" }
                      : {},
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.subheader && (
                    <Tag>{tier.subheader }</Tag>
                    // <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: "flex",
                      alignItems: "baseline",
                    },
                    tier.title === "Diploma Program"
                      ? { color: "grey.50" }
                      : {},
                  ]}
                >
                  <Typography component="h3" variant="h2">
                    KES {tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; per semester
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: "divider" }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        tier.title === "Diploma Program"
                          ? { color: "primary.light" }
                          : { color: "primary.main" },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={"span"}
                      sx={[
                        tier.title === "Diploma Program"
                          ? { color: "grey.50" }
                          : {},
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  color={tier.buttonColor}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <FloatButton.Group icon={<PlusOutlined/>} trigger="click">
        <FloatButton
          icon={<MessageOutlined />}
          tooltip="Contact Admissions"
          type="primary"
          style={{ right: 24, bottom: 80 }}
          onClick={() => {
            window.open("https://wa.me/254780640762", "_blank");
          }}
        />
        <FloatButton
          icon={<AutoAwesomeIcon />}
          tooltip="Apply Now"
          type="primary"
          style={{ right: 24, bottom: 140 }}
          onClick={() => {
            window.open("https://kisiiimpact.ac.ke/apply", "_blank");
          }}
        />
      </FloatButton.Group>
    </Container>
  );
}
