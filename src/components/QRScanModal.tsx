import {CheckCircleOutlined, WarningOutlined} from "@ant-design/icons";
import {Alert, Button, message, Modal, notification, Typography} from "antd";
import React, {useEffect, useRef} from "react";
import QrScanner from "qr-scanner";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {admin_crud_request} from "src/service/crud.service";
import { getCurrentSemesterName } from "src/pages/admin/session/admin.session.manager";

export default function QRScanModal({
                                        isQrModalVisible,
                                        setIsQrModalVisible,
                                        selectedClass,
                                        getAttendance
                                    }) {
    const {Title, Text} = Typography;
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate();

    // Handle QR scan
    const handleQrScan = async (result) => {

        const student_attendance = {
            regNumber: current.UserInfo.entity.registrationNumber,
            date: new Date(),
            code: selectedClass.course,
            title: selectedClass.title,
            status: "pending",
            semester:getCurrentSemesterName()
        }
        try {
            if (String(result.data).startsWith(selectedClass.course)) {
                console.log(student_attendance)

                const data = await admin_crud_request.post_spc({
                    data: student_attendance,
                    hotAxiosPrivate: hotAxiosPrivate,
                    url: "/student/attendance/create",
                })

                if (data.success) {
                    console.log(data.data)
                    getAttendance()
                }
            } else {
                notification.config({
                    duration: 20,
                    maxCount: 1,
                });

                notification.error({
                    message: "Invalid QR code",
                    description: "You need to scan the correct class code",
                });
            }
        } finally {
            setIsQrModalVisible(false);
        }
    };

    useEffect(() => {
        if (!isQrModalVisible) return;

        // Create the scanner instance
        const scanner = new QrScanner(
            videoRef.current,
            (result) => {
                handleQrScan(result);

                scanner.stop(); // stop scanning
                setIsQrModalVisible(false); // close modal
            },
            {
                // Prefer back camera
                preferredCamera: "environment",
            }
        );
        qrScannerRef.current = scanner;

        // Start it up
        scanner.start().catch((e) => {

            message.error("Cannot access camera for QR scanning.");
        });

        // Cleanup on close/unmount
        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.stop();
                qrScannerRef.current.destroy();
                qrScannerRef.current = null;
            }
        };
    }, [isQrModalVisible, setIsQrModalVisible]);

    return (
        <Modal
            title='Scan QR Code'
            open={isQrModalVisible}
            onCancel={() => setIsQrModalVisible(false)}
            footer={null}
            centered
            width={400}>
            {selectedClass && (
                <div className='text-center'>
                    <div className='mb-4'>
                        <Title level={4}>{selectedClass.title}</Title>
                        <Text type='secondary'>
                            {selectedClass.course} | Available LH
                        </Text>
                    </div>

                    {/* VIDEO STREAM */}
                    <div
                        className='relative bg-black rounded-lg mb-4 overflow-hidden'
                        style={{height: 240}}>
                        <video
                            ref={videoRef}
                            muted
                            playsInline
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        {/* scanning frame overlay */}
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <div
                                className='border-2 border-blue-500 rounded-lg'
                                style={{width: 180, height: 180}}>
                                <div
                                    className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500'></div>
                                <div
                                    className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500'></div>
                                <div
                                    className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500'></div>
                                <div
                                    className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500'></div>
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <Alert
                            message={

                                "Ensure to capture the correct QR"
                            }
                            type={"success"}
                            showIcon
                            icon={

                                <CheckCircleOutlined/>
                            }
                        />
                    </div>

                    <div className='flex justify-between'>
                        <Button
                            onClick={() => setIsQrModalVisible(false)}
                            className='!rounded-button whitespace-nowrap'>
                            Cancel
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => {
                                if (qrScannerRef.current) qrScannerRef.current.stop();
                                setIsQrModalVisible(false);
                            }}
                            className='!rounded-button whitespace-nowrap'>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
}
