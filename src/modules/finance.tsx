// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, {useState, useEffect} from "react";
import {
    Layout,
    Menu,
    Button,
    Avatar,
    Badge,
    Input,
    Card,
    Tabs,
    Table,
    Select,
    DatePicker,
    Dropdown,
    Modal,
    Form,
    Progress,
    Statistic,
    Tag,
    Alert,
    Space,
    Typography,
    Row,
    Col,
    Divider,
} from "antd";
import {
    DashboardOutlined,
    PieChartOutlined,
    DollarOutlined,
    FileTextOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    BellOutlined,
    SearchOutlined,
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    CalendarOutlined,
    BarChartOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    FilterOutlined,
    LockOutlined,
    MailOutlined,
    PrintOutlined,
    ReloadOutlined,
    TeamOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import * as echarts from "echarts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const {Header, Sider, Content} = Layout;
const {Title, Text, Paragraph} = Typography;
const {TabPane} = Tabs;
const {Option} = Select;
const {RangePicker} = DatePicker;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [userRole, setUserRole] = useState<"student" | "staff">("student");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const [dateRange, setDateRange] = useState<[string, string]>([
        "2025-05-01",
        "2025-06-05",
    ]);
    const [loading, setLoading] = useState(false);

    const swiperModules = [Pagination, Autoplay];

    // Initialize charts after component mounts
    useEffect(() => {
        initCharts();

        // Simulate loading
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Initialize charts when tab changes
    useEffect(() => {
        if (activeTab === "dashboard" || activeTab === "financial") {
            setTimeout(() => {
                initCharts();
            }, 100);
        }
    }, [activeTab]);

    const initCharts = () => {
        // Expense Breakdown Chart
        const expenseChartDom = document.getElementById("expense-breakdown-chart");
        if (expenseChartDom) {
            const expenseChart = echarts.init(expenseChartDom);
            const expenseOption = {
                animation: false,
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    right: 10,
                    top: "center",
                    data: ["Tuition", "Housing", "Books", "Food", "Transportation"],
                },
                series: [
                    {
                        name: "Expense Breakdown",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: "#fff",
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: "18",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            {value: 5500, name: "Tuition"},
                            {value: 2200, name: "Housing"},
                            {value: 800, name: "Books"},
                            {value: 1200, name: "Food"},
                            {value: 500, name: "Transportation"},
                        ],
                    },
                ],
            };
            expenseChart.setOption(expenseOption);
        }

        // Monthly Trend Chart
        const trendChartDom = document.getElementById("monthly-trend-chart");
        if (trendChartDom) {
            const trendChart = echarts.init(trendChartDom);
            const trendOption = {
                animation: false,
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["Income", "Expenses", "Balance"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "Income",
                        type: "line",
                        stack: "Total",
                        data: [7000, 6800, 7200, 7100, 7300, 7500],
                        itemStyle: {color: "#52c41a"},
                    },
                    {
                        name: "Expenses",
                        type: "line",
                        stack: "Total",
                        data: [5200, 5300, 5500, 5100, 5400, 5600],
                        itemStyle: {color: "#f5222d"},
                    },
                    {
                        name: "Balance",
                        type: "line",
                        stack: "Total",
                        data: [1800, 1500, 1700, 2000, 1900, 1900],
                        itemStyle: {color: "#1890ff"},
                    },
                ],
            };
            trendChart.setOption(trendOption);
        }

        // Budget vs Actual Chart
        const budgetChartDom = document.getElementById("budget-vs-actual-chart");
        if (budgetChartDom) {
            const budgetChart = echarts.init(budgetChartDom);
            const budgetOption = {
                animation: false,
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                legend: {
                    data: ["Budget", "Actual"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01],
                },
                yAxis: {
                    type: "category",
                    data: ["Tuition", "Housing", "Books", "Food", "Transportation"],
                },
                series: [
                    {
                        name: "Budget",
                        type: "bar",
                        data: [6000, 2500, 1000, 1500, 700],
                        itemStyle: {color: "#1890ff"},
                    },
                    {
                        name: "Actual",
                        type: "bar",
                        data: [5500, 2200, 800, 1200, 500],
                        itemStyle: {color: "#52c41a"},
                    },
                ],
            };
            budgetChart.setOption(budgetOption);
        }
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const switchRole = () => {
        setUserRole(userRole === "student" ? "staff" : "student");
    };

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const showPaymentModal = () => {
        setPaymentModalVisible(true);
    };

    const closePaymentModal = () => {
        setPaymentModalVisible(false);
    };

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
    };

    const toggleUserMenu = () => {
        setUserMenuVisible(!userMenuVisible);
    };

    const handleDateRangeChange = (dates: any) => {
        if (dates && dates.length === 2) {
            setDateRange([
                dates[0].format("YYYY-MM-DD"),
                dates[1].format("YYYY-MM-DD"),
            ]);
        }
    };

    // Student payment data
    const studentPayments = [
        {
            key: "1",
            date: "2025-05-15",
            description: "Spring Semester Tuition",
            amount: "$3,500.00",
            status: "Paid",
        },
        {
            key: "2",
            date: "2025-04-01",
            description: "Housing Fee",
            amount: "$1,200.00",
            status: "Paid",
        },
        {
            key: "3",
            date: "2025-06-15",
            description: "Summer Course Registration",
            amount: "$1,800.00",
            status: "Pending",
        },
        {
            key: "4",
            date: "2025-03-10",
            description: "Library Fine",
            amount: "$25.00",
            status: "Overdue",
        },
        {
            key: "5",
            date: "2025-02-20",
            description: "Lab Fee",
            amount: "$150.00",
            status: "Paid",
        },
    ];

    // Staff salary data
    const staffSalary = [
        {
            key: "1",
            date: "2025-05-30",
            description: "May Salary",
            amount: "$4,200.00",
            status: "Processed",
        },
        {
            key: "2",
            date: "2025-04-30",
            description: "April Salary",
            amount: "$4,200.00",
            status: "Paid",
        },
        {
            key: "3",
            date: "2025-03-30",
            description: "March Salary",
            amount: "$4,200.00",
            status: "Paid",
        },
        {
            key: "4",
            date: "2025-05-15",
            description: "Research Grant",
            amount: "$1,500.00",
            status: "Paid",
        },
        {
            key: "5",
            date: "2025-06-15",
            description: "Summer Course Bonus",
            amount: "$800.00",
            status: "Pending",
        },
    ];

    // Notifications data
    const notifications = [
        {
            id: 1,
            title: "Payment Due",
            message: "Your summer course payment is due in 5 days",
            time: "2 hours ago",
            type: "warning",
        },
        {
            id: 2,
            title: "Payment Received",
            message: "We received your payment for Spring Semester Tuition",
            time: "1 day ago",
            type: "success",
        },
        {
            id: 3,
            title: "New Financial Aid Opportunity",
            message: "Check out the new scholarship program available",
            time: "3 days ago",
            type: "info",
        },
    ];

    // Recent transactions
    const recentTransactions =
        userRole === "student"
            ? [
                {
                    id: 1,
                    description: "Spring Semester Tuition",
                    amount: "-$3,500.00",
                    date: "2025-05-15",
                    type: "expense",
                },
                {
                    id: 2,
                    description: "Scholarship Credit",
                    amount: "+$1,500.00",
                    date: "2025-05-10",
                    type: "income",
                },
                {
                    id: 3,
                    description: "Housing Fee",
                    amount: "-$1,200.00",
                    date: "2025-04-01",
                    type: "expense",
                },
            ]
            : [
                {
                    id: 1,
                    description: "May Salary",
                    amount: "+$4,200.00",
                    date: "2025-05-30",
                    type: "income",
                },
                {
                    id: 2,
                    description: "Research Grant",
                    amount: "+$1,500.00",
                    date: "2025-05-15",
                    type: "income",
                },
                {
                    id: 3,
                    description: "Tax Deduction",
                    amount: "-$950.00",
                    date: "2025-05-30",
                    type: "expense",
                },
            ];

    // Dashboard content
    const renderDashboard = () => (
        <div className='dashboard-content'>
            <div className='welcome-section mb-6'>
                <Row gutter={[24, 24]} className='mb-6'>
                    <Col span={24}>
                        <Card className='welcome-card bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-md'>
                            <Row gutter={24} align='middle'>
                                <Col xs={24} md={16}>
                                    <Title level={3}>
                                        Welcome back,{" "}
                                        {userRole === "student"
                                            ? "Alex Johnson"
                                            : "Prof. Sarah Williams"}
                                    </Title>
                                    <Paragraph className='text-gray-600'>
                                        Today is June 5, 2025 | Last login: June 4, 2025 at 3:45 PM
                                    </Paragraph>
                                    <div className='mt-4'>
                                        <Button
                                            type='primary'
                                            size='large'
                                            className='mr-3 !rounded-button whitespace-nowrap cursor-pointer'>
                                            {userRole === "student"
                                                ? "Make a Payment"
                                                : "View Payslip"}
                                        </Button>
                                        <Button
                                            size='large'
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            View Reports
                                        </Button>
                                    </div>
                                </Col>
                                <Col xs={24} md={8} className='text-right'>
                                    <img
                                        src='https://readdy.ai/api/search-image?query=3D%20render%20of%20a%20modern%20financial%20dashboard%20interface%20with%20analytics%20charts%20and%20graphs%2C%20blue%20color%20scheme%2C%20professional%20design%2C%20clean%20minimalist%20style%2C%20financial%20technology%20concept&width=300&height=200&seq=dashboard1&orientation=landscape'
                                        alt='StudentFinance Dashboard'
                                        className='max-w-full h-auto rounded-lg shadow-lg object-cover object-top'
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 24]} className='mb-6'>
                    <Col xs={24} md={8}>
                        <Card className='h-full shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <Statistic
                                title={
                                    <span className='text-lg font-medium'>
                    {userRole === "student"
                        ? "Current Balance"
                        : "Monthly Salary"}
                  </span>
                                }
                                value={userRole === "student" ? 2350.0 : 4200.0}
                                precision={2}
                                valueStyle={{
                                    color: userRole === "student" ? "#cf1322" : "#3f8600",
                                    fontSize: "28px",
                                }}
                                prefix={<DollarOutlined/>}
                                suffix={
                                    userRole === "student" ? (
                                        <Tag color='error'>Due</Tag>
                                    ) : (
                                        <Tag color='success'>Processed</Tag>
                                    )
                                }
                            />
                            <Paragraph className='text-gray-500 mt-2'>
                                {userRole === "student"
                                    ? "Payment due on: June 15, 2025"
                                    : "Next payment: June 30, 2025"}
                            </Paragraph>
                            <Button type='link' className='p-0 cursor-pointer'>
                                View details
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className='h-full shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <Statistic
                                title={
                                    <span className='text-lg font-medium'>
                    {userRole === "student" ? "Financial Aid" : "YTD Earnings"}
                  </span>
                                }
                                value={userRole === "student" ? 5500.0 : 21000.0}
                                precision={2}
                                valueStyle={{color: "#3f8600", fontSize: "28px"}}
                                prefix={<DollarOutlined/>}
                            />
                            <Paragraph className='text-gray-500 mt-2'>
                                {userRole === "student"
                                    ? "Scholarship and grants for 2025"
                                    : "January - May 2025"}
                            </Paragraph>
                            <Progress
                                percent={userRole === "student" ? 75 : 42}
                                status='active'
                                strokeColor='#1890ff'
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className='h-full shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <Statistic
                                title={
                                    <span className='text-lg font-medium'>
                    {userRole === "student"
                        ? "Upcoming Payments"
                        : "Pending Reimbursements"}
                  </span>
                                }
                                value={userRole === "student" ? 2 : 1}
                                valueStyle={{fontSize: "28px"}}
                                prefix={
                                    userRole === "student" ? (
                                        <ClockCircleOutlined/>
                                    ) : (
                                        <FileTextOutlined/>
                                    )
                                }
                            />
                            <Paragraph className='text-gray-500 mt-2'>
                                {userRole === "student"
                                    ? "Due within the next 30 days"
                                    : "Awaiting approval"}
                            </Paragraph>
                            <Button
                                type='primary'
                                ghost
                                className='mt-2 !rounded-button whitespace-nowrap cursor-pointer'>
                                {userRole === "student" ? "Schedule Payment" : "Track Status"}
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 24]} className='mb-6'>
                    <Col xs={24} lg={16}>
                        <Card
                            title='Recent Transactions'
                            extra={
                                <Button type='link' className='cursor-pointer'>
                                    View All
                                </Button>
                            }
                            className='h-full shadow-md'>
                            {recentTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className='flex justify-between items-center py-3 border-b last:border-0'>
                                    <div>
                                        <div className='font-medium'>{transaction.description}</div>
                                        <div className='text-gray-500 text-sm'>
                                            {transaction.date}
                                        </div>
                                    </div>
                                    <div
                                        className={`font-medium ${
                                            transaction.type === "income"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}>
                                        {transaction.amount}
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card title='Quick Actions' className='h-full shadow-md'>
                            <div className='space-y-3'>
                                <Button
                                    block
                                    className='text-left h-auto py-3 flex items-center !rounded-button whitespace-nowrap cursor-pointer'>
                                    <DownloadOutlined className='mr-2'/> Download{" "}
                                    {userRole === "student" ? "Receipt" : "Payslip"}
                                </Button>
                                <Button
                                    block
                                    className='text-left h-auto py-3 flex items-center !rounded-button whitespace-nowrap cursor-pointer'>
                                    <FileTextOutlined className='mr-2'/>{" "}
                                    {userRole === "student"
                                        ? "View Fee Structure"
                                        : "Tax Documents"}
                                </Button>
                                <Button
                                    block
                                    className='text-left h-auto py-3 flex items-center !rounded-button whitespace-nowrap cursor-pointer'>
                                    <MailOutlined className='mr-2'/> Contact StudentFinance Office
                                </Button>
                                <Button
                                    block
                                    className='text-left h-auto py-3 flex items-center !rounded-button whitespace-nowrap cursor-pointer'>
                                    <PrintOutlined className='mr-2'/> Print Statement
                                </Button>
                                <Button
                                    type='primary'
                                    block
                                    className='text-left h-auto py-3 flex items-center !rounded-button whitespace-nowrap cursor-pointer'
                                    onClick={showPaymentModal}>
                                    <DollarOutlined className='mr-2'/>{" "}
                                    {userRole === "student"
                                        ? "Make a Payment"
                                        : "View Full Salary Details"}
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    <Col xs={24}>
                        <Card title='Financial Overview' className='shadow-md'>
                            <Tabs defaultActiveKey='monthly' className='financial-tabs'>
                                <TabPane tab='Monthly Trend' key='monthly'>
                                    <div
                                        id='monthly-trend-chart'
                                        style={{height: "400px", width: "100%"}}></div>
                                </TabPane>
                                <TabPane tab='Expense Breakdown' key='expense'>
                                    <div
                                        id='expense-breakdown-chart'
                                        style={{height: "400px", width: "100%"}}></div>
                                </TabPane>
                                <TabPane tab='Budget vs. Actual' key='budget'>
                                    <div
                                        id='budget-vs-actual-chart'
                                        style={{height: "400px", width: "100%"}}></div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );

    // Financial overview content
    const renderFinancialOverview = () => (
        <div className='financial-overview-content'>
            <Row gutter={[24, 24]} className='mb-6'>
                <Col span={24}>
                    <Card className='shadow-md'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                            <Title level={4} className='mb-4 md:mb-0'>
                                Financial Overview
                            </Title>
                            <Space>
                                <RangePicker
                                    defaultValue={[
                                        React.createElement(
                                            DatePicker.RangePicker.RangePicker.constructor.dayjs,
                                            dateRange[0]
                                        ),
                                        React.createElement(
                                            DatePicker.RangePicker.RangePicker.constructor.dayjs,
                                            dateRange[1]
                                        ),
                                    ]}
                                    onChange={handleDateRangeChange}
                                />
                                <Button
                                    icon={<ReloadOutlined/>}
                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                    Refresh
                                </Button>
                                <Button
                                    icon={<DownloadOutlined/>}
                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                    Export
                                </Button>
                            </Space>
                        </div>

                        <Row gutter={[24, 24]} className='mb-6'>
                            <Col xs={24} sm={8}>
                                <Card className='bg-blue-50 border-0'>
                                    <Statistic
                                        title={
                                            <span className='text-lg'>
                        {userRole === "student" ? "Total Paid" : "YTD Earnings"}
                      </span>
                                        }
                                        value={userRole === "student" ? 4875.0 : 21000.0}
                                        precision={2}
                                        valueStyle={{color: "#3f8600"}}
                                        prefix={<DollarOutlined/>}
                                    />
                                    <div className='mt-2 text-gray-500'>
                                        <span className='text-green-600 mr-2'>↑ 12%</span> from
                                        previous period
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card className='bg-red-50 border-0'>
                                    <Statistic
                                        title={
                                            <span className='text-lg'>
                        {userRole === "student"
                            ? "Outstanding Balance"
                            : "Total Deductions"}
                      </span>
                                        }
                                        value={userRole === "student" ? 2350.0 : 4750.0}
                                        precision={2}
                                        valueStyle={{color: "#cf1322"}}
                                        prefix={<DollarOutlined/>}
                                    />
                                    <div className='mt-2 text-gray-500'>
                                        <span className='text-red-600 mr-2'>↑ 5%</span> from
                                        previous period
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card className='bg-green-50 border-0'>
                                    <Statistic
                                        title={
                                            <span className='text-lg'>
                        {userRole === "student"
                            ? "Financial Aid"
                            : "Net Income"}
                      </span>
                                        }
                                        value={userRole === "student" ? 5500.0 : 16250.0}
                                        precision={2}
                                        valueStyle={{color: "#3f8600"}}
                                        prefix={<DollarOutlined/>}
                                    />
                                    <div className='mt-2 text-gray-500'>
                                        <span className='text-green-600 mr-2'>↑ 8%</span> from
                                        previous period
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <Tabs defaultActiveKey='overview' className='financial-detail-tabs'>
                            <TabPane tab='Overview' key='overview'>
                                <div
                                    id='monthly-trend-chart'
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        marginBottom: "24px",
                                    }}></div>

                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={12}>
                                        <Card title='Expense Breakdown' className='h-full'>
                                            <div
                                                id='expense-breakdown-chart'
                                                style={{height: "300px", width: "100%"}}></div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Card title='Budget vs. Actual' className='h-full'>
                                            <div
                                                id='budget-vs-actual-chart'
                                                style={{height: "300px", width: "100%"}}></div>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab='Detailed Analysis' key='detailed'>
                                <div className='mb-4'>
                                    <Space className='mb-4'>
                                        <Select defaultValue='all' style={{width: 150}}>
                                            <Option value='all'>All Categories</Option>
                                            <Option value='tuition'>Tuition</Option>
                                            <Option value='housing'>Housing</Option>
                                            <Option value='books'>Books</Option>
                                            <Option value='food'>Food</Option>
                                            <Option value='transportation'>Transportation</Option>
                                        </Select>
                                        <Select defaultValue='monthly' style={{width: 150}}>
                                            <Option value='daily'>Daily</Option>
                                            <Option value='weekly'>Weekly</Option>
                                            <Option value='monthly'>Monthly</Option>
                                            <Option value='quarterly'>Quarterly</Option>
                                            <Option value='yearly'>Yearly</Option>
                                        </Select>
                                        <Button
                                            icon={<FilterOutlined/>}
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            More Filters
                                        </Button>
                                    </Space>

                                    <Table
                                        dataSource={
                                            userRole === "student"
                                                ? [
                                                    {
                                                        key: "1",
                                                        category: "Tuition",
                                                        budget: "$6,000.00",
                                                        actual: "$5,500.00",
                                                        variance: "$500.00",
                                                        status: "Under Budget",
                                                    },
                                                    {
                                                        key: "2",
                                                        category: "Housing",
                                                        budget: "$2,500.00",
                                                        actual: "$2,200.00",
                                                        variance: "$300.00",
                                                        status: "Under Budget",
                                                    },
                                                    {
                                                        key: "3",
                                                        category: "Books",
                                                        budget: "$1,000.00",
                                                        actual: "$800.00",
                                                        variance: "$200.00",
                                                        status: "Under Budget",
                                                    },
                                                    {
                                                        key: "4",
                                                        category: "Food",
                                                        budget: "$1,500.00",
                                                        actual: "$1,200.00",
                                                        variance: "$300.00",
                                                        status: "Under Budget",
                                                    },
                                                    {
                                                        key: "5",
                                                        category: "Transportation",
                                                        budget: "$700.00",
                                                        actual: "$500.00",
                                                        variance: "$200.00",
                                                        status: "Under Budget",
                                                    },
                                                ]
                                                : [
                                                    {
                                                        key: "1",
                                                        category: "Base Salary",
                                                        budget: "$4,000.00",
                                                        actual: "$4,000.00",
                                                        variance: "$0.00",
                                                        status: "On Budget",
                                                    },
                                                    {
                                                        key: "2",
                                                        category: "Overtime",
                                                        budget: "$500.00",
                                                        actual: "$200.00",
                                                        variance: "-$300.00",
                                                        status: "Under Budget",
                                                    },
                                                    {
                                                        key: "3",
                                                        category: "Tax Deductions",
                                                        budget: "$900.00",
                                                        actual: "$950.00",
                                                        variance: "$50.00",
                                                        status: "Over Budget",
                                                    },
                                                    {
                                                        key: "4",
                                                        category: "Benefits",
                                                        budget: "$300.00",
                                                        actual: "$300.00",
                                                        variance: "$0.00",
                                                        status: "On Budget",
                                                    },
                                                    {
                                                        key: "5",
                                                        category: "Retirement",
                                                        budget: "$400.00",
                                                        actual: "$400.00",
                                                        variance: "$0.00",
                                                        status: "On Budget",
                                                    },
                                                ]
                                        }
                                        columns={[
                                            {
                                                title: "Category",
                                                dataIndex: "category",
                                                key: "category",
                                            },
                                            {title: "Budget", dataIndex: "budget", key: "budget"},
                                            {title: "Actual", dataIndex: "actual", key: "actual"},
                                            {
                                                title: "Variance",
                                                dataIndex: "variance",
                                                key: "variance",
                                            },
                                            {
                                                title: "Status",
                                                dataIndex: "status",
                                                key: "status",
                                                render: (text: string) => (
                                                    <Tag
                                                        color={
                                                            text === "Under Budget"
                                                                ? "green"
                                                                : text === "Over Budget"
                                                                    ? "red"
                                                                    : "blue"
                                                        }>
                                                        {text}
                                                    </Tag>
                                                ),
                                            },
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: () => (
                                                    <Button
                                                        type='link'
                                                        icon={<EyeOutlined/>}
                                                        className='cursor-pointer'>
                                                        Details
                                                    </Button>
                                                ),
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab='Reports' key='reports'>
                                <div className='mb-4'>
                                    <Alert
                                        message='Custom Reports'
                                        description="Generate custom financial reports based on your specific needs. Select parameters below and click 'Generate Report'."
                                        type='info'
                                        showIcon
                                        className='mb-4'
                                    />

                                    <Form layout='vertical' className='mb-4'>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={8}>
                                                <Form.Item label='Report Type'>
                                                    <Select defaultValue='summary'>
                                                        <Option value='summary'>Summary Report</Option>
                                                        <Option value='detailed'>Detailed Report</Option>
                                                        <Option value='transaction'>
                                                            Transaction History
                                                        </Option>
                                                        <Option value='budget'>Budget Analysis</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={8}>
                                                <Form.Item label='Date Range'>
                                                    <RangePicker style={{width: "100%"}}/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={8}>
                                                <Form.Item label='Format'>
                                                    <Select defaultValue='pdf'>
                                                        <Option value='pdf'>PDF</Option>
                                                        <Option value='excel'>Excel</Option>
                                                        <Option value='csv'>CSV</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Button
                                            type='primary'
                                            icon={<FileTextOutlined/>}
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            Generate Report
                                        </Button>
                                    </Form>

                                    <Divider orientation='left'>Saved Reports</Divider>

                                    <Table
                                        dataSource={[
                                            {
                                                key: "1",
                                                name: "Monthly Financial Summary",
                                                date: "2025-05-01",
                                                type: "Summary",
                                                format: "PDF",
                                            },
                                            {
                                                key: "2",
                                                name: "Spring Semester Expenses",
                                                date: "2025-04-15",
                                                type: "Detailed",
                                                format: "Excel",
                                            },
                                            {
                                                key: "3",
                                                name: "Annual Budget Review",
                                                date: "2025-01-10",
                                                type: "Budget",
                                                format: "PDF",
                                            },
                                        ]}
                                        columns={[
                                            {title: "Report Name", dataIndex: "name", key: "name"},
                                            {
                                                title: "Generated Date",
                                                dataIndex: "date",
                                                key: "date",
                                            },
                                            {title: "Type", dataIndex: "type", key: "type"},
                                            {title: "Format", dataIndex: "format", key: "format"},
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: () => (
                                                    <Space>
                                                        <Button
                                                            type='link'
                                                            icon={<DownloadOutlined/>}
                                                            className='cursor-pointer'>
                                                            Download
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            icon={<EyeOutlined/>}
                                                            className='cursor-pointer'>
                                                            View
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    // Payments/Salary content
    const renderPayments = () => (
        <div className='payments-content'>
            <Row gutter={[24, 24]} className='mb-6'>
                <Col span={24}>
                    <Card className='shadow-md'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                            <Title level={4} className='mb-4 md:mb-0'>
                                {userRole === "student"
                                    ? "Payments & Fees"
                                    : "Salary & Compensation"}
                            </Title>
                            <Space>
                                <Button
                                    type='primary'
                                    icon={
                                        userRole === "student" ? (
                                            <DollarOutlined/>
                                        ) : (
                                            <DownloadOutlined/>
                                        )
                                    }
                                    onClick={showPaymentModal}
                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                    {userRole === "student"
                                        ? "Make a Payment"
                                        : "Download Payslip"}
                                </Button>
                                <Button
                                    icon={<FileTextOutlined/>}
                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                    {userRole === "student" ? "Payment History" : "Tax Documents"}
                                </Button>
                            </Space>
                        </div>

                        <Tabs defaultActiveKey='current'>
                            <TabPane
                                tab={userRole === "student" ? "Current Fees" : "Current Salary"}
                                key='current'>
                                <Row gutter={[24, 24]} className='mb-6'>
                                    <Col xs={24} md={8}>
                                        <Card className='bg-blue-50 border-0'>
                                            <Statistic
                                                title={
                                                    <span className='text-lg'>
                            {userRole === "student"
                                ? "Total Due"
                                : "Gross Salary"}
                          </span>
                                                }
                                                value={userRole === "student" ? 2350.0 : 4200.0}
                                                precision={2}
                                                valueStyle={{
                                                    color: userRole === "student" ? "#cf1322" : "#3f8600",
                                                }}
                                                prefix={<DollarOutlined/>}
                                            />
                                            <div className='mt-2 text-gray-500'>
                                                {userRole === "student"
                                                    ? "Due by June 15, 2025"
                                                    : "Monthly salary"}
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card className='bg-green-50 border-0'>
                                            <Statistic
                                                title={
                                                    <span className='text-lg'>
                            {userRole === "student"
                                ? "Paid to Date"
                                : "Net Salary"}
                          </span>
                                                }
                                                value={userRole === "student" ? 4875.0 : 3250.0}
                                                precision={2}
                                                valueStyle={{color: "#3f8600"}}
                                                prefix={<DollarOutlined/>}
                                            />
                                            <div className='mt-2 text-gray-500'>
                                                {userRole === "student"
                                                    ? "For current semester"
                                                    : "After deductions"}
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card className='bg-purple-50 border-0'>
                                            <Statistic
                                                title={
                                                    <span className='text-lg'>
                            {userRole === "student"
                                ? "Financial Aid"
                                : "YTD Earnings"}
                          </span>
                                                }
                                                value={userRole === "student" ? 5500.0 : 21000.0}
                                                precision={2}
                                                valueStyle={{color: "#722ed1"}}
                                                prefix={<DollarOutlined/>}
                                            />
                                            <div className='mt-2 text-gray-500'>
                                                {userRole === "student"
                                                    ? "Applied to your account"
                                                    : "January - May 2025"}
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>

                                {userRole === "student" ? (
                                    <div>
                                        <Card title='Fee Breakdown' className='mb-6'>
                                            <Table
                                                dataSource={[
                                                    {
                                                        key: "1",
                                                        description: "Tuition Fee",
                                                        amount: "$3,500.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "2",
                                                        description: "Housing Fee",
                                                        amount: "$1,200.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "3",
                                                        description: "Technology Fee",
                                                        amount: "$250.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "4",
                                                        description: "Student Activity Fee",
                                                        amount: "$150.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "5",
                                                        description: "Library Fee",
                                                        amount: "$100.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Paid",
                                                    },
                                                ]}
                                                columns={[
                                                    {
                                                        title: "Description",
                                                        dataIndex: "description",
                                                        key: "description",
                                                    },
                                                    {
                                                        title: "Amount",
                                                        dataIndex: "amount",
                                                        key: "amount",
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
                                                        render: (text: string) => (
                                                            <Tag
                                                                color={
                                                                    text === "Paid"
                                                                        ? "green"
                                                                        : text === "Pending"
                                                                            ? "orange"
                                                                            : "red"
                                                                }>
                                                                {text}
                                                            </Tag>
                                                        ),
                                                    },
                                                    {
                                                        title: "Action",
                                                        key: "action",
                                                        render: (_, record) => (
                                                            <Space>
                                                                {record.status !== "Paid" && (
                                                                    <Button
                                                                        type='link'
                                                                        onClick={showPaymentModal}
                                                                        className='cursor-pointer'>
                                                                        Pay Now
                                                                    </Button>
                                                                )}
                                                                <Button type='link' className='cursor-pointer'>
                                                                    Details
                                                                </Button>
                                                            </Space>
                                                        ),
                                                    },
                                                ]}
                                                pagination={false}
                                            />
                                        </Card>

                                        <Card title='Payment Options' className='mb-6'>
                                            <Row gutter={[24, 24]}>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                                        <div className='text-4xl text-blue-500 mb-2'>
                                                            <i className='fas fa-credit-card'></i>
                                                        </div>
                                                        <Title level={5}>Credit/Debit Card</Title>
                                                        <Text className='block text-gray-500'>
                                                            Pay instantly with your card
                                                        </Text>
                                                        <Button
                                                            type='primary'
                                                            className='mt-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                            Select
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                                        <div className='text-4xl text-green-500 mb-2'>
                                                            <i className='fas fa-university'></i>
                                                        </div>
                                                        <Title level={5}>Bank Transfer</Title>
                                                        <Text className='block text-gray-500'>
                                                            Direct bank payment
                                                        </Text>
                                                        <Button
                                                            type='primary'
                                                            className='mt-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                            Select
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                                        <div className='text-4xl text-purple-500 mb-2'>
                                                            <i className='fas fa-calendar-alt'></i>
                                                        </div>
                                                        <Title level={5}>Payment Plan</Title>
                                                        <Text className='block text-gray-500'>
                                                            Split into installments
                                                        </Text>
                                                        <Button
                                                            type='primary'
                                                            className='mt-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                            Select
                                                        </Button>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                ) : (
                                    <div>
                                        <Card title='Salary Breakdown' className='mb-6'>
                                            <Table
                                                dataSource={[
                                                    {
                                                        key: "1",
                                                        description: "Base Salary",
                                                        amount: "$4,000.00",
                                                        type: "Earning",
                                                    },
                                                    {
                                                        key: "2",
                                                        description: "Overtime",
                                                        amount: "$200.00",
                                                        type: "Earning",
                                                    },
                                                    {
                                                        key: "3",
                                                        description: "Income Tax",
                                                        amount: "-$800.00",
                                                        type: "Deduction",
                                                    },
                                                    {
                                                        key: "4",
                                                        description: "Retirement Contribution",
                                                        amount: "-$400.00",
                                                        type: "Deduction",
                                                    },
                                                    {
                                                        key: "5",
                                                        description: "Health Insurance",
                                                        amount: "-$150.00",
                                                        type: "Deduction",
                                                    },
                                                ]}
                                                columns={[
                                                    {
                                                        title: "Description",
                                                        dataIndex: "description",
                                                        key: "description",
                                                    },
                                                    {
                                                        title: "Amount",
                                                        dataIndex: "amount",
                                                        key: "amount",
                                                    },
                                                    {
                                                        title: "Type",
                                                        dataIndex: "type",
                                                        key: "type",
                                                        render: (text: string) => (
                                                            <Tag color={text === "Earning" ? "green" : "red"}>
                                                                {text}
                                                            </Tag>
                                                        ),
                                                    },
                                                ]}
                                                pagination={false}
                                                summary={() => (
                                                    <Table.Summary.Row>
                                                        <Table.Summary.Cell index={0}>
                                                            <strong>Net Salary</strong>
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell index={1}>
                                                            <strong>$3,250.00</strong>
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                )}
                                            />
                                        </Card>

                                        <Card title='Benefits Overview' className='mb-6'>
                                            <Row gutter={[24, 24]}>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                                        <div className='text-4xl text-blue-500 mb-2'>
                                                            <i className='fas fa-heartbeat'></i>
                                                        </div>
                                                        <Title level={5}>Health Insurance</Title>
                                                        <Text className='block text-gray-500'>
                                                            Premium Plan
                                                        </Text>
                                                        <Button type='link' className='mt-2 cursor-pointer'>
                                                            View Details
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                                        <div className='text-4xl text-green-500 mb-2'>
                                                            <i className='fas fa-piggy-bank'></i>
                                                        </div>
                                                        <Title level={5}>Retirement Plan</Title>
                                                        <Text className='block text-gray-500'>
                                                            401(k) Contribution
                                                        </Text>
                                                        <Button type='link' className='mt-2 cursor-pointer'>
                                                            View Details
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                                        <div className='text-4xl text-purple-500 mb-2'>
                                                            <i className='fas fa-umbrella'></i>
                                                        </div>
                                                        <Title level={5}>Life Insurance</Title>
                                                        <Text className='block text-gray-500'>
                                                            $100,000 Coverage
                                                        </Text>
                                                        <Button type='link' className='mt-2 cursor-pointer'>
                                                            View Details
                                                        </Button>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab='History' key='history'>
                                <div className='mb-4'>
                                    <Space className='mb-4'>
                                        <RangePicker/>
                                        <Select defaultValue='all' style={{width: 150}}>
                                            <Option value='all'>All Types</Option>
                                            <Option value='tuition'>Tuition</Option>
                                            <Option value='housing'>Housing</Option>
                                            <Option value='salary'>Salary</Option>
                                            <Option value='bonus'>Bonus</Option>
                                        </Select>
                                        <Select defaultValue='all' style={{width: 150}}>
                                            <Option value='all'>All Status</Option>
                                            <Option value='paid'>Paid</Option>
                                            <Option value='pending'>Pending</Option>
                                            <Option value='overdue'>Overdue</Option>
                                        </Select>
                                        <Button
                                            icon={<ReloadOutlined/>}
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            Reset
                                        </Button>
                                    </Space>

                                    <Table
                                        dataSource={
                                            userRole === "student" ? studentPayments : staffSalary
                                        }
                                        columns={[
                                            {
                                                title: "Date",
                                                dataIndex: "date",
                                                key: "date",
                                                sorter: (a, b) => a.date.localeCompare(b.date),
                                            },
                                            {
                                                title: "Description",
                                                dataIndex: "description",
                                                key: "description",
                                            },
                                            {title: "Amount", dataIndex: "amount", key: "amount"},
                                            {
                                                title: "Status",
                                                dataIndex: "status",
                                                key: "status",
                                                render: (text: string) => {
                                                    let color = "blue";
                                                    if (text === "Paid" || text === "Processed")
                                                        color = "green";
                                                    else if (text === "Pending") color = "orange";
                                                    else if (text === "Overdue") color = "red";
                                                    return <Tag color={color}>{text}</Tag>;
                                                },
                                                filters: [
                                                    {text: "Paid", value: "Paid"},
                                                    {text: "Processed", value: "Processed"},
                                                    {text: "Pending", value: "Pending"},
                                                    {text: "Overdue", value: "Overdue"},
                                                ],
                                                onFilter: (value, record) =>
                                                    record.status.indexOf(value as string) === 0,
                                            },
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: (_, record) => (
                                                    <Space>
                                                        <Button
                                                            type='link'
                                                            icon={<DownloadOutlined/>}
                                                            className='cursor-pointer'>
                                                            Receipt
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            icon={<EyeOutlined/>}
                                                            className='cursor-pointer'>
                                                            Details
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        pagination={{pageSize: 5}}
                                    />
                                </div>
                            </TabPane>
                            {userRole === "student" && (
                                <TabPane tab='Financial Aid' key='aid'>
                                    <Alert
                                        message='Financial Aid Status'
                                        description='Your financial aid application for the 2025-2026 academic year has been approved. Below are the details of your financial aid package.'
                                        type='success'
                                        showIcon
                                        className='mb-6'
                                    />

                                    <Card title='Financial Aid Package' className='mb-6'>
                                        <Table
                                            dataSource={[
                                                {
                                                    key: "1",
                                                    type: "Merit Scholarship",
                                                    amount: "$3,500.00",
                                                    status: "Approved",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                                {
                                                    key: "2",
                                                    type: "Need-Based Grant",
                                                    amount: "$2,000.00",
                                                    status: "Approved",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                                {
                                                    key: "3",
                                                    type: "Work-Study Program",
                                                    amount: "$1,500.00",
                                                    status: "Pending",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                                {
                                                    key: "4",
                                                    type: "Federal Student Loan",
                                                    amount: "$5,500.00",
                                                    status: "Accepted",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                            ]}
                                            columns={[
                                                {title: "Aid Type", dataIndex: "type", key: "type"},
                                                {title: "Amount", dataIndex: "amount", key: "amount"},
                                                {
                                                    title: "Status",
                                                    dataIndex: "status",
                                                    key: "status",
                                                    render: (text: string) => (
                                                        <Tag
                                                            color={
                                                                text === "Approved" || text === "Accepted"
                                                                    ? "green"
                                                                    : text === "Pending"
                                                                        ? "orange"
                                                                        : "red"
                                                            }>
                                                            {text}
                                                        </Tag>
                                                    ),
                                                },
                                                {
                                                    title: "Disbursement",
                                                    dataIndex: "disbursement",
                                                    key: "disbursement",
                                                },
                                                {
                                                    title: "Action",
                                                    key: "action",
                                                    render: (_, record) => (
                                                        <Button type='link' className='cursor-pointer'>
                                                            View Details
                                                        </Button>
                                                    ),
                                                },
                                            ]}
                                            pagination={false}
                                            summary={() => (
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell index={0}>
                                                        <strong>Total Financial Aid</strong>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1}>
                                                        <strong>$12,500.00</strong>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}
                                        />
                                    </Card>

                                    <Row gutter={[24, 24]}>
                                        <Col xs={24} md={12}>
                                            <Card title='Upcoming Deadlines' className='h-full'>
                                                <ul className='space-y-4'>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-orange-500'>
                                                            <CalendarOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>FAFSA Renewal</div>
                                                            <div className='text-gray-500'>
                                                                Due: October 1, 2025
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-orange-500'>
                                                            <CalendarOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Scholarship Application
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Due: November 15, 2025
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-orange-500'>
                                                            <CalendarOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Work-Study Orientation
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Due: August 20, 2025
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Card title='Resources' className='h-full'>
                                                <ul className='space-y-4'>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Financial Aid Handbook
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Complete guide to financial aid policies
                                                            </div>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                Download PDF
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Scholarship Opportunities
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                List of available scholarships
                                                            </div>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                View List
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <TeamOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Financial Aid Office
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Contact for assistance
                                                            </div>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                Schedule Appointment
                                                            </Button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )}
                            {userRole === "staff" && (
                                <TabPane tab='Tax Documents' key='tax'>
                                    <Alert
                                        message='Tax Season Reminder'
                                        description='Your W-2 and other tax documents for the 2024 tax year are now available. Please review and download for your tax filing.'
                                        type='info'
                                        showIcon
                                        className='mb-6'
                                    />

                                    <Card title='Tax Documents' className='mb-6'>
                                        <Table
                                            dataSource={[
                                                {
                                                    key: "1",
                                                    document: "W-2 Form",
                                                    year: "2024",
                                                    dateIssued: "2025-01-31",
                                                    status: "Available",
                                                },
                                                {
                                                    key: "2",
                                                    document: "1099-MISC",
                                                    year: "2024",
                                                    dateIssued: "2025-01-31",
                                                    status: "Available",
                                                },
                                                {
                                                    key: "3",
                                                    document: "W-2 Form",
                                                    year: "2023",
                                                    dateIssued: "2024-01-31",
                                                    status: "Available",
                                                },
                                                {
                                                    key: "4",
                                                    document: "1099-MISC",
                                                    year: "2023",
                                                    dateIssued: "2024-01-31",
                                                    status: "Available",
                                                },
                                            ]}
                                            columns={[
                                                {
                                                    title: "Document",
                                                    dataIndex: "document",
                                                    key: "document",
                                                },
                                                {title: "Tax Year", dataIndex: "year", key: "year"},
                                                {
                                                    title: "Date Issued",
                                                    dataIndex: "dateIssued",
                                                    key: "dateIssued",
                                                },
                                                {
                                                    title: "Status",
                                                    dataIndex: "status",
                                                    key: "status",
                                                    render: (text: string) => (
                                                        <Tag
                                                            color={text === "Available" ? "green" : "orange"}>
                                                            {text}
                                                        </Tag>
                                                    ),
                                                },
                                                {
                                                    title: "Action",
                                                    key: "action",
                                                    render: () => (
                                                        <Space>
                                                            <Button
                                                                type='link'
                                                                icon={<DownloadOutlined/>}
                                                                className='cursor-pointer'>
                                                                Download
                                                            </Button>
                                                            <Button
                                                                type='link'
                                                                icon={<PrintOutlined/>}
                                                                className='cursor-pointer'>
                                                                Print
                                                            </Button>
                                                        </Space>
                                                    ),
                                                },
                                            ]}
                                            pagination={false}
                                        />
                                    </Card>

                                    <Row gutter={[24, 24]}>
                                        <Col xs={24} md={12}>
                                            <Card title='Tax Withholding' className='h-full'>
                                                <Form layout='vertical'>
                                                    <Form.Item label='Federal Withholding'>
                                                        <Select defaultValue='single0'>
                                                            <Option value='single0'>
                                                                Single, 0 allowances
                                                            </Option>
                                                            <Option value='single1'>
                                                                Single, 1 allowance
                                                            </Option>
                                                            <Option value='single2'>
                                                                Single, 2 allowances
                                                            </Option>
                                                            <Option value='married0'>
                                                                Married, 0 allowances
                                                            </Option>
                                                            <Option value='married1'>
                                                                Married, 1 allowance
                                                            </Option>
                                                            <Option value='married2'>
                                                                Married, 2 allowances
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label='State Withholding'>
                                                        <Select defaultValue='state0'>
                                                            <Option value='state0'>
                                                                State, 0 allowances
                                                            </Option>
                                                            <Option value='state1'>State, 1 allowance</Option>
                                                            <Option value='state2'>
                                                                State, 2 allowances
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label='Additional Withholding'>
                                                        <Input
                                                            prefix='$'
                                                            suffix='USD'
                                                            defaultValue='0.00'
                                                        />
                                                    </Form.Item>
                                                    <Button
                                                        type='primary'
                                                        className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                        Update Withholding
                                                    </Button>
                                                </Form>
                                            </Card>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Card title='Tax Resources' className='h-full'>
                                                <ul className='space-y-4'>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>W-4 Form</div>
                                                            <div className='text-gray-500'>
                                                                Employee's Withholding Certificate
                                                            </div>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                Download Form
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Tax Withholding Guide
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Help with filling out your W-4
                                                            </div>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                View Guide
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <TeamOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Payroll Department
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Contact for tax questions
                                                            </div>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                Schedule Consultation
                                                            </Button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )}
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    // Reports content
    const renderReports = () => (
        <div className='reports-content'>
            <Row gutter={[24, 24]} className='mb-6'>
                <Col span={24}>
                    <Card className='shadow-md'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                            <Title level={4} className='mb-4 md:mb-0'>
                                Financial Reports
                            </Title>
                            <Space>
                                <RangePicker
                                    defaultValue={[
                                        React.createElement(
                                            DatePicker.RangePicker.RangePicker.constructor.dayjs,
                                            dateRange[0]
                                        ),
                                        React.createElement(
                                            DatePicker.RangePicker.RangePicker.constructor.dayjs,
                                            dateRange[1]
                                        ),
                                    ]}
                                    onChange={handleDateRangeChange}
                                />
                                <Button
                                    icon={<DownloadOutlined/>}
                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                    Export
                                </Button>
                                <Button
                                    icon={<PrintOutlined/>}
                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                    Print
                                </Button>
                            </Space>
                        </div>

                        <Tabs defaultActiveKey='summary'>
                            <TabPane tab='Summary Reports' key='summary'>
                                <Row gutter={[24, 24]} className='mb-6'>
                                    <Col xs={24} md={8}>
                                        <Card className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                            <div className='text-4xl text-blue-500 mb-2'>
                                                <BarChartOutlined/>
                                            </div>
                                            <Title level={5}>Financial Summary</Title>
                                            <Text className='block text-gray-500'>
                                                Overview of your financial status
                                            </Text>
                                            <Button
                                                type='primary'
                                                className='mt-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                Generate
                                            </Button>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                            <div className='text-4xl text-green-500 mb-2'>
                                                <PieChartOutlined/>
                                            </div>
                                            <Title level={5}>Expense Analysis</Title>
                                            <Text className='block text-gray-500'>
                                                Breakdown of your expenses
                                            </Text>
                                            <Button
                                                type='primary'
                                                className='mt-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                Generate
                                            </Button>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card className='text-center hover:shadow-md transition-shadow cursor-pointer'>
                                            <div className='text-4xl text-purple-500 mb-2'>
                                                <FileTextOutlined/>
                                            </div>
                                            <Title level={5}>
                                                {userRole === "student"
                                                    ? "Payment History"
                                                    : "Salary History"}
                                            </Title>
                                            <Text className='block text-gray-500'>
                                                Record of all transactions
                                            </Text>
                                            <Button
                                                type='primary'
                                                className='mt-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                Generate
                                            </Button>
                                        </Card>
                                    </Col>
                                </Row>

                                <Card title='Recent Reports' className='mb-6'>
                                    <Table
                                        dataSource={[
                                            {
                                                key: "1",
                                                name: "Monthly Financial Summary",
                                                date: "2025-05-01",
                                                type: "Summary",
                                                format: "PDF",
                                                size: "1.2 MB",
                                            },
                                            {
                                                key: "2",
                                                name: "Spring Semester Expenses",
                                                date: "2025-04-15",
                                                type: "Detailed",
                                                format: "Excel",
                                                size: "2.5 MB",
                                            },
                                            {
                                                key: "3",
                                                name: "Annual Budget Review",
                                                date: "2025-01-10",
                                                type: "Budget",
                                                format: "PDF",
                                                size: "3.1 MB",
                                            },
                                            {
                                                key: "4",
                                                name: "Tax Statement",
                                                date: "2025-02-20",
                                                type: "Tax",
                                                format: "PDF",
                                                size: "0.8 MB",
                                            },
                                            {
                                                key: "5",
                                                name: "Financial Aid Report",
                                                date: "2025-03-05",
                                                type: "Aid",
                                                format: "Excel",
                                                size: "1.5 MB",
                                            },
                                        ]}
                                        columns={[
                                            {title: "Report Name", dataIndex: "name", key: "name"},
                                            {
                                                title: "Generated Date",
                                                dataIndex: "date",
                                                key: "date",
                                            },
                                            {title: "Type", dataIndex: "type", key: "type"},
                                            {title: "Format", dataIndex: "format", key: "format"},
                                            {title: "Size", dataIndex: "size", key: "size"},
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: () => (
                                                    <Space>
                                                        <Button
                                                            type='link'
                                                            icon={<DownloadOutlined/>}
                                                            className='cursor-pointer'>
                                                            Download
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            icon={<EyeOutlined/>}
                                                            className='cursor-pointer'>
                                                            View
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            icon={<PrintOutlined/>}
                                                            className='cursor-pointer'>
                                                            Print
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        pagination={{pageSize: 5}}
                                    />
                                </Card>
                            </TabPane>
                            <TabPane tab='Custom Reports' key='custom'>
                                <Card title='Generate Custom Report' className='mb-6'>
                                    <Form layout='vertical'>
                                        <Row gutter={24}>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Report Type' required>
                                                    <Select defaultValue='summary'>
                                                        <Option value='summary'>Summary Report</Option>
                                                        <Option value='detailed'>Detailed Report</Option>
                                                        <Option value='transaction'>
                                                            Transaction History
                                                        </Option>
                                                        <Option value='budget'>Budget Analysis</Option>
                                                        <Option value='tax'>Tax Statement</Option>
                                                        {userRole === "student" && (
                                                            <Option value='aid'>Financial Aid Report</Option>
                                                        )}
                                                        {userRole === "staff" && (
                                                            <Option value='salary'>Salary Report</Option>
                                                        )}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Date Range' required>
                                                    <RangePicker style={{width: "100%"}}/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Categories'>
                                                    <Select
                                                        mode='multiple'
                                                        placeholder='Select categories'
                                                        defaultValue={["tuition", "housing"]}>
                                                        <Option value='tuition'>Tuition</Option>
                                                        <Option value='housing'>Housing</Option>
                                                        <Option value='books'>Books</Option>
                                                        <Option value='food'>Food</Option>
                                                        <Option value='transportation'>
                                                            Transportation
                                                        </Option>
                                                        {userRole === "staff" && (
                                                            <Option value='salary'>Salary</Option>
                                                        )}
                                                        {userRole === "staff" && (
                                                            <Option value='benefits'>Benefits</Option>
                                                        )}
                                                        {userRole === "staff" && (
                                                            <Option value='tax'>Tax</Option>
                                                        )}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Format'>
                                                    <Select defaultValue='pdf'>
                                                        <Option value='pdf'>PDF</Option>
                                                        <Option value='excel'>Excel</Option>
                                                        <Option value='csv'>CSV</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Include Charts'>
                                                    <Select defaultValue='yes'>
                                                        <Option value='yes'>Yes</Option>
                                                        <Option value='no'>No</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Grouping'>
                                                    <Select defaultValue='monthly'>
                                                        <Option value='daily'>Daily</Option>
                                                        <Option value='weekly'>Weekly</Option>
                                                        <Option value='monthly'>Monthly</Option>
                                                        <Option value='quarterly'>Quarterly</Option>
                                                        <Option value='yearly'>Yearly</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Button
                                            type='primary'
                                            icon={<FileTextOutlined/>}
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            Generate Report
                                        </Button>
                                    </Form>
                                </Card>

                                <Card title='Saved Report Templates' className='mb-6'>
                                    <Table
                                        dataSource={[
                                            {
                                                key: "1",
                                                name: "Monthly Summary",
                                                type: "Summary",
                                                dateRange: "Current Month",
                                                format: "PDF",
                                            },
                                            {
                                                key: "2",
                                                name: "Semester Expenses",
                                                type: "Detailed",
                                                dateRange: "Current Semester",
                                                format: "Excel",
                                            },
                                            {
                                                key: "3",
                                                name: "Annual Overview",
                                                type: "Summary",
                                                dateRange: "Current Year",
                                                format: "PDF",
                                            },
                                        ]}
                                        columns={[
                                            {
                                                title: "Template Name",
                                                dataIndex: "name",
                                                key: "name",
                                            },
                                            {title: "Report Type", dataIndex: "type", key: "type"},
                                            {
                                                title: "Default Date Range",
                                                dataIndex: "dateRange",
                                                key: "dateRange",
                                            },
                                            {title: "Format", dataIndex: "format", key: "format"},
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: () => (
                                                    <Space>
                                                        <Button type='link' className='cursor-pointer'>
                                                            Use Template
                                                        </Button>
                                                        <Button type='link' className='cursor-pointer'>
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            danger
                                                            className='cursor-pointer'>
                                                            Delete
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                </Card>
                            </TabPane>
                            <TabPane tab='Scheduled Reports' key='scheduled'>
                                <Alert
                                    message='Automated Reports'
                                    description='Set up recurring reports to be automatically generated and sent to your email on a schedule.'
                                    type='info'
                                    showIcon
                                    className='mb-6'
                                />

                                <Card title='Active Scheduled Reports' className='mb-6'>
                                    <Table
                                        dataSource={[
                                            {
                                                key: "1",
                                                name: "Monthly Summary",
                                                frequency: "Monthly",
                                                nextRun: "2025-07-01",
                                                delivery: "Email",
                                            },
                                            {
                                                key: "2",
                                                name: "Weekly Transaction Report",
                                                frequency: "Weekly",
                                                nextRun: "2025-06-12",
                                                delivery: "Email & Dashboard",
                                            },
                                            {
                                                key: "3",
                                                name: "Quarterly Budget Analysis",
                                                frequency: "Quarterly",
                                                nextRun: "2025-07-01",
                                                delivery: "Email",
                                            },
                                        ]}
                                        columns={[
                                            {title: "Report Name", dataIndex: "name", key: "name"},
                                            {
                                                title: "Frequency",
                                                dataIndex: "frequency",
                                                key: "frequency",
                                            },
                                            {
                                                title: "Next Run",
                                                dataIndex: "nextRun",
                                                key: "nextRun",
                                            },
                                            {
                                                title: "Delivery Method",
                                                dataIndex: "delivery",
                                                key: "delivery",
                                            },
                                            {
                                                title: "Status",
                                                key: "status",
                                                render: () => <Tag color='green'>Active</Tag>,
                                            },
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: () => (
                                                    <Space>
                                                        <Button type='link' className='cursor-pointer'>
                                                            Edit
                                                        </Button>
                                                        <Button type='link' className='cursor-pointer'>
                                                            Run Now
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            danger
                                                            className='cursor-pointer'>
                                                            Disable
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                </Card>

                                <Card title='Create Scheduled Report' className='mb-6'>
                                    <Form layout='vertical'>
                                        <Row gutter={24}>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Report Name' required>
                                                    <Input placeholder='Enter report name'/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Report Type' required>
                                                    <Select defaultValue='summary'>
                                                        <Option value='summary'>Summary Report</Option>
                                                        <Option value='detailed'>Detailed Report</Option>
                                                        <Option value='transaction'>
                                                            Transaction History
                                                        </Option>
                                                        <Option value='budget'>Budget Analysis</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Frequency' required>
                                                    <Select defaultValue='monthly'>
                                                        <Option value='daily'>Daily</Option>
                                                        <Option value='weekly'>Weekly</Option>
                                                        <Option value='monthly'>Monthly</Option>
                                                        <Option value='quarterly'>Quarterly</Option>
                                                        <Option value='yearly'>Yearly</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Format'>
                                                    <Select defaultValue='pdf'>
                                                        <Option value='pdf'>PDF</Option>
                                                        <Option value='excel'>Excel</Option>
                                                        <Option value='csv'>CSV</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Delivery Method'>
                                                    <Select defaultValue='email' mode='multiple'>
                                                        <Option value='email'>Email</Option>
                                                        <Option value='dashboard'>Dashboard</Option>
                                                        <Option value='download'>Download Link</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Form.Item label='Email Address'>
                                                    <Input placeholder='Enter email address'/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Button
                                            type='primary'
                                            icon={<FileTextOutlined/>}
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            Schedule Report
                                        </Button>
                                    </Form>
                                </Card>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    // Settings content
    const renderSettings = () => (
        <div className='settings-content'>
            <Row gutter={[24, 24]} className='mb-6'>
                <Col span={24}>
                    <Card className='shadow-md'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                            <Title level={4} className='mb-4 md:mb-0'>
                                Account Settings
                            </Title>
                        </div>

                        <Tabs defaultActiveKey='profile'>
                            <TabPane tab='Profile' key='profile'>
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={8}>
                                        <Card className='text-center p-6'>
                                            <Avatar
                                                size={100}
                                                icon={<UserOutlined/>}
                                                className='mb-4'
                                            />
                                            <Title level={4}>
                                                {userRole === "student"
                                                    ? "Alex Johnson"
                                                    : "Prof. Sarah Williams"}
                                            </Title>
                                            <Text className='block text-gray-500 mb-2'>
                                                {userRole === "student"
                                                    ? "Student ID: S12345678"
                                                    : "Staff ID: F98765432"}
                                            </Text>
                                            <Text className='block text-gray-500 mb-4'>
                                                {userRole === "student"
                                                    ? "Computer Science, Year 3"
                                                    : "Department of Computer Science"}
                                            </Text>
                                            <Button
                                                type='primary'
                                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                Update Profile Picture
                                            </Button>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <Card title='Personal Information'>
                                            <Form layout='vertical'>
                                                <Row gutter={24}>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label='First Name'>
                                                            <Input
                                                                defaultValue={
                                                                    userRole === "student" ? "Alex" : "Sarah"
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label='Last Name'>
                                                            <Input
                                                                defaultValue={
                                                                    userRole === "student"
                                                                        ? "Johnson"
                                                                        : "Williams"
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={24}>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label='Email Address'>
                                                            <Input
                                                                defaultValue={
                                                                    userRole === "student"
                                                                        ? "alex.johnson@university.edu"
                                                                        : "sarah.williams@university.edu"
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label='Phone Number'>
                                                            <Input defaultValue='(555) 123-4567'/>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={24}>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label='Date of Birth'>
                                                            <DatePicker
                                                                style={{width: "100%"}}
                                                                defaultValue={React.createElement(
                                                                    DatePicker.constructor.dayjs,
                                                                    "1998-05-15"
                                                                )}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label='Address'>
                                                            <Input defaultValue='123 University Ave, College Town'/>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    type='primary'
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Save Changes
                                                </Button>
                                            </Form>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab='Security' key='security'>
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={12}>
                                        <Card title='Change Password'>
                                            <Form layout='vertical'>
                                                <Form.Item label='Current Password' required>
                                                    <Input.Password/>
                                                </Form.Item>
                                                <Form.Item label='New Password' required>
                                                    <Input.Password/>
                                                </Form.Item>
                                                <Form.Item label='Confirm New Password' required>
                                                    <Input.Password/>
                                                </Form.Item>
                                                <Button
                                                    type='primary'
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Update Password
                                                </Button>
                                            </Form>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Card title='Two-Factor Authentication'>
                                            <div className='mb-4'>
                                                <Switch defaultChecked/>{" "}
                                                <span className='ml-2'>
                          Enable Two-Factor Authentication
                        </span>
                                            </div>
                                            <Text className='block text-gray-500 mb-4'>
                                                Two-factor authentication adds an extra layer of
                                                security to your account by requiring more than just a
                                                password to sign in.
                                            </Text>
                                            <Button className='mb-4 !rounded-button whitespace-nowrap cursor-pointer'>
                                                Setup Authenticator App
                                            </Button>

                                            <Divider/>

                                            <Title level={5}>Recovery Options</Title>
                                            <Form layout='vertical'>
                                                <Form.Item label='Recovery Email'>
                                                    <Input defaultValue='backup.email@example.com'/>
                                                </Form.Item>
                                                <Form.Item label='Recovery Phone'>
                                                    <Input defaultValue='(555) 987-6543'/>
                                                </Form.Item>
                                                <Button
                                                    type='primary'
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Update Recovery Options
                                                </Button>
                                            </Form>
                                        </Card>
                                    </Col>
                                </Row>

                                <Card title='Login History' className='mt-6'>
                                    <Table
                                        dataSource={[
                                            {
                                                key: "1",
                                                date: "2025-06-05 09:30:45",
                                                device: "Windows PC - Chrome",
                                                location: "College Town, USA",
                                                status: "Success",
                                            },
                                            {
                                                key: "2",
                                                date: "2025-06-04 15:22:18",
                                                device: "iPhone - Safari",
                                                location: "College Town, USA",
                                                status: "Success",
                                            },
                                            {
                                                key: "3",
                                                date: "2025-06-02 11:15:33",
                                                device: "MacBook - Firefox",
                                                location: "College Town, USA",
                                                status: "Success",
                                            },
                                            {
                                                key: "4",
                                                date: "2025-05-30 08:45:12",
                                                device: "Android - Chrome",
                                                location: "New York, USA",
                                                status: "Success",
                                            },
                                            {
                                                key: "5",
                                                date: "2025-05-28 19:10:05",
                                                device: "Unknown Device",
                                                location: "Beijing, China",
                                                status: "Failed",
                                            },
                                        ]}
                                        columns={[
                                            {title: "Date & Time", dataIndex: "date", key: "date"},
                                            {
                                                title: "Device & Browser",
                                                dataIndex: "device",
                                                key: "device",
                                            },
                                            {
                                                title: "Location",
                                                dataIndex: "location",
                                                key: "location",
                                            },
                                            {
                                                title: "Status",
                                                dataIndex: "status",
                                                key: "status",
                                                render: (text: string) => (
                                                    <Tag color={text === "Success" ? "green" : "red"}>
                                                        {text}
                                                    </Tag>
                                                ),
                                            },
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: (_, record) =>
                                                    record.status === "Failed" ? (
                                                        <Button
                                                            type='link'
                                                            danger
                                                            className='cursor-pointer'>
                                                            Report Suspicious
                                                        </Button>
                                                    ) : (
                                                        <Button type='link' className='cursor-pointer'>
                                                            Details
                                                        </Button>
                                                    ),
                                            },
                                        ]}
                                        pagination={{pageSize: 5}}
                                    />
                                </Card>
                            </TabPane>
                            <TabPane tab='Notifications' key='notifications'>
                                <Card title='Notification Preferences'>
                                    <Form layout='vertical'>
                                        <div className='mb-6'>
                                            <Title level={5}>Email Notifications</Title>
                                            <Row gutter={[24, 16]}>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    Payment Reminders
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive reminders about upcoming payments
                                                                </div>
                                                            </div>
                                                            <Switch defaultChecked/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    Payment Confirmations
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive confirmations when payments are
                                                                    processed
                                                                </div>
                                                            </div>
                                                            <Switch defaultChecked/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    Financial Aid Updates
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive updates about financial aid status
                                                                </div>
                                                            </div>
                                                            <Switch defaultChecked/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    New Reports Available
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive notifications when new reports are
                                                                    generated
                                                                </div>
                                                            </div>
                                                            <Switch defaultChecked/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className='mb-6'>
                                            <Title level={5}>Push Notifications</Title>
                                            <Row gutter={[24, 16]}>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    Payment Due Alerts
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive alerts when payments are due soon
                                                                </div>
                                                            </div>
                                                            <Switch defaultChecked/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    Account Activity
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive notifications about account activity
                                                                </div>
                                                            </div>
                                                            <Switch defaultChecked/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>
                                                                    System Updates
                                                                </div>
                                                                <div className='text-gray-500'>
                                                                    Receive notifications about system maintenance
                                                                </div>
                                                            </div>
                                                            <Switch/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item>
                                                        <div className='flex justify-between items-center'>
                                                            <div>
                                                                <div className='font-medium'>New Features</div>
                                                                <div className='text-gray-500'>
                                                                    Receive notifications about new features
                                                                </div>
                                                            </div>
                                                            <Switch/>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className='mb-6'>
                                            <Title level={5}>Notification Frequency</Title>
                                            <Form.Item>
                                                <Radio.Group defaultValue='immediate'>
                                                    <Radio value='immediate'>Immediate</Radio>
                                                    <Radio value='daily'>Daily Digest</Radio>
                                                    <Radio value='weekly'>Weekly Summary</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>

                                        <Button
                                            type='primary'
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            Save Preferences
                                        </Button>
                                    </Form>
                                </Card>
                            </TabPane>
                            <TabPane tab='Payment Methods' key='payment'>
                                <Card title='Saved Payment Methods'>
                                    <div className='mb-6'>
                                        <Row gutter={[24, 24]}>
                                            <Col xs={24} md={8}>
                                                <Card
                                                    className='border border-gray-300 hover:shadow-md transition-shadow'>
                                                    <div className='flex items-center mb-4'>
                                                        <div className='text-2xl text-blue-500 mr-3'>
                                                            <i className='fas fa-credit-card'></i>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                Visa ending in 4567
                                                            </div>
                                                            <div className='text-gray-500'>
                                                                Expires: 09/2027
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Tag color='green' className='mb-2'>
                                                        Default
                                                    </Tag>
                                                    <div className='flex justify-between mt-2'>
                                                        <Button type='link' className='p-0 cursor-pointer'>
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            danger
                                                            className='p-0 cursor-pointer'>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Card
                                                    className='border border-gray-300 hover:shadow-md transition-shadow'>
                                                    <div className='flex items-center mb-4'>
                                                        <div className='text-2xl text-indigo-500 mr-3'>
                                                            <i className='fas fa-university'></i>
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>Bank Account</div>
                                                            <div className='text-gray-500'>
                                                                Ending in 7890
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between mt-2'>
                                                        <Button type='link' className='p-0 cursor-pointer'>
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            type='link'
                                                            danger
                                                            className='p-0 cursor-pointer'>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </Col>
                                            <Col xs={24} md={8}>
                                                <Card
                                                    className='border border-dashed border-gray-300 hover:shadow-md transition-shadow text-center py-10 cursor-pointer'>
                                                    <div className='text-4xl text-gray-400 mb-2'>
                                                        <i className='fas fa-plus-circle'></i>
                                                    </div>
                                                    <div className='font-medium text-gray-500'>
                                                        Add New Payment Method
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Card title='Add New Payment Method' className='mb-6'>
                                        <Form layout='vertical'>
                                            <Row gutter={24}>
                                                <Col xs={24}>
                                                    <Form.Item label='Payment Type'>
                                                        <Radio.Group defaultValue='card'>
                                                            <Radio value='card'>Credit/Debit Card</Radio>
                                                            <Radio value='bank'>Bank Account</Radio>
                                                            <Radio value='paypal'>PayPal</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={24}>
                                                <Col xs={24} md={12}>
                                                    <Form.Item label='Card Number' required>
                                                        <Input placeholder='XXXX XXXX XXXX XXXX'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item label='Cardholder Name' required>
                                                        <Input placeholder='Name as it appears on card'/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={24}>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='Expiration Month' required>
                                                        <Select placeholder='Month'>
                                                            {[...Array(12)].map((_, i) => (
                                                                <Option key={i + 1} value={i + 1}>
                                                                    {String(i + 1).padStart(2, "0")}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='Expiration Year' required>
                                                        <Select placeholder='Year'>
                                                            {[...Array(10)].map((_, i) => (
                                                                <Option key={i} value={2025 + i}>
                                                                    {2025 + i}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='CVV' required>
                                                        <Input placeholder='XXX'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='Zip/Postal Code' required>
                                                        <Input placeholder='XXXXX'/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item>
                                                <Checkbox>Set as default payment method</Checkbox>
                                            </Form.Item>
                                            <Button
                                                type='primary'
                                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                Add Payment Method
                                            </Button>
                                        </Form>
                                    </Card>

                                    <Card title='Billing Address'>
                                        <Form layout='vertical'>
                                            <Row gutter={24}>
                                                <Col xs={24} md={12}>
                                                    <Form.Item label='Address Line 1'>
                                                        <Input defaultValue='123 University Ave'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item label='Address Line 2'>
                                                        <Input defaultValue='Apt 4B'/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={24}>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='City'>
                                                        <Input defaultValue='College Town'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='State/Province'>
                                                        <Input defaultValue='CA'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='Zip/Postal Code'>
                                                        <Input defaultValue='90210'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <Form.Item label='Country'>
                                                        <Select defaultValue='us'>
                                                            <Option value='us'>United States</Option>
                                                            <Option value='ca'>Canada</Option>
                                                            <Option value='uk'>United Kingdom</Option>
                                                            <Option value='au'>Australia</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Button
                                                type='primary'
                                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                Update Billing Address
                                            </Button>
                                        </Form>
                                    </Card>
                                </Card>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    // Help center content
    const renderHelpCenter = () => (
        <div className='help-center-content'>
            <Row gutter={[24, 24]} className='mb-6'>
                <Col span={24}>
                    <Card className='shadow-md'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                            <Title level={4} className='mb-4 md:mb-0'>
                                Help Center
                            </Title>
                            <Input.Search
                                placeholder='Search for help topics'
                                style={{width: 300}}
                                className='text-sm'
                            />
                        </div>

                        <Row gutter={[24, 24]} className='mb-6'>
                            <Col xs={24}>
                                <div className='bg-blue-50 p-6 rounded-lg'>
                                    <Row gutter={24} align='middle'>
                                        <Col xs={24} md={16}>
                                            <Title level={4}>
                                                Need assistance with your financial management?
                                            </Title>
                                            <Paragraph className='mb-4'>
                                                Our support team is here to help you with any questions
                                                or issues you may have regarding your financial account.
                                            </Paragraph>
                                            <Space>
                                                <Button
                                                    type='primary'
                                                    icon={<MailOutlined/>}
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Contact Support
                                                </Button>
                                                <Button
                                                    icon={<QuestionCircleOutlined/>}
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Schedule Consultation
                                                </Button>
                                            </Space>
                                        </Col>
                                        <Col xs={24} md={8} className='text-center'>
                                            <img
                                                src='https://readdy.ai/api/search-image?query=3D%20illustration%20of%20a%20friendly%20customer%20support%20agent%20with%20headset%2C%20professional%20appearance%2C%20modern%20design%2C%20soft%20colors%2C%20minimalist%20style%2C%20financial%20services%20theme%2C%20clean%20background&width=200&height=200&seq=support1&orientation=squarish'
                                                alt='Customer Support'
                                                className='max-w-full h-auto rounded-lg object-cover object-top'
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Tabs defaultActiveKey='faq'>
                            <TabPane tab='Frequently Asked Questions' key='faq'>
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={16}>
                                        <Card title='Common Questions' className='mb-6'>
                                            <Collapse accordion className='bg-white'>
                                                <Collapse.Panel
                                                    header='How do I make a payment?'
                                                    key='1'>
                                                    <p>
                                                        To make a payment, navigate to the Payments tab in
                                                        the main navigation menu. From there, you can select
                                                        the payment method of your choice and follow the
                                                        instructions to complete your payment.
                                                    </p>
                                                    <p className='mt-2'>
                                                        You can pay using credit/debit card, bank transfer,
                                                        or set up a payment plan for larger amounts.
                                                    </p>
                                                    <Button type='link' className='p-0 cursor-pointer'>
                                                        View detailed payment guide
                                                    </Button>
                                                </Collapse.Panel>
                                                <Collapse.Panel header='When are payments due?' key='2'>
                                                    <p>
                                                        Payment due dates vary depending on the type of fee:
                                                    </p>
                                                    <ul className='list-disc pl-5 mt-2'>
                                                        <li>
                                                            Tuition fees are typically due at the beginning of
                                                            each semester.
                                                        </li>
                                                        <li>
                                                            Housing fees are due monthly or per semester,
                                                            depending on your housing contract.
                                                        </li>
                                                        <li>
                                                            Other fees may have specific due dates as
                                                            indicated on your account.
                                                        </li>
                                                    </ul>
                                                    <p className='mt-2'>
                                                        You can view all upcoming payment due dates on your
                                                        Dashboard or Payments tab.
                                                    </p>
                                                </Collapse.Panel>
                                                <Collapse.Panel
                                                    header='How do I view my payment history?'
                                                    key='3'>
                                                    <p>
                                                        Your payment history can be accessed from the
                                                        Payments tab. Click on the "History" sub-tab to view
                                                        a complete record of all your past transactions,
                                                        including payments made, refunds, and adjustments.
                                                    </p>
                                                    <p className='mt-2'>
                                                        You can filter this history by date range, payment
                                                        type, or status to find specific transactions.
                                                    </p>
                                                </Collapse.Panel>
                                                <Collapse.Panel
                                                    header='How do I download receipts or tax documents?'
                                                    key='4'>
                                                    <p>To download receipts or tax documents:</p>
                                                    <ol className='list-decimal pl-5 mt-2'>
                                                        <li>
                                                            Navigate to the Payments tab or Reports tab.
                                                        </li>
                                                        <li>Find the transaction or document you need.</li>
                                                        <li>
                                                            Click the "Download" or "Print" button next to the
                                                            item.
                                                        </li>
                                                    </ol>
                                                    <p className='mt-2'>
                                                        Tax documents are typically available by January
                                                        31st for the previous calendar year.
                                                    </p>
                                                </Collapse.Panel>
                                                <Collapse.Panel
                                                    header="What should I do if I can't make a payment on time?"
                                                    key='5'>
                                                    <p>
                                                        If you're unable to make a payment by the due date,
                                                        you should:
                                                    </p>
                                                    <ol className='list-decimal pl-5 mt-2'>
                                                        <li>
                                                            Contact the Financial Aid office as soon as
                                                            possible.
                                                        </li>
                                                        <li>
                                                            Inquire about payment plan options or deadline
                                                            extensions.
                                                        </li>
                                                        <li>
                                                            Check if you qualify for emergency financial
                                                            assistance.
                                                        </li>
                                                    </ol>
                                                    <p className='mt-2'>
                                                        It's important to address payment issues proactively
                                                        to avoid late fees or registration holds.
                                                    </p>
                                                    <Button type='link' className='p-0 cursor-pointer'>
                                                        Contact Financial Aid Office
                                                    </Button>
                                                </Collapse.Panel>
                                            </Collapse>
                                        </Card>

                                        <Card
                                            title={`${
                                                userRole === "student" ? "Student" : "Staff"
                                            }-Specific Questions`}
                                            className='mb-6'>
                                            <Collapse accordion className='bg-white'>
                                                {userRole === "student" ? (
                                                    <>
                                                        <Collapse.Panel
                                                            header='How do I apply for financial aid?'
                                                            key='1'>
                                                            <p>To apply for financial aid:</p>
                                                            <ol className='list-decimal pl-5 mt-2'>
                                                                <li>
                                                                    Complete the FAFSA (Free Application for
                                                                    Federal Student Aid) at fafsa.gov.
                                                                </li>
                                                                <li>
                                                                    Submit any additional documentation requested
                                                                    by the Financial Aid office.
                                                                </li>
                                                                <li>
                                                                    Check your application status in the Financial
                                                                    Aid tab of this portal.
                                                                </li>
                                                            </ol>
                                                            <p className='mt-2'>
                                                                The priority deadline for FAFSA submission is
                                                                typically March 1st for the following academic
                                                                year.
                                                            </p>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                View Financial Aid Guide
                                                            </Button>
                                                        </Collapse.Panel>
                                                        <Collapse.Panel
                                                            header='How is my tuition calculated?'
                                                            key='2'>
                                                            <p>
                                                                Your tuition is calculated based on several
                                                                factors:
                                                            </p>
                                                            <ul className='list-disc pl-5 mt-2'>
                                                                <li>Number of credit hours enrolled</li>
                                                                <li>Your program of study</li>
                                                                <li>
                                                                    Residency status (in-state or out-of-state)
                                                                </li>
                                                                <li>Mandatory fees for all students</li>
                                                                <li>Program-specific fees</li>
                                                            </ul>
                                                            <p className='mt-2'>
                                                                You can view a detailed breakdown of your
                                                                tuition and fees in the Payments tab.
                                                            </p>
                                                        </Collapse.Panel>
                                                        <Collapse.Panel
                                                            header='What payment plans are available?'
                                                            key='3'>
                                                            <p>
                                                                The university offers several payment plan
                                                                options:
                                                            </p>
                                                            <ul className='list-disc pl-5 mt-2'>
                                                                <li>
                                                                    <strong>Semester Plan:</strong> Split your
                                                                    semester balance into 3-4 monthly payments
                                                                </li>
                                                                <li>
                                                                    <strong>Annual Plan:</strong> Split your
                                                                    annual balance into 8-10 monthly payments
                                                                </li>
                                                                <li>
                                                                    <strong>Summer Plan:</strong> Special payment
                                                                    plan for summer courses
                                                                </li>
                                                            </ul>
                                                            <p className='mt-2'>
                                                                Each plan has a small enrollment fee. You can
                                                                enroll in a payment plan through the Payments
                                                                tab.
                                                            </p>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                Compare Payment Plans
                                                            </Button>
                                                        </Collapse.Panel>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Collapse.Panel
                                                            header='How do I view my pay stubs?'
                                                            key='1'>
                                                            <p>To view your pay stubs:</p>
                                                            <ol className='list-decimal pl-5 mt-2'>
                                                                <li>
                                                                    Navigate to the Salary tab in the main
                                                                    navigation menu.
                                                                </li>
                                                                <li>
                                                                    Select the "History" sub-tab to see all past
                                                                    pay periods.
                                                                </li>
                                                                <li>
                                                                    Click "Download" or "View" next to any pay
                                                                    period to access the detailed pay stub.
                                                                </li>
                                                            </ol>
                                                            <p className='mt-2'>
                                                                Pay stubs are typically available on the day of
                                                                payment and include a detailed breakdown of
                                                                earnings, taxes, and deductions.
                                                            </p>
                                                        </Collapse.Panel>
                                                        <Collapse.Panel
                                                            header='How do I update my tax withholding?'
                                                            key='2'>
                                                            <p>To update your tax withholding information:</p>
                                                            <ol className='list-decimal pl-5 mt-2'>
                                                                <li>
                                                                    Go to the Salary tab and select the "Tax
                                                                    Documents" sub-tab.
                                                                </li>
                                                                <li>Click on "Tax Withholding" section.</li>
                                                                <li>
                                                                    Update your federal and state withholding
                                                                    preferences.
                                                                </li>
                                                                <li>
                                                                    Click "Update Withholding" to save your
                                                                    changes.
                                                                </li>
                                                            </ol>
                                                            <p className='mt-2'>
                                                                Changes to withholding typically take effect in
                                                                the next pay period after submission.
                                                            </p>
                                                        </Collapse.Panel>
                                                        <Collapse.Panel
                                                            header='How do I submit a reimbursement request?'
                                                            key='3'>
                                                            <p>To submit a reimbursement request:</p>
                                                            <ol className='list-decimal pl-5 mt-2'>
                                                                <li>Navigate to the Salary tab.</li>
                                                                <li>
                                                                    Select "Reimbursements" from the sub-menu.
                                                                </li>
                                                                <li>Click "New Reimbursement Request".</li>
                                                                <li>
                                                                    Fill out the required information and attach
                                                                    receipts.
                                                                </li>
                                                                <li>Submit the request for approval.</li>
                                                            </ol>
                                                            <p className='mt-2'>
                                                                Reimbursement requests are typically processed
                                                                within 5-7 business days after approval.
                                                            </p>
                                                            <Button
                                                                type='link'
                                                                className='p-0 cursor-pointer'>
                                                                View Reimbursement Policy
                                                            </Button>
                                                        </Collapse.Panel>
                                                    </>
                                                )}
                                            </Collapse>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card title='Quick Resources' className='mb-6'>
                                            <ul className='space-y-4'>
                                                <li className='flex items-start'>
                                                    <div className='mr-3 text-blue-500'>
                                                        <FileTextOutlined style={{fontSize: "20px"}}/>
                                                    </div>
                                                    <div>
                                                        <div className='font-medium'>
                                                            Financial Handbook
                                                        </div>
                                                        <div className='text-gray-500'>
                                                            Complete guide to financial policies
                                                        </div>
                                                        <Button type='link' className='p-0 cursor-pointer'>
                                                            Download PDF
                                                        </Button>
                                                    </div>
                                                </li>
                                                <li className='flex items-start'>
                                                    <div className='mr-3 text-green-500'>
                                                        <FileTextOutlined style={{fontSize: "20px"}}/>
                                                    </div>
                                                    <div>
                                                        <div className='font-medium'>Payment Guide</div>
                                                        <div className='text-gray-500'>
                                                            Step-by-step payment instructions
                                                        </div>
                                                        <Button type='link' className='p-0 cursor-pointer'>
                                                            View Guide
                                                        </Button>
                                                    </div>
                                                </li>
                                                <li className='flex items-start'>
                                                    <div className='mr-3 text-purple-500'>
                                                        <FileTextOutlined style={{fontSize: "20px"}}/>
                                                    </div>
                                                    <div>
                                                        <div className='font-medium'>
                                                            {userRole === "student"
                                                                ? "Financial Aid Guide"
                                                                : "Tax Information Guide"}
                                                        </div>
                                                        <div className='text-gray-500'>
                                                            {userRole === "student"
                                                                ? "Information about aid programs"
                                                                : "Tax filing resources"}
                                                        </div>
                                                        <Button type='link' className='p-0 cursor-pointer'>
                                                            View Guide
                                                        </Button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Card>

                                        <Card title='Contact Information' className='mb-6'>
                                            <ul className='space-y-4'>
                                                <li className='flex items-start'>
                                                    <div className='mr-3 text-blue-500'>
                                                        <MailOutlined style={{fontSize: "20px"}}/>
                                                    </div>
                                                    <div>
                                                        <div className='font-medium'>
                                                            Financial Services
                                                        </div>
                                                        <div className='text-gray-500'>
                                                            finance@university.edu
                                                        </div>
                                                        <div className='text-gray-500'>(555) 123-4567</div>
                                                    </div>
                                                </li>
                                                <li className='flex items-start'>
                                                    <div className='mr-3 text-green-500'>
                                                        <TeamOutlined style={{fontSize: "20px"}}/>
                                                    </div>
                                                    <div>
                                                        <div className='font-medium'>
                                                            {userRole === "student"
                                                                ? "Financial Aid Office"
                                                                : "Payroll Department"}
                                                        </div>
                                                        <div className='text-gray-500'>
                                                            {userRole === "student"
                                                                ? "finaid@university.edu"
                                                                : "payroll@university.edu"}
                                                        </div>
                                                        <div className='text-gray-500'>(555) 123-4568</div>
                                                    </div>
                                                </li>
                                                <li className='flex items-start'>
                                                    <div className='mr-3 text-red-500'>
                                                        <QuestionCircleOutlined
                                                            style={{fontSize: "20px"}}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className='font-medium'>Technical Support</div>
                                                        <div className='text-gray-500'>
                                                            support@university.edu
                                                        </div>
                                                        <div className='text-gray-500'>(555) 123-4569</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Card>

                                        <Card title='Office Hours' className='mb-6'>
                                            <ul className='space-y-2'>
                                                <li className='flex justify-between'>
                                                    <span>Monday - Friday:</span>
                                                    <span>8:00 AM - 5:00 PM</span>
                                                </li>
                                                <li className='flex justify-between'>
                                                    <span>Saturday:</span>
                                                    <span>10:00 AM - 2:00 PM</span>
                                                </li>
                                                <li className='flex justify-between'>
                                                    <span>Sunday:</span>
                                                    <span>Closed</span>
                                                </li>
                                            </ul>
                                            <Divider/>
                                            <div className='text-center'>
                                                <Button
                                                    type='primary'
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Schedule Appointment
                                                </Button>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab='Video Tutorials' key='tutorials'>
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={8}>
                                        <Card
                                            cover={
                                                <div className='relative'>
                                                    <img
                                                        src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20financial%20management%20system%20tutorial%20video%2C%20showing%20a%20dashboard%20with%20charts%20and%20graphs%2C%20professional%20interface%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial1&orientation=landscape'
                                                        alt='System Overview Tutorial'
                                                        className='w-full h-48 object-cover object-top'
                                                    />
                                                    <div className='absolute inset-0 flex items-center justify-center'>
                                                        <div
                                                            className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
                                                            <i className='fas fa-play'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            className='hover:shadow-lg transition-shadow cursor-pointer'>
                                            <Card.Meta
                                                title='System Overview Tutorial'
                                                description='Learn the basics of navigating the financial management system.'
                                            />
                                            <div className='mt-3 text-gray-500'>
                                                <span>5:32</span> • <span>Published: May 15, 2025</span>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card
                                            cover={
                                                <div className='relative'>
                                                    <img
                                                        src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20payment%20processing%20tutorial%20video%2C%20showing%20credit%20card%20payment%20form%2C%20secure%20transaction%20interface%2C%20step-by-step%20guide%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial2&orientation=landscape'
                                                        alt='Making Payments Tutorial'
                                                        className='w-full h-48 object-cover object-top'
                                                    />
                                                    <div className='absolute inset-0 flex items-center justify-center'>
                                                        <div
                                                            className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
                                                            <i className='fas fa-play'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            className='hover:shadow-lg transition-shadow cursor-pointer'>
                                            <Card.Meta
                                                title={
                                                    userRole === "student"
                                                        ? "Making Payments Tutorial"
                                                        : "Accessing Payslips Tutorial"
                                                }
                                                description={
                                                    userRole === "student"
                                                        ? "Step-by-step guide to making payments online."
                                                        : "How to view and download your payslips."
                                                }
                                            />
                                            <div className='mt-3 text-gray-500'>
                                                <span>4:15</span> • <span>Published: May 20, 2025</span>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card
                                            cover={
                                                <div className='relative'>
                                                    <img
                                                        src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20financial%20reports%20tutorial%20video%2C%20showing%20data%20visualization%2C%20charts%2C%20graphs%2C%20analytics%20dashboard%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial3&orientation=landscape'
                                                        alt='Generating Reports Tutorial'
                                                        className='w-full h-48 object-cover object-top'
                                                    />
                                                    <div className='absolute inset-0 flex items-center justify-center'>
                                                        <div
                                                            className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
                                                            <i className='fas fa-play'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            className='hover:shadow-lg transition-shadow cursor-pointer'>
                                            <Card.Meta
                                                title='Generating Reports Tutorial'
                                                description='Learn how to create and customize financial reports.'
                                            />
                                            <div className='mt-3 text-gray-500'>
                                                <span>6:48</span> • <span>Published: May 25, 2025</span>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card
                                            cover={
                                                <div className='relative'>
                                                    <img
                                                        src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20security%20settings%20tutorial%20video%2C%20showing%20two-factor%20authentication%20setup%2C%20password%20management%20interface%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial4&orientation=landscape'
                                                        alt='Security Settings Tutorial'
                                                        className='w-full h-48 object-cover object-top'
                                                    />
                                                    <div className='absolute inset-0 flex items-center justify-center'>
                                                        <div
                                                            className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
                                                            <i className='fas fa-play'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            className='hover:shadow-lg transition-shadow cursor-pointer'>
                                            <Card.Meta
                                                title='Security Settings Tutorial'
                                                description='How to secure your account with two-factor authentication.'
                                            />
                                            <div className='mt-3 text-gray-500'>
                                                <span>3:27</span> • <span>Published: May 30, 2025</span>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card
                                            cover={
                                                <div className='relative'>
                                                    <img
                                                        src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20mobile%20app%20tutorial%20video%2C%20showing%20financial%20management%20app%20on%20smartphone%2C%20user%20interface%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial5&orientation=landscape'
                                                        alt='Mobile App Tutorial'
                                                        className='w-full h-48 object-cover object-top'
                                                    />
                                                    <div className='absolute inset-0 flex items-center justify-center'>
                                                        <div
                                                            className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
                                                            <i className='fas fa-play'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            className='hover:shadow-lg transition-shadow cursor-pointer'>
                                            <Card.Meta
                                                title='Mobile App Tutorial'
                                                description='Using the financial management system on your mobile device.'
                                            />
                                            <div className='mt-3 text-gray-500'>
                                                <span>4:52</span> • <span>Published: June 1, 2025</span>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card
                                            cover={
                                                <div className='relative'>
                                                    <img
                                                        src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20financial%20aid%20tutorial%20video%2C%20showing%20scholarship%20application%20form%2C%20financial%20aid%20dashboard%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial6&orientation=landscape'
                                                        alt='Financial Aid Tutorial'
                                                        className='w-full h-48 object-cover object-top'
                                                    />
                                                    <div className='absolute inset-0 flex items-center justify-center'>
                                                        <div
                                                            className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
                                                            <i className='fas fa-play'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            className='hover:shadow-lg transition-shadow cursor-pointer'>
                                            <Card.Meta
                                                title={
                                                    userRole === "student"
                                                        ? "Financial Aid Tutorial"
                                                        : "Tax Documents Tutorial"
                                                }
                                                description={
                                                    userRole === "student"
                                                        ? "Understanding and applying for financial aid."
                                                        : "Accessing and understanding your tax documents."
                                                }
                                            />
                                            <div className='mt-3 text-gray-500'>
                                                <span>7:15</span> • <span>Published: June 3, 2025</span>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab='Support Tickets' key='tickets'>
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={16}>
                                        <Card title='My Support Tickets' className='mb-6'>
                                            <Table
                                                dataSource={[
                                                    {
                                                        key: "1",
                                                        id: "TKT-2025-001",
                                                        subject: "Payment not showing in account",
                                                        date: "2025-06-01",
                                                        status: "Open",
                                                    },
                                                    {
                                                        key: "2",
                                                        id: "TKT-2025-002",
                                                        subject: "Error when generating report",
                                                        date: "2025-05-28",
                                                        status: "In Progress",
                                                    },
                                                    {
                                                        key: "3",
                                                        id: "TKT-2025-003",
                                                        subject: "Question about financial aid application",
                                                        date: "2025-05-20",
                                                        status: "Closed",
                                                    },
                                                ]}
                                                columns={[
                                                    {title: "Ticket ID", dataIndex: "id", key: "id"},
                                                    {
                                                        title: "Subject",
                                                        dataIndex: "subject",
                                                        key: "subject",
                                                    },
                                                    {
                                                        title: "Date Created",
                                                        dataIndex: "date",
                                                        key: "date",
                                                    },
                                                    {
                                                        title: "Status",
                                                        dataIndex: "status",
                                                        key: "status",
                                                        render: (text: string) => {
                                                            let color = "blue";
                                                            if (text === "Open") color = "green";
                                                            else if (text === "In Progress") color = "orange";
                                                            else if (text === "Closed") color = "gray";
                                                            return <Tag color={color}>{text}</Tag>;
                                                        },
                                                    },
                                                    {
                                                        title: "Action",
                                                        key: "action",
                                                        render: (_, record) => (
                                                            <Button type='link' className='cursor-pointer'>
                                                                View Details
                                                            </Button>
                                                        ),
                                                    },
                                                ]}
                                                pagination={false}
                                            />
                                        </Card>

                                        <Card title='Create New Support Ticket' className='mb-6'>
                                            <Form layout='vertical'>
                                                <Form.Item label='Subject' required>
                                                    <Input placeholder='Brief description of your issue'/>
                                                </Form.Item>
                                                <Form.Item label='Category' required>
                                                    <Select defaultValue='payment'>
                                                        <Option value='payment'>Payment Issues</Option>
                                                        <Option value='account'>Account Access</Option>
                                                        <Option value='financial'>Financial Aid</Option>
                                                        <Option value='technical'>Technical Support</Option>
                                                        <Option value='other'>Other</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label='Priority'>
                                                    <Select defaultValue='normal'>
                                                        <Option value='low'>Low</Option>
                                                        <Option value='normal'>Normal</Option>
                                                        <Option value='high'>High</Option>
                                                        <Option value='urgent'>Urgent</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label='Description' required>
                                                    <Input.TextArea
                                                        rows={6}
                                                        placeholder='Please provide details about your issue...'
                                                    />
                                                </Form.Item>
                                                <Form.Item label='Attachments'>
                                                    <Upload>
                                                        <Button
                                                            icon={<UploadOutlined/>}
                                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                            Upload Files
                                                        </Button>
                                                    </Upload>
                                                </Form.Item>
                                                <Button
                                                    type='primary'
                                                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                    Submit Ticket
                                                </Button>
                                            </Form>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card title='Support Information' className='mb-6'>
                                            <div className='mb-4'>
                                                <Title level={5}>Support Hours</Title>
                                                <ul className='space-y-2'>
                                                    <li className='flex justify-between'>
                                                        <span>Monday - Friday:</span>
                                                        <span>8:00 AM - 8:00 PM</span>
                                                    </li>
                                                    <li className='flex justify-between'>
                                                        <span>Saturday:</span>
                                                        <span>10:00 AM - 4:00 PM</span>
                                                    </li>
                                                    <li className='flex justify-between'>
                                                        <span>Sunday:</span>
                                                        <span>Closed</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className='mb-4'>
                                                <Title level={5}>Contact Methods</Title>
                                                <ul className='space-y-3'>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-blue-500'>
                                                            <MailOutlined style={{fontSize: "16px"}}/>
                                                        </div>
                                                        <div>
                                                            <div>support@university.edu</div>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-green-500'>
                                                            <PhoneOutlined style={{fontSize: "16px"}}/>
                                                        </div>
                                                        <div>
                                                            <div>(555) 123-4569</div>
                                                        </div>
                                                    </li>
                                                    <li className='flex items-start'>
                                                        <div className='mr-3 text-purple-500'>
                                                            <MessageOutlined style={{fontSize: "16px"}}/>
                                                        </div>
                                                        <div>
                                                            <div>Live Chat (when available)</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <Title level={5}>Response Times</Title>
                                                <ul className='space-y-2'>
                                                    <li className='flex justify-between'>
                                                        <span>Email:</span>
                                                        <span>Within 24 hours</span>
                                                    </li>
                                                    <li className='flex justify-between'>
                                                        <span>Phone:</span>
                                                        <span>Immediate during hours</span>
                                                    </li>
                                                    <li className='flex justify-between'>
                                                        <span>Tickets:</span>
                                                        <span>1-2 business days</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Card>

                                        <Card title='Common Issues' className='mb-6'>
                                            <ul className='space-y-4'>
                                                <li>
                                                    <Button
                                                        type='link'
                                                        className='p-0 text-left cursor-pointer'>
                                                        I can't log into my account
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button
                                                        type='link'
                                                        className='p-0 text-left cursor-pointer'>
                                                        My payment isn't showing up
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button
                                                        type='link'
                                                        className='p-0 text-left cursor-pointer'>
                                                        I need to update my payment method
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button
                                                        type='link'
                                                        className='p-0 text-left cursor-pointer'>
                                                        How do I download my tax documents?
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button
                                                        type='link'
                                                        className='p-0 text-left cursor-pointer'>
                                                        I need to request a payment extension
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Card>

                                        <Card className='text-center'>
                                            <div className='text-4xl text-blue-500 mb-2'>
                                                <i className='fas fa-comments'></i>
                                            </div>
                                            <Title level={5}>Live Chat Support</Title>
                                            <Text className='block text-gray-500 mb-4'>
                                                Chat with a support agent for immediate assistance
                                            </Text>
                                            <Button
                                                type='primary'
                                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                                Start Chat
                                            </Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    // Payment modal content
    const renderPaymentModal = () => (
        <Modal
            title={userRole === "student" ? "Make a Payment" : "Salary Details"}
            visible={paymentModalVisible}
            onCancel={closePaymentModal}
            footer={null}
            width={800}>
            {userRole === "student" ? (
                <div>
                    <div className='mb-6'>
                        <Title level={5}>Payment Summary</Title>
                        <Card className='bg-gray-50'>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <div className='text-gray-500'>Total Due:</div>
                                    <div className='text-xl font-semibold'>$2,350.00</div>
                                </Col>
                                <Col span={12}>
                                    <div className='text-gray-500'>Due Date:</div>
                                    <div className='text-xl font-semibold'>June 15, 2025</div>
                                </Col>
                            </Row>
                        </Card>
                    </div>

                    <div className='mb-6'>
                        <Title level={5}>Select Payment Method</Title>
                        <Radio.Group defaultValue='card' className='w-full'>
                            <Space direction='vertical' className='w-full'>
                                <Radio value='card'>
                                    <Card className='w-full border border-gray-300 hover:border-blue-500'>
                                        <div className='flex items-center'>
                                            <div className='text-2xl text-blue-500 mr-3'>
                                                <i className='fas fa-credit-card'></i>
                                            </div>
                                            <div>
                                                <div className='font-medium'>Credit/Debit Card</div>
                                                <div className='text-gray-500'>Visa ending in 4567</div>
                                            </div>
                                        </div>
                                    </Card>
                                </Radio>
                                <Radio value='bank'>
                                    <Card className='w-full border border-gray-300 hover:border-blue-500'>
                                        <div className='flex items-center'>
                                            <div className='text-2xl text-green-500 mr-3'>
                                                <i className='fas fa-university'></i>
                                            </div>
                                            <div>
                                                <div className='font-medium'>Bank Account</div>
                                                <div className='text-gray-500'>
                                                    Checking ending in 7890
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Radio>
                                <Radio value='new'>
                                    <Card className='w-full border border-gray-300 hover:border-blue-500'>
                                        <div className='flex items-center'>
                                            <div className='text-2xl text-purple-500 mr-3'>
                                                <i className='fas fa-plus-circle'></i>
                                            </div>
                                            <div>
                                                <div className='font-medium'>
                                                    Add New Payment Method
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div className='mb-6'>
                        <Title level={5}>Payment Amount</Title>
                        <Form layout='vertical'>
                            <Form.Item>
                                <Radio.Group defaultValue='full' className='w-full mb-4'>
                                    <Radio value='full'>Pay Full Amount ($2,350.00)</Radio>
                                    <Radio value='partial'>Pay Partial Amount</Radio>
                                </Radio.Group>
                                <Input prefix='$' suffix='USD' defaultValue='2350.00'/>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='flex justify-between'>
                        <Button
                            onClick={closePaymentModal}
                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                            Cancel
                        </Button>
                        <Button
                            type='primary'
                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                            Proceed to Payment
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='mb-6'>
                        <Title level={5}>Current Pay Period</Title>
                        <Card className='bg-gray-50'>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <div className='text-gray-500'>Pay Date:</div>
                                    <div className='text-xl font-semibold'>May 30, 2025</div>
                                </Col>
                                <Col span={8}>
                                    <div className='text-gray-500'>Gross Pay:</div>
                                    <div className='text-xl font-semibold'>$4,200.00</div>
                                </Col>
                                <Col span={8}>
                                    <div className='text-gray-500'>Net Pay:</div>
                                    <div className='text-xl font-semibold'>$3,250.00</div>
                                </Col>
                            </Row>
                        </Card>
                    </div>

                    <div className='mb-6'>
                        <Title level={5}>Earnings</Title>
                        <Table
                            dataSource={[
                                {
                                    key: "1",
                                    description: "Base Salary",
                                    hours: "160.00",
                                    rate: "$25.00",
                                    amount: "$4,000.00",
                                },
                                {
                                    key: "2",
                                    description: "Overtime",
                                    hours: "4.00",
                                    rate: "$37.50",
                                    amount: "$150.00",
                                },
                                {
                                    key: "3",
                                    description: "Research Bonus",
                                    hours: "-",
                                    rate: "-",
                                    amount: "$50.00",
                                },
                            ]}
                            columns={[
                                {
                                    title: "Description",
                                    dataIndex: "description",
                                    key: "description",
                                },
                                {title: "Hours", dataIndex: "hours", key: "hours"},
                                {title: "Rate", dataIndex: "rate", key: "rate"},
                                {title: "Amount", dataIndex: "amount", key: "amount"},
                            ]}
                            pagination={false}
                            summary={() => (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={3}>
                                        <strong>Total Earnings</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>
                                        <strong>$4,200.00</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            )}
                        />
                    </div>

                    <div className='mb-6'>
                        <Title level={5}>Deductions</Title>
                        <Table
                            dataSource={[
                                {
                                    key: "1",
                                    description: "Federal Income Tax",
                                    amount: "$800.00",
                                },
                                {
                                    key: "2",
                                    description: "State Income Tax",
                                    amount: "$250.00",
                                },
                                {key: "3", description: "Social Security", amount: "$260.40"},
                                {key: "4", description: "Medicare", amount: "$60.90"},
                                {key: "5", description: "Retirement Plan", amount: "$420.00"},
                                {
                                    key: "6",
                                    description: "Health Insurance",
                                    amount: "$150.00",
                                },
                                {key: "7", description: "Dental Insurance", amount: "$25.00"},
                                {key: "8", description: "Vision Insurance", amount: "$15.00"},
                            ]}
                            columns={[
                                {
                                    title: "Description",
                                    dataIndex: "description",
                                    key: "description",
                                },
                                {title: "Amount", dataIndex: "amount", key: "amount"},
                            ]}
                            pagination={false}
                            summary={() => (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>
                                        <strong>Total Deductions</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <strong>$1,981.30</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            )}
                        />
                    </div>

                    <div className='flex justify-between'>
                        <Button
                            onClick={closePaymentModal}
                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                            Close
                        </Button>
                        <Space>
                            <Button
                                icon={<PrintOutlined/>}
                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                Print
                            </Button>
                            <Button
                                type='primary'
                                icon={<DownloadOutlined/>}
                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                Download PDF
                            </Button>
                        </Space>
                    </div>
                </div>
            )}
        </Modal>
    );

    return (
        <div className='min-h-screen bg-gray-50'>
            <Layout className='min-h-screen'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={250}
                    className='shadow-md'
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 10,
                    }}>
                    <div className='logo p-4 flex items-center justify-center'>
                        {collapsed ? (
                            <div className='text-white text-2xl'>
                                <i className='fas fa-university'></i>
                            </div>
                        ) : (
                            <div className='text-white text-xl font-bold flex items-center'>
                                <i className='fas fa-university mr-2'></i>
                                <span>Edu StudentFinance</span>
                            </div>
                        )}
                    </div>
                    <Menu
                        theme='dark'
                        mode='inline'
                        selectedKeys={[activeTab]}
                        onClick={({key}) => handleTabChange(key as string)}>
                        <Menu.Item key='dashboard' icon={<DashboardOutlined/>}>
                            Dashboard
                        </Menu.Item>
                        <Menu.Item key='financial' icon={<PieChartOutlined/>}>
                            Financial Overview
                        </Menu.Item>
                        <Menu.Item key='payments' icon={<DollarOutlined/>}>
                            {userRole === "student" ? "Payments" : "Salary"}
                        </Menu.Item>
                        <Menu.Item key='reports' icon={<FileTextOutlined/>}>
                            Reports
                        </Menu.Item>
                        <Menu.Item key='settings' icon={<SettingOutlined/>}>
                            Settings
                        </Menu.Item>
                        <Menu.Item key='help' icon={<QuestionCircleOutlined/>}>
                            Help Center
                        </Menu.Item>
                    </Menu>
                    <div className='p-4 absolute bottom-0 left-0 right-0 border-t border-gray-700'>
                        <Button
                            type='text'
                            icon={collapsed ? <UserOutlined/> : <LogoutOutlined/>}
                            className='w-full text-gray-400 hover:text-white cursor-pointer'>
                            {!collapsed && "Logout"}
                        </Button>
                    </div>
                </Sider>
                <Layout
                    className='transition-all duration-300'
                    style={{marginLeft: collapsed ? 80 : 250}}>
                    <Header
                        className='bg-white p-0 flex items-center justify-between shadow-sm z-5'
                        style={{position: "sticky", top: 0, zIndex: 1}}>
                        <div className='flex items-center'>
                            <Button
                                type='text'
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={toggleCollapsed}
                                className='w-16 h-16 cursor-pointer'
                            />
                            <div className='text-lg font-medium ml-2'>
                                {activeTab === "dashboard" && "Dashboard"}
                                {activeTab === "financial" && "Financial Overview"}
                                {activeTab === "payments" &&
                                    (userRole === "student"
                                        ? "Payments & Fees"
                                        : "Salary & Compensation")}
                                {activeTab === "reports" && "Financial Reports"}
                                {activeTab === "settings" && "Account Settings"}
                                {activeTab === "help" && "Help Center"}
                            </div>
                        </div>
                        <div className='flex items-center mr-6'>
                            <Input.Search
                                placeholder='Search...'
                                style={{width: 250}}
                                className='mr-4 text-sm'
                            />
                            <div className='relative mr-4'>
                                <Badge count={3}>
                                    <Button
                                        type='text'
                                        icon={<BellOutlined/>}
                                        onClick={toggleNotifications}
                                        className='cursor-pointer'
                                    />
                                </Badge>
                                {notificationsVisible && (
                                    <div className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10'>
                                        <div className='p-3 border-b flex justify-between items-center'>
                                            <span className='font-medium'>Notifications</span>
                                            <Button
                                                type='link'
                                                size='small'
                                                className='cursor-pointer'>
                                                Mark all as read
                                            </Button>
                                        </div>
                                        <div className='max-h-80 overflow-y-auto'>
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className='p-3 border-b hover:bg-gray-50 cursor-pointer'>
                                                    <div className='flex items-start'>
                                                        <div className='mr-3'>
                                                            {notification.type === "warning" && (
                                                                <WarningOutlined className='text-yellow-500'/>
                                                            )}
                                                            {notification.type === "success" && (
                                                                <CheckCircleOutlined className='text-green-500'/>
                                                            )}
                                                            {notification.type === "info" && (
                                                                <InfoCircleOutlined className='text-blue-500'/>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className='font-medium'>
                                                                {notification.title}
                                                            </div>
                                                            <div className='text-gray-500 text-sm'>
                                                                {notification.message}
                                                            </div>
                                                            <div className='text-gray-400 text-xs mt-1'>
                                                                {notification.time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='p-2 text-center border-t'>
                                            <Button type='link' className='cursor-pointer'>
                                                View All Notifications
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='relative'>
                                <Button
                                    type='text'
                                    icon={<Avatar size='small' icon={<UserOutlined/>}/>}
                                    onClick={toggleUserMenu}
                                    className='flex items-center cursor-pointer'>
                  <span className='ml-2 mr-1'>
                    {userRole === "student" ? "Alex Johnson" : "Prof. Williams"}
                  </span>
                                    <DownOutlined/>
                                </Button>
                                {userMenuVisible && (
                                    <div className='absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10'>
                                        <div className='p-3 border-b'>
                                            <div className='font-medium'>
                                                {userRole === "student"
                                                    ? "Alex Johnson"
                                                    : "Prof. Sarah Williams"}
                                            </div>
                                            <div className='text-gray-500 text-sm'>
                                                {userRole === "student"
                                                    ? "Student ID: S12345678"
                                                    : "Staff ID: F98765432"}
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                type='text'
                                                className='w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer'>
                                                Profile Settings
                                            </Button>
                                            <Button
                                                type='text'
                                                className='w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer'
                                                onClick={switchRole}>
                                                Switch to {userRole === "student" ? "Staff" : "Student"}{" "}
                                                View
                                            </Button>
                                            <Button
                                                type='text'
                                                className='w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer'>
                                                Help & Support
                                            </Button>
                                            <div className='border-t'>
                                                <Button
                                                    type='text'
                                                    icon={<LogoutOutlined/>}
                                                    className='w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer'>
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Header>
                    <Content className='p-6 bg-gray-50 min-h-screen'>
                        {loading ? (
                            <div className='flex justify-center items-center h-full'>
                                <Spin size='large'/>
                            </div>
                        ) : (
                            <>
                                {activeTab === "dashboard" && renderDashboard()}
                                {activeTab === "financial" && renderFinancialOverview()}
                                {activeTab === "payments" && renderPayments()}
                                {activeTab === "reports" && renderReports()}
                                {activeTab === "settings" && renderSettings()}
                                {activeTab === "help" && renderHelpCenter()}
                            </>
                        )}
                    </Content>
                    <Footer className='text-center bg-white shadow-inner'>
                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <div className='mb-4 md:mb-0'>
                                <div className='text-gray-500'>
                                    © 2025 University Financial Management System. All rights
                                    reserved.
                                </div>
                            </div>
                            <div className='flex space-x-4'>
                                <Button type='link' className='text-gray-500 cursor-pointer'>
                                    Privacy Policy
                                </Button>
                                <Button type='link' className='text-gray-500 cursor-pointer'>
                                    Terms of Service
                                </Button>
                                <Button type='link' className='text-gray-500 cursor-pointer'>
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </Footer>
                </Layout>
            </Layout>
            {renderPaymentModal()}
        </div>
    );
};

export default App;
