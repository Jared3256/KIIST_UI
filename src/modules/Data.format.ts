import {addMinutes, format, subHours, subMinutes} from 'date-fns';

const dataToDepartment = (result: any) => {

    return result.map((department) => ({
        key: department?._id,
        name: department?.departmentName,
        head: department?.departmentHead?.name || department.departmentHead,
        code: department?.departmentCode,
        courses: department?.courses
    }))
}


const dataToCourse = (result: any) => {

    return result.map((item: any) => ({
        key: item._id,
        code: item.code,
        title: item.title,
        department: item.department.departmentName,
        credits: item.credits,
        lecturer: item?.lecturer?.name || "N/A",
        courses: item.courses,
        status: item.status,
        prerequisites: item.prerequisites,
    }))
}

const dataToTutor = (result: any) => {


    return result.map((item: any) => ({
        key: item._id,
        departmentName: item.department.departmentName,
        qualification: item.qualification,
        photo: item.photo,
        paymentScale: item.paymentScale,
        name: item.name,
        courses: item.courses,
        status: item.status,
    }))
}

const dataToUnits = (result: any) => {

    return result.map((item: any) => ({
        key: item._id,
        course: item.unit.code,
        title: item.unit.title || "NAN",
        status: item.status,
        student: item?.student?.fullname,
        regNumber: item?.student?.regNumber,
        credits: item?.unit?.credits,
        instructor: item.unit?.instructor?.name || "NAN",
    }))
}

const courseCodeToCourseId = (courseCodes, courses) => {
    const ids = []
    for (const course in courses) {
        if (courseCodes.includes(courses[course].code)) {
            ids.push(courses[course].key)
        }

    }
    return ids

}

const dataToStudentDetails = (results) => {
    return results.map((result: any) => ({
        key: result._id,
        regNumber: result.registrationNumber,
        name: result.personalDetails.firstname + " " + (result.personalDetails.middlename || result.personalDetails.lastname),
        status: result.suspended ? "Suspended" : "Active"
    }))
}

const dataToPaymentHistory = (result: any) => {

    const idChecker = (receiptId) => {
        if (String(receiptId).length > 10) {
            return "NAN"
        } else {
            return receiptId
        }
    }
    return result.map((item: any) => ({
        key: item._id,
        id: idChecker(item.receiptId),
        date: format(item.paymentDate, 'MMMM dd, yyyy'),
        amount: item.amount,
        method: item.payment,
        status: item.status,
    }))
}
const dataToReportingHistory = (result: any) => {

    return result.map((item: any) => ({
        key: item._id,
        regNumber: item.student.registrationNumber,
        name: item.student.personalDetails.firstname + " " + (item.student.personalDetails.middlename || item?.student.personalDetails?.lastname),
        reportDate: format(item.reportingDate, 'EEEE, LLLL do yyyy'), //format("MMMM dd, yyyy", new Date(item.reportingDate)),
        amount: item.feeStatus.total_fee - item.feeStatus.amount_paid
    }))
}

const dataToNotReportingHistory = (result: any) => {

    return result.map((item: any) => ({
        id: item._id,
        regNumber: item.registrationNumber,
        name: item.personalDetails.firstname + " " + (item.personalDetails.middlename || item?.personalDetails?.lastname),
        course: item.programSelection.main.program
    }))
}

const dataToStudentOverride = (result: any) => {

    return result.map((item: any) => ({
        id: item.id,
        name: item.name,
        overrideDate: format(item.overrideDate, 'EEEE, LLLL do yyyy'),
        processedBy: item.processedBy,
        reason: item.reason,
    }))
}


const dataToGradeManagementCourses = (result: any) => {

    return result.map((item: any) => ({
        id: item._id,
        title: item.title,
        code: item.code,
    }))
}

const dataToTaughtGradeManagementCourses = (result: any, courses: any) => {


    const courseCodes = courses.map(course => course.code),
        filtered = result.filter((item: any) => courseCodes.includes(item.code))

    return filtered.map((item: any) => ({
            id: item._id,
            title: item.title,
            code: item.code,
        })
    )
}

const dataToStudentTranscript = (result: any) => {
    const calculateGrade = (total: number) => {
        if (total >= 80) return "Distinction 1";
        if (total >= 70) return "Distinction 2";
        if (total >= 60) return "Credit 1";
        if (total >= 50) return "Credit 2";
        if (total >= 40) return "Pass";
        return "Fail";
    };

    return result.map((item: any) => ({
        key: item._id,
        code: item.course.code,
        title: item.course.title,
        credits: item.course.credits,
        total: item.assignment + item.final,
        cat: item.assignment,
        main: item.final,
        grade: calculateGrade(item.assignment + item.final)

    }))
}


const dataToAssignedUnits = (result: any) => {


    const units = result.units
    const schedule = result.schedule

    const data = units.map((item: any) => ({
        key: item._id,
        code: item.code,
        title: item.title,
        credits: item.credits,
        students: item.students,

    }))

    return [data, schedule.join("\n")]
}


const dataToLecturerCat = (result: any) => {

    return result.map((item: any) => ({
        key: item._id,
        title: item.code.title,
        due_date: format(new Date(item.due_date), "MMMM d, yyyy"),
        duration: item.duration,
        status: item?.status || "NAN",
    }))
}

const dataToStudentCATs = (result: any) => {
    
    return result.map((item: any) => ({
        key: item.code._id,
        title: item.code.title,
        due_date: format(new Date(item.due_date), "MMMM d, yyyy"),
        scheduled_date: format(subHours(item.due_time, 0), "MMMM dd, yyyy HH:mm:ss"),
        duration: item.duration,
        startTime: subHours(item.due_time, 0),
        endTime: addMinutes(subHours(item.due_time, 0), item.duration),
        progress: 0,
        status: item.status || "pending",
        questions: item.questions,
        code: item.code.code
    }))
}

const dataToCatQuestions = (result: any) => {
    return result.map((item: any) => ({
        key: item._id,
        question: item.question, variant: "essay",
        answer: "",
    }))
}

const dataToCompletedCATS = (result: any) => {
    console.log(result)
    return result.map((item: any) => ({
        key: item._id,
        title: item.code.title,
        status: "submitted",
        progress: 100,
        grade: item.grade,
        feedback: "test feedback",
        code: item.code.code,
        submited_date: format(new Date(item.submited_date), "MMMM d, yyyy"),
    }))
}
export {
    dataToCompletedCATS,
    dataToCatQuestions,
    dataToStudentCATs,
    dataToLecturerCat,
    dataToTaughtGradeManagementCourses,
    dataToAssignedUnits,
    dataToStudentTranscript,
    dataToGradeManagementCourses,
    dataToStudentOverride,
    dataToReportingHistory,
    dataToNotReportingHistory,
    dataToPaymentHistory,
    courseCodeToCourseId,
    dataToDepartment,
    dataToStudentDetails,
    dataToCourse,
    dataToTutor,
    dataToUnits
}