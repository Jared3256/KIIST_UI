import {
  SaveStudentDetails,
  SaveStudentPersonalDetails,
} from "src/service/admission.service";
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

export interface statementInfo {
  statement: string;
  additionalInfo?: string;
  honors?: string;
  special?: string;
}

const savepersonalDetails = async ({ details }: personalInfo) => {
  const res = await SaveStudentPersonalDetails(details);
  return res;
};

const saveAcademicDetails = async ({ details, id }: academicInfo) => {
  const link = "/student/" + id + "/academic";
  const res = await SaveStudentDetails(details, link);
  return res;
};

const saveProgramSelection = async ({ details, id }: programSelectionInfo) => {
  const link = "/student/" + id + "/program";
  const res = await SaveStudentDetails(details, link);
  return res;
};

const savePersonalStatement = async ({ details, id }) => {
  const link = "/student/" + id + "/statement";
  const res = await SaveStudentDetails(details, link);
  return res;
};
const saveDocumentDetails = async ({ details, id }: documentInfo) => {
  const link = "/student/" + id + "/document";
  const res = await SaveStudentDetails(dataToDocumentDetails(details), link);
  return res;
};
export {
  savepersonalDetails,
  saveAcademicDetails,
  saveProgramSelection,
  saveDocumentDetails,
  savePersonalStatement,
};
