import {Layout} from "antd";
import LandingPageHeader from "src/pages/landing_page_v2/landing.page.header.tsx";
import LandingPageHero from "src/pages/landing_page_v2/landing.page.hero.tsx";
import LandingPageDepartments from "src/pages/landing_page_v2/landing.page.departments.tsx";
import LandingPageFeaturedCourses from "src/pages/landing_page_v2/landing.page.featured.courses.tsx";
import LandingPageCampusHighlights from "src/pages/landing_page_v2/landing.page.campus.highlights.tsx";
import LandingPageAdmissionProcess from "src/pages/landing_page_v2/landing.page.admission.process.tsx";
import LandingPageFooter from "src/pages/landing_page_v2/landing.page.footer.tsx";

export default function LandingPageV2() {
    return (
        <Layout className="min-h-screen bg-white">
            <LandingPageHeader/>
            <LandingPageHero/>
            <LandingPageDepartments/>
            <LandingPageFeaturedCourses/>
            <LandingPageCampusHighlights/>
            <LandingPageAdmissionProcess/>
            <LandingPageFooter/>
        </Layout>
    )
}
