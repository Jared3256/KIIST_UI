import { BookOutlined, CalendarOutlined, EnvironmentOutlined, ScanOutlined } from "@ant-design/icons";
import { Badge, Button, Calendar, Card, Tag, Typography } from "antd";
import { useState } from "react";
import QRScanModal from "src/components/QRScanModal";
import { upcomingClasses } from "src/modules/mockdata";

export default function StudentClasses() {
  const { Title, Text } = Typography;

  const [isQrModalVisible, setIsQrModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  // Show QR scanner modal
  const showQrModal = (classItem: any) => {
    setSelectedClass(classItem);
    setIsQrModalVisible(true);
  };
  // Mock calendar data
  const getListData = (value: any) => {
    const listData = [];
    const day = value.date();
    const month = value.month();
    // Add some mock events
    if (month === 5) {
      // June
      if (day === 6) {
        listData.push({ type: "success", content: "CS4023 10:00 AM" });
        listData.push({ type: "success", content: "CS3033 2:00 PM" });
      } else if (day === 9) {
        listData.push({ type: "success", content: "CS4053 9:00 AM" });
      } else if (day === 10) {
        listData.push({ type: "success", content: "CS3043 1:00 PM" });
      }
    }
    return listData;
  };
  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className='p-0 m-0 list-none'>
        {listData.map((item, index) => (
          <li key={index} className='text-xs mb-1'>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className='p-6'>
      <Title level={3} className='mb-6'>
        Upcoming Classes
      </Title>
      <div className='grid grid-cols-1 gap-4 mb-6'>
        {upcomingClasses.map((classItem) => (
          <Card
            key={classItem.id}
            className='shadow-sm hover:shadow-md transition-shadow border-l-4'
            style={{
              borderLeftColor:
                classItem.status === "ongoing"
                  ? "#1890ff"
                  : classItem.status === "upcoming"
                  ? "#52c41a"
                  : "#d9d9d9",
            }}>
            <div className='flex flex-col md:flex-row md:justify-between'>
              <div className='flex-1'>
                <div className='flex items-center mb-2'>
                  <BookOutlined className='text-blue-500 text-xl mr-3' />
                  <div>
                    <Title level={4} className='mb-0'>
                      {classItem.courseName}
                    </Title>
                    <Text type='secondary'>{classItem.courseCode}</Text>
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                  <div>
                    <div className='flex items-center mb-2'>
                      <CalendarOutlined className='mr-2 text-gray-600' />
                      <Text strong>Date & Time</Text>
                    </div>
                    <Text>{classItem.date}</Text>
                    <br />
                    <Text>{classItem.time}</Text>
                  </div>
                  <div>
                    <div className='flex items-center mb-2'>
                      <EnvironmentOutlined className='mr-2 text-gray-600' />
                      <Text strong>Venue</Text>
                    </div>
                    <Text>{classItem.venue}</Text>
                    <br />
                    <Text>
                      Distance: {classItem.distance} km
                      {classItem.distance <= 0.2 ? (
                        <Tag color='success' className='ml-2'>
                          Within Range
                        </Tag>
                      ) : (
                        <Tag color='warning' className='ml-2'>
                          Out of Range
                        </Tag>
                      )}
                    </Text>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-start md:items-end mt-4 md:mt-0'>
                <Tag
                  color={
                    classItem.status === "ongoing"
                      ? "blue"
                      : classItem.status === "upcoming"
                      ? "green"
                      : "default"
                  }
                  className='mb-4 text-sm px-3 py-1'>
                  {classItem.status === "ongoing"
                    ? "Ongoing"
                    : classItem.status === "upcoming"
                    ? "Upcoming"
                    : "Completed"}
                </Tag>
                <Button
                  type='primary'
                  size='large'
                  icon={<ScanOutlined />}
                  onClick={() => showQrModal(classItem)}
                  disabled={
                    classItem.distance > 0.2 || classItem.status !== "ongoing"
                  }
                  className='!rounded-button whitespace-nowrap'>
                  Scan QR Code
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card
        title='Weekly Schedule'
        className='shadow-sm hover:shadow-md transition-shadow'>
        <Calendar fullscreen={false} dateCellRender={dateCellRender} />
      </Card>
      <QRScanModal isQrModalVisible={isQrModalVisible} setIsQrModalVisible={setIsQrModalVisible} selectedClass={selectedClass}/>
    </div>
  );
}
