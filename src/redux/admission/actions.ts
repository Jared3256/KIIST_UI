import { SaveStudentPersonalDetails } from "src/service/admissionService";
import { dataToDocumentDetails } from "./format.data";

export interface personalInfo {
  title: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  dateOfBirth: string;
  gender: string;
  nationalId: number;

  email: string;
  mobilePhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalZip: string;
  country: string;
  emergency: {
    fullname: string;
    relationship: string;
    email?: string;
    mobilePhone: string;
  };
}

export interface academicInfo {
  secondarySchool: {
    name: string;
    startDate: string;
    endDate: string;
    qualificationObtained: string;
    finalGrade: string;
    highSchoolTranscript: string;
  };
  college: {
    collegeName?: string;
    collegeDegree?: string;
    collegeLocation?: string;
    startDate?: string;
    endDate?: string;
    collegeMajor?: string;
    collegeTranscript?: string;
  };
  certification: {
    certifications?: string;
    certificationDocuments?: string;
  };
  additionalInfo?: string;
}

export interface programSelectionInfo {
  main: {
    department: string;
    program: string;
    studyMode: string;
    intendedStartTerm: string;
  };
  alternative: {
    altDepartment: string;
    altProgram: string;
    reason: string;
    careerGoals: string;
  };
}

export interface documentInfo {
  academicCertificates?: string;
  academicTranscripts?: string;
  additionalDocuments?: string;
  cvResume?: string;
  documentNotes?: string;
  englishProficiency?: string;
  identificationDocument?: string;
  passportPhoto?: string;
  recommendationLetters?: string;
}
const savepersonalDetails = async ({ details }: personalInfo) => {
  await SaveStudentPersonalDetails(details);
  return true;
};

const saveAcademicDetails = async ({ details }: academicInfo) => {
  console.log(details);
  return true;
};

const saveProgramSelection = async ({ details }: programSelectionInfo) => {
  console.log(details);
  return true;
};

const saveDocumentDetails = async ({ details }: documentInfo) => {
  console.log("document details ", details);
  console.log(
    dataToDocumentDetails(details)
  )
  return true;
};
export {
  savepersonalDetails,
  saveAcademicDetails,
  saveProgramSelection,
  saveDocumentDetails,
};
