import {
  Card,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
} from "@mui/joy";
import { DatePicker } from "antd";
import React from "react";
import { Form } from "react-router";

export default function PersonalDetails() {
  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault}>
        <Card
          size="md"
          sx={{
            maxHeight: "max-content",
            maxWidth: "100%",
            mx: "auto",
            // to make the demo resizable
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <FormControl required>
            <FormLabel>Fullname</FormLabel>
            <Input type="text" name="fullname" />
          </FormControl>
          <FormControl required>
            <FormLabel>Date of Birth</FormLabel>

            <DatePicker />
          </FormControl>
          <FormControl required>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select your Gender"
              name="foo"
              required
              sx={{ minWidth: 200 }}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="none">Rather not say</Option>
            </Select>
          </FormControl>
        </Card>

        <Card
          size="md"
          sx={{
            marginTop: "40px",
            maxHeight: "max-content",
            maxWidth: "100%",
            mx: "auto",
            // to make the demo resizable
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <FormControl required>
            <FormLabel>National Id or Birth certificate number</FormLabel>
            <Input type="number" name="nation_id" />
          </FormControl>
          <FormControl required>
            <FormLabel>Nationality</FormLabel>

            <DatePicker />
          </FormControl>
          <FormControl required>
            <FormLabel>Place of Birth</FormLabel>
            <Input
              type="text"
              name="place_of_birth"
              placeholder="place of birth"
            />
          </FormControl>
        </Card>
      </Form>
    </div>
  );
}
