import {
    Card,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select, Box, Divider
} from "@mui/joy";
import {DatePicker} from "antd";
import {Form} from "react-router";
import type {PersonalDetails} from "src/pages/landing_page/modules/admission/new student/register.tsx";
import {useState} from "react";

export default function PersonalDetails() {
    // User personal details
    const [personalDetails, setPersonalDetais] = useState<PersonalDetails>({
        firstname: "",
        middlename: "",
        lastname: "",
        dateOfBirth: "",
        gender: "",
        nationalId: 0,
        placeOfBirth: {
            county: "",
            town: ""
        }
    })


    return (
        <div>
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
                    <Box display="flex" gap={4} flexDirection={"column"}>
                        <Box display="flex" flexDirection={{
                            md: "row", sm: "column", lg: "row", xl: "row", xs: "column"

                        }} gap={3}>

                            <FormControl required>
                                <FormLabel>First name</FormLabel>
                                <Input value={personalDetails.firstname} onChange={(e) => {
                                    setPersonalDetais({...personalDetails, firstname: e.target.value})

                                }} type="text" name="firstname" placeholder={"e.g Jared"}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Middle name</FormLabel>
                                <Input onChange={(e) => {
                                    setPersonalDetais({...personalDetails, middlename: e.target.value})
                                }}
                                       value={personalDetails.middlename} type="text" name="middlename"
                                       placeholder={"e.g Kennedy"}/>
                            </FormControl>
                            <FormControl required>
                                <FormLabel>last name</FormLabel>
                                <Input type="text" name="lastname" onChange={(e) => {
                                    setPersonalDetais({...personalDetails, lastname: e.target.value})

                                }} value={personalDetails.lastname}
                                       placeholder={"e.g Owiti"}/>
                            </FormControl>
                        </Box>
                        <Box display="flex" flexDirection={{
                            md: "row", sm: "column", lg: "row", xl: "row", xs: "column"

                        }} gap={3}>


                            <FormControl required>
                                <FormLabel>Date of Birth</FormLabel>

                                <DatePicker defaultValue={personalDetails.dateOfBirth} size={"middle"}
                                            onChange={() => {
                                                // setPersonalDetais({...personalDetails, dateOfBirth: e.value})
                                            }}/>
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    defaultValue={personalDetails.gender}
                                    placeholder="e.g Male"
                                    name="foo"
                                    required
                                    sx={{minWidth: 250}}
                                    onChange={() => {
                                        // setPersonalDetais({...personalDetails, gender: "male"})

                                    }}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="none">Rather not say</Option>
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <FormLabel>National Id</FormLabel>
                                <Input type="number" name="nationalId" placeholder={"e.g 12345678"}
                                       value={personalDetails.nationalId}/>
                            </FormControl>
                        </Box>
                        <Divider/>
                        <Box display="flex" flexDirection={{
                            md: "row", sm: "column", lg: "row", xl: "row", xs: "column"

                        }} gap={3}>

                            <FormControl required>
                                <FormLabel>County of Birth</FormLabel>
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
                                <FormLabel>Town of Birth</FormLabel>
                                <Input type="text" name="townOfBirth" placeholder={"e.g Kisii"} onChange={() => {
                                    // setPersonalDetais({...personalDetails, town: "dfdf"})

                                }}/>
                            </FormControl>
                        </Box>

                    </Box>
                </Card>


            </Form>
        </div>
    );
}
