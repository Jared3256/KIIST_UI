import React, {useState} from 'react'
import {Button, DatePicker, Divider, Form, Input, Radio, Select, Switch, TimePicker, Typography, Upload,} from "antd";
import {DeleteOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";

export default function TutorAssignmentCreate() {
    const [createType, setCreateType] = useState<"assignment" | "cat">(
        "assignment",
    );

    const {Text, Title} = Typography
    const {Option} = Select
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6  mx-6">
                <Title level={4}>Assignment Questions</Title>

            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-8 m-4 mx-6">
                <Form layout="vertical" className="mt-4">
                    <Form.Item label="Unit Code" required>
                        <Input placeholder={`Enter ${createType} code`}/>
                    </Form.Item>

                    <Form.Item label="Description" required>
                        <Input.TextArea
                            rows={4}
                            placeholder={`Enter ${createType} description`}
                        />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item label="Due Date" required>
                            <DatePicker className="w-full"/>
                        </Form.Item>

                        <Form.Item label="Due Time" required>
                            <TimePicker className="w-full"/>
                        </Form.Item>
                    </div>

                    {createType === "cat" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label="Duration" required>
                                <Select defaultValue="60">
                                    <Option value="30">30 minutes</Option>
                                    <Option value="45">45 minutes</Option>
                                    <Option value="60">1 hour</Option>
                                    <Option value="90">1 hour 30 minutes</Option>
                                    <Option value="120">2 hours</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Tab Switch Action">
                                <Select defaultValue="warn">
                                    <Option value="warn">Warn Student</Option>
                                    <Option value="submit">Auto-Submit</Option>
                                    <Option value="lock">Lock Exam</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    )}

                    <Divider/>

                    <Form.Item label="Questions" required={true}>
                        <Form.List name={"questions"}>
                            {(fields, {add, remove}) => (
                                <div>
                                    {fields.map((field, index) => (
                                        <div className="border border-gray-200 p-4 rounded-lg mb-4">
                                            <div className="flex justify-between mb-2">
                                                <Text strong>Question {index + 1}</Text>
                                                <Button
                                                    type="text"
                                                    danger
                                                    onClick={() => remove(index)}
                                                    icon={<DeleteOutlined/>}
                                                    className="cursor-pointer !rounded-button whitespace-nowrap"
                                                />
                                            </div>

                                            <Input placeholder="Enter question" className="mb-2"/>

                                            {/*<div className="flex items-center gap-2 mb-2 mt-2">*/}
                                            {/*    <Text>Question Type:</Text>*/}
                                            {/*    <Select defaultValue="multiple_choice"*/}
                                            {/*            style={{width: 200}}>*/}
                                            {/*        <Option value="multiple_choice">Multiple Choice</Option>*/}
                                            {/*        <Option value="essay">Essay</Option>*/}
                                            {/*        <Option value="code">Code</Option>*/}
                                            {/*    </Select>*/}
                                            {/*</div>*/}


                                            {/*<div className="ml-4 mt-2">*/}
                                            {/*    <Text strong>Options:</Text>*/}
                                            {/*    <div className="space-y-2 mt-2">*/}
                                            {/*        <div className="flex items-center gap-2">*/}
                                            {/*            <Radio/>*/}
                                            {/*            <Input placeholder="Option 1"/>*/}
                                            {/*            <Button*/}
                                            {/*                type="text"*/}
                                            {/*                danger*/}
                                            {/*                icon={<DeleteOutlined/>}*/}
                                            {/*                className="cursor-pointer !rounded-button whitespace-nowrap"*/}
                                            {/*            />*/}
                                            {/*        </div>*/}
                                            {/*        <div className="flex items-center gap-2">*/}
                                            {/*            <Radio/>*/}
                                            {/*            <Input placeholder="Option 2"/>*/}
                                            {/*            <Button*/}
                                            {/*                type="text"*/}
                                            {/*                danger*/}
                                            {/*                icon={<DeleteOutlined/>}*/}
                                            {/*                className="cursor-pointer !rounded-button whitespace-nowrap"*/}
                                            {/*            />*/}
                                            {/*        </div>*/}
                                            {/*        <Button*/}
                                            {/*            type="dashed"*/}
                                            {/*            icon={<PlusOutlined/>}*/}
                                            {/*            block*/}
                                            {/*            className="!rounded-button whitespace-nowrap"*/}
                                            {/*        >*/}
                                            {/*            Add Option*/}
                                            {/*        </Button>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
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
                    {/*<div className="space-y-4">*/}
                    {/*    <div className="border border-gray-200 p-4 rounded-lg">*/}
                    {/*        <div className="flex justify-between mb-2">*/}
                    {/*            <Text strong>Question 1</Text>*/}
                    {/*            <Button*/}
                    {/*                type="text"*/}
                    {/*                danger*/}
                    {/*                icon={<DeleteOutlined/>}*/}
                    {/*                className="cursor-pointer !rounded-button whitespace-nowrap"*/}
                    {/*            />*/}
                    {/*        </div>*/}

                    {/*        <Input placeholder="Enter question" className="mb-2"/>*/}

                    {/*        <div className="flex items-center gap-2 mb-2 mt-2">*/}
                    {/*            <Text>Question Type:</Text>*/}
                    {/*            <Select defaultValue="multiple_choice" style={{width: 200}}>*/}
                    {/*                <Option value="multiple_choice">Multiple Choice</Option>*/}
                    {/*                <Option value="essay">Essay</Option>*/}
                    {/*                <Option value="code">Code</Option>*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}

                    {/*        <div className="ml-4 mt-2">*/}
                    {/*            <Text strong>Options:</Text>*/}
                    {/*            <div className="space-y-2 mt-2">*/}
                    {/*                <div className="flex items-center gap-2">*/}
                    {/*                    <Radio/>*/}
                    {/*                    <Input placeholder="Option 1"/>*/}
                    {/*                    <Button*/}
                    {/*                        type="text"*/}
                    {/*                        danger*/}
                    {/*                        icon={<DeleteOutlined/>}*/}
                    {/*                        className="cursor-pointer !rounded-button whitespace-nowrap"*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <div className="flex items-center gap-2">*/}
                    {/*                    <Radio/>*/}
                    {/*                    <Input placeholder="Option 2"/>*/}
                    {/*                    <Button*/}
                    {/*                        type="text"*/}
                    {/*                        danger*/}
                    {/*                        icon={<DeleteOutlined/>}*/}
                    {/*                        className="cursor-pointer !rounded-button whitespace-nowrap"*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <Button*/}
                    {/*                    type="dashed"*/}
                    {/*                    icon={<PlusOutlined/>}*/}
                    {/*                    block*/}
                    {/*                    className="!rounded-button whitespace-nowrap"*/}
                    {/*                >*/}
                    {/*                    Add Option*/}
                    {/*                </Button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <Button*/}
                    {/*        type="dashed"*/}
                    {/*        icon={<PlusOutlined/>}*/}
                    {/*        block*/}
                    {/*        className="!rounded-button whitespace-nowrap"*/}
                    {/*    >*/}
                    {/*        Add Question*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    {/*</Form.Item>*/}

                    {/*<Form.Item label="Attachments">*/}
                    {/*    <Upload*/}
                    {/*        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                    {/*        listType="text"*/}
                    {/*    >*/}
                    {/*        <Button*/}
                    {/*            icon={<UploadOutlined/>}*/}
                    {/*            className="!rounded-button whitespace-nowrap"*/}
                    {/*        >*/}
                    {/*            Upload Files*/}
                    {/*        </Button>*/}
                    {/*    </Upload>*/}
                    {/*</Form.Item>*/}

                    <Form.Item label="Additional Settings">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Text>Allow Late Submissions</Text>
                                <Switch defaultChecked/>
                            </div>
                            <div className="flex items-center justify-between">
                                <Text>Show Results Immediately</Text>
                                <Switch/>
                            </div>
                            <div className="flex items-center justify-between">
                                <Text>Enable Plagiarism Check</Text>
                                <Switch defaultChecked/>
                            </div>
                        </div>
                    </Form.Item>
                </Form></div>
        </div>
    )
}
