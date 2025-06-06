import React, { useState, useEffect } from "react";
import { Button, Typography, Space, Spin, message } from "antd";
import {
  ReloadOutlined,
  WifiOutlined,
  DisconnectOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { CloudOffOutlined } from "@mui/icons-material";

export default function Offline() {
  const { Title, Text } = Typography;
  const [isAttemptingReconnect, setIsAttemptingReconnect] =
    useState<boolean>(false);
  const [reconnectCount, setReconnectCount] = useState<number>(0);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => {
    return localStorage.getItem("offlineMode") === "true";
  });

  const toggleOfflineMode = () => {
    const newOfflineMode = !isOfflineMode;
    setIsOfflineMode(newOfflineMode);
    localStorage.setItem("offlineMode", String(newOfflineMode));
    message.success(
      newOfflineMode ? "Offline mode activated" : "Online mode restored"
    );
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAttemptingReconnect) {
      timer = setTimeout(() => {
        setIsAttemptingReconnect(false);
        setReconnectCount((prev) => prev + 1);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAttemptingReconnect]);
  const handleRetryConnection = () => {
    setIsAttemptingReconnect(true);
  };
  return (
    <div className='min-h-1/2 bg-gray-50 flex flex-col items-center justify-center px-4'>
      <div
        className={`max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center ${
          isOfflineMode ? "border-2 border-blue-200" : ""
        }`}>
        {isOfflineMode && (
          <div className='mb-6 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-center justify-center'>
            <CloudOffOutlined className='mr-2' />
            <Text className='text-blue-700'>
              You are currently working in offline mode
            </Text>
          </div>
        )}
        {/* Main Illustration */}
        <div className='relative mb-8 w-full h-64 md:h-80 overflow-hidden rounded-lg'>
          <img
            src='https://readdy.ai/api/search-image?query=A%20modern%20minimalist%20illustration%20of%20a%20disconnected%20internet%20state%2C%20featuring%20a%20stylized%20computer%20or%20device%20with%20a%20broken%20connection%20symbol.%20The%20image%20has%20a%20soft%20gradient%20background%20in%20light%20blue%20and%20gray%20tones%2C%20with%20simple%20geometric%20elements%20to%20represent%20data%20packets%20or%20signals%20that%20cannot%20reach%20their%20destination.%20The%20design%20is%20clean%2C%20professional%2C%20and%20visually%20communicates%20offline%20status%20without%20being%20too%20technical%20or%20complex.&width=800&height=500&seq=1&orientation=landscape'
            alt='Disconnected illustration'
            className='w-full h-full object-cover object-top rounded-lg'
          />
        </div>
        {/* Status Message */}
        <Title level={2} className='mb-4 text-gray-800'>
          You're Offline
        </Title>
        {/* Supportive Text */}
        <Text className='text-lg text-gray-600 mb-8 block'>
          Please check your internet connection and try again. Don't worry,
          we'll reconnect automatically when you're back online.
        </Text>
        {/* Action Elements */}
        <Space direction='vertical' size='large' className='w-full'>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            size='large'
            onClick={handleRetryConnection}
            loading={isAttemptingReconnect}
            disabled={isAttemptingReconnect}
            className='h-12 px-8 !rounded-button whitespace-nowrap cursor-pointer bg-blue-600 hover:bg-blue-700'>
            Retry Connection
          </Button>
          <Button
            id='offlineModeButton'
            type='link'
            onClick={toggleOfflineMode}
            icon={isOfflineMode ? <CloudOutlined /> : <CloudOffOutlined />}
            className={`${
              isOfflineMode
                ? "text-blue-600 hover:text-blue-700"
                : "text-gray-600 hover:text-gray-800"
            } !rounded-button whitespace-nowrap cursor-pointer`}>
            {isOfflineMode ? "Exit Offline Mode" : "Work Offline"}
          </Button>
        </Space>
        {/* Connection Status Indicator */}
        <div className='mt-12 flex flex-col items-center'>
          {isOfflineMode && (
            <div className='mb-4 px-4 py-2 bg-gray-50 rounded-lg w-full'>
              <Text className='text-sm text-gray-600 block mb-2'>
                Available Offline Features:
              </Text>
              <ul className='text-left text-sm text-gray-500'>
                <li className='flex items-center mb-1'>
                  <span className='mr-2'>•</span> View cached content
                </li>
                <li className='flex items-center mb-1'>
                  <span className='mr-2'>•</span> Access saved documents
                </li>
                <li className='flex items-center'>
                  <span className='mr-2'>•</span> Basic app functionality
                </li>
              </ul>
            </div>
          )}
          <div className='flex items-center justify-center mb-2'>
            {isAttemptingReconnect ? (
              <Spin size='small' className='mr-2' />
            ) : (
              <DisconnectOutlined className='text-red-500 mr-2' />
            )}
            <Text
              className={`${
                isAttemptingReconnect ? "text-blue-500" : "text-red-500"
              }`}>
              {isAttemptingReconnect
                ? "Attempting to reconnect..."
                : "Currently offline"}
            </Text>
          </div>
          {reconnectCount > 0 && (
            <Text className='text-xs text-gray-500'>
              Reconnection attempts: {reconnectCount}
            </Text>
          )}
        </div>
      </div>
      {/* Last connection info */}
      <div className='mt-8 text-center text-gray-500'>
        <Text className='text-sm'>
          Last online: {new Date().toLocaleString()}
        </Text>
        <div className='mt-2 flex items-center justify-center'>
          <WifiOutlined className='text-red-500 mr-2' />
          <Text className='text-sm'>Connection lost</Text>
        </div>
      </div>
    </div>
  );
}
