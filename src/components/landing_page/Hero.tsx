import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { Button, Card, Col, Layout, Row, Statistic } from "antd";
import { ArrowRightOutlined, BookOutlined, DownloadOutlined, TeamOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(${"https://mui.com"}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(${"https://mui.com"}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const navigate = useNavigate();
  const {Content}= Layout

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",

        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      {/* Emergency Announcement Banner */}
            <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center">
              <p className="m-0 text-yellow-800">
                <span className="font-bold">Important Notice:</span> Applications for
                Fall 2025 semester close on July 15th.
                <Button
                  type="link"
                  className="font-bold text-purple-800 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Apply Now
                </Button>
              </p>
            </div>
        <Content>
          {/* Hero Section */}
                  <section className="relative h-[600px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20stunning%20modern%20university%20campus%20with%20beautiful%20architecture%2C%20students%20walking%20between%20buildings%2C%20lush%20green%20spaces%20and%20trees%2C%20academic%20atmosphere%2C%20bright%20sunny%20day%2C%20clean%20campus%20grounds%2C%20state-of-the-art%20facilities%20visible%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape')`,
                      }}
                    ></div>
                    <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                      <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">
                          Shaping Future Leaders in Science & Technology
                        </h1>
                        <p className="text-xl mb-8">
                          Discover world-class education at Kisii Impact Institute, where
                          innovation meets excellence in a supportive learning
                          environment.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href="https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18"
                            data-readdy="true"
                          >
                            <Button
                              type="primary"
                              size="large"
                              className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                              icon={<ArrowRightOutlined />}
                            >
                              Apply Now
                            </Button>
                          </a>
                          <Button
                            size="large"
                            className="bg-white text-purple-800 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                            icon={<DownloadOutlined />}
                          >
                            Download Prospectus
                          </Button>
                          <Button
                            size="large"
                            className="bg-transparent text-white border-white hover:bg-white hover:text-purple-800 !rounded-button whitespace-nowrap cursor-pointer"
                          >
                            Virtual Tour
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                      <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                        <DownloadOutlined className="text-white text-lg" />
                      </div>
                    </div>
                  </section>

                   {/* Stats Section */}
                          <section className="py-16 bg-gray-50">
                            <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                  Our Impact in Numbers
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                  Kisii Impact Institute continues to grow and excel in academic
                                  excellence, research, and industry partnerships.
                                </p>
                              </div>
                              <Row gutter={[32, 32]} className="mb-12">
                                <Col xs={24} sm={12} md={6}>
                                  <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                      <TeamOutlined />
                                    </div>
                                    <Statistic
                                      title="Students"
                                      value={5200}
                                      className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">From 28 counties</p>
                                  </Card>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                  <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                      <UserOutlined />
                                    </div>
                                    <Statistic
                                      title="Faculty Members"
                                      value={50}
                                      className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">
                                      Industry experts & researchers
                                    </p>
                                  </Card>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                  <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                      <BookOutlined />
                                    </div>
                                    <Statistic
                                      title="Research Papers"
                                      value={150}
                                      className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">
                                      Published in last 5 years
                                    </p>
                                  </Card>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                  <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                      <TrophyOutlined />
                                    </div>
                                    <Statistic
                                      title="Industry Partners"
                                      value={75}
                                      className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">Global connections</p>
                                  </Card>
                                </Col>
                              </Row>
                              <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                  Student Growth Over Years
                                </h3>
                                <div
                                  id="statsChart"
                                  style={{ width: "100%", height: "300px" }}
                                ></div>
                              </div>
                            </div>
                          </section>
        </Content>
    </Box>
  );
}
