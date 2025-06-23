import React, {useEffect, useState} from 'react'
import {Button, Card, Divider, Form, Input, message, Modal, Table, Tag, Typography} from "antd";
import {ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {admin_crud_request} from "src/service/crud.service.ts";
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";
import {dataToNotReportingHistory, dataToReportingHistory, dataToStudentOverride} from "src/modules/Data.format.ts";
import {useSelector} from 'react-redux';
import {selectAuth} from 'src/redux/auth/selectors';
import useAxiosPrivate from 'src/service/useAxiosPrivate';

export default function AdminSessionStudentOverride() {
    const {Title, Text} = Typography
    const {current} = useSelector(selectAuth)
    const [loading, setLoading] = useState(false)
    const [pendingStudents, setpendingStudents] = useState([])
    const [overridenStudent, setOverridenStudent] = useState([])
    const pendingColumns = [
        {
            title: "ID",
            dataIndex: "regNumber",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Course",
            dataIndex: "course",
            key: "course",
        },

        {
            title: "Action",
            key: "action",
            render: (text: string, record: any) => (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        setSelectedStudent(record);
                        setShowOverrideModal(true);
                    }}
                    className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                    Manual Report
                </Button>
            ),
        },
    ];
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showOverrideModal, setShowOverrideModal] = useState(false);
    const [overrideReason, setOverrideReason] = useState("");
    const hotAxiosPrivate = useAxiosPrivate()

    const confirmManualReport = async () => {
        if (!overrideReason.trim()) {
            message.error("Please provide a reason for manual reporting");
            return;
        }

        try {
            const req_data = {
                currentSemester: getCurrentSemesterName(),
                regNumber: selectedStudent.regNumber,
                name: selectedStudent.name,
                reason: overrideReason
            }

            const data = await admin_crud_request.post_spc({
                hotAxiosPrivate: hotAxiosPrivate,
                data: req_data,
                url: `/admin/${selectedStudent.id}/session/student/override`
            })


            if (data.success) {
                message.success(
                    `Student ${selectedStudent.name} has been manually reported for the semester`,
                );
                await systemChecker()

            }
        } catch (e) {

        }


        setShowOverrideModal(false);
        setOverrideReason("");
        setSelectedStudent(null);
        setSearchQuery("");
    };
    const searchStudent = () => {
        // In a real app, this would search the database
        const student = pendingStudents.find(
            (s) =>
                s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        if (student) {
            setSelectedStudent(student);
        } else {
            message.error("Student not found");
            setSelectedStudent(null);
        }
    };

    const handleManualReport = () => {
        if (selectedStudent) {
            setShowOverrideModal(true);
        } else {
            message.error("Please select a student first");
        }
    };

    const getStudent = async (status) => {
        try {
            const data = await admin_crud_request.get_spc({
                url: `/admin/${current.UserInfo.id}/session/reporting-history?status=${status}&semester=${getCurrentSemesterName()}`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success && status === "not reported") {
                setpendingStudents(dataToNotReportingHistory(data.data))

            }

        } catch (e) {

        }
    }

    const getOverridenSession = async () => {
        try {
            const data = await admin_crud_request.get_spc({
                url: `/admin/session/override/list?semester=${getCurrentSemesterName()}`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success) {
                setOverridenStudent(dataToStudentOverride(data.data))
            }
        } catch (e) {
            
        }
    }

    const systemChecker = async () => {
        setLoading(true)
        await getStudent("not reported")
        await getOverridenSession()
        setLoading(false)
    }

    useEffect(() => {
        systemChecker()
    }, []);
    return (
        <div>
            <Title level={3}>Student Reporting Override</Title>
            <Card className="shadow-sm mb-6">
                <div className="flex items-center mb-4">
                    <Input
                        placeholder="Search student by ID or name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{width: "300px"}}
                        className="mr-2"
                    />
                    <Button
                        type="primary"
                        onClick={searchStudent}
                        icon={<SearchOutlined/>}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Search
                    </Button>
                </div>
                {selectedStudent && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <Title level={5}>Selected Student</Title>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Text strong>ID:</Text> {selectedStudent.regNumber}
                            </div>
                            <div>
                                <Text strong>Name:</Text> {selectedStudent.name}
                            </div>
                            <div>
                                <Text strong>Course:</Text> {selectedStudent.course}
                            </div>
                            <div>
                                <Text strong>Year:</Text> {new Date().getUTCFullYear()}
                            </div>
                            <div>
                                <Text strong>Status:</Text>{" "}
                                <Tag color="warning">Not Reported</Tag>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={handleManualReport}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Manual Report
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                <Divider/>
                <Title level={5}>Students Pending Reporting</Title>
                <Table
                    loading={loading}
                    dataSource={pendingStudents}
                    columns={pendingColumns}
                    pagination={{pageSize: 5}}
                    rowKey="id"
                />
            </Card>
            <Card title="Recently Overridden Students" className="shadow-sm">
                <Table
                    loading={loading}

                    dataSource={overridenStudent}
                    columns={[
                        {title: "Student ID", dataIndex: "id", key: "id"},
                        {title: "Name", dataIndex: "name", key: "name"},
                        {title: "Override Date", dataIndex: "overrideDate", key: "date"},
                        {title: "Reason", dataIndex: "reason", key: "reason"},
                        {title: "Processed By", dataIndex: "processedBy", key: "by"},
                    ]}
                    pagination={{pageSize: 5}}
                />
            </Card>

            <Modal
                title="Manual Student Reporting"
                open={showOverrideModal}
                onOk={confirmManualReport}
                onCancel={() => {
                    setShowOverrideModal(false);
                    setOverrideReason("");
                }}
                okText="Confirm Reporting"
                cancelText="Cancel"
            >
                {selectedStudent && (
                    <div className="py-4">
                        <p className="mb-4">You are about to manually report student:</p>
                        <p>
                            <strong>ID:</strong> {selectedStudent.regNumber}
                        </p>
                        <p>
                            <strong>Name:</strong> {selectedStudent.name}
                        </p>
                        <p>
                            <strong>Course:</strong> {selectedStudent.course}
                        </p>
                        <Divider/>
                        <Form.Item
                            label="Reason for Override"
                            required
                            help="Please provide a valid reason for this manual reporting"
                        >
                            <Input.TextArea
                                rows={4}
                                value={overrideReason}
                                onChange={(e) => setOverrideReason(e.target.value)}
                                placeholder="E.g., Student had technical issues, Student was hospitalized, etc."
                            />
                        </Form.Item>
                        <div className="text-red-500 text-sm">
                            <ExclamationCircleOutlined className="mr-1"/>
                            This action will be logged in the system audit trail
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}
