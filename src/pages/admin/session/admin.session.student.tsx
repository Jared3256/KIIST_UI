import React, {useEffect, useState} from 'react'
import {Button, Card, Table, Tabs, Typography} from "antd";
import {admin_crud_request} from "src/service/crud.service.ts";
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";
import useAxiosPrivate from 'src/service/useAxiosPrivate';
import {useSelector} from 'react-redux';
import {selectAuth} from 'src/redux/auth/selectors';
import {dataToNotReportingHistory, dataToReportingHistory} from "src/modules/Data.format.ts";

export default function AdminSessionStudent() {
    const hotAxiosPrivate = useAxiosPrivate()
    const {current} = useSelector(selectAuth)
    const {Title} = Typography
    const {TabPane} = Tabs;
    const [loading, setLoading] = useState(false)


    const reportedColumns = [
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
        // {
        //     title: "Year",
        //     dataIndex: "year",
        //     key: "year",
        // },
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

    const [reportedStudent, setReportedStudents] = useState([])
    const [pendingStudents, setpendingStudents] = useState([])

    const getStudent = async (status) => {
        try {
            const data = await admin_crud_request.get_spc({
                url: `/admin/${current.UserInfo.id}/session/reporting-history?status=${status}&semester=${getCurrentSemesterName()}`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success && status === "reported") {
                setReportedStudents(dataToReportingHistory(data.data))


            }
            if (data.success && status === "not reported") {
                setpendingStudents(dataToNotReportingHistory(data.data))

            }

        } catch (e) {

        }
    }

    useEffect(() => {
        const systemChecker = async () => {
            setLoading(true)
            await getStudent("reported")
            await getStudent("not reported")
            setLoading(false)
        }

        systemChecker()
    }, []);
    return (
        <div>
            <Title level={3}>Students</Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Reported Students" key="1">
                    <Card className="shadow-sm">
                        <Table
                            loading={loading}
                            dataSource={reportedStudent}
                            columns={reportedColumns}
                            pagination={{pageSize: 10}}
                        />
                    </Card>
                </TabPane>
                <TabPane tab="Pending Students" key="2">
                    <Card className="shadow-sm">
                        <Table
                            loading={loading}
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
