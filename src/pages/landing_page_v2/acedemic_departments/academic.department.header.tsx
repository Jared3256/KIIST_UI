import {ArrowLeftOutlined, LaptopOutlined, SearchOutlined} from "@mui/icons-material";
import {Button, Input, Layout} from "antd";
import {Link} from "react-router"

export default function AcademicDepartmentHeader() {
    const {Header} = Layout
    return (
        <Header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50" style={{
            backgroundColor: "white"
        }}>
            <div className="max-w-[100hw] mx-auto">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link to={"/"}
                              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                            <ArrowLeftOutlined className="text-lg"/>
                            <span className="font-medium">Back to Home</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-3">
                        <LaptopOutlined className="text-2xl text-blue-600"/>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Computer Science & IT
                            </h1>
                            <p className="text-xs text-gray-600">Department</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Input
                                placeholder="Search department..."
                                prefix={<SearchOutlined className="text-gray-400 text-sm"/>}
                                className="w-64 h-10 text-sm border-gray-300"
                            />
                        </div>
                        <Button
                            type="primary"
                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600"
                        >
                            Apply Now
                        </Button>
                    </div>
                </div>
            </div>
        </Header>
    )
}
