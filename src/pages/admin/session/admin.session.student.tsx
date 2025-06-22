import React from 'react'
import {Button, Card, Table, Tabs, Typography} from "antd";

export default function AdminSessionStudent() {
    const {Title} = Typography
    const {TabPane} = Tabs;

    const reportedColumns = [
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
            title: "Report Date",
            dataIndex: "reportDate",
            key: "reportDate",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => `KES ${amount.toLocaleString()}`,
        },
    ];
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
    const reportedStudents = [
        {
            id: "STU2023002",
            name: "Alice Johnson",
            reportDate: "2025-06-15",
            amount: 45000,
        },
        {
            id: "STU2023003",
            name: "Robert Williams",
            reportDate: "2025-06-16",
            amount: 45000,
        },
        {
            id: "STU2023004",
            name: "Emily Davis",
            reportDate: "2025-06-17",
            amount: 45000,
        },
        {
            id: "STU2023005",
            name: "Michael Brown",
            reportDate: "2025-06-18",
            amount: 45000,
        },
        {
            id: "STU2023006",
            name: "Sarah Miller",
            reportDate: "2025-06-19",
            amount: 45000,
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
    return (
        <div>
            <Title level={3}>Students</Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Reported Students" key="1">
                    <Card className="shadow-sm">
                        <Table
                            dataSource={reportedStudents}
                            columns={reportedColumns}
                            pagination={{pageSize: 10}}
                        />
                    </Card>
                </TabPane>
                <TabPane tab="Pending Students" key="2">
                    <Card className="shadow-sm">
                        <Table
                            dataSource={pendingStudents}
                            columns={pendingColumns}
                            pagination={{pageSize: 10}}
                        />
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    )
}
