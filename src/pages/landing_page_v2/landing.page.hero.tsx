import {Button, Layout} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay, Navigation} from "swiper/modules";
import {PlayCircleOutlined, RightOutlined} from "@ant-design/icons";
import {useState} from "react";
import Image1 from "../../assets/image1.jpg"
import Image2 from "../../assets/image2.jpg"
import Image3 from "../../assets/image3.jpg"

const heroSlides = [
    {
        id: 1,
        image: Image1
        ,
        title: "Excellence in Science & Technology Education",
        subtitle:
            "Empowering the next generation of innovators and leaders through cutting-edge education and research opportunities at Kisii Impact Institute.",
        cta: "Explore Programs",
    },
    {
        id: 2,
        image: Image2
        , title: "State-of-the-Art Learning",
        subtitle:
            "Experience a learning environment enriched with modern classrooms, and innovative learning spaces designed to foster creativity and academic excellence.",
        cta: "Virtual Tour",
    },
    {
        id: 3,
        image: Image3
        , title: "Get started in foreign languages.",
        subtitle:
            "Learn German language and grab the opportunity to study abroad.",
        cta: "Research Centers",
    },
];
export default function LandingPageHero() {
    const {Content} = Layout;
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Content id={"home"} className="relative h-screen mt-16">
            <Swiper

                modules={[Pagination, Autoplay, Navigation]}
                pagination={{clickable: true}}
                autoplay={{delay: 5000}}
                navigation={{
                    hideOnClick: false,
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                loop
                className="h-full"
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            >
                {heroSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full">
                            <div

                                className="absolute inset-0 bg-cover bg-center"
                                style={{backgroundImage: `url(${slide.image})`}}
                            >
                                <div className="absolute inset-0 bg-black/40 bg-opacity-40"></div>
                            </div>
                            <div className="relative z-10 h-full flex items-center">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className="max-w-3xl">
                                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                                            {slide.subtitle}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                size="large"
                                                type="primary"
                                                className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 h-12 px-8 text-lg"
                                            >
                                                {slide.cta} <RightOutlined/>
                                            </Button>
                                            <Button
                                                size="large"
                                                className="!rounded-button whitespace-nowrap cursor-pointer h-12 px-8 text-lg border-white text-white hover:bg-white hover:text-gray-900"
                                            >
                                                <PlayCircleOutlined/> Watch Video
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </Content>
    )
}
