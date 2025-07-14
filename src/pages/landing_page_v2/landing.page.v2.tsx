import {Layout} from "antd";
import React, {useState} from "react";

import SmokeyCursor from "../../components/lightswind/smokey-cursor"

const LandingPageHeader = React.lazy(() => import("src/pages/landing_page_v2/landing.page.header.tsx"))
const LandingPageHero = React.lazy(() => import("src/pages/landing_page_v2/landing.page.hero.tsx"))
const LandingPageDepartments = React.lazy(() => import("src/pages/landing_page_v2/landing.page.departments.tsx"))
const LandingPageFeaturedCourses = React.lazy(() => import("src/pages/landing_page_v2/landing.page.featured.courses.tsx"))
const LandingPageCampusHighlights = React.lazy(() => import("src/pages/landing_page_v2/landing.page.campus.highlights.tsx"))
const LandingPageAdmissionProcess = React.lazy(() => import("src/pages/landing_page_v2/landing.page.admission.process.tsx"))
const LandingPageFooter = React.lazy(() => import("src/pages/landing_page_v2/landing.page.footer.tsx"))
export default function LandingPageV2() {
    // State for cursor settings
    const [settings, setSettings] = useState({
        simResolution: 128,
        dyeResolution: 1024,
        densityDissipation: 3.5,
        velocityDissipation: 2,
        pressure: 0.1,
        pressureIterations: 20,
        curl: 3,
        splatRadius: 0.2,
        splatForce: 6000,
        shading: true,
        colorUpdateSpeed: 10,
        backColor: {r: 0.5, g: 0, b: 0},
        transparent: true,
        isActive: true,
    });
    return (
        <Layout className="min-h-screen bg-white">
            <SmokeyCursor
                SIM_RESOLUTION={settings.simResolution}
                DYE_RESOLUTION={settings.dyeResolution}
                DENSITY_DISSIPATION={settings.densityDissipation}
                VELOCITY_DISSIPATION={settings.velocityDissipation}
                PRESSURE={settings.pressure}
                PRESSURE_ITERATIONS={settings.pressureIterations}
                CURL={settings.curl}
                SPLAT_RADIUS={settings.splatRadius}
                SPLAT_FORCE={settings.splatForce}
                SHADING={settings.shading}
                COLOR_UPDATE_SPEED={settings.colorUpdateSpeed}
                BACK_COLOR={settings.backColor}
                TRANSPARENT={settings.transparent}
            />
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
