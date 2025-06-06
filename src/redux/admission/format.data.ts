import type {
  academicInfo,
  documentInfo,
  personalInfo,
  programSelectionInfo,
} from "./actions";
import { format } from "date-fns";

export const dataToPersonalDetails = (data) => {
  const studentData: personalInfo = {
    title: data.title,
    firstname: data.firstname,
    middlename: data.middlename,
    lastname: data.lastname,
    dateOfBirth: format(data.dateOfBirth, "dd/MM/yyyy"),
    gender: data.gender,
    nationalId: data.nationalId,

    email: data.email,
    mobilePhone: data.mobilePhone,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    city: data.city,
    province: data.province,
    postalZip: data.postalZip,
    country: data.country,
    emergency: {
      fullname: data.emergency_fullname,
      relationship: data.emergency_relationship,
      email: data.emergency_email,
      mobilePhone: data.emergency_mobilePhone,
    },
  };

  return studentData;
};

export const dataToAcademicDetails = (data) => {
  const academicData: academicInfo = {
    secondarySchool: {
      name: data.highSchoolName,
      startDate: data.highSchoolStartDate,
      endDate: data.highSchoolEndDate,
      qualificationObtained: data.highSchoolQualification,
      finalGrade: data.highSchoolGrade,
      highSchoolTranscript: data.highSchoolTranscript.file.response.data.url,
    },
    college: {
      collegeDegree: data.collegeDegree,
      collegeLocation: data.collegeLocation,
      collegeMajor: data.collegeMajor,
      collegeName: data.collegeName,
      collegeTranscript: data.collegeTranscript.file.response.data.url,
    },
    certification: {
      certifications: data.certifications,
      certificationDocuments:
        data.certificationDocuments.file.response.data.url,
    },
    additionalInfo: data.additionalInfo,
  };

  return academicData;
};

export const dataToProgramSelection = (data) => {
  const programData: programSelectionInfo = {
    main: {
      department: data.department,
      program: data.program,
      studyMode: data.studyMode,
      intendedStartTerm: data.entryTerm,
    },
    alternative: {
      altProgram: data.altDepartment,
      altDepartment: data.altDepartment,
      careerGoals: data.careerGoals,
      reason: data.programInterest,
    },
  };
  return programData;
};

export const dataToDocumentDetails = (data) => {
 

  const urlsByKey = {};
  Object.keys(data).forEach((key) => {
    urlsByKey[key] = data[key]?.file?.response?.data?.url || data[key];
  });

  console.log(urlsByKey);
 
  return urlsByKey;
};
