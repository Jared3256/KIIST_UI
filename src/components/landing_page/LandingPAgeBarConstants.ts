import { MenuProps } from "antd";

export const about: MenuProps["about"] = [
  {
    key: "1",
    type: "group",
    label: "About us",

    children: [
      {
        key: "1-1",
        label: "ABOUT KIIST",
        disabled: true,
      },
      {
        key: "1-2",
        label: "VISION & MISSION",
        disabled: true,
      },
      {
        key: "1-3",
        label: "DIRECTOR, KIIST",
        disabled: true,
      },
      {
        key: "1-4",
        label: "AUTHORITIES",
        disabled: true,
      },
      {
        key: "1-5",
        label: "ADMINISTRATION",
        disabled: true,
        children: [
          {
            key: "1-5-1",
            label: "BOARD OF GOVERNORS",
          },
          {
            key: "1-5-2",
            label: "ACADEMIC COUNCIL",
          },
          {
            key: "1-5-3",
            label: "BOARD OF STUDIES",
          },
          {
            key: "1-5-4",
            label: "FINANCE COMMITTEE",
          },
          {
            key: "1-5-5",
            label: "HUMAN RESOURCE",
          },
          {
            key: "1-5-6",
            label: "BUILDING COMMITTEE",
          },
        ],
      },
      {
        key: "1-6",
        label: "KIIST ACT",
        disabled: true,
      },
      {
        key: "1-7",
        label: "LOCATION MAP",
        disabled: true,
      },
    ],
  },
];

export const administration: MenuProps["administration"] = [
  {
    key: "2",
    type: "group",
    label: "Administration corner",
    children: [
      {
        key: "2-1",
        label: "VC OFFICE",
        disabled: true,
      },
      {
        key: "2-2",
        label: "REGISTRAR OFFICE",
        disabled: true,
      },
      {
        key: "2-3",
        label: "FINANANCE & ACCOUNTS",
        disabled: true,
        children: [
          {
            key: "2-3-1",
            label: "EMPLOYEE SALARY PORTAL",
          },
          {
            key: "2-3-2",
            label: "ADMISSION FEE PAYMENT",
          },
          {
            key: "2-3-3",
            label: "FEE PORTAL ADM/HOD/HOD LOGIN",
          },
        ],
      },
      {
        key: "2-4",
        label: "EXAMINATION",
        disabled: true,
        children: [
          {
            key: "2-4-1",
            label: "STUDENT EXAMINATION PORTAL",
          },
          {
            key: "2-4-2",
            label: "DOCUMENT PORTAL",
          },
          {
            key: "2-4-3",
            label: "RE-EVALUATION RESULT",
          },
        ],
      },
      {
        key: "2-5",
        label: "ACADEMICS",
        disabled: true,
      },
      {
        key: "2-6",
        label: "RESEARCH & DEVELOPMENT",
        disabled: true,
      },
      {
        key: "2-7",
        label: "PLANNING & EXTERNAL AFFAIRS",
        disabled: true,
      },
      {
        key: "2-8",
        label: "COLLEGE DEVELOPMENT",
        disabled: true,
      },
      {
        key: "2-9",
        label: "STUDENT WELFARE",
        disabled: true,
      },
      {
        key: "2-10",
        label: "OPEN AND DISTANCE LEARNING",
        disabled: true,
      },
    ],
  },
];

export const academics: MenuProps["academics"] = [
  {
    key: "3",
    type: "group",
    label: "Academics",
    children: [
      {
        key: "3-1",
        label: "ACADEMIC CALENDAR",
      },
      {
        key: "3-2",
        label: "SYLLABUS",
      },
      {
        key: "3-3",
        label: "ACADEMIC REGULATIONS",
      },
      {
        key: "3-4",
        label: "SAMPLE PAPERS",
      },
      {
        key: "3-5",
        label: "ADMISSION",
        children: [
          {
            key: "3-5-1",
            label: "ADMISSION SESSION MAY",
          },
          {
            key: "3-5-2",
            label: "FEE STRUCTURE",
          },
        ],
      },
    ],
  },
];

export const programmes: MenuProps["programmes"] = [
  {
    key: "3",
    type: "group",
    label: "Available Courses",
    children: [
      {
        key: "3-1",
        label: "KNEC/CDACC PROGRAMMES",
        disabled: true,
        children: [
          { key: "3-1-1", label: "Preoperative theatre technology (Surgery)" },
          { key: "3-1-2", label: "Healthcare Support (Nurse Aid)" },
          { key: "3-1-3", label: "Social Work and Community Development" },
          { key: "3-1-4", label: "Community Health" },
          { key: "3-1-5", label: "Counseling Psychology" },
          { key: "3-1-6", label: "Information and Communication Technology" },
          { key: "3-1-7", label: "Computerized secretarial studies" },
          { key: "3-1-8", label: "Human Resource Management" },
          { key: "3-1-9", label: "Journalism and Mass media" },
        ],
      },
      {
        key: "3-2",
        label: "NITA PROGRAMMES",
        disabled: true,
        children: [
          { key: "3-2-1", label: "Hairdressing" },
          { key: "3-2-2", label: "Beauty Therapy" },
          { key: "3-2-3", label: "Tailoring" },
          { key: "3-2-4", label: "Dress Making" },
          { key: "3-2-5", label: "Electrical Engineering" },
          { key: "3-2-6", label: "Automative Engineering" },
          { key: "3-2-7", label: "Electronics" },
          { key: "3-2-8", label: "Computer Operator" },
        ],
      },
      {
        key: "3-3",
        label: "ISBAT UNIVERSITY PROGRAMMES",
        disabled: true,
        children: [
          { key: "3-3-1", label: "Diploma in Information Technology" },
          { key: "3-3-2", label: "Diploma in Software Engineering" },
          { key: "3-3-3", label: "Diploma in Hardware and Networking" },
          { key: "3-3-4", label: "Diploma in Networking and Cyber Security" },
          { key: "3-3-5", label: "Diploma in Business Administration" },
        ],
      },
      {
        key: "3-4",
        label: "JP PROGRAMMES",
        disabled: true,
        children: [
          {
            key: "3-4-1",
            label: "Journalism and Mass media",
          },
          {
            key: "3-4-2",
            label: "Public Relations",
          },
          {
            key: "3-4-3",
            label: "Communication and Communication Tech",
          },
          {
            key: "3-4-4",
            label: "ICT proficiency",
          },
          {
            key: "3-4-5",
            label: "Tour Guide Management",
          },
        ],
      },
      {
        key: "3-5",
        label: "SHORT COURSES",
        disabled: true,
        children: [
          { key: "3-5-1", label: "Computer Packages" },
          { key: "3-5-2", label: "Web Design" },
          { key: "3-5-3", label: "Computer Networking" },
          { key: "3-5-4", label: "Graphic Design" },
          { key: "3-5-5", label: "Video Production and Video Shooting" },
          { key: "3-5-6", label: "Music Production and Sound Engineering" },
          { key: "3-5-7", label: "Computer Programming" },
          { key: "3-5-8", label: "Accounting Packages" },
          { key: "3-5-9", label: "AutoCard, ArchCard" },
          { key: "3-5-10", label: "Computer Technician" },
          { key: "3-5-11", label: "German/French" },
          { key: "3-5-12", label: "Cert Front office Mgt" },
        ],
      },
    ],
  },
];

export const admission: MenuProps["admission"] = [
  {
    key: "3",
    type: "group",
    label: "Admission Portal",
    children: [
      {
        key: "3-1",
        label: "ADMISSION REQUIREMENTS",
        url: "/h/admission/requirements",
      },
      {
        key: "3-2",
        label: "APPLICATION FORM",
        url: "/h/admission/forms",
        disabled: false,
      },
      {
        key: "3-3",
        label: "APPLICATION STATUS",
        url: "/h/admission/status",
      },
      {
        key: "3-4",
        label: "SELF REGISTER",
        url: "/h/admission/register",
        disabled: false,
      },
    ],
  },
];

// Accordion data
export const admissionData = [
  {
    key: "1",
    label: "Basic requirements",
    url: "/h/admission/requirements",
    disabled: false,
  },
  {
    key: "2",
    label: "Forms",
    url: "/h/admission/forms",
    disabled: false,
  },
  {
    key: "3",
    label: "Status",
    url: "/h/admission/status",
    disabled: false,
  },
  {
    key: "4",
    label: "Admission Letters",
    url: "/h/admission/letters",
    disabled: true,
  }, {
    key: "5",
    label: "Self Register",
    url: "/h/admission/register",
    disabled:false
  }
];

export const aboutData = [
  {
    key: "1",
    label: "About Kiist",
    url: "/h/about",
    disabled: true,
  },
  {
    key: "2",
    label: "Vision & Mission",
    url: "/h/about/vision & mission",
    disabled: true,
  },
  {
    key: "3",
    label: "Director",
    url: "/h/about/director",
    disabled: true,
  },
  {
    key: "4",
    label: "Authorities",
    url: "/h/about/authorities",
    disabled: true,
  },
  {
    key: "5",
    label: "KIIST Act",
    url: "/h/about/act",
    disabled: true,
  },
  {
    key: "6",
    label: "Location Map",
    url: "/h/about/map",
    disabled: true,
  },
];

export const programmesData = [
  {
    key: "1",
    label: "KNEC/CDACC PROGRAMMES",
    url: "/h/programmes/knec_cdacc",
    disabled: true,
  },
  {
    key: "2",
    label: "NITA PROGRAMMES",
    url: "/h/programmes/nita",
    disabled: true,
  },
  {
    key: "3",
    label: "ISBAT Programmes",
    url: "/h/programmes/isbat",
    disabled: true,
  },
  {
    key: "4",
    label: "Authorities",
    url: "/h/programmes/jp",
    disabled: true,
  },
  {
    key: "5",
    label: "KIIST Act",
    url: "/h/programmes/short",
    disabled: true,
  },
];
