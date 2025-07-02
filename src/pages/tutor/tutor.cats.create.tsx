import {Button, DatePicker, Divider, Form, Input, message, Select, Space, Switch, TimePicker, Typography} from 'antd'
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import useAxiosPrivate from 'src/service/useAxiosPrivate';
import {selectAuth} from 'src/redux/auth/selectors';
import {useSelector} from "react-redux";
import {admin_crud_request} from 'src/service/crud.service';
import {dataToAssignedUnits} from 'src/modules/Data.format';
import errorHandler from 'src/handlers/errorHandler';
import successHandler from "src/handlers/successHandler.ts";
import Loading from 'src/components/Loading';
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";

export default function TutorCatsCreate() {
    const {Title, Text} = Typography
    const {Option} = Select
    const [form] = Form.useForm();
    const [courses, setCourses] = useState([]);

    const [createType] = useState<"assignment" | "cat">(
        "assignment",
    );
    const [loading, setIsLoading] = useState<boolean>(false);
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()


    /**
     * Find the Course that have been assigned to you
     */
    const GetEntity = async (entity) => {
        const data = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            url: `/tutor/${current.UserInfo.entity._id}/unit/list`
        })


        if (entity === "course") {
            const d = dataToAssignedUnits(data.data)
            setCourses(d[0])

        }
        return data
    }


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


    const handleCATCreateSubmit = async (values) => {
        if (values.questions.length < 1) {
            errorHandler("You must provide at least one question")
            return
        }

        try {
            setIsLoading(true);
            const data = await admin_crud_request.post_spc({
                url: "/tutor/cat/create",
                data: {
                    ...values,
                    tutor: current.UserInfo.entity._id,
                    semester: getCurrentSemesterName()
                },
                hotAxiosPrivate: hotAxiosPrivate,
            })

            if (data.success) {
                form.resetFields()
            }
        } catch (e) {
            console.log(e)

        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Loading isLoading={loading}>
            <div className="p-6 sm:mt-10 md:mt:0 lg:mt-0">
                <div className="flex justify-between items-center mb-6  mx-6">
                    <Title level={4}>CAT Questions</Title>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md mb-8 m-4 mx-6">
                    <Form layout="vertical" className="mt-4" form={form}
                          onFinish={(values) => handleCATCreateSubmit(values)}>
                        <Form.Item label="Unit Code" name={"code"} required
                                   rules={[{required: true, message: "Please enter a valid Unique Code"}]}>
                            <Select>
                                {courses.map((course) => (
                                    <option key={course.key} value={course.key}>
                                        {course.code} - {course.title}
                                    </option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Description" name={"description"} required
                                   rules={[{required: true, message: "Please provide a description"}]}>
                            <Input.TextArea
                                rows={4}
                                placeholder={`Enter ${createType} description`}
                            />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label="Due Date" required name={"due_date"}
                                       rules={[{required: true, message: "Please provide a due date for the CAT"}]}>
                                <DatePicker className="w-full"/>
                            </Form.Item>

                            <Form.Item label="Due Time" required name={"due_time"}
                                       rules={[{required: true, message: "Please provide a due time for the CAT"}]}>
                                <TimePicker className="w-full"/>
                            </Form.Item>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label="Duration" required name={"duration"}
                                       rules={[{required: true, message: "Please select a duration"}]}>
                                <Select defaultValue="60">
                                    <Option value="30">30 minutes</Option>
                                    <Option value="45">45 minutes</Option>
                                    <Option value="60">1 hour</Option>
                                    <Option value="90">1 hour 30 minutes</Option>
                                    <Option value="120">2 hours</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Tab Switch Action" name={"warning"}
                                       rules={[{required: true, message: "Please select default action"}]}>
                                <Select defaultValue="warn">
                                    <Option value="warn">Warn Student</Option>
                                    <Option value="submit">Auto-Submit</Option>
                                    <Option value="lock">Lock Exam</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <Divider/>

                        <Form.Item label="Questions" required={true}>
                            <Form.List name="questions">
                                {(fields, {add, remove}) => (
                                    <div>
                                        {fields.map((field, index) => (
                                            <div className="border border-gray-200 p-4 rounded-lg mb-4" key={field.key}>
                                                <div className="flex justify-between mb-2">
                                                    <Text strong>Question {index + 1}</Text>
                                                    <Button
                                                        type="text"
                                                        danger
                                                        onClick={() => remove(field.name)}
                                                        icon={<DeleteOutlined/>}
                                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                                    />
                                                </div>

                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "question"]}
                                                    rules={[{
                                                        required: true,
                                                        message: "Please enter this question question"
                                                    }]}
                                                >
                                                    <Input placeholder="Enter question" className="mb-2"/>
                                                </Form.Item>
                                            </div>
                                        ))}

                                        <Button
                                            onClick={() => add()}
                                            type="dashed"
                                            icon={<PlusOutlined/>}
                                            block
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            Add Question
                                        </Button>
                                    </div>
                                )}
                            </Form.List>

                        </Form.Item>
                        <Form.Item
                            label="Allow Late Submissions"
                            name="late_submission"
                            valuePropName="checked"
                            rules={[{required: true, message: "Please provide a choice"}]}
                        >
                            <Switch defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label="Check for Plagiarism"
                            name="plagiarism_check"
                            valuePropName="checked"
                            rules={[{required: true, message: "Please provide a choice"}]}
                        >
                            <Switch defaultChecked/>
                        </Form.Item>

                        <Form.Item>
                            <Space>

                                <Button
                                    key="cancel"

                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    htmlType="submit"
                                    key="submit"
                                    type="primary"
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Create CAT
                                </Button>
                            </Space>
                        </Form.Item>


                    </Form>
                </div>
            </div>
        </Loading>

    )
}
