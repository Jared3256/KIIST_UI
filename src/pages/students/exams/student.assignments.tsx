import {
    Avatar,
    Button, Card,
    Divider,
    Drawer,
    Input, List,
    notification,
    Progress,
    Result, Statistic,
    Table,
    Tabs,
    Tag,
    Typography,
    Upload
} from "antd";
import {
    CalendarOutlined,
    CheckCircleOutlined, CloseCircleOutlined,
    DownloadOutlined, ExclamationCircleOutlined,
    EyeOutlined,
    FileExcelOutlined,
    FileImageOutlined,
    FilePdfOutlined,
    FileTextOutlined,
    FileWordOutlined,
    FileZipOutlined,
    FilterOutlined,
    InboxOutlined,
    SearchOutlined
} from "@ant-design/icons";
import React, {useState} from "react";
import type {UploadFile, UploadProps} from "antd/es/upload/interface";

const upcomingAssignments = [
    {
        id: 1,
        title: "Database Design Project",
        dueDate: "2025-07-05",
        status: "pending",
        type: "assignment",
        progress: 0,
        description:
            "Design a normalized database schema for a hospital management system. Include ER diagrams and SQL scripts for table creation.",
    },
    {
        id: 2,
        title: "Programming Fundamentals CAT",
        dueDate: "2025-07-02",
        status: "pending",
        type: "cat",
        progress: 0,
        duration: "1 hour",
        description:
            "This CAT will cover variables, data types, control structures, functions, and basic algorithms.",
        startTime: "2025-07-02T10:00:00",
        endTime: "2025-07-02T12:00:00",
    },
    {
        id: 3,
        title: "Network Security Research Paper",
        dueDate: "2025-07-10",
        status: "pending",
        type: "assignment",
        progress: 30,
        description:
            "Research and write a 10-page paper on modern network security threats and mitigation strategies.",
    },
];
const pastAssignments = [
    {
        id: 4,
        title: "Web Development Project",
        dueDate: "2025-06-25",
        status: "submitted",
        type: "assignment",
        progress: 100,
        grade: "A",
        feedback:
            "Excellent work! Your implementation of responsive design principles was particularly impressive.",
    },
    {
        id: 5,
        title: "Computer Architecture CAT",
        dueDate: "2025-06-20",
        status: "graded",
        type: "cat",
        progress: 100,
        grade: "B+",
        feedback:
            "Good understanding of processor architecture. Could improve on memory hierarchy concepts.",
    },
];

export default function StudentAssignments() {
    const {Title, Text} = Typography
    const {TabPane} = Tabs;
    const {Paragraph} = Typography;
    const {Dragger} = Upload;

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
    const [currentFeedback, setCurrentFeedback] = useState<any>(null);
    const [currentAssignment, setCurrentAssignment] = useState<any>(null);
    const [feedbackDrawerVisible, setFeedbackDrawerVisible] =

        useState<boolean>(false);
    const [submissionComment, setSubmissionComment] = useState<string>("");
    const [assignmentSubmissionLoading, setAssignmentSubmissionLoading] =
        useState<boolean>(false);
    const [assignmentDrawerVisible, setAssignmentDrawerVisible] =
        useState<boolean>(false);
    const handleViewFeedback = (assignment: any) => {
        setCurrentFeedback(assignment);
        setFeedbackDrawerVisible(true);
    };
    const handleFileChange: UploadProps["onChange"] = ({
                                                           fileList: newFileList,
                                                       }) => {
        setFileList(newFileList);
    };
    const handleSubmitAssignment = () => {
        if (fileList.length === 0) {
            notification.error({
                message: "Submission Error",
                description:
                    "Please upload at least one file for your assignment submission.",
            });
            return;
        }

        setAssignmentSubmissionLoading(true);

        // Simulate API call
        setTimeout(() => {
            setSubmissionSuccess(true);
            setAssignmentSubmissionLoading(false);

            // Update the assignment status in the mock data
            const updatedAssignments = upcomingAssignments.map((a) =>
                a.id === currentAssignment.id
                    ? {...a, status: "submitted", progress: 100}
                    : a,
            );

            notification.success({
                message: "Assignment Submitted",
                description: "Your assignment has been successfully submitted.",
            });

            // Close drawer after 2 seconds
            setTimeout(() => {
                setAssignmentDrawerVisible(false);
            }, 2000);
        }, 2000);
    };
    const handleViewAssignment = (assignment: any) => {
        setCurrentAssignment(assignment);
        setAssignmentDrawerVisible(true);
        setFileList([]);
        setSubmissionComment("");
        setSubmissionSuccess(false);
    };
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>My Assignments</Title>
                <div className="flex gap-2">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search assignments"
                        className="w-64"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <Tabs
                defaultActiveKey="upcoming"
                className="bg-white p-4 rounded-lg shadow-md"
            >
                <TabPane tab="Upcoming Assignments" key="upcoming" className={"p-3"}>
                    <Table
                        scroll={{x: "max-content"}}
                        dataSource={upcomingAssignments.filter(
                            (a) => a.type === "assignment",
                        )}
                        rowKey="id"
                        columns={[
                            {
                                title: "Title",
                                dataIndex: "title",
                                key: "title",
                            },
                            {
                                title: "Due Date",
                                dataIndex: "dueDate",
                                key: "dueDate",
                            },
                            {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                                render: (status) => (
                                    <Tag
                                        color={
                                            status === "pending"
                                                ? "orange"
                                                : status === "submitted"
                                                    ? "green"
                                                    : status === "graded"
                                                        ? "blue"
                                                        : "red"
                                        }
                                    >
                                        {status.toUpperCase()}
                                    </Tag>
                                ),
                            },
                            {
                                title: "Progress",
                                key: "progress",
                                render: (_, record) => (
                                    <Progress percent={record.progress} size="small"/>
                                ),
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Button
                                        type="primary"
                                        onClick={() => handleViewAssignment(record)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Submit Assignment
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </TabPane>
                <TabPane tab="Completed Assignments" key="completed">
                    <Table
                        dataSource={pastAssignments.filter((a) => a.type === "assignment")}
                        rowKey="id"
                        columns={[
                            {
                                title: "Title",
                                dataIndex: "title",
                                key: "title",
                            },
                            {
                                title: "Submission Date",
                                dataIndex: "dueDate",
                                key: "dueDate",
                            },
                            {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                                render: (status) => (
                                    <Tag
                                        color={
                                            status === "submitted"
                                                ? "green"
                                                : status === "graded"
                                                    ? "blue"
                                                    : "red"
                                        }
                                    >
                                        {status.toUpperCase()}
                                    </Tag>
                                ),
                            },
                            {
                                title: "Grade",
                                dataIndex: "grade",
                                key: "grade",
                                render: (grade) => <Tag color="green">{grade}</Tag>,
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Button
                                        type="default"
                                        icon={<EyeOutlined/>}
                                        onClick={() => handleViewFeedback(record)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        View Feedback
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </TabPane>
            </Tabs>

            <Drawer
                title={currentAssignment?.title}
                placement="right"
                onClose={() => setAssignmentDrawerVisible(false)}
                open={assignmentDrawerVisible}
                width={600}
                footer={
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setAssignmentDrawerVisible(false)}
                            className="mr-2 !rounded-button whitespace-nowrap"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSubmitAssignment}
                            disabled={submissionSuccess}
                            loading={assignmentSubmissionLoading}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Submit Assignment
                        </Button>
                    </div>
                }
            >
                {submissionSuccess ? (
                    <Result
                        status="success"
                        title="Assignment Submitted Successfully!"
                        subTitle="Your assignment has been submitted. You will be notified once it's graded."
                    />
                ) : (
                    <>
                        <div className="mb-6">
                            <Title level={5}>Assignment Details</Title>
                            <Paragraph>{currentAssignment?.description}</Paragraph>
                            <div className="mt-4">
                                <Tag color="blue">Due Date: {currentAssignment?.dueDate}</Tag>
                            </div>
                        </div>

                        <Divider/>

                        <div className="mb-6">
                            <Title level={5}>Upload Files</Title>
                            <Dragger
                                fileList={fileList}
                                onChange={handleFileChange}
                                multiple
                                beforeUpload={() => false}
                                className="mb-4"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag files to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for single or bulk upload. Strictly prohibited from
                                    uploading company data or other banned files.
                                </p>
                            </Dragger>

                            <div className="mt-4">
                                <Text type="secondary">
                                    Accepted file types: .pdf, .doc, .docx, .zip, .rar, .jpg, .png
                                </Text>
                            </div>
                        </div>

                        <div>
                            <Title level={5}>Comments</Title>
                            <Input.TextArea
                                rows={4}
                                placeholder="Add any comments about your submission..."
                                value={submissionComment}
                                onChange={(e) => setSubmissionComment(e.target.value)}
                            />
                        </div>
                    </>
                )}
            </Drawer>

            <Drawer
                title={`Feedback: ${currentFeedback?.title}`}
                placement="right"
                onClose={() => setFeedbackDrawerVisible(false)}
                open={feedbackDrawerVisible}
                width={600}
            >
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <Title level={5}>Submission Details</Title>
                        <Tag color="green">Grade: {currentFeedback?.grade}</Tag>
                    </div>

                    <Card className="mb-4">
                        <div className="flex items-center mb-2">
                            <CalendarOutlined className="mr-2 text-blue-500"/>
                            <Text strong>Submitted:</Text>
                            <Text className="ml-2">{currentFeedback?.dueDate}</Text>
                        </div>
                        <div className="flex items-center mb-2">
                            <CheckCircleOutlined className="mr-2 text-green-500"/>
                            <Text strong>Status:</Text>
                            <Tag color="green" className="ml-2">
                                {currentFeedback?.status.toUpperCase()}
                            </Tag>
                        </div>
                        <div className="flex items-center">
                            <FileTextOutlined className="mr-2 text-orange-500"/>
                            <Text strong>Type:</Text>
                            <Text className="ml-2">
                                {currentFeedback?.type === "assignment" ? "Assignment" : "CAT"}
                            </Text>
                        </div>
                    </Card>
                </div>

                <Divider/>

                <div className="mb-6">
                    <Title level={5}>Instructor Feedback</Title>
                    <Card className="bg-gray-50">
                        <Paragraph>{currentFeedback?.feedback}</Paragraph>
                    </Card>
                </div>

                {currentFeedback?.type === "assignment" && (
                    <div className="mb-6">
                        <Title level={5}>Submitted Files</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {
                                    name: "assignment_submission.pdf",
                                    type: "pdf",
                                    size: "2.4 MB",
                                },
                                {name: "supporting_documents.zip", type: "zip", size: "5.1 MB"},
                            ]}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            type="link"
                                            icon={<DownloadOutlined/>}
                                            className="cursor-pointer !rounded-button whitespace-nowrap"
                                        >
                                            Download
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={
                                                    item.type === "pdf" ? (
                                                        <FilePdfOutlined/>
                                                    ) : item.type === "doc" || item.type === "docx" ? (
                                                        <FileWordOutlined/>
                                                    ) : item.type === "xls" || item.type === "xlsx" ? (
                                                        <FileExcelOutlined/>
                                                    ) : item.type === "zip" || item.type === "rar" ? (
                                                        <FileZipOutlined/>
                                                    ) : (
                                                        <FileImageOutlined/>
                                                    )
                                                }
                                            />
                                        }
                                        title={item.name}
                                        description={`${item.type.toUpperCase()} - ${item.size}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}

                {currentFeedback?.type === "cat" && (
                    <div>
                        <Title level={5}>Test Results</Title>
                        <Card className="mb-4">
                            <Statistic
                                title="Score"
                                value={
                                    currentFeedback?.grade === "A"
                                        ? "90"
                                        : currentFeedback?.grade === "B+"
                                            ? "85"
                                            : "75"
                                }
                                suffix="/ 100"
                                valueStyle={{color: "#3f8600"}}
                            />
                        </Card>

                        <div className="mt-4">
                            <Title level={5}>Question Analysis</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={[
                                    {question: "Question 1", status: "correct", points: "25/25"},
                                    {question: "Question 2", status: "partial", points: "15/25"},
                                    {question: "Question 3", status: "correct", points: "25/25"},
                                    {
                                        question: "Question 4",
                                        status: "incorrect",
                                        points: "10/25",
                                    },
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    icon={
                                                        item.status === "correct" ? (
                                                            <CheckCircleOutlined/>
                                                        ) : item.status === "partial" ? (
                                                            <ExclamationCircleOutlined/>
                                                        ) : (
                                                            <CloseCircleOutlined/>
                                                        )
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            item.status === "correct"
                                                                ? "#52c41a"
                                                                : item.status === "partial"
                                                                    ? "#faad14"
                                                                    : "#f5222d",
                                                    }}
                                                />
                                            }
                                            title={item.question}
                                            description={`Points: ${item.points}`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    )
}
