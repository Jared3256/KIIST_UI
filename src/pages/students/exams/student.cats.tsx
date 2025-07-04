import React, {useState, useEffect} from 'react'
import {
    Alert,
    Button,
    Card,
    Checkbox,
    Divider,
    Input,
    Modal,
    notification, Progress, Radio,
    Result, Space,
    Table,
    Tabs,
    Tag,
    Typography
} from "antd";
import {Box} from "@mui/joy"
import {ClockCircleOutlined, EyeOutlined, FilterOutlined, SearchOutlined, WarningOutlined} from "@ant-design/icons";
import type {UploadFile} from "antd/es/upload/interface";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {admin_crud_request} from "src/service/crud.service.ts";
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";
import {dataToCatQuestions, dataToCompletedCATS, dataToStudentCATs, dataToUnits} from "src/modules/Data.format.ts";
import {useSelector} from 'react-redux';
import {selectAuth} from 'src/redux/auth/selectors';
import {differenceInMinutes, isBefore} from 'date-fns';
import {useNavigate} from 'react-router';

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
        startTime: "2025-07-01T10:00:00",
        endTime: "2025-07-03T17:00:00",
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
const sampleQuestions = [
    {
        id: 1,
        question: "What is the primary function of a database management system?",
        type: "multiple_choice",
        options: [
            "Data storage only",
            "Data retrieval only",
            "Data manipulation only",
            "Data storage, retrieval, and manipulation",
        ],
        answer: null,
    },
    {
        id: 2,
        question:
            "Explain the concept of normalization in database design and provide an example of its application.",
        type: "essay",
        answer: "",
    },
    {
        id: 3,
        question: "Which of the following is NOT a type of SQL command?",
        type: "multiple_choice",
        options: ["DDL", "DML", "DCL", "DPL"],
        answer: null,
    },
    {
        id: 4,
        question:
            "Write a SQL query to select all students who have scored above 80 in any subject.",
        type: "code",
        answer: "",
    },
];

export default function StudentCATs() {
    const {current} = useSelector(selectAuth)
    const {TabPane} = Tabs;
    const {Title, Text, Paragraph} = Typography
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [selectedCat, setSelectedCat] = useState<any>(null);
    const [examConfirmVisible, setExamConfirmVisible] = useState<boolean>(false);
    const [examReadyVisible, setExamReadyVisible] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submissionComment, setSubmissionComment] = useState<string>("");
    const [currentAssignment, setCurrentAssignment] = useState<any>(null);
    const [examSubmissionLoading, setExamSubmissionLoading] =
        useState<boolean>(false);
    const [currentFeedback, setCurrentFeedback] = useState<any>(null);
    const [isExamMode, setIsExamMode] = useState<boolean>(false);
    const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
    const [, setExamInProgress] = useState<boolean>(false);
    const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 1 hour in seconds
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
    const [feedbackDrawerVisible, setFeedbackDrawerVisible] =
        useState<boolean>(false);

    const [, setTabSwitchWarning] = useState<boolean>(false);
    const [examAnswers, setExamAnswers] = useState<any[]>(
        sampleQuestions.map(() => null),
    );
    const [loading, setLoading] = useState(false)

    // ###########################################################
    const hotAxiosPrivate = useAxiosPrivate()
    const [allCATs, setAllCATs] = useState([])
    const [upcomingCATS, setUpcomingCATS] = useState([])
    const [completedCATS, setCompletedCATS] = useState([]);
    const [cat_question, setCatQuestion] = useState([]);
    const [registrations, setRegistrations] = useState([])
    const [unitCode, setUnitCode] = useState([])
    const navigate = useNavigate()


    const GetAllCATs = async () => {
        try {
            const data = await admin_crud_request.get_spc({
                url: `/student/cats/list?semester=${getCurrentSemesterName()}`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success) {
                setAllCATs(dataToStudentCATs(data.data).filter((filt) => isBefore(new Date(), filt.endTime)))
            }
        } catch (e) {
            console.log(e)

        }
    }

    const GetRegistrations = async () => {
        const data = await admin_crud_request.list_spc({
            entity: "unit", id: current.UserInfo.id, hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        if (data) {
            setRegistrations(dataToUnits(data.data))
            filterCourse(dataToUnits(data.data))
        }
    }

    const filterCourse = (regs) => {
        const regCodes = new Set(regs.map((r) => r.course));

        setUnitCode(regCodes)

    }

    const GetAllCompletedCATs = async () => {
        try {
            const data = await admin_crud_request.get_spc({
                url: `/student/${current.UserInfo.entity._id}/cats/completed/list`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success) {
                setCompletedCATS(dataToCompletedCATS(data.data))
            }
        } catch (e) {
            console.log(e)


        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await GetAllCATs();
                await GetRegistrations()
                await GetAllCompletedCATs()
            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        setUpcomingCATS(allCATs.filter((cat) => unitCode.has(cat.code)))
    }, [unitCode]);

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        const newAnswers = [...examAnswers];
        newAnswers[questionIndex] = answer;
        setExamAnswers(newAnswers);
    };
    const handleSubmitExam = async () => {

        setExamSubmissionLoading(true);

        try {
            const data = await admin_crud_request.post_spc({
                data: {
                    student: current.UserInfo.entity._id,
                    questions: cat_question,
                    semester: getCurrentSemesterName(),
                    code: selectedCat.key
                },
                url: `/student/${current.UserInfo.entity._id}/cats/submit`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success) {
                setExamSubmitted(true);
                setIsExamMode(false);
                setExamInProgress(false);

                notification.success({
                    message: "Examination Submitted",
                    description: "Your examination has been successfully submitted.",
                });

            }

        } catch (e) {
            console.log(e)
        } finally {
            setExamSubmissionLoading(false);
        }

    };

    const handleViewFeedback = (assignment: any) => {
        setCurrentFeedback(assignment);
        setFeedbackDrawerVisible(true);
    };

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const handleProceedToExam = () => {
        setExamConfirmVisible(false);
        setExamReadyVisible(true);
    };
    const handleStartExam = () => {
        setExamReadyVisible(false);
        setIsExamMode(true);
        setExamInProgress(true);
        setTimeRemaining(genereteTimeRemaining());
        genereteTimeRemaining()
        setCurrentQuestion(0);
        setExamSubmitted(false);
        setTabSwitchCount(0);
        setTabSwitchWarning(false);
        setExamAnswers(sampleQuestions.map(() => null));
    };

    const genereteTimeRemaining = () => {
        const currentTime = new Date()

        return (differenceInMinutes(selectedCat.endTime, currentTime) + 1) * 60
    }
    // Check if CAT is currently available based on time window

    const isCatAvailable = (cat: any): boolean => {
        if (!cat.startTime || !cat.endTime) return true; // If no time restrictions, always available

        const now = currentTime;
        const startTime = new Date(cat.startTime);
        const endTime = new Date(cat.endTime);

        return now >= startTime && now <= endTime;
    };
    // Format time window for display
    const formatTimeWindow = (startTime: string, endTime: string): string => {
        if (!startTime || !endTime) return "No time restriction";

        const start = new Date(startTime);
        const end = new Date(endTime);

        return `${start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })} - ${end.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`;
    };

    const handleConfirmStartExam = (cat: any) => {
        setSelectedCat(cat);
        setTimeRemaining(cat.duration * 60)
        setCatQuestion(dataToCatQuestions(cat.questions))
        setExamConfirmVisible(true);
    };


    // Timer for exam mode
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isExamMode && timeRemaining > 0 && !examSubmitted) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isExamMode, timeRemaining, examSubmitted]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await handleSubmitExam()
                await GetAllCompletedCATs()
            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setLoading(false);
            }
        };

        if (tabSwitchCount == 2) {
            fetchData();
        }

    }, [tabSwitchCount]);

    useEffect(() => {
        const handleBlur = () => {
            if (isExamMode) {
                setTabSwitchCount((prev) => prev + 1)
                setTabSwitchWarning(true);
                notification.warning({
                    message: "Tab Switch Detected",
                    description:
                        "Switching tabs during an examination is not allowed. This incident has been logged.",
                    duration: 0,
                });
            }
        };

        const handleBeforeUnload = (e) => {
            if (isExamMode) {
                handleSubmitExam()
                e.preventDefault();
                e.returnValue = "";
            }
        }


        window.addEventListener("blur", handleBlur);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.addEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isExamMode]);

    useEffect(() => {
        const ids = new Set(completedCATS.map((complete) => complete.code))

        const data = upcomingCATS.filter((cat) => ids.has(cat.code))
        setUpcomingCATS(data)
    }, [completedCATS]);

    return (
        <div className="p-0 sm:mt-10 lg:mt-0">
            {!isExamMode && <Box mt={{
                xs: 8, sm: 8, md: 0, lg: 0
            }}>
                <div className="p-6 flex justify-between items-center mb-6">
                    <Title level={4}>My Continuous Assessment Tests</Title>
                    <div className="flex gap-2">
                        <Input
                            prefix={<SearchOutlined/>}
                            placeholder="Search CATs"
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
                <div className={"px-6"}>
                    <Tabs

                        defaultActiveKey="upcoming"
                        className="bg-white rounded-lg shadow-md"
                    >
                        <TabPane tab="Upcoming CATs" key="upcoming" className={"p-2"}>
                            <Table
                                loading={loading}
                                scroll={{x: "max-content"}}
                                dataSource={upcomingCATS}
                                rowKey="id"
                                columns={[
                                    {
                                        title: "Title",
                                        dataIndex: "title",
                                        key: "title",
                                    },
                                    {
                                        title: "Scheduled Date",
                                        dataIndex: "scheduled_date",
                                        key: "dueDate",
                                    },
                                    {
                                        title: "Time Window",
                                        key: "timeWindow",
                                        render: (_, record) =>
                                            record.startTime && record.endTime
                                                ? formatTimeWindow(record.startTime, record.endTime)
                                                : "No time restriction",
                                    },
                                    {
                                        title: "Duration",
                                        key: "duration",
                                        render: (_, record) => record.duration || "1 hour",
                                    },
                                    {
                                        title: "Status",
                                        key: "availability",
                                        render: (_, record) => (
                                            <Tag color={isCatAvailable(record) ? "green" : "orange"}>
                                                {isCatAvailable(record) ? "Available Now" : "Not Available"}
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: "Actions",
                                        key: "actions",
                                        render: (_, record) => (
                                            <Button
                                                type="primary"
                                                onClick={() => handleConfirmStartExam(record)}
                                                disabled={!isCatAvailable(record)}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                {isCatAvailable(record) ? "Start CAT" : "Not Available"}
                                            </Button>
                                        ),
                                    },
                                ]}
                            />
                        </TabPane>
                        <TabPane tab="Completed CATs" key="completed">
                            <Table
                                loading={loading}
                                scroll={{x: "max-content"}}
                                dataSource={completedCATS}
                                rowKey="id"
                                columns={[
                                    {
                                        title: "Title",
                                        dataIndex: "title",
                                        key: "title",
                                    },
                                    {
                                        title: "Date Taken",
                                        dataIndex: "submited_date",
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
                                                View Results
                                            </Button>
                                        ),
                                    },
                                ]}
                            />
                        </TabPane>
                    </Tabs>
                </div>

            </Box>}

            {isExamMode &&
                <Box maxWidth={"100%"} mt={{
                    xs: 8, sm: 8, md: 0, lg: 0
                }}>
                    <div className="bg-gray-100">

                        <div>
                            <div
                                className="w-full flex-col sm:flex-row mt-4 bg-blue-700 text-white p-4 flex justify-between items-center z-10">
                                <div className="flex items-center">
                                    <ClockCircleOutlined className="text-xl mr-2"/>
                                    <Text strong className="text-white text-lg">
                                        Time Remaining: {formatTime(timeRemaining)}
                                    </Text>
                                </div>

                                <div className="flex items-center gap-4 sm:mt-5 xs:mt-5">
                                    <Text className="text-white">
                                        Tab Switches: {tabSwitchCount}/2
                                    </Text>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={handleSubmitExam}
                                        loading={examSubmissionLoading}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Submit Exam
                                    </Button>
                                </div>

                            </div>
                            <div className={"m-6"}>

                                <Alert
                                    message="Warning: Tab Switch Detected"
                                    description={`Switching tabs during an examination is not allowed. This incident has been logged. (${tabSwitchCount}/2)`}
                                    type="warning"
                                    showIcon
                                    closable
                                    className="mt-25 mx-auto max-w-4xl"
                                    onClose={() => setTabSwitchWarning(false)}
                                />
                            </div>

                            <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
                                <Card className="shadow-lg mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <Title level={4}>
                                            Question {currentQuestion + 1} of {cat_question.length}
                                        </Title>
                                        <Progress
                                            percent={Math.floor(((currentQuestion + 1) / cat_question.length) * 100)}
                                            steps={cat_question.length}
                                            strokeColor="#1890ff"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <Paragraph className="text-lg font-medium mb-4">
                                            {cat_question[currentQuestion].question}
                                        </Paragraph>

                                        {cat_question[currentQuestion].variant === "multiple_choice" && (
                                            <Radio.Group className="w-full">
                                                <Space direction="vertical" className="w-full">
                                                    {cat_question[currentQuestion].options?.map(
                                                        (option, index) => (
                                                            <Radio
                                                                key={index}
                                                                value={index}
                                                                className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                                                            >
                                                                {option}
                                                            </Radio>
                                                        ),
                                                    )}
                                                </Space>
                                            </Radio.Group>
                                        )}

                                        {cat_question[currentQuestion].variant === "essay" && (
                                            <Input.TextArea
                                                onChange={(e) => cat_question[currentQuestion].answer = e.target.value
                                                }
                                                rows={6}
                                                placeholder="Type your answer here..."
                                                className="w-full"
                                            />
                                        )}

                                        {cat_question[currentQuestion].variant === "code" && (
                                            <Input.TextArea
                                                rows={6}
                                                placeholder="Write your code here..."
                                                className="w-full font-mono"
                                            />
                                        )}
                                    </div>

                                    <div className="flex justify-between">
                                        <Button
                                            disabled={currentQuestion === 0}
                                            onClick={() => setCurrentQuestion((prev) => prev - 1)}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            type="primary"
                                            disabled={currentQuestion === cat_question.length - 1}
                                            onClick={() => setCurrentQuestion((prev) => prev + 1)}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </Card>

                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <Title level={5}>Question Navigation</Title>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {cat_question.map((_, index) => (
                                            <Button
                                                key={index}
                                                type={currentQuestion === index ? "primary" : "default"}
                                                onClick={() => setCurrentQuestion(index)}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-white p-4 shadow-lg flex justify-between items-center">
                                <Text>
                                    <WarningOutlined className="text-yellow-500 mr-2"/>
                                    Do not switch tabs or leave this page. Your exam will be automatically
                                    submitted.
                                </Text>
                                <Button
                                    loading={examSubmissionLoading}
                                    type="primary"
                                    danger
                                    onClick={handleSubmitExam}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Submit Exam
                                </Button>
                            </div>
                        </div>


                    </div>
                </Box>

            }

            <Modal
                title="Ready to Begin"
                open={examReadyVisible}
                onCancel={() => setExamReadyVisible(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setExamReadyVisible(false)}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="start"
                        type="primary"
                        onClick={handleStartExam}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Start Exam Now
                    </Button>,
                ]}
            >
                <Result
                    status="info"
                    title="Your exam is ready to begin"
                    subTitle="Once you start, the timer will begin counting down. Make sure you're prepared before proceeding."
                    extra={
                        <div className="text-center">
                            <Title level={3}>
                                <ClockCircleOutlined className="mr-2"/>
                                {selectedCat?.duration}
                            </Title>
                            <Text>Examination Duration</Text>
                        </div>
                    }
                />

                <Divider/>

                <div className="mb-4">
                    <Title level={5}>Examination Rules:</Title>
                    <ul className="list-disc pl-5">
                        <li>Do not refresh the page or close the browser window</li>
                        <li>Do not switch tabs or open other applications</li>
                        <li>
                            Your exam will be automatically submitted after 3 tab switches
                        </li>
                        <li>Answer all questions to the best of your ability</li>
                        <li>Submit your exam before the timer runs out</li>
                    </ul>
                </div>

                <Checkbox>
                    I understand and agree to follow the examination rules
                </Checkbox>
            </Modal>

            <Modal
                title="Start Examination"
                open={examConfirmVisible}
                onCancel={() => setExamConfirmVisible(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setExamConfirmVisible(false)}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="proceed"
                        type="primary"
                        onClick={handleProceedToExam}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Proceed
                    </Button>,
                ]}
            >
                <Alert
                    message="Important Information"
                    description="You are about to start your CAT. Please ensure you have a stable internet connection and will not be disturbed for the duration of the test."
                    type="info"
                    showIcon
                    className="mb-4"
                />

                <div className="mb-4">
                    <Title level={5}>{selectedCat?.title}</Title>
                    <Paragraph>{selectedCat?.description}</Paragraph>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Text strong>Duration:</Text>
                        <div>{selectedCat?.duration}</div>
                    </div>
                    <div>
                        <Text strong>Questions:</Text>
                        <div>{selectedCat?.questions?.length} questions</div>
                    </div>
                </div>

                {selectedCat?.startTime && selectedCat?.endTime && (
                    <div className="mb-4">
                        <Text strong>Available Time Window:</Text>
                        <div>
                            {formatTimeWindow(selectedCat.startTime, selectedCat.endTime)}
                        </div>
                    </div>
                )}

                <Alert
                    message="Warning"
                    description="Switching tabs or leaving the exam page is not allowed. Your exam will be automatically submitted after 3 tab switches."
                    type="warning"
                    showIcon
                />
            </Modal>
        </div>
    )
}
