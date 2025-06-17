import React, {useState} from 'react'
import {Alert, Button, Card, Empty, Input, List, notification, Result, Statistic, Table, Tag, Typography} from "antd";
import {BookOutlined, ClockCircleOutlined, SearchOutlined} from "@ant-design/icons";

export default function Test1() {
    const [feeStatus, setFeeStatus] = useState({
        totalFee: 50000,
        amountPaid: 65000,
        percentagePaid: 30,
        isDefaulter: true,
        weeksPassed: 3,
    });
    const {Title, Text, Paragraph} = Typography;
    const weeksPassed = feeStatus.weeksPassed;
    const isFeatureRestricted =
        weeksPassed >= 4 && feeStatus.percentagePaid < 50;
    if (isFeatureRestricted) {
        return (
            <div className="p-6">
                <Result
                    status="warning"
                    title="Access Restricted"
                    subTitle="You need to pay at least 50% of your fees to access course registration after 4 weeks of semester."
                    extra={
                        <Button
                            type="primary"
                            // onClick={() => setActiveTab("finance")}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Go to Payment Page
                        </Button>
                    }
                />
            </div>
        );
    }
    const availableCourses = [
        {
            code: "CS401",
            name: "Advanced Algorithms",
            credits: 4,
            prerequisites: ["CS301"],
            status: "Available",
        },
        {
            code: "CS402",
            name: "Artificial Intelligence",
            credits: 3,
            prerequisites: ["CS301", "MATH201"],
            status: "Available",
        },
        {
            code: "CS403",
            name: "Web Development",
            credits: 3,
            prerequisites: ["CS201"],
            status: "Available",
        },
        {
            code: "CS404",
            name: "Mobile App Development",
            credits: 3,
            prerequisites: ["CS201"],
            status: "Available",
        },
        {
            code: "CS405",
            name: "Cloud Computing",
            credits: 3,
            prerequisites: ["CS302"],
            status: "Available",
        },
        {
            code: "CS406",
            name: "Cybersecurity",
            credits: 3,
            prerequisites: ["CS302"],
            status: "Available",
        },
        {
            code: "CS407",
            name: "Machine Learning",
            credits: 4,
            prerequisites: ["CS402", "MATH301"],
            status: "Prerequisite Required",
        },
        {
            code: "CS408",
            name: "Big Data Analytics",
            credits: 3,
            prerequisites: ["CS302", "MATH301"],
            status: "Available",
        },
        {
            code: "BUS401",
            name: "IT Project Management",
            credits: 2,
            prerequisites: [],
            status: "Available",
        },
        {
            code: "MATH401",
            name: "Numerical Methods",
            credits: 3,
            prerequisites: ["MATH301"],
            status: "Available",
        },
    ];
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [searchText, setSearchText] = useState("");
    const filteredCourses = availableCourses.filter(
        (course) =>
            course.code.toLowerCase().includes(searchText.toLowerCase()) ||
            course.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    const handleCourseSelection = (courseCode: string) => {
        if (selectedCourses.includes(courseCode)) {
            setSelectedCourses(
                selectedCourses.filter((code) => code !== courseCode),
            );
        } else {
            if (selectedCourses.length < 6) {
                setSelectedCourses([...selectedCourses, courseCode]);
            } else {
                notification.warning({
                    message: "Maximum Courses Reached",
                    description:
                        "You can only register for a maximum of 6 courses per semester.",
                    duration: 3,
                });
            }
        }
    };
    const totalCredits = availableCourses
        .filter((course) => selectedCourses.includes(course.code))
        .reduce((sum, course) => sum + course.credits, 0);
    const columns = [
        {
            title: "Course Code",
            dataIndex: "code",
            key: "code",
            width: 120,
        },
        {
            title: "Course Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Credits",
            dataIndex: "credits",
            key: "credits",
            width: 100,
            align: "center" as const,
        },
        {
            title: "Prerequisites",
            dataIndex: "prerequisites",
            key: "prerequisites",
            render: (prerequisites: string[]) => (
                <>
                    {prerequisites.length > 0 ? (
                        prerequisites.map((pre) => <Tag key={pre}>{pre}</Tag>)
                    ) : (
                        <span>None</span>
                    )}
                </>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "green";
                if (status === "Prerequisite Required") color = "orange";
                if (status === "Full") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => {
                const isSelected = selectedCourses.includes(record.code);
                return (
                    <Button
                        type={isSelected ? "primary" : "default"}
                        onClick={() => handleCourseSelection(record.code)}
                        className={`!rounded-button whitespace-nowrap cursor-pointer ${isSelected ? "bg-green-600 hover:bg-green-700" : ""}`}
                    >
                        {isSelected ? "Selected" : "Select"}
                    </Button>
                );
            },
        },
    ];
    return (
        <div className="p-6">
            <div className="mb-8">
                <Title level={3}>Course Registration</Title>
                <Text type="secondary">Semester: September - December 2025</Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-sm">
                    <Statistic
                        title="Registration Deadline"
                        value="15"
                        suffix="days remaining"
                        valueStyle={{color: "#1890ff"}}
                        prefix={<ClockCircleOutlined/>}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                        Deadline: June 30, 2025
                    </div>
                </Card>
                <Card className="shadow-sm">
                    <Statistic
                        title="Selected Courses"
                        value={selectedCourses.length}
                        suffix={`/ 6 maximum`}
                        valueStyle={{
                            color: selectedCourses.length > 0 ? "#3f8600" : "#1890ff",
                        }}
                        prefix={<BookOutlined/>}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                        Minimum required: 3 courses
                    </div>
                </Card>
                <Card className="shadow-sm">
                    <Statistic
                        title="Total Credits"
                        value={totalCredits}
                        suffix="credits"
                        valueStyle={{color: totalCredits > 0 ? "#3f8600" : "#1890ff"}}
                        prefix={<BookOutlined/>}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                        Recommended: 12-18 credits
                    </div>
                </Card>
            </div>
            <Card title="Available Courses" className="shadow-sm mb-8">
                <div className="mb-4">
                    <Input
                        placeholder="Search courses by code or name"
                        prefix={<SearchOutlined/>}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="max-w-md"
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredCourses}
                    rowKey="code"
                    pagination={{pageSize: 6}}
                />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Selected Courses" className="shadow-sm">
                    {selectedCourses.length > 0 ? (
                        <List
                            itemLayout="horizontal"
                            dataSource={availableCourses.filter((course) =>
                                selectedCourses.includes(course.code),
                            )}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            danger
                                            onClick={() => handleCourseSelection(item.code)}
                                            className="!rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            Remove
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.code}: ${item.name}`}
                                        description={`Credits: ${item.credits} | Prerequisites: ${item.prerequisites.length > 0 ? item.prerequisites.join(", ") : "None"}`}
                                    />
                                </List.Item>
                            )}
                            footer={
                                <div className="flex justify-between font-medium">
                                    <span>Total Credits:</span>
                                    <span>{totalCredits}</span>
                                </div>
                            }
                        />
                    ) : (
                        <Empty description="No courses selected yet"/>
                    )}
                </Card>
                <Card title="Registration Information" className="shadow-sm">
                    <Alert
                        message="Registration Guidelines"
                        description={
                            <ul className="list-disc pl-5 mt-2">
                                <li>
                                    You must register for a minimum of 3 courses per semester.
                                </li>
                                <li>
                                    Maximum course load is 6 courses or 18 credits, whichever is
                                    lower.
                                </li>
                                <li>
                                    Ensure you have completed all prerequisites before
                                    registering for a course.
                                </li>
                                <li>
                                    Registration closes on June 30, 2025. No late registrations
                                    will be accepted.
                                </li>
                                <li>
                                    You must have paid at least 50% of your fees to register
                                    after 4 weeks of semester.
                                </li>
                            </ul>
                        }
                        type="info"
                        showIcon
                        className="mb-4"
                    />
                    <div className="mt-6">
                        <Button
                            type="primary"
                            size="large"
                            disabled={selectedCourses.length < 3}
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Submit Registration
                        </Button>
                        {selectedCourses.length < 3 && (
                            <div className="mt-2 text-center text-red-500">
                                <small>You must select at least 3 courses to register</small>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
