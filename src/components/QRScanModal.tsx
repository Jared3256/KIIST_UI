import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Alert, Button, message, Modal, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

export default function QRScanModal({
  isQrModalVisible,
  setIsQrModalVisible,
  selectedClass,
}) {
  const { Title, Text } = Typography;
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  // Handle QR scan
    const handleQrScan = (res) => {
      console.log(res.data)
    // Simulate successful scan
    setTimeout(() => {
      setIsQrModalVisible(false);
      // Show success message
    }, 2000);
  };

  useEffect(() => {
    if (!isQrModalVisible) return;

    // Create the scanner instance
    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        handleQrScan(result);
        console.log(`Scanned: ${result}`);
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
      console.error("Could not start QR scanner:", e);
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
            <Title level={4}>{selectedClass.courseName}</Title>
            <Text type='secondary'>
              {selectedClass.courseCode} | {selectedClass.venue}
            </Text>
          </div>

          {/* VIDEO STREAM */}
          <div
            className='relative bg-black rounded-lg mb-4 overflow-hidden'
            style={{ height: 240 }}>
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
                style={{ width: 180, height: 180 }}>
                <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500'></div>
                <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500'></div>
                <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500'></div>
                <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500'></div>
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <Alert
              message={
                selectedClass.distance <= 0.2
                  ? "You are within the class location range"
                  : "You are not within the class location range"
              }
              type={selectedClass.distance <= 0.2 ? "success" : "error"}
              showIcon
              icon={
                selectedClass.distance <= 0.2 ? (
                  <CheckCircleOutlined />
                ) : (
                  <WarningOutlined />
                )
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
