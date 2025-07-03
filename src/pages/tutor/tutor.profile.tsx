import {Avatar, Typography, Button, Card, Descriptions, Divider, List, Table} from "antd";
import {
    ClockCircleOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    GlobalOutlined,
    MailOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import React from "react";
import {selectAuth} from "src/redux/auth/selectors.ts";
import {useSelector} from "react-redux";

const classes = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        schedule: "Monday, Wednesday, Friday 9:00 AM - 11:00 AM",
        location: "Block A, Room 205",
        students: 45,
        attendance: 92,
        assignments: 5,
        cats: 3,
        semester: "Fall 2025",
        department: "Computer Science",
    },
    {
        id: 2,
        code: "CS205",
        name: "Database Management Systems",
        schedule: "Tuesday, Thursday 2:00 PM - 4:00 PM",
        location: "Block B, Room 103",
        students: 38,
        attendance: 85,
        assignments: 4,
        cats: 2,
        semester: "Fall 2025",
        department: "Computer Science",
    },
    {
        id: 3,
        code: "CS310",
        name: "Advanced Programming Techniques",
        schedule: "Monday, Wednesday 1:00 PM - 3:00 PM",
        location: "ICT Center, Lab 3",
        students: 32,
        attendance: 88,
        assignments: 6,
        cats: 3,
        semester: "Fall 2025",
        department: "Computer Science",
    },
    {
        id: 4,
        code: "CS401",
        name: "Network Security",
        schedule: "Friday 9:00 AM - 12:00 PM",
        location: "Block C, Room 301",
        students: 28,
        attendance: 90,
        assignments: 3,
        cats: 2,
        semester: "Fall 2025",
        department: "Computer Science",
    },
];

function TutorProfile() {

    const {Title, Text} = Typography
    const {current} = useSelector(selectAuth)

    console.log(current.UserInfo)
    return <div className="p-6 sm:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <Card className="shadow-md text-center">
                    <Avatar
                        size={100}
                        src={current.UserInfo.bio}
                    />
                    <Title level={4} className="mt-4">
                        Dr. {current.UserInfo.fullname}
                    </Title>
                    <Text type="secondary">
                        Senior Lecturer, ICT Department
                    </Text>
                    <Divider/>
                    <div className="flex justify-center space-x-4">
                        <a href={`mailto:${current.UserInfo.email}`}><Button
                            icon={<MailOutlined/>}
                            shape="circle"
                            className="cursor-pointer !rounded-button"
                        /></a>
                        <Button
                            icon={<PhoneOutlined/>}
                            shape="circle"
                            className="cursor-pointer !rounded-button"
                        />
                        <Button
                            icon={<GlobalOutlined/>}
                            shape="circle"
                            className="cursor-pointer !rounded-button"
                        />
                    </div>
                </Card>

                <Card title="Contact Information" className="shadow-md mt-6">
                    <div className="space-y-4">
                        <div>
                            <Text type="secondary">Email</Text>
                            <div className="flex items-center mt-1">
                                <MailOutlined className="mr-2"/>
                                <Text>{current.UserInfo.email}</Text>
                            </div>
                        </div>
                        <div>
                            <Text type="secondary">Phone</Text>
                            <div className="flex items-center mt-1">
                                <PhoneOutlined className="mr-2"/>
                                <Text>+254 7.. ... ...</Text>
                            </div>
                        </div>
                        <div>
                            <Text type="secondary">Office</Text>
                            <div className="flex items-center mt-1">
                                <EnvironmentOutlined className="mr-2"/>
                                <Text>Main Office</Text>
                            </div>
                        </div>
                        <div>
                            <Text type="secondary">Office Hours</Text>
                            <div className="flex items-center mt-1">
                                <ClockCircleOutlined className="mr-2"/>
                                <Text>Monday - Friday, 08:00 AM - 17:00 PM</Text>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="md:col-span-2">
                <Card title="Personal Information" className="shadow-md">
                    <Descriptions bordered>
                        <Descriptions.Item label="Full Name" span={3}>
                            Dr. {current.UserInfo.fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Employee ID" span={1}>
                            ....
                        </Descriptions.Item>
                        <Descriptions.Item label="Department" span={2}>
                            ....
                        </Descriptions.Item>
                        <Descriptions.Item label="Position" span={1}>
                            Senior Lecturer
                        </Descriptions.Item>
                        <Descriptions.Item label="Joined" span={2}>
                            ....
                        </Descriptions.Item>
                        <Descriptions.Item label="Education" span={3}>
                            ...
                        </Descriptions.Item>
                        <Descriptions.Item label="Specialization" span={3}>
                            ....
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Teaching Schedule" className="shadow-md mt-6">
                    <Table
                        dataSource={[]}
                        rowKey="id"
                        columns={[
                            {
                                title: "Course Code",
                                dataIndex: "code",
                                key: "code",
                            },
                            {
                                title: "Course Name",
                                dataIndex: "name",
                                key: "name",
                            },
                            {
                                title: "Schedule",
                                dataIndex: "schedule",
                                key: "schedule",
                            },
                            
                        ]}
                        pagination={false}
                    />
                </Card>

                <Card title="Publications & Research" className="shadow-md mt-6">
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            // {
                            //     id: 1,
                            //     title: "Advancements in Database Security Protocols",
                            //     journal: "International Journal of Computer Science",
                            //     year: 2023,
                            // },
                            // {
                            //     id: 2,
                            //     title:
                            //         "Machine Learning Applications in Educational Technology",
                            //     journal: "African Journal of Information Systems",
                            //     year: 2022,
                            // },
                            // {
                            //     id: 3,
                            //     title:
                            //         "Blockchain Technology for Academic Credential Verification",
                            //     journal: "IEEE Transactions on Education",
                            //     year: 2021,
                            // },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<FileTextOutlined/>}/>}
                                    title={item.title}
                                    description={`${item.journal}, ${item.year}`}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    </div>
}

export default TutorProfile