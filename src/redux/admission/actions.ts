import { SaveStudentDetails, SaveStudentPersonalDetails } from "src/service/admissionService";
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
  await SaveStudentPersonalDetails(details);
  return true;
};

const saveAcademicDetails = async ({ details, id }: academicInfo) => {
  const link ="/student/"+id +"/academic" 
  await SaveStudentDetails(details, link)
  return true;
};

const saveProgramSelection = async ({ details,id }: programSelectionInfo) => {
  const link = "/student/" + id + "/program";
  await SaveStudentDetails(details, link);
  return true;
};

const savePersonalStatement = async ({ details ,id}) => {
  const link = "/student/" + id + "/statement";
  await SaveStudentDetails(details, link);
  return true;
};
const saveDocumentDetails = async ({ details ,id}: documentInfo) => {
 
  const link = "/student/" + id + "/document";
  await SaveStudentDetails(dataToDocumentDetails(details), link);
  return true;
};
export {
  savepersonalDetails,
  saveAcademicDetails,
  saveProgramSelection,
  saveDocumentDetails,
  savePersonalStatement,
};
