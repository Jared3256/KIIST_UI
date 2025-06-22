import React, {useState} from 'react'
import {Button, Card, Divider, Form, Input, message, Modal, Table, Tag, Typography} from "antd";
import {ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons";

export default function AdminSessionStudentOverride() {
    const {Title, Text} = Typography

    const pendingColumns = [
        {
            title: "ID",
            dataIndex: "id",
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
            title: "Year",
            dataIndex: "year",
            key: "year",
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
    const pendingStudents = [
        {
            id: "STU2023001",
            name: "John Smith",
            course: "Bachelor of Computer Science",
            year: 3,
        },
        {
            id: "STU2023007",
            name: "David Wilson",
            course: "Bachelor of Business Administration",
            year: 2,
        },
        {
            id: "STU2023008",
            name: "Jennifer Lee",
            course: "Bachelor of Education",
            year: 4,
        },
        {
            id: "STU2023009",
            name: "Thomas Anderson",
            course: "Bachelor of Engineering",
            year: 1,
        },
        {
            id: "STU2023010",
            name: "Jessica Taylor",
            course: "Bachelor of Arts",
            year: 3,
        },
    ];
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showOverrideModal, setShowOverrideModal] = useState(false);
    const [overrideReason, setOverrideReason] = useState("");

    const confirmManualReport = () => {
        if (!overrideReason.trim()) {
            message.error("Please provide a reason for manual reporting");
            return;
        }
        message.success(
            `Student ${selectedStudent.name} has been manually reported for the semester`,
        );
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
                                <Text strong>ID:</Text> {selectedStudent.id}
                            </div>
                            <div>
                                <Text strong>Name:</Text> {selectedStudent.name}
                            </div>
                            <div>
                                <Text strong>Course:</Text> {selectedStudent.course}
                            </div>
                            <div>
                                <Text strong>Year:</Text> {selectedStudent.year}
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
                    dataSource={pendingStudents}
                    columns={pendingColumns}
                    pagination={{pageSize: 5}}
                    rowKey="id"
                />
            </Card>
            <Card title="Recently Overridden Students" className="shadow-sm">
                <Table
                    dataSource={[
                        {
                            id: "STU2023011",
                            name: "James Wilson",
                            date: "2025-06-15",
                            reason: "Technical issues during reporting period",
                            by: "Admin",
                        },
                        {
                            id: "STU2023012",
                            name: "Mary Johnson",
                            date: "2025-06-14",
                            reason: "Student was hospitalized",
                            by: "Admin",
                        },
                    ]}
                    columns={[
                        {title: "Student ID", dataIndex: "id", key: "id"},
                        {title: "Name", dataIndex: "name", key: "name"},
                        {title: "Override Date", dataIndex: "date", key: "date"},
                        {title: "Reason", dataIndex: "reason", key: "reason"},
                        {title: "Processed By", dataIndex: "by", key: "by"},
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
                            <strong>ID:</strong> {selectedStudent.id}
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
