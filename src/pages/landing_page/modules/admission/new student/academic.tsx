import React from "react";
import {Form} from "react-router";
import {Box, Card, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {Typography, Form as AntForm, Button} from "antd";
import {AddOutlined} from "@mui/icons-material";

export default function Academic() {
    let schoolsName = [{name: "sdsd"}]
    return <div>
        <Form onSubmit={(e) => e.preventDefault}>
            <Card
                size="md"
                sx={{
                    maxHeight: "max-content",
                    maxWidth: "100%",
                    mx: "auto",
                    overflow: "auto",
                }}
            >
                <Box display="flex" flexDirection={{
                    md: "row", sm: "column", lg: "row", xl: "row", xs: "column"

                }} gap={3}>

                    <FormControl required>
                        <FormLabel>Intended Course</FormLabel>
                        <Select
                            placeholder="e.g Kisii"
                            name="foo"
                            required
                            sx={{minWidth: 250}}
                        >
                            <Option value="kisii">Kisii</Option>
                            <Option value="nyamira">Nyamira</Option>
                            <Option value="migori">Migori</Option>
                            <Option value="homabay">Homabay</Option>
                            <Option value="kisumu">Kisumu</Option>
                            <Option value="siaya">Siaya</Option>
                        </Select>
                    </FormControl>

                    <FormControl required>
                        <FormLabel>Course Level</FormLabel>
                        <Input disabled={true} type="text" aria-readonly={true} readOnly name="townOfBirth"
                               placeholder={"e.g Kisii"}
                               onChange={() => {
                                   // setPersonalDetais({...personalDetails, town: "dfdf"})

                               }}/>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Mode of Study</FormLabel>
                        <Select
                            placeholder="e.g full time"
                            name="foo"
                            required
                            defaultValue={"not-sure"}
                            sx={{minWidth: 280}}
                        >

                            <Option value="kisii">Full-Time</Option>
                            <Option value="nyamira">Part-Time</Option>
                            <Option value="migori">Online</Option>
                            <Option value={"not-sure"}>Not Sure</Option>
                        </Select>
                    </FormControl>
                </Box>

                <Divider sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                }}/>

                <AntForm.List name={"School_names"}>
                    {(fields, {add, remove}) => (
                        <div className={"w-full "}>
                            {fields.map((field, index) => {
                                return (<AntForm.Item key={index} name={"lkl"}>
                                    name of the school
                                </AntForm.Item>)
                            })}

                            <div className={"justify-center w-full  flex"}>
                                <AntForm.Item className={"w-full justify-center"}>
                                    <Button icon={<AddOutlined/>} onClick={() => {
                                        add()
                                        console.log(fields)
                                    }} className={"max-w-1/2 self-center"} type={"dashed"} variant={"dashed"}
                                            block={true}>Add
                                        Institution</Button>

                                </AntForm.Item>
                            </div>

                        </div>
                    )}
                </AntForm.List>
                {/* Start of the institution form*/}
                <Box display="flex" gap={4} flexDirection={"column"}>
                    <Typography.Text className={"font-bold text-2xl"}>Previous Institution !</Typography.Text>

                    <Box display="flex" flexDirection={{
                        md: "row", sm: "column", lg: "row", xl: "row", xs: "column"

                    }} gap={3}>

                        <FormControl required>
                            <FormLabel>Qualification</FormLabel>
                            <Select
                                // defaultValue={personalDetails.gender}
                                placeholder="e.g KCSE"
                                name="foo"
                                required
                                sx={{minWidth: 250}}
                                onChange={() => {
                                    // setPersonalDetais({...personalDetails, gender: "male"})

                                }}
                            >
                                <Option value="kcpe">KCPE</Option>
                                <Option value="kcse">KCSE</Option>
                                <Option value="certicate">Certificate</Option>
                                <Option value="diploma">Diploma</Option>
                                <Option value="degree">Degree</Option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Graduation Year</FormLabel>
                            <Input type="number" name="middlename"
                                   placeholder={"e.g " + (new Date().getFullYear() - 2)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Exam Index Number</FormLabel>
                            <Input type="text"
                                   name="lastname"
                                   placeholder={"e.g 12345678901"}/>
                        </FormControl>
                    </Box>
                    <Box display="flex" flexDirection={{
                        md: "row", sm: "column", lg: "row", xl: "row", xs: "column"

                    }} gap={3}>


                        <FormControl required>
                            <FormLabel>Grade Aggregate</FormLabel>

                            <Select
                                // defaultValue={personalDetails.gender}
                                placeholder="e.g C+"
                                name="foo"
                                required
                                sx={{minWidth: 250}}
                                onChange={() => {
                                    // setPersonalDetais({...personalDetails, gender: "male"})

                                }}
                            >
                                <Option value="a-plain">A</Option>
                                <Option value="a-minus">A-</Option>
                                <Option value="b-plus">B+</Option>
                                <Option value="b-plain">B</Option>
                                <Option value="b-minus">B-</Option>
                                <Option value="c-plus">C+</Option>
                                <Option value="c-plain">C</Option>
                                <Option value="c-minus">C-</Option>
                                <Option value="d-plus">D+</Option>
                                <Option value="d-plain">D</Option>
                                <Option value="d-mius">D-</Option>
                            </Select>
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Institution name</FormLabel>
                            <Input placeholder="e.g kisii impact college"/>

                        </FormControl>
                        <FormControl required>
                            <FormLabel>Institution location</FormLabel>
                            <Input type="text" name="inst_location" placeholder={"e.g Kisii"}
                            />
                        </FormControl>
                    </Box>


                </Box>
                {/*  End of the institution form*/}
            </Card>


        </Form>
    </div>;
}
