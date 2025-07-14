import {Col, Layout, Row} from "antd";

const campusHighlights = [
    {
        title: "Modern Laboratory & Learning Commons",
        description:
            "State-of-the-art laboratory with digital resources, collaborative spaces, and spacious study areas.",
        image:
            "https://readdy.ai/api/search-image?query=Modern%20university%20library%20with%20students%20studying%20in%20comfortable%20seating%20areas%20surrounded%20by%20books%20and%20digital%20resources%20in%20bright%20contemporary%20space&width=300&height=200&seq=campus1&orientation=landscape",
    },
    {
        title: "Innovation Hub & Modern Studio.",
        description:
            "3D printing, prototyping, and entrepreneurship center for student innovation projects.",
        image:
            "https://readdy.ai/api/search-image?query=Innovation%20maker%20space%20with%203D%20printers%20and%20students%20working%20on%20creative%20technology%20projects%20in%20modern%20workshop%20environment&width=300&height=200&seq=campus2&orientation=landscape",
    },
    {
        title: "Supportive student welfare programs.",
        description:
            "Complete mental fitness facilities and services for student wellness.",
        image:
            "https://readdy.ai/api/search-image?query=Modern%20university%20sports%20complex%20with%20students%20playing%20basketball%20and%20using%20fitness%20equipment%20in%20bright%20recreational%20facility&width=300&height=200&seq=campus3&orientation=landscape",
    },

];
export default function LandingPageCampusHighlights() {
    const {Content} = Layout
    return (
        <Content id="campus" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Campus Highlights
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience world-class facilities and vibrant campus life that
                        supports your academic journey and personal growth.
                    </p>
                </div>
                <Row gutter={[32, 32]}>
                    {campusHighlights.map((highlight, index) => (
                        <Col xs={24} sm={10} lg={8} key={index}>
                            <div className="text-center group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl mb-4">
                                    <img
                                        src={highlight.image}
                                        alt={highlight.title}
                                        className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div
                                        className="absolute inset-0 bg-blue/40 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {highlight.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {highlight.description}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </Content>
    )
}
