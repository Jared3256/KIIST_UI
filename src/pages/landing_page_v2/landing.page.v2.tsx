import {Layout} from "antd";
import React from "react";

const LandingPageHeader = React.lazy(() => import("src/pages/landing_page_v2/landing.page.header.tsx"))
const LandingPageHero = React.lazy(() => import("src/pages/landing_page_v2/landing.page.hero.tsx"))
const LandingPageDepartments = React.lazy(() => import("src/pages/landing_page_v2/landing.page.departments.tsx"))
const LandingPageFeaturedCourses = React.lazy(() => import("src/pages/landing_page_v2/landing.page.featured.courses.tsx"))
const LandingPageCampusHighlights = React.lazy(() => import("src/pages/landing_page_v2/landing.page.campus.highlights.tsx"))
const LandingPageAdmissionProcess = React.lazy(() => import("src/pages/landing_page_v2/landing.page.admission.process.tsx"))
const LandingPageFooter = React.lazy(() => import("src/pages/landing_page_v2/landing.page.footer.tsx"))
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
