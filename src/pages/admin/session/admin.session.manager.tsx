import React, {useEffect, useState} from 'react'
import {Button, Card, DatePicker, Form, Input, message, Switch, Table, Tag, Typography} from "antd";
import moment from "moment/moment";
import useAxiosPrivate from 'src/service/useAxiosPrivate';
import {admin_crud_request} from "src/service/crud.service.ts";


export function getCurrentSemesterName(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed: Jan = 0

    let semester;

    if (month >= 0 && month <= 3) {
        semester = `January - April ${year}`;
    } else if (month >= 4 && month <= 7) {
        semester = `May - August ${year}`;
    } else {
        semester = `September - December ${year}`;
    }

    return semester;
}


export function getSemesterStartDate(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 = Jan, 11 = Dec

    let startMonth;

    if (month >= 0 && month <= 3) {
        // Semester 1: Jan - Apr
        startMonth = 0; // January
    } else if (month >= 4 && month <= 7) {
        // Semester 2: May - Aug
        startMonth = 4; // May
    } else {
        // Semester 3: Sep - Dec
        startMonth = 8; // September
    }


    return new Date(year, startMonth, 16);
}

export default function AdminSessionManager() {
    const {Title, Text} = Typography
    const hotAxiosPrivate = useAxiosPrivate();

    const deadlineDate = getSemesterStartDate();


    const [semester, setSemester] = useState({});

    const [isSessionFound, setSessionFound] = useState(false);
    const [remainingTime, setRemainingTime] = useState("");
    const [reportingStatus, setReportingStatus] = useState(false);
    const [currentDeadline, setCurrentDeadline] = useState(deadlineDate);
    const [notification, setNotification] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [tempDeadline, setTempDeadline] = useState(deadlineDate);


    const toggleReportingStatus = async (checked: boolean) => {
        setLoading(true)
        const data = await admin_crud_request.put_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            data: {
                status: checked ? "Open" : "Closed"
            }, url: `/admin/session/${semester._id}/toggle`
        })
        if (data.success) {
            setLoading(false)
            setReportingStatus(checked);
            message.success(`Reporting ${checked ? "opened" : "closed"} successfully`);
        }


    };


    const handleUpdateSession = async () => {
        if (tempDeadline) {
            setLoading(true)
            const data = await admin_crud_request.put_spc({
                hotAxiosPrivate: hotAxiosPrivate,
                data: {
                    currentDeadline: tempDeadline
                }, url: `/admin/session/${semester._id}/update-deadline`
            })

            if (data.success) {
                setSemester(data.data)
                message.success("Deadline updated successfully");
            }

            setLoading(false)
        }

    }
    const handleCreateSession = async () => {
        const sessionData = {
            status: "Open",
            currentSemester: getCurrentSemesterName(),
            currentDeadline: getSemesterStartDate(),
            notificationMessage: notification
        }

        const data = await admin_crud_request.post_spc({
            data: sessionData, hotAxiosPrivate, url: "/admin/session/create"
        })

        if (data.success) {
            setSemester(data.data)
        }
        await getSemester()
    }

    const getSemester = async () => {
        const data = await admin_crud_request.get_spc({
            url: `/admin/session/get?session=${getCurrentSemesterName()}`,
            hotAxiosPrivate: hotAxiosPrivate
        })


        if (data.success) {
            setSessionFound(true);
            setReportingStatus(true)
            setSemester(data.data)

        } else {
            setSessionFound(false)
        }

    }
    useEffect(() => {

        getSemester()
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
        <div>
            <Title level={3}>Session Management</Title>
            <Card className="shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Title level={5}>Current Session Status</Title>
                        <div className="flex items-center mb-4">
                            <Text strong className="mr-4">
                                Reporting Status:
                            </Text>
                            <Switch
                                loading={loading}
                                checked={reportingStatus}
                                onChange={toggleReportingStatus}
                                checkedChildren="Open"
                                unCheckedChildren="Closed"
                            />
                        </div>
                        <div className="mb-4">
                            <Text strong className="mr-4">
                                Current Semester:
                            </Text>
                            <Tag color="navy" className="text-base px-3 py-1">
                                {getCurrentSemesterName()}
                            </Tag>
                        </div>
                        <div className="mb-4">
                            <Text strong className="mr-4">
                                Current Deadline:
                            </Text>
                            <Tag color="blue" className="text-base px-3 py-1">
                                {currentDeadline.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Tag>
                        </div>
                        <div className="mb-4">
                            <Text strong className="mr-4">
                                Time Remaining:
                            </Text>
                            <Tag color="green" className="text-base px-3 py-1">
                                {remainingTime}
                            </Tag>
                        </div>
                    </div>
                    <div>
                        <Title level={5}>Modify Deadline</Title>
                        <Form layout="vertical">
                            <Form.Item label="New Deadline Date" required>
                                <DatePicker
                                    onChange={(e) => setTempDeadline(new Date(e))}
                                    defaultValue={moment(currentDeadline)}
                                    format="YYYY-MM-DD"
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item label="Notification Message">
                                <Input.TextArea
                                    onChange={(e) => setNotification(e.target.value)
                                    }

                                    placeholder="Optional message to notify students about the deadline change"
                                    rows={3}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => {
                                        if (isSessionFound) {
                                            handleUpdateSession()
                                        } else {
                                            handleCreateSession()
                                        }
                                    }}
                                    type="primary"
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    {isSessionFound ? "Save Changes" : "Open Session"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card>
            <Card title="Session History" className="shadow-sm">
                <Table
                    dataSource={[
                        {
                            id: 1,
                            semester: "Spring 2025",
                            startDate: "2025-01-10",
                            endDate: "2025-01-25",
                            status: "Closed",
                            reportedCount: 120,
                        },
                        {
                            id: 2,
                            semester: "Fall 2024",
                            startDate: "2024-08-15",
                            endDate: "2024-08-30",
                            status: "Closed",
                            reportedCount: 115,
                        },
                        {
                            id: 3,
                            semester: "Spring 2024",
                            startDate: "2024-01-12",
                            endDate: "2024-01-27",
                            status: "Closed",
                            reportedCount: 110,
                        },
                    ]}
                    columns={[
                        {
                            title: "Semester",
                            dataIndex: "semester",
                            key: "semester",
                        },
                        {
                            title: "Start Date",
                            dataIndex: "startDate",
                            key: "startDate",
                        },
                        {title: "End Date", dataIndex: "endDate", key: "endDate"},
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (status: string) => (
                                <Tag color={status === "Open" ? "green" : "red"}>
                                    {status}
                                </Tag>
                            ),
                        },
                        {
                            title: "Reported Students",
                            dataIndex: "reportedCount",
                            key: "reportedCount",
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: () => (
                                <Button
                                    type="link"
                                    size="small"
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    View Details
                                </Button>
                            ),
                        },
                    ]}
                    pagination={{pageSize: 5}}
                />
            </Card>
        </div>
    )
}
