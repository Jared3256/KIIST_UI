import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DollarOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    MailOutlined,
    SearchOutlined, UploadOutlined
} from "@ant-design/icons";
import {
    Badge,
    Typography,
    Button,
    Card,
    Input,
    Layout,
    Table,
    Tabs,
    Modal,
    Select,
    Tag,
    Space,
    Form,
    notification, DatePicker, Progress, Upload
} from "antd"
import {useState, useEffect} from "react";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToPaymentHistory, dataToStudentFinanceInfo} from "src/modules/Data.format.ts";


// Mock data for demonstration
// const students = [
//     {
//         id: "KST001",
//         name: "John Doe",
//         course: "Computer Science",
//         year: 3,
//         balance: 65000,
//         status: "Critical",
//     },
//     {
//         id: "KST002",
//         name: "Jane Smith",
//         course: "Business Administration",
//         year: 2,
//         balance: 25000,
//         status: "Pending",
//     },
//     {
//         id: "KST003",
//         name: "Michael Johnson",
//         course: "Engineering",
//         year: 4,
//         balance: 10000,
//         status: "Good",
//     },
//     {
//         id: "KST004",
//         name: "Sarah Williams",
//         course: "Medicine",
//         year: 1,
//         balance: 55000,
//         status: "Critical",
//     },
//     {
//         id: "KST005",
//         name: "Robert Brown",
//         course: "Education",
//         year: 3,
//         balance: 30000,
//         status: "Pending",
//     },
//     {
//         id: "KST006",
//         name: "Emily Davis",
//         course: "Computer Science",
//         year: 2,
//         balance: 5000,
//         status: "Good",
//     },
//     {
//         id: "KST007",
//         name: "David Wilson",
//         course: "Business Administration",
//         year: 4,
//         balance: 60000,
//         status: "Critical",
//     },
//     {
//         id: "KST008",
//         name: "Jessica Taylor",
//         course: "Engineering",
//         year: 1,
//         balance: 20000,
//         status: "Pending",
//     },
// ];

// const paymentHistory = [
//     {
//         id: 1,
//         studentId: "KST001",
//         amount: 25000,
//         date: "2025-06-20",
//         method: "Bank Deposit",
//         reference: "REF123456",
//     },
//     {
//         id: 2,
//         studentId: "KST002",
//         amount: 30000,
//         date: "2025-06-15",
//         method: "Cheque",
//         reference: "CHQ789012",
//     },
//     {
//         id: 3,
//         studentId: "KST003",
//         amount: 40000,
//         date: "2025-06-10",
//         method: "Bank Deposit",
//         reference: "REF345678",
//     },
//     {
//         id: 4,
//         studentId: "KST004",
//         amount: 15000,
//         date: "2025-06-05",
//         method: "Cheque",
//         reference: "CHQ901234",
//     },
//     {
//         id: 5,
//         studentId: "KST005",
//         amount: 20000,
//         date: "2025-05-30",
//         method: "Bank Deposit",
//         reference: "REF567890",
//     },
// ];

function AdminStudentFinanceManagement() {
    const courses = [
        "Computer Science",
        "Business Administration",
        "Engineering",
        "Medicine",
        "Education",
    ];
    const {Option} = Select
    const years = [1, 2, 3, 4];
    const hotAxiosPrivate = useAxiosPrivate()
    const statuses = ["Good", "Pending", "Critical"];
    const [form] = Form.useForm();
    const {Text, Title} = Typography
    const [paymentHistory, setPaymentHistory] = useState([])
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const {Content} = Layout,
        [activeTab, setActiveTab] = useState("1"),
        [searchText, setSearchText] = useState(""),
        [filters, setFilters] = useState({course: "", year: "", status: ""}),
        {TabPane} = Tabs,
        columns = [{
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
                title: "Department",
                dataIndex: "course",
                key: "course",
            },

            {
                title: "Balance (KSh)",
                dataIndex: "balance",
                key: "balance",
                render: (balance: number) => (
                    <Text
                        strong
                        style={{
                            color:
                                balance > 10000
                                    ? "#f5222d"
                                    : balance > 75000
                                        ? "#faad14"
                                        : "#52c41a",
                        }}
                    >
                        {balance.toLocaleString()}
                    </Text>
                ),
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => {
                    let color = "";
                    let icon = null;

                    if (status === "Good") {
                        color = "success";
                        icon = <CheckCircleOutlined/>;
                    } else if (status === "Pending") {
                        color = "warning";
                        icon = <ExclamationCircleOutlined/>;
                    } else if (status === "Critical") {
                        color = "error";
                        icon = <CloseCircleOutlined/>;
                    }

                    return (
                        <Tag color={color} icon={icon}>
                            {status}
                        </Tag>
                    );
                },
            },
            {
                title: "Actions",
                key: "actions",
                render: (_: any, record: any) => (
                    <Space>
                        <Button
                            type="primary"
                            size="small"
                            icon={<DollarOutlined/>}
                            onClick={() => showPaymentModal(record)}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Record Payment
                        </Button>
                        {record.balance > 10000 && (
                            <Button
                                type="default"
                                size="small"
                                icon={<MailOutlined/>}
                                onClick={() => sendNotification(record)}
                                className="!rounded-button whitespace-nowrap"
                            >
                                Send Reminder
                            </Button>
                        )}
                    </Space>
                ),
            },],
        handleSearch = (value: string) => {
            setSearchText(value);
        },
        downloadReport = (type: string) => {
            notification.success({
                message: "Report Downloaded",
                description: `${type} report has been downloaded successfully.`,
                placement: "topRight",
            });
        };
    const [students, setStudent] = useState([])
    const [filteredStudents, setFilteredStudents] = useState(students);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const handleFilterChange = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const clearFilters = () => {
        setFilters({course: "", year: "", status: ""});
        setFilterModalVisible(false);
    };

    const showPaymentModal = (student: any) => {
        setSelectedStudent(student);
        setPaymentModalVisible(true);
        form.resetFields();
    };

    const sendNotification = (student: any) => {
        notification.success({
            message: "Notification Sent",
            description: `Balance reminder sent to ${student.name} (${student.id}).`,
            placement: "topRight",
        });
    };
    const handlePaymentSubmit = async (values: any) => {

        setPaymentLoading(true)
        const req_data = {
            ...values, studentId: students.filter((std) => std.regNumber === values.studentId)[0].studentId
        }

        try {
            const data = await admin_crud_request.post_spc({
                data: req_data,
                hotAxiosPrivate: hotAxiosPrivate,
                url: "/admin/student/finance/payment/create"
            })

            if (data.success) {

                notification.success({
                    message: "Payment Recorded",
                    description: `Successfully recorded payment of ${values.amount} for ${selectedStudent.name}.`,
                    placement: "topRight",
                });
                await systemChecker()
            }
        } catch (e) {
            console.log(e)
        } finally {
            setPaymentModalVisible(false);
            setPaymentLoading(false);
        }
    };

    const GetEntity = async (info) => {
        try {
            if (info === "info") {
                const data = await admin_crud_request.get_spc({
                    url: `admin/student/finance/info/list`,
                    hotAxiosPrivate: hotAxiosPrivate
                })

                if (data.success) {
                    setStudent(dataToStudentFinanceInfo(data.data))
                    setFilteredStudents(dataToStudentFinanceInfo(data.data))
                }
            } else {
                const data = await admin_crud_request.get_spc({
                    url: `admin/student/finance/history/list`,
                    hotAxiosPrivate: hotAxiosPrivate
                })

                if (data.success) {
                    setPaymentHistory(dataToPaymentHistory(data.data))
                }
            }


        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {

        // Filter students based on search text and filters
        const filtered = students.filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                student.regNumber.toLowerCase().includes(searchText.toLowerCase())

            const matchesStatus = filters.status
                ? student.status === filters.status
                : true;

            return matchesSearch && matchesStatus;
        });

        setFilteredStudents(filtered);
    }, [searchText, filters]);
    const systemChecker = async () => {
        setLoading(true)
        await GetEntity("info")
        await GetEntity("history")
        setLoading(false)
    }
    useEffect(() => {
        systemChecker()
    }, []);
    return <Content>
        <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="bg-white rounded-lg shadow-sm p-4"
        >
            <TabPane tab="Student Fee Management" key="1">
                <div className="mb-6 px-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-grow max-w-md">
                        <Input placeholder="Search by ID, name or course..." value={searchText}
                               prefix={<SearchOutlined className={"text-gray-400"}/>}
                               onChange={(e) => handleSearch(e.target.value)} allowClear className="rounded-lg"/>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setFilterModalVisible(true)}
                            icon={<i className="fas fa-filter mr-1"></i>}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Filters
                            {(filters.course || filters.year || filters.status) && (
                                <Badge
                                    count={Object.values(filters).filter(Boolean).length}
                                    offset={[5, -5]}
                                />
                            )}
                        </Button>

                        <Button
                            type="primary"
                            icon={<DownloadOutlined/>}
                            onClick={() => downloadReport("Student Fee Status")}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Export List
                        </Button>
                    </div>

                </div>


                <Card bordered={false} className="shadow-sm">
                    <Table dataSource={filteredStudents}
                           loading={loading}
                           columns={columns}
                           rowKey={"studentId"}
                           pagination={{pageSize: 10}}
                           scroll={{x: "max-content"}}
                           expandable={{
                               expandedRowRender: (record) => (
                                   <div className="p-4">
                                       <Title level={5}>Payment History</Title>
                                       <Table
                                           dataSource={paymentHistory.filter(
                                               (p) => p.studentId === record.studentId,
                                           )}
                                           columns={[
                                               {title: "Date", dataIndex: "date", key: "date"},
                                               {
                                                   title: "Amount (KSh)",
                                                   dataIndex: "amount",
                                                   key: "amount",
                                                   render: (amount: number) =>
                                                       amount.toLocaleString(),
                                               },
                                               {
                                                   title: "Method",
                                                   dataIndex: "method",
                                                   key: "method",
                                               }, {
                                                   title: "Status",
                                                   dataIndex: "status",
                                                   key: "status", render: (status: string) => {
                                                       let color = "";
                                                       let icon = null;

                                                       if (status === "completed") {
                                                           color = "success";
                                                           icon = <CheckCircleOutlined/>;
                                                       } else if (status === "pending") {
                                                           color = "warning";
                                                           icon = <ExclamationCircleOutlined/>;
                                                       } else if (status === "cancelled") {
                                                           color = "error";
                                                           icon = <CloseCircleOutlined/>;
                                                       }

                                                       return (
                                                           <Tag color={color} icon={icon}>
                                                               {status}
                                                           </Tag>
                                                       );
                                                   },
                                               },
                                               {
                                                   title: "Reference",
                                                   dataIndex: "id",
                                                   key: "reference",
                                               },
                                           ]}
                                           pagination={{pageSize: 5}}
                                           size="small"
                                           rowKey="key"
                                           scroll={{x: "max-content"}}
                                       />

                                       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                           <div>
                                               <Title level={5}>Payment Summary</Title>
                                               <div className="bg-gray-50 p-4 rounded-lg">
                                                   <div className="flex justify-between mb-2">
                                                       <Text>Total Fee:</Text>
                                                       <Text strong>{record.total_fee.toLocaleString()} KSh</Text>
                                                   </div>
                                                   <div className="flex justify-between mb-2">
                                                       <Text>Total Paid:</Text>
                                                       <Text strong className="text-green-600">
                                                           {(record.amount_paid).toLocaleString()}{" "}
                                                           KSh
                                                       </Text>
                                                   </div>
                                                   <div className="flex justify-between mb-2">
                                                       <Text>Outstanding Balance:</Text>
                                                       <Text strong className="text-red-600">
                                                           {record.balance.toLocaleString()} KSh
                                                       </Text>
                                                   </div>

                                               </div>
                                           </div>

                                           <div>

                                               <div className="bg-gray-50 p-4 rounded-lg">

                                                   <div className="flex justify-between">
                                                       <Text strong>Payment Status:</Text>
                                                       <Tag
                                                           color={
                                                               record.status === "Good"
                                                                   ? "success"
                                                                   : record.status === "Pending"
                                                                       ? "warning"
                                                                       : "error"
                                                           }
                                                       >
                                                           {record.status}
                                                       </Tag>
                                                   </div>
                                                   <div className="mt-3">
                                                       <Progress
                                                           percent={Math.round(
                                                               ((record.amount_paid) / record.total_fee) * 100,
                                                           )}
                                                           status={
                                                               record.status === "Critical"
                                                                   ? "exception"
                                                                   : undefined
                                                           }
                                                           strokeColor={
                                                               record.status === "Good"
                                                                   ? "#52c41a"
                                                                   : record.status === "Pending"
                                                                       ? "#faad14"
                                                                       : "#f5222d"
                                                           }
                                                       />
                                                   </div>
                                               </div>

                                               <div className="mt-4 flex gap-2 justify-end">
                                                   <Button
                                                       type="primary"
                                                       icon={<DollarOutlined/>}
                                                       onClick={() => showPaymentModal(record)}
                                                       className="!rounded-button whitespace-nowrap"
                                                   >
                                                       Record Payment
                                                   </Button>
                                                   {/*<Button*/}
                                                   {/*    icon={<FileTextOutlined/>}*/}
                                                   {/*    className="!rounded-button whitespace-nowrap"*/}
                                                   {/*>*/}
                                                   {/*    Print Statement*/}
                                                   {/*</Button>*/}
                                                   <Button
                                                       icon={<MailOutlined/>}
                                                       className="!rounded-button whitespace-nowrap"
                                                   >
                                                       Send Reminder
                                                   </Button>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               ),
                           }}
                    />
                </Card>
            </TabPane>
        </Tabs>

        {/* Filter Modal */}
        <Modal
            title="Filter Students"
            visible={filterModalVisible}
            onCancel={() => setFilterModalVisible(false)}
            footer={[
                <Button
                    key="clear"
                    onClick={clearFilters}
                    className="!rounded-button whitespace-nowrap"
                >
                    Clear Filters
                </Button>,
                <Button
                    key="apply"
                    type="primary"
                    onClick={() => setFilterModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Apply Filters
                </Button>,
            ]}
        >
            <div className="space-y-4">
                <div>
                    <label className="block mb-2 font-medium">Course</label>
                    <Select
                        style={{width: "100%"}}
                        placeholder="Select course"
                        allowClear
                        value={filters.course}
                        onChange={(value) => handleFilterChange("course", value)}
                    >
                        {courses.map((course) => (
                            <Option key={course} value={course}>
                                {course}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Year of Study</label>
                    <Select
                        style={{width: "100%"}}
                        placeholder="Select year"
                        allowClear
                        value={filters.year}
                        onChange={(value) => handleFilterChange("year", value)}
                    >
                        {years.map((year) => (
                            <Option key={year} value={year.toString()}>
                                Year {year}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Fee Status</label>
                    <Select
                        style={{width: "100%"}}
                        placeholder="Select status"
                        allowClear
                        value={filters.status}
                        onChange={(value) => handleFilterChange("status", value)}
                    >
                        {statuses.map((status) => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </Modal>

        {/* Payment Modal */}
        <Modal
            loading={paymentLoading}
            title={`Record Payment for ${selectedStudent?.name || ""}`}
            open={paymentModalVisible}
            onCancel={() => setPaymentModalVisible(false)}
            onClose={() => {
                form.resetFields()
                setSelectedStudent({})
            }}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setPaymentModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => form.submit()}
                    className="!rounded-button whitespace-nowrap"
                >
                    Record Payment
                </Button>,
            ]}
            width={600}
        >
            <Form form={form} layout="vertical" onFinish={handlePaymentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="studentId"
                        label="Student ID"
                        initialValue={selectedStudent?.regNumber}
                        rules={[{required: true, message: "Please enter student ID"}]}
                    >
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item
                        name="studentName"
                        label="Student Name"
                        initialValue={selectedStudent?.name}
                        rules={[{required: true, message: "Please enter student name"}]}
                    >
                        <Input disabled/>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="amount"
                        label="Payment Amount (KSh)"
                        rules={[
                            {required: true, message: "Please enter payment amount"},
                        ]}
                    >
                        <Input type="number" min={1}/>
                    </Form.Item>

                    <Form.Item
                        name="paymentDate"
                        label="Payment Date"
                        initialValue={""}
                        rules={[
                            {required: true, message: "Please select payment date"},
                        ]}
                    >
                        <DatePicker style={{width: "100%"}}/>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="paymentMethod"
                        label="Payment Method"
                        rules={[
                            {required: true, message: "Please select payment method"},
                        ]}
                    >
                        <Select placeholder="Select payment method">
                            <Option value="Bank">Bank Deposit</Option>
                            <Option value="Mpesa">Mobile Money</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="referenceNumber"
                        label="Reference Number"
                        rules={[
                            {required: true, message: "Please enter reference number"},
                        ]}
                    >
                        <Input placeholder="e.g., Cheque No., Transaction ID"/>
                    </Form.Item>
                </div>

                <Form.Item name="receiptUpload" label="Upload Receipt (Optional)">
                    <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
                        <Button
                            icon={<UploadOutlined/>}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item name="notes" label="Additional Notes">
                    <Input.TextArea
                        rows={3}
                        placeholder="Any additional information about this payment"
                    />
                </Form.Item>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                        <Text>Current Balance:</Text>
                        <Text strong className="text-red-600">
                            {selectedStudent?.balance.toLocaleString()} KSh
                        </Text>
                    </div>
                    <div className="flex justify-between">
                        <Text>Status:</Text>
                        <Tag
                            color={
                                selectedStudent?.status === "Good"
                                    ? "success"
                                    : selectedStudent?.status === "Pending"
                                        ? "warning"
                                        : "error"
                            }
                        >
                            {selectedStudent?.status}
                        </Tag>
                    </div>
                </div>
            </Form>
        </Modal>
    </Content>
}

export default AdminStudentFinanceManagement