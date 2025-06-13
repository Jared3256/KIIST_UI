import type {
  academicInfo,
  documentInfo,
  personalInfo,
  programSelectionInfo,
  statementInfo,
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
  const urlsByKey = {};
  Object.keys(data).forEach((key) => {
    urlsByKey[key] = data[key]?.file?.response?.data?.url || data[key];
  });


  return urlsByKey;
};

export const dataToPersonalStatement = (data) => {
  const statementData: statementInfo = {
    statement: data.personalStatement,
    special: data.specialCircumstances,
    honors: data.awards,
    additionalInfo: data.extracurricularActivities,
  };

  return statementData
}
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


 
  return urlsByKey;
};
