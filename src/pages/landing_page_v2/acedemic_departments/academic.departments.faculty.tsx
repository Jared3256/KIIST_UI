import {RightOutlined} from "@ant-design/icons";
import {MailOutlined, PhoneOutlined} from "@mui/icons-material";
import {Button, Card, Col, Divider, Layout, Row} from "antd";

const faculty = [
    {
        name: "Dr. Sarah Johnson",
        title: "Professor & Department Head",
        specialization: "Artificial Intelligence, Machine Learning",
        email: "s.johnson@kiist.ac.ke",
        phone: "+254 700 123 401",
        publications: 45,
        experience: "15 years",
        image:
            "https://readdy.ai/api/search-image?query=Professional%20female%20computer%20science%20professor%20in%20modern%20office%20setting%20with%20books%20and%20technology%20equipment%20clean%20background&width=300&height=300&seq=prof1&orientation=squarish",
    },
    {
        name: "Dr. Michael Chen",
        title: "Associate Professor",
        specialization: "Algorithms, Data Structures",
        email: "m.chen@kiist.ac.ke",
        phone: "+254 700 123 402",
        publications: 32,
        experience: "12 years",
        image:
            "https://readdy.ai/api/search-image?query=Professional%20male%20computer%20science%20professor%20in%20modern%20academic%20office%20with%20computer%20equipment%20and%20clean%20background&width=300&height=300&seq=prof2&orientation=squarish",
    },
    {
        name: "Dr. Emily Rodriguez",
        title: "Associate Professor",
        specialization: "Database Systems, Information Management",
        email: "e.rodriguez@kiist.ac.ke",
        phone: "+254 700 123 403",
        publications: 28,
        experience: "10 years",
        image:
            "https://readdy.ai/api/search-image?query=Professional%20female%20database%20systems%20professor%20in%20modern%20technology%20lab%20with%20servers%20and%20clean%20academic%20environment&width=300&height=300&seq=prof3&orientation=squarish",
    },
    {
        name: "Dr. James Wilson",
        title: "Assistant Professor",
        specialization: "Machine Learning, Data Science",
        email: "j.wilson@kiist.ac.ke",
        phone: "+254 700 123 404",
        publications: 22,
        experience: "8 years",
        image:
            "https://readdy.ai/api/search-image?query=Professional%20male%20machine%20learning%20professor%20in%20modern%20research%20lab%20with%20AI%20equipment%20and%20clean%20background&width=300&height=300&seq=prof4&orientation=squarish",
    },
    {
        name: "Dr. Lisa Thompson",
        title: "Assistant Professor",
        specialization: "Network Security, Cybersecurity",
        email: "l.thompson@kiist.ac.ke",
        phone: "+254 700 123 405",
        publications: 18,
        experience: "6 years",
        image:
            "https://readdy.ai/api/search-image?query=Professional%20female%20cybersecurity%20professor%20in%20modern%20security%20lab%20with%20network%20monitoring%20equipment%20clean%20background&width=300&height=300&seq=prof5&orientation=squarish",
    },
    {
        name: "Dr. Robert Kim",
        title: "Assistant Professor",
        specialization: "Software Engineering, System Design",
        email: "r.kim@kiist.ac.ke",
        phone: "+254 700 123 406",
        publications: 15,
        experience: "5 years",
        image:
            "https://readdy.ai/api/search-image?query=Professional%20male%20software%20engineering%20professor%20in%20modern%20development%20lab%20with%20multiple%20monitors%20and%20clean%20background&width=300&height=300&seq=prof6&orientation=squarish",
    },
];
export default function AcademicDepartmentsFaculty() {
    const {Content} = Layout;
    return (
        <Content className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Faculty
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet our distinguished faculty members who are leaders in their
                        fields and dedicated to student success.
                    </p>
                </div>

                <Row gutter={[32, 32]}>
                    {faculty.map((member, index) => (
                        <Col xs={24} md={12} lg={8} key={index}>
                            <Card
                                className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
                                />
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-blue-600 font-medium mb-3">
                                    {member.title}
                                </p>
                                <p className="text-gray-600 mb-4">{member.specialization}</p>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {member.publications}
                                        </div>
                                        <div className="text-gray-500">Publications</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {member.experience}
                                        </div>
                                        <div className="text-gray-500">Experience</div>
                                    </div>
                                </div>

                                <Divider className="my-4"/>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center justify-center space-x-2">
                                        <MailOutlined/>
                                        <span>{member.email}</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <PhoneOutlined/>
                                        <span>{member.phone}</span>
                                    </div>
                                </div>

                                <Button
                                    type="primary"
                                    className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 w-full mt-4"
                                >
                                    View Profile <RightOutlined/>
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Content>
    )
}
