import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { courseAttendance, studentData } from "src/modules/mockdata";

import * as echarts from "echarts";

export default function StudentAnalytics() {
    const { Title, Text } = Typography;

    useEffect(() => {
        const attendanceChart = echarts.init(
            document.getElementById("attendance-chart"),
          );
          const attendanceOption = {
            animation: false,
            series: [
              {
                type: "gauge",
                startAngle: 90,
                endAngle: -270,
                pointer: {
                  show: false,
                },
                progress: {
                  show: true,
                  overlap: false,
                  roundCap: true,
                  clip: false,
                  itemStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        { offset: 0, color: "#1890ff" },
                        { offset: 1, color: "#36cfc9" },
                      ],
                    },
                  },
                },
                axisLine: {
                  lineStyle: {
                    width: 20,
                  },
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                data: [
                  {
                    value: studentData.overallAttendance,
                    name: "Overall",
                    title: {
                      offsetCenter: ["0%", "0%"],
                    },
                    detail: {
                      valueAnimation: true,
                      offsetCenter: ["0%", "30%"],
                    },
                  },
                ],
                title: {
                  fontSize: 14,
                },
                detail: {
                  width: 50,
                  height: 14,
                  fontSize: 24,
                  color: "#1890ff",
                  formatter: "{value}%",
                },
              },
            ],
          };
          attendanceChart.setOption(attendanceOption);
          // Subject-wise attendance chart
          const subjectChart = echarts.init(
            document.getElementById("subject-chart"),
          );
          const subjectOption = {
            animation: false,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: {
              type: "value",
              max: 100,
              axisLabel: {
                formatter: "{value}%",
              },
            },
            yAxis: {
              type: "category",
              data: courseAttendance.map((item) => item.course),
            },
            series: [
              {
                name: "Attendance",
                type: "bar",
                data: courseAttendance.map((item) => item.percentage),
                itemStyle: {
                  color: function (params: any) {
                    const value = params.value;
                    if (value < 80) return "#ff4d4f";
                    if (value < 90) return "#faad14";
                    return "#52c41a";
                  },
                },
              },
            ],
          };
          subjectChart.setOption(subjectOption);
          // Monthly trend chart
          const trendChart = echarts.init(document.getElementById("trend-chart"));
          const trendOption = {
            animation: false,
            tooltip: {
              trigger: "axis",
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            },
            yAxis: {
              type: "value",
              min: 60,
              max: 100,
              axisLabel: {
                formatter: "{value}%",
              },
            },
            series: [
              {
                name: "Attendance",
                type: "line",
                data: [82, 85, 90, 88, 85, 87],
                smooth: true,
                lineStyle: {
                  width: 3,
                  color: "#1890ff",
                },
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: "rgba(24,144,255,0.4)" },
                      { offset: 1, color: "rgba(24,144,255,0.1)" },
                    ],
                  },
                },
              },
            ],
          };
          trendChart.setOption(trendOption);
          // Handle resize
          const handleResize = () => {
            attendanceChart.resize();
            subjectChart.resize();
            trendChart.resize();
          };
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
            attendanceChart.dispose();
            subjectChart.dispose();
            trendChart.dispose();
          };
        
    },[])
  return (
    <div className='p-6'>
      <Title level={3} className='mb-6'>
        Attendance Analytics
      </Title>
      <Row gutter={[16, 16]} className='mb-6'>
        <Col xs={24} md={8}>
          <Card
            title='Overall Attendance'
            className='shadow-sm hover:shadow-md transition-shadow h-full'>
            <div id='attendance-chart' style={{ height: "300px" }}></div>
            <div className='text-center mt-4'>
              <Text>Academic Year 2024-2025</Text>
              <br />
              <Text type='secondary'>Minimum Required: 80%</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card
            title='Course-wise Attendance'
            className='shadow-sm hover:shadow-md transition-shadow h-full'>
            <div id='subject-chart' style={{ height: "300px" }}></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card
            title='Monthly Attendance Trend'
            className='shadow-sm hover:shadow-md transition-shadow'>
            <div id='trend-chart' style={{ height: "300px" }}></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mt-6'>
        <Col xs={24}>
          <Card
            title='Attendance Reports'
            className='shadow-sm hover:shadow-md transition-shadow'
            extra={
              <Button
                type='primary'
                icon={<DownloadOutlined />}
                className='!rounded-button whitespace-nowrap'>
                Download All
              </Button>
            }>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card className='shadow-sm hover:shadow-md transition-shadow cursor-pointer'>
                <div className='flex items-center'>
                  <FileTextOutlined className='text-3xl text-blue-500 mr-4' />
                  <div>
                    <Text strong>Monthly Report</Text>
                    <br />
                    <Text type='secondary'>June 2025</Text>
                  </div>
                </div>
                <Button
                  type='link'
                  icon={<DownloadOutlined />}
                  className='mt-3 !rounded-button whitespace-nowrap'
                  id='download-pdf-btn'
                  onClick={(e) => {
                    const button = e.currentTarget;
                    const reportType =
                      button.closest(".ant-card")?.querySelector("Text strong")
                        ?.textContent || "";

                    // Show loading state
                    button.classList.add("loading");
                    button.disabled = true;

                    // Simulate PDF download
                    setTimeout(() => {
                      try {
                        // Simulated download success
                        const success = Math.random() > 0.1; // 90% success rate

                        if (success) {
                          Modal.success({
                            content: `${reportType} downloaded successfully`,
                            duration: 2,
                          });

                          // Trigger download
                          const link = document.createElement("a");
                          link.href = "#";
                          link.download = `${reportType
                            .toLowerCase()
                            .replace(" ", "_")}_report.pdf`;
                          link.click();
                        } else {
                          throw new Error("Download failed");
                        }
                      } catch (error) {
                        Modal.error({
                          content:
                            "Failed to download report. Please try again.",
                          duration: 2,
                        });
                      } finally {
                        button.classList.remove("loading");
                        button.disabled = false;
                      }
                    }, 1500);
                  }}>
                  {/* Add loading spinner */}
                  <style>
                    {`
.loading {
position: relative;
pointer-events: none;
}
.loading:after {
content: '';
position: absolute;
width: 16px;
height: 16px;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
border: 4px solid transparent;
border-top-color: #1890ff;
border-radius: 50%;
animation: loading-spinner 1s ease infinite;
}
@keyframes loading-spinner {
from {transform: rotate(0turn)}
to {transform: rotate(1turn)}
}
`}
                  </style>
                  Download PDF
                </Button>
              </Card>
              <Card className='shadow-sm hover:shadow-md transition-shadow cursor-pointer'>
                <div className='flex items-center'>
                  <FileTextOutlined className='text-3xl text-blue-500 mr-4' />
                  <div>
                    <Text strong>Course Report</Text>
                    <br />
                    <Text type='secondary'>Advanced Algorithms</Text>
                  </div>
                </div>
                <Button
                  type='link'
                  icon={<DownloadOutlined />}
                  className='mt-3 !rounded-button whitespace-nowrap'
                  id='download-pdf-btn'
                  onClick={(e) => {
                    const button = e.currentTarget;
                    const reportType =
                      button.closest(".ant-card")?.querySelector("Text strong")
                        ?.textContent || "";

                    // Show loading state
                    button.classList.add("loading");
                    button.disabled = true;

                    // Simulate PDF download
                    setTimeout(() => {
                      try {
                        // Simulated download success
                        const success = Math.random() > 0.1; // 90% success rate

                        if (success) {
                          Modal.success({
                            content: `${reportType} downloaded successfully`,
                            duration: 2,
                          });

                          // Trigger download
                          const link = document.createElement("a");
                          link.href = "#";
                          link.download = `${reportType
                            .toLowerCase()
                            .replace(" ", "_")}_report.pdf`;
                          link.click();
                        } else {
                          throw new Error("Download failed");
                        }
                      } catch (error) {
                        Modal.error({
                          content:
                            "Failed to download report. Please try again.",
                          duration: 2,
                        });
                      } finally {
                        button.classList.remove("loading");
                        button.disabled = false;
                      }
                    }, 1500);
                  }}>
                  {/* Add loading spinner */}
                  <style>
                    {`
.loading {
position: relative;
pointer-events: none;
}
.loading:after {
content: '';
position: absolute;
width: 16px;
height: 16px;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
border: 4px solid transparent;
border-top-color: #1890ff;
border-radius: 50%;
animation: loading-spinner 1s ease infinite;
}
@keyframes loading-spinner {
from {transform: rotate(0turn)}
to {transform: rotate(1turn)}
}
`}
                  </style>
                  Download PDF
                </Button>
              </Card>
              <Card className='shadow-sm hover:shadow-md transition-shadow cursor-pointer'>
                <div className='flex items-center'>
                  <FileTextOutlined className='text-3xl text-blue-500 mr-4' />
                  <div>
                    <Text strong>Semester Report</Text>
                    <br />
                    <Text type='secondary'>Spring 2025</Text>
                  </div>
                </div>
                <Button
                  type='link'
                  icon={<DownloadOutlined />}
                  className='mt-3 !rounded-button whitespace-nowrap'
                  id='download-pdf-btn'
                  onClick={(e) => {
                    const button = e.currentTarget;
                    const reportType =
                      button.closest(".ant-card")?.querySelector("Text strong")
                        ?.textContent || "";

                    // Show loading state
                    button.classList.add("loading");
                    button.disabled = true;

                    // Simulate PDF download
                    setTimeout(() => {
                      try {
                        // Simulated download success
                        const success = Math.random() > 0.1; // 90% success rate

                        if (success) {
                          Modal.success({
                            content: `${reportType} downloaded successfully`,
                            duration: 2,
                          });

                          // Trigger download
                          const link = document.createElement("a");
                          link.href = "#";
                          link.download = `${reportType
                            .toLowerCase()
                            .replace(" ", "_")}_report.pdf`;
                          link.click();
                        } else {
                          throw new Error("Download failed");
                        }
                      } catch (error) {
                        Modal.error({
                          content:
                            "Failed to download report. Please try again.",
                          duration: 2,
                        });
                      } finally {
                        button.classList.remove("loading");
                        button.disabled = false;
                      }
                    }, 1500);
                  }}>
                  {/* Add loading spinner */}
                  <style>
                    {`
.loading {
position: relative;
pointer-events: none;
}
.loading:after {
content: '';
position: absolute;
width: 16px;
height: 16px;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
border: 4px solid transparent;
border-top-color: #1890ff;
border-radius: 50%;
animation: loading-spinner 1s ease infinite;
}
@keyframes loading-spinner {
from {transform: rotate(0turn)}
to {transform: rotate(1turn)}
}
`}
                  </style>
                  Download PDF
                </Button>
              </Card>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
