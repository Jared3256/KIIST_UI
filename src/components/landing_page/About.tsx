import {Layout} from "antd"
import {CssBaseline} from "@mui/joy";
import LandingPageBar from "src/components/landing_page/LandingPageBar.tsx";
import Footer from "src/components/landing_page/Footer.tsx";
import {Helmet} from "react-helmet"
import {useState} from "react"

const InfoCard = ({title, children}) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="glass-card cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => setOpen(!open)}
        >
            <h3 className="text-2xl font-semibold mb-2 text-center">{title}</h3>
            {open && <div className="mt-4 text-sm">{children}</div>}
        </div>
    );
};

function About() {

    return <Layout className="min-h-screen">
        <Helmet>
            <title>KIIST | About Us </title>
            <meta
                name="description"
                content="Discover KIIST - your trusted TVET institution in Kenya. Learn about our mission, vision, and commitment to seamless communication."
            />
        </Helmet>
        <CssBaseline/>
        <LandingPageBar/>

        <div>
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 text-center text-white">
                <h1 className="text-4xl font-bold mb-2">About Us</h1>
                <div className="w-20 h-1 bg-white mx-auto mb-4 rounded"></div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-12 space-y-14">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Our Story</h2>
                        <p className="text-gray-700 mb-3">
                            Kisii Impact of Science and Technology College is dedicated to inspire and help learners
                            develop intellect and character, desirable skills, knowledge and attitudes responsive to the
                            challenges of a dynamic society.
                        </p>
                        <div className="w-20 h-1 bg-red-500 mx-auto my-4 rounded"></div>
                        <p className="text-gray-600">
                            We are the leading TVET & Medical institution in Kenya, well known for our exciting approach
                            to tertiary education and training. We boast modern state-of-the-art facilities, dynamic
                            approach to teaching, and vibrant co-curriculum schedule for our students.
                            We offer Advanced Diploma, Diploma, Certificate, Artisan, Short Courses & Driving. Through
                            our brand promise, Quality Education, we produce effective professionals in diverse fields
                            giving them a competitive advantage. For the last decade, over 50,000 students have
                            graduated and taken successful career paths nationally and internationally.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src={""} alt="About" className="rounded-xl shadow-md"/>
                        <img src={""} alt="About" className="rounded-xl shadow-md"/>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <InfoCard title="What We Do">
                        We are dedicated to inspire and help learners develop intellect and character, desirable skills,
                        knowledge and attitudes responsive to the challenges of a dynamic society
                    </InfoCard>

                    <InfoCard title="Why Choose Us?">
                        <ul className="list-disc pl-5 space-y-1 text-left">
                            <li>Serene learning environment</li>
                            <li>Vibrant co-curriculum schedule for our students</li>
                            <li>Indoor and outdoor activities e.g. football, volleyball, table tennis, pool table,
                                darts, CU and CA.
                            </li>
                            <li>Emphasis on academic tours & trips to enhance education quality</li>
                        </ul>
                    </InfoCard>

                    <InfoCard title="Our Vision">
                        To be a center of academic excellence for community service and development
                    </InfoCard>

                    <InfoCard title="Our Mission">
                        Kisii Impact Institute of Science and Technology is dedicated to inspire and help learners
                        develop intellect and character, desirable skills, knowledge and attitudes responsive to the
                        challenges of a dynamic society.
                    </InfoCard>
                </div>
            </section>
        </div>
        <Footer/>
    </Layout>
}

export default About