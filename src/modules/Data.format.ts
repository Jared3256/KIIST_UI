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
export {dataToDepartment, dataToCourse, dataToTutor, dataToUnits}