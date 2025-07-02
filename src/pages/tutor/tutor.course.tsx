import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Alert, Button, Card, Form, Input, Popconfirm, Select, Space, Table, Typography} from "antd";
import {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {mockActivities, mockGrades, mockRegistrations} from "src/components/landing_page/LandingPAgeBarConstants";
import ModalComponent from "src/components/ModalComponent";
import {dataToAssignedUnits, dataToCourse, dataToDepartment} from "src/modules/Data.format";
import {selectAuth} from "src/redux/auth/selectors";
import {admin_crud_request} from "src/service/crud.service";
import useAxiosPrivate from "src/service/useAxiosPrivate";

export default function TutorCourse() {
    const [searchText, setSearchText] = useState("");
    const {Title, Paragraph} = Typography;
    const {Option} = Select;


    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()


    const columns = [
        {
            title: "Course Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Credits",
            dataIndex: "credits",
            key: "credits",
        },
        {
            title: "Students",
            dataIndex: "students",
            key: "students",
        },


    ];


    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetEntity("course");
            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Method to get all the courses available to you
    const GetEntity = async (entity) => {
        let data = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            url: `/tutor/${current.UserInfo.entity._id}/unit/list`
        })

        setIsSuccess(data.succes)

        if (entity === "course") {
            const d = dataToAssignedUnits(data.data)
            console.log(d)

            setCourses(d[0])
            setMessage(d[1])
        }
        return data
    }

    return (
        <div className='course-management-container mt-10 p-4'>
            <div className='flex justify-between items-center mb-6 mt-10'>
                <div>
                    <Title level={2}>Assigned Units</Title>
                    <Paragraph className='text-gray-500'>
                        See all courses that you have been assigned
                    </Paragraph>
                </div>

            </div>

            <Card className='shadow-md'>
                <Table
                    scroll={{x: 'max-content'}}
                    loading={isLoading}
                    columns={columns}
                    dataSource={courses}
                    rowKey='id'
                    pagination={{pageSize: 10}}
                    footer={() => <Alert message={<>
                        Assigned Time<br/>
                        {message.split('\n').map((line, index) => (
                            <span key={index}>
         {index + 1} {line}
                                <br/>
        </span>
                        ))}
                    </>} type="info"/>}
                />
            </Card>

        </div>
    );
}
