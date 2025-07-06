import {Button, Input, Space, Table, Tag, Typography} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    PlusOutlined,
    SearchOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToAssignedUnits, dataToLecturerCat} from "src/modules/Data.format.ts";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";

export default function TutorCATs() {
    const navigate = useNavigate()
    const {Title, Text} = Typography

    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(false)
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()


    const GetEntity = async () => {
        const data = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            url: `/tutor/${current.UserInfo.entity._id}/cat/list`
        })


        if (data.success) {
            setCats(dataToLecturerCat(data.data))
        }

        return data
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await GetEntity();
            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="p-6 sm:mt-10 md:mt:0 lg:mt-0">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>Manage Continuous Assessment Tests</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => navigate("/v1/tutor/CAT/create")}
                    className="!rounded-button whitespace-nowrap"
                >
                    Create CAT
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search CATs"
                        className="max-w-md"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <Table

                loading={loading}
                dataSource={cats}
                rowKey="id"
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                        key: "title",
                    },
                    {
                        title: "Scheduled Date",
                        dataIndex: "due_date",
                        key: "dueDate",
                    },
                    {
                        title: "Duration",
                        key: "duration",
                        render: (_, record) => record.duration || "1 hour",
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (status) => (
                            <Tag
                                color={
                                    status === "pending"
                                        ? "orange"
                                        : status === "submitted"
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
                        title: "Participants",
                        key: "participants",
                        render: () => <Text>5/5 students</Text>,
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: (_, record) => (
                            <Space>
                                <Button
                                    type="text"
                                    icon={<EyeOutlined/>}
                                    className="cursor-pointer !rounded-button whitespace-nowrap"
                                />
                                <Button
                                    type="text"
                                    icon={<EditOutlined/>}
                                    className="cursor-pointer !rounded-button whitespace-nowrap"
                                />
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined/>}
                                    className="cursor-pointer !rounded-button whitespace-nowrap"
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    )
}
