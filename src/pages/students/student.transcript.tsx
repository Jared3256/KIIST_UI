import {DownloadingOutlined} from "@mui/icons-material";
import {
    Button,
    Card,
    Divider,
    Image,
    message,
    QRCode,
    Select,
    Table,
    Tag,
    Typography,
} from "antd";
import React, {useEffect, useState} from "react";

import PatrickNyabayo from "../../assets/PatrickNyabayo.png"
import ReactECharts from "echarts-for-react";
import {Box} from "@mui/joy";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors";
import {format} from "date-fns";
import {Settings} from "lucide-react";
import {admin_crud_request} from "src/service/crud.service.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";
import {dataToStudentTranscript} from "src/modules/Data.format.ts";

export default function StudentTranscript() {
    const {Option} = Select;
    const {Title, Paragraph, Text} = Typography;
    const [grades, setGrades] = useState([]);
    const {current} = useSelector(selectAuth);
    const [loading, setLoading] = useState(false);


    const hotAxiosPrivate = useAxiosPrivate();
    const calculateGPA = (grades: any[]) => {
        if (grades.length === 0) return 0;
        const gradePoints = {
            "Distinction 1": 4.0,
            "Distinction 2": 3.0,
            "Credit 1": 2.0,
            "Credit 2": 1.0,
            "Pass": 0.0,
            "Fail": 0.0,
        };
        let totalPoints = 0;
        let totalCredits = 0;
        grades.forEach((grade) => {

            if (grade) {
                totalPoints +=
                    gradePoints[grade.grade as keyof typeof gradePoints] * grade.credits;
                totalCredits += grade.credits;
                console.log("credits", totalCredits, totalPoints)

            }
        });
        console.log("return", totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0)

        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    };

    // Download transcript as PDF
    const handleDownloadTranscript = () => {
        const id = "student-transcript";

    };

    const GetStudentGrades = async () => {
        setLoading(true)
        try {
            const data = await admin_crud_request.get_spc({
                url: `/student/id/transcript/get?semester=${getCurrentSemesterName()}&regNumber=${current.UserInfo.entity.registrationNumber}`,
                hotAxiosPrivate: hotAxiosPrivate
            })

            if (data.success) {
                console.log(dataToStudentTranscript(data.data))
                setGrades(dataToStudentTranscript(data.data))
            }
            setLoading(false)
        } catch (e) {
            console.log(e)

        }
    }
    console.log(current)

    useEffect(() => {

        GetStudentGrades();

    }, []);
    return (
        <div className='transcript-container px-3 pt-3'>
            <div className='mb-6'>
                <Title level={2}>Academic Transcript</Title>
                <Paragraph className='text-gray-500'>
                    View and download your academic transcript
                </Paragraph>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
                <Card className='shadow-md col-span-2'>
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <Title level={3}>Transcript Summary</Title>
                        </div>
                    </div>

                    <Box className='mb-3 flex' gap={2} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={2}>
                            <Text>Year of study</Text>
                            <Select
                                placeholder='Year of study'
                                style={{width: 80}}
                                className='ml-auto'>
                                <Option value='all'>All</Option>
                                <Option value='one'>1</Option>
                                <Option value='two'>2</Option>
                            </Select>
                            <Text>Semester</Text>
                            <Select
                                placeholder='Semester'
                                style={{width: 80}}
                                className='ml-auto'>
                                <Option value='all'>All</Option>
                                <Option value='one'>1</Option>
                                <Option value='two'>2</Option>
                                <Option value='three'>3</Option>
                            </Select>
                            <Button
                                variant='outlined'
                                icon={<Settings className='w-6 h-6' size={2}/>}
                                onClick={handleDownloadTranscript}
                                className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap items-center'>
                                Generate Transcript
                            </Button>
                        </Box>

                        <Box>
                            <Button
                                type='primary'
                                icon={<DownloadingOutlined/>}
                                onClick={handleDownloadTranscript}
                                className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                                Download PDF
                            </Button>
                        </Box>
                    </Box>
                    <div
                        id='student-transcript'
                        className='mb-6 p-6 border border-gray-200 rounded-lg'>
                        <div className='text-center mb-6'>
                            <img
                                src='https://readdy.ai/api/search-image?query=modern%20educational%20institution%20logo%20with%20blue%20and%20gold%20colors%2C%20professional%20design%2C%20minimalist%20style%2C%20clean%20background%2C%20high%20quality%20vector%20graphic&width=150&height=150&seq=9&orientation=squarish'
                                alt='Kisii Impact Institute Logo'
                                className='mx-auto h-20 mb-2'
                            />
                            <Title level={3}>
                                Kisii Impact Institute of Science and Technology
                            </Title>
                            <Text type='secondary'>P.O. Box 123, Kisii, Kenya</Text>
                            <Divider/>
                            <Title level={4}>PROVISIONAL ACADEMIC TRANSCRIPT</Title>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                            <div>
                                <Text strong>Student Name: </Text>
                                <Text>{current.UserInfo.fullname}</Text>
                            </div>
                            <div>
                                <Text strong>Registration Number: </Text>
                                <Text>{current.UserInfo.entity.registrationNumber}</Text>
                            </div>
                            <div>
                                <Text strong>Department: </Text>
                                <Text>{current.UserInfo.entity.programSelection.main.department}</Text>
                            </div>
                            <div>
                                <Text strong>Program: </Text>
                                <Text>{current.UserInfo.entity.programSelection.main.program}</Text>
                            </div>
                            <div>
                                <Text strong>Date Issued: </Text>
                                <Text>{format(new Date(), "MMMM d, yyyy")}</Text>
                            </div>
                            <div>
                                <Text strong>Cumulative GPA: </Text>
                                <Text>
                                    {calculateGPA(
                                        grades
                                    )}
                                </Text>
                            </div>
                        </div>
                        <Divider orientation='left'>Academic Record</Divider>
                        <Table
                            loading={loading}
                            columns={[
                                {
                                    title: "Course Code",
                                    dataIndex: "code",
                                    key: "course",
                                },
                                {
                                    title: "Course Title",
                                    key: "title",
                                    dataIndex: "title",
                                },
                                {
                                    title: "CAT",
                                    key: "cat",
                                    dataIndex: "cat"
                                },
                                {
                                    title: "Main",
                                    key: "main",
                                    dataIndex: "main"
                                },
                                // {
                                //     title: "Credits",
                                //     key: "credits",
                                //     dataIndex: "credits",
                                //
                                // },
                                {
                                    title: "Grade",
                                    dataIndex: "grade",
                                    key: "grade",
                                },
                            ]}
                            dataSource={grades}
                            rowKey='id'
                            pagination={false}
                            footer={() => (
                                <div className='flex justify-between'>
                                    <Text strong>
                                        Total Credits:{" "}
                                        {grades
                                            .reduce((total, grade) => {

                                                return total + (grade ? grade.credits : 0);
                                            }, 0)}
                                    </Text>
                                    <Text strong>
                                        Cumulative GPA:{" "}
                                        {calculateGPA(
                                            grades
                                        )}
                                    </Text>
                                </div>
                            )}
                        />
                        <div className='mt-6 flex justify-between items-center'>
                            <div>
                                <Text strong>Registrar's Signature:</Text>
                                <Box
                                    mt={2}
                                    display={"flex"}
                                    flexDirection={"column"}
                                    className='mt-2 flex flex-column'>

                                    <Image
                                        src={PatrickNyabayo}
                                        alt="Registrar's Signature"
                                        preview={false}
                                        height={"60px"}
                                    />
                                    <Text>Mr. Patrick Nyabayo</Text>
                                    <br/>
                                    <Text type='secondary'>Registrar | Director</Text>
                                </Box>
                            </div>
                            <div className='text-center'>
                                <div className='border border-gray-300 p-4 inline-block'>
                                    <i className='fas fa-qrcode text-6xl'></i>
                                    <div className='mt-2'>
                                        {/* <Text type='secondary'>Digital Verification</Text> */}
                                        <QRCode
                                            value={`${current.UserInfo.fullname}-${current.UserInfo.entity.registrationNumber}-${format(new Date(), "MMMM d, yyyy")}-${format(current.UserInfo.entity.createdAt, "MMMM d, yyyy")}`}
                                            icon=''
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 text-center'>
                            <Text type='secondary'>
                                This transcript is not valid without the official seal and
                                digital verification.
                            </Text>
                        </div>
                    </div>
                </Card>
                <div>
                    <Card title='Academic Progress' className='shadow-md mb-6'>
                        <div className='mb-4'>
                            <Text strong>Cumulative GPA: </Text>
                            <Text>
                                {calculateGPA(grades)}
                            </Text>
                        </div>
                        <div className='mb-4'>
                            <Text strong>Credits Completed: </Text>
                            <Text>
                                {grades

                                    .reduce((total, grade) => {

                                        return total + (grade ? grade.credits : 0);
                                    }, 0)}
                            </Text>
                        </div>
                        <div>
                            <Text strong>Standing: </Text>
                            <Tag color='green'>Good Standing</Tag>
                        </div>
                        <Divider/>
                        <Title level={5}>GPA Trend</Title>
                        <div className='h-[100%]'>
                            <ReactECharts
                                option={{
                                    animation: false,
                                    xAxis: {
                                        type: "category",
                                        data: ["Sem 1", "Sem 2", "Sem 3", "Current"],
                                    },
                                    yAxis: {
                                        type: "value",
                                        min: 0,
                                        max: 4,
                                    },
                                    series: [
                                        {
                                            data: [3.2, 3.5, 3.7, 3.8],
                                            type: "line",
                                            smooth: true,
                                        },
                                    ],
                                    tooltip: {
                                        trigger: "axis",
                                    },
                                }}
                            />
                        </div>
                    </Card>
                    <Card title='Grade Distribution' className='mt-3 shadow-md'>
                        <div className='h-[100%] mb-4'>
                            <ReactECharts
                                option={{
                                    animation: false,
                                    tooltip: {
                                        trigger: "item",
                                    },
                                    series: [
                                        {
                                            name: "Grades",
                                            type: "pie",
                                            radius: ["40%", "70%"],
                                            data: [
                                                {value: 2, name: "A"},
                                                {value: 1, name: "B"},
                                                {value: 0, name: "C"},
                                                {value: 0, name: "D"},
                                                {value: 0, name: "F"},
                                            ],
                                            emphasis: {
                                                itemStyle: {
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 0,
                                                    shadowColor: "rgba(0, 0, 0, 0.5)",
                                                },
                                            },
                                        },
                                    ],
                                }}
                            />
                        </div>
                        <div>
                            <Text strong>Total Courses: </Text>
                            <Text>
                                {grades.length}
                            </Text>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
