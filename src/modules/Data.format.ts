import {format} from 'date-fns';

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
        title: "kfgh" || item.unit.title,
        status: item.status,
        student: item?.student?.fullname,
        regNumber: item?.student?.regNumber,
    }))
}

const courseCodeToCourseId = (courseCodes, courses) => {
    // const courseIds = courses.map((item: any) => {
    //     const  courseId = item.courseId
    //
    //     if(courseCodes.includes(courseId)) {
    //         return courseCodes
    //     }
    // })

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
export {
    dataToPaymentHistory,
    courseCodeToCourseId,
    dataToDepartment,
    dataToStudentDetails,
    dataToCourse,
    dataToTutor,
    dataToUnits
}