import {Layout} from "antd"

export default function AcademicDepartmentsHero() {
    const {Content} = Layout;
    return (
        <Content className="relative h-96 mt-16">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{

                    backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20computer%20science%20department%20with%20students%20working%20in%20high-tech%20laboratory%20surrounded%20by%20advanced%20computing%20equipment%20and%20programming%20workstations%20in%20bright%20academic%20environment&width=1440&height=400&seq=hero&orientation=landscape')`,
                }}
            >
                <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
            </div>
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Computer Science & Information Technology
                        </h1>
                        <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                            Leading the future of technology through innovative education,
                            cutting-edge research, and industry partnerships. Our department
                            prepares students for successful careers in the rapidly evolving
                            tech landscape.
                        </p>
                        <div className="flex items-center space-x-8 text-white">
                            <div className="text-center">
                                <div className="text-3xl font-bold">12+</div>
                                <div className="text-blue-200">Faculty Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">120+</div>
                                <div className="text-blue-200">Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">2</div>
                                <div className="text-blue-200">Research Centers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">95%</div>
                                <div className="text-blue-200">Employment Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}
