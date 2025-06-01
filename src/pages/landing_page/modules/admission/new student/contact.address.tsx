import {Card, FormControl, FormLabel, Input} from "@mui/joy";
import {DatePicker, Divider} from "antd";
import React from "react";
import {Form} from "react-router";

export default function ContactAddress() {
    return (
        <div>
            <Form onSubmit={(e) => e.preventDefault}>
                <Card

                    size="md"
                    sx={{
                        maxHeight: "max-content",
                        maxWidth: "100%",
                        mx: "auto",
                        gap: "20px",
                        // to make the demo resizable
                        overflow: "auto",
                        resize: "horizontal",
                    }}
                >
                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your primary email"
                        />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Mobile phone</FormLabel>
                        <Input
                            type="tel"
                            name="mobile_phone"
                            placeholder="Enter your mobile phone number"
                        />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Alternative Mobile phone</FormLabel>
                        <Input
                            
                            type="tel"
                            name="mobile_phone"
                            placeholder="Enter alternative phone number"
                        />
                    </FormControl>
                    <FormControl
                        required
                        sx={{
                            marginTop: "10px",
                        }}
                    >
                        <FormLabel> Current Addess</FormLabel>
                        <Input
                            type="tel"
                            name="mobile_phone"
                            placeholder="current address"
                        />
                    </FormControl>
                </Card>
            </Form>
        </div>
    );
}
