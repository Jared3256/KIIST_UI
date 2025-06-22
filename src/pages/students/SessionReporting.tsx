import React, {useEffect, useState} from 'react'
import {Avatar, Badge, Button, Card, Divider, Layout, message, Modal, Space, Statistic, Tag, Typography} from "antd";
import {
    BellOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    LogoutOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth} from "src/redux/auth/selectors.ts";
import {selectFinance} from 'src/redux/finance/selectors';
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {admin_crud_request} from 'src/service/crud.service';
import {GetFinance} from "src/redux/finance/actions.ts";

export default function SessionReporting() {
    const {Content} = Layout;
    const {Title, Text, Paragraph} = Typography
    const currentSemester = getCurrentSemesterName();
    const deadlineDate = new Date("2025-07-22");
    const currentDate = new Date("2025-06-20");
    const {current} = useSelector(selectAuth)
    const dispatch = useDispatch()
    const {currentFinance} = useSelector(selectFinance)
    const [semesterReporting, setSemesterReporting] = useState({})

    const studentData = {
        id: "STU2023001",
        name: "John Smith",
        course: "Bachelor of Computer Science",
        year: 3,
        previousBalance: 12500,
        currentFees: 45000,
        totalPayable: 57500,
        isReported: false,
    };

    const hotAxiosPrivate = useAxiosPrivate();
    const [semester, setSemester] = useState({});
    const [isSessionFound, setSessionFound] = useState(false);
    const [showReportConfirm, setShowReportConfirm] = useState(false);
    const [reportingStatus, setReportingStatus] = useState(false);
    const [remainingTime, setRemainingTime] = useState("");
    const [currentDeadline, setCurrentDeadline] = useState(deadlineDate);


    const confirmReporting = async () => {
        const studentId = current.UserInfo.entity._id

        const data = await admin_crud_request.post_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            data: {
                currentSemester: semester._id
            },
            url: `/student/${studentId}/session/reporting`,
        })

        if (data.success) {

            setSemesterReporting(data.data)
            message.success(
                "Successfully reported for the semester. Your account has been debited.",
            );
        }

        if (data.data.reported) {
            setSemesterReporting(data.data)
            message.info(
                "You have already reported for the semester",
            );
        }

        setShowReportConfirm(false);
        // In a real app, we would update the student data here
    };

    const handleReportSession = () => {
        setShowReportConfirm(true);
    };

    const checkFinanceStatus = async () => {

        if (current.UserInfo) {
            dispatch(GetFinance({
                role: current.UserInfo.role,
                id: current.UserInfo.entity._id,
                hotAxiosPrivate: hotAxiosPrivate,
                entity: "finance"
            }))
        }
    }
    const getSemester = async () => {
        const data = await admin_crud_request.get_spc({
            url: `/admin/session/get?session=${getCurrentSemesterName()}`,
            hotAxiosPrivate: hotAxiosPrivate
        })

        console.log(data)

        if (data.success) {
            setSessionFound(true);
            setReportingStatus(true)
            setSemester(data.data)

        } else {
            setSessionFound(false)
        }

    }
    /**
     * Use the details of the currently logged in student
     * and Finance details fom the global state
     */

    const level = current.UserInfo.entity.programSelection.level
    let semesterFee = 0
    if (level === "DIP") {
        semesterFee = 20000
    } else {
        semesterFee = 18000
    }


    const getStudentInfo = async () => {
        try {
            const data = await admin_crud_request.get_spc({
                hotAxiosPrivate: hotAxiosPrivate,
                url: `/student/${current.UserInfo.entity._id}/session/get?session=${getCurrentSemesterName()}`,
            })

            if (data.success) {
                setSemesterReporting(data.data)
            }
        } catch (e) {
            console.log(e)

        }
    }
    useEffect(() => {
        const systemChecker = async () => {
            await getSemester()
            await getStudentInfo()
            await checkFinanceStatus()

        }

        systemChecker()
    }, []);

    useEffect(() => {
        let result = (semester.status)


        if (semester.status) {
            if (result === "Open") {
                setReportingStatus(true)
            } else {
                setReportingStatus(false)
            }

            setCurrentDeadline(new Date(semester.currentDeadline))
        }


    }, [semester]);
    useEffect(() => {

        const timer = setInterval(() => {
            const now = new Date();
            const diff = currentDeadline.getTime() - now.getTime();
            if (diff <= 0) {
                setRemainingTime("Deadline passed");
                clearInterval(timer);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                );
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [currentDeadline]);
    return (
        <Layout className="min-h-screen">

            <Content className="p-6  gap-2 bg-gray-50 sm:mt-6 xs:mt-6">
                <div className="max-w-5xl mx-auto">
                    <Card className="mb-6 shadow-md mb-4">
                        <div className="text-center mb-4">
                            <Title level={4}>Welcome to {currentSemester} Semester</Title>
                            <Paragraph>
                                Session reporting is currently
                                <Tag
                                    color={reportingStatus ? "success" : "error"}
                                    className="mx-2 text-base px-3 py-1 ml-4"
                                >
                                    {reportingStatus ? "OPEN" : "CLOSED"}
                                </Tag>
                            </Paragraph>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-center">
                            <Title level={4}>
                                <ClockCircleOutlined className="mr-2"/>
                                Time Remaining Until Deadline
                            </Title>
                            {reportingStatus && <div className="text-3xl font-bold text-blue-700 my-2">
                                {remainingTime}
                            </div>}

                            <Text type="secondary">
                                Deadline:{" "}
                                {currentDeadline.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Text>
                        </div>
                        <div className="text-center mb-8">
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleReportSession}
                                disabled={!reportingStatus || currentDeadline < currentDate || semesterReporting.reported}
                                icon={<CheckCircleOutlined/>}
                                className="h-16 text-lg px-8 !rounded-button whitespace-nowrap cursor-pointer"
                            >
                                {semesterReporting.reported ? "You have reported for the semester" : `Report for ${currentSemester} Session `}
                            </Button>
                            {!reportingStatus && (
                                <div className="mt-2 text-red-500">
                                    <ExclamationCircleOutlined/> Reporting is currently closed by
                                    administration
                                </div>
                            )}
                            {currentDeadline < currentDate && (
                                <div className="mt-2 text-red-500">
                                    <ExclamationCircleOutlined/> Reporting deadline has passed
                                </div>
                            )}
                        </div>
                        <Divider/>
                        <Title level={4}>Fee Summary</Title>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-gray-50">
                                <Statistic
                                    title="Current Semester Fee"
                                    value={semesterFee}
                                    prefix="KES "
                                    precision={2}
                                />
                            </Card>
                            <Card className="bg-gray-50">
                                <Statistic
                                    title="Previous Balance"
                                    value={currentFinance.total_fee - currentFinance.amount_paid}
                                    prefix="KES "
                                    precision={2}
                                    valueStyle={{
                                        color:
                                            studentData.previousBalance > 0 ? "#cf1322" : "#3f8600",
                                    }}
                                />
                            </Card>
                            <Card className="bg-gray-50">
                                <Statistic
                                    title="Total Payable"
                                    value={semesterReporting.reported ? currentFinance.total_fee - currentFinance.amount_paid : semesterFee + currentFinance.total_fee - currentFinance.amount_paid}
                                    prefix="KES "
                                    precision={2}
                                    valueStyle={{color: "#1677ff", fontWeight: "bold"}}
                                />
                            </Card>
                        </div>
                    </Card>
                    <Card title="Student Information" className="shadow-md sm:mt-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>

                                <p>
                                    <strong>Reporting Status:</strong>{"   "}
                                    {semesterReporting.reported ? (
                                        <Tag color="success">Reported</Tag>
                                    ) : (
                                        <Tag color="warning">Not Reported</Tag>
                                    )}
                                </p>

                            </div>
                        </div>
                    </Card>
                </div>
            </Content>

            <Modal
                title="Confirm Session Reporting"
                open={showReportConfirm}
                onOk={confirmReporting}
                onCancel={() => setShowReportConfirm(false)}
                okText="Confirm Reporting"
                cancelText="Cancel"
            >
                <div className="py-4">
                    <p className="mb-4">
                        You are about to report for the {currentSemester} semester. This
                        action will:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Mark you as present for the current semester</li>
                        <li>
                            Debit your account with KES{" "}
                            {semesterFee.toLocaleString()}
                        </li>
                        <li>Generate your semester timetable</li>
                    </ul>
                    <p className="font-bold">
                        This action cannot be undone. Do you wish to continue?
                    </p>
                </div>
            </Modal>
        </Layout>
    )
}
