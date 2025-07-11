import {Layout} from "antd";
import AcademicDepartmentHeader from "src/pages/landing_page_v2/acedemic_departments/academic.department.header.tsx";
import AcademicDepartmentsHero from "src/pages/landing_page_v2/acedemic_departments/academic.departments.hero.tsx";
import AcademicDepartmentsAcademicPrograms
    from "src/pages/landing_page_v2/acedemic_departments/academic.departments.academic.programs.tsx";
import AcademicDepartmentsCourseCatalogue
    from "src/pages/landing_page_v2/acedemic_departments/academic.departments.course.catalogue.tsx";
import AcademicDepartmentsFaculty
    from "src/pages/landing_page_v2/acedemic_departments/academic.departments.faculty.tsx";
import AcademicDepartmentsStudentProjects
    from "src/pages/landing_page_v2/acedemic_departments/academic.departments.student.projects.tsx";
import AcademicDepartmentAdmissionRequirements
    from "src/pages/landing_page_v2/acedemic_departments/academic.department.admission.requirements.tsx";
import AcademicDepartmentCareerOutcomes
    from "src/pages/landing_page_v2/acedemic_departments/academic.department.career.outcomes.tsx";
import AcademicDepartmentContactInfo
    from "src/pages/landing_page_v2/acedemic_departments/academic.department.contact.info.tsx";
import Footer from "src/components/landing_page/Footer.tsx";

export default function AcedmicDepartmentPage() {

    return (
        <Layout className="min-h-screen bg-white">
            <AcademicDepartmentHeader/>
            <AcademicDepartmentsHero/>
            <AcademicDepartmentsAcademicPrograms/>
            <AcademicDepartmentsCourseCatalogue/>
            <AcademicDepartmentsFaculty/>
            <AcademicDepartmentsStudentProjects/>
            <AcademicDepartmentAdmissionRequirements/>
            <AcademicDepartmentCareerOutcomes/>
            <AcademicDepartmentContactInfo/>
            <Footer/>
        </Layout>

    )
}
