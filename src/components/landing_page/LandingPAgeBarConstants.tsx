import { ExperimentOutlined, FundOutlined, LaptopOutlined, ReadOutlined, TeamOutlined } from "@ant-design/icons";
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


export const courseCategories = [
    {
      id: "engineering",
      title: "Engineering & Technology",
      icon: <ExperimentOutlined />,
      description: "Cutting-edge programs in various engineering disciplines",
      courses: 12,
      imagePrompt:
        "A modern engineering laboratory with students working on technical projects, clean minimalist background, professional setting with advanced equipment, high tech environment with computers and engineering tools, photorealistic style, soft lighting, focused on innovation and technology development, inspiring educational atmosphere.",
    },
    {
      id: "computer",
      title: "Computer Science & IT",
      icon: <LaptopOutlined />,
      description: "Innovative computing and information technology programs",
      courses: 8,
      imagePrompt:
        "A contemporary computer lab with students working on coding projects, clean minimalist background, professional setting with multiple computer screens displaying code, modern technology environment, photorealistic style, soft lighting, focused on software development and programming, inspiring educational atmosphere.",
    },
    {
      id: "business",
      title: "Business & Management",
      icon: <FundOutlined />,
      description: "Comprehensive business education with industry connections",
      courses: 10,
      imagePrompt:
        "A professional business classroom with students engaged in discussion, clean minimalist background, business charts and graphs on display screens, modern corporate environment, photorealistic style, soft lighting, focused on business strategy and management principles, inspiring educational atmosphere.",
    },
    {
      id: "health",
      title: "Health Sciences",
      icon: <TeamOutlined />,
      description: "Healthcare programs focused on modern medical practices",
      courses: 9,
      imagePrompt:
        "A state-of-the-art health sciences laboratory with students in lab coats working with medical equipment, clean minimalist background, professional medical setting with anatomical models and microscopes, photorealistic style, soft lighting, focused on healthcare education and research, inspiring educational atmosphere.",
    },
    {
      id: "arts",
      title: "Arts & Humanities",
      icon: <ReadOutlined />,
      description: "Creative programs developing cultural and artistic talents",
      courses: 7,
      imagePrompt:
        "A bright arts studio with students working on creative projects, clean minimalist background, easels with paintings and artistic materials visible, modern creative environment, photorealistic style, soft lighting, focused on artistic expression and humanities studies, inspiring educational atmosphere.",
    },
    {
      id: "science",
      title: "Natural Sciences",
      icon: <ExperimentOutlined />,
      description: "Research-focused programs in fundamental sciences",
      courses: 11,
      imagePrompt:
        "A sophisticated science laboratory with students conducting experiments, clean minimalist background, professional setting with scientific equipment and specimens, modern research environment, photorealistic style, soft lighting, focused on scientific discovery and experimentation, inspiring educational atmosphere.",
    },
  ];


 export const featuredCourses = [
    {
      id: 1,
      title: "Bachelor of Science in Computer Engineering",
      category: "engineering",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,500 per semester",
      description:
        "Develop expertise in computer systems, hardware design, and software integration with our comprehensive engineering program.",
      imagePrompt:
        "A modern computer engineering classroom with students working on circuit boards and computer hardware, clean minimalist background, professional setting with electronic components and testing equipment, high tech environment, photorealistic style, soft lighting, focused on technical education and engineering principles.",
    },
    {
      id: 2,
      title: "Bachelor of Science in Data Science",
      category: "computer",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,200 per semester",
      description:
        "Learn to analyze complex data sets, develop predictive models, and extract meaningful insights using cutting-edge tools and techniques.",
      imagePrompt:
        "A data science laboratory with students analyzing data visualizations on large screens, clean minimalist background, professional setting with multiple monitors displaying charts and graphs, modern technology environment, photorealistic style, soft lighting, focused on data analysis and statistical methods.",
    },
    {
      id: 3,
      title: "Master of Business Administration",
      category: "business",
      duration: "2 Years",
      mode: "Full-time/Part-time",
      fee: "$5,000 per semester",
      description:
        "Advance your career with our industry-focused MBA program that emphasizes leadership, strategic thinking, and global business perspectives.",
      imagePrompt:
        "A modern business school classroom with diverse students engaged in discussion, clean minimalist background, professional setting with presentation screens showing business analytics, corporate environment, photorealistic style, soft lighting, focused on business education and professional development.",
    },
    {
      id: 4,
      title: "Bachelor of Science in Nursing",
      category: "health",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,800 per semester",
      description:
        "Prepare for a rewarding career in healthcare with our comprehensive nursing program featuring state-of-the-art simulation labs and clinical placements.",
      imagePrompt:
        "A modern nursing simulation lab with students practicing on medical mannequins, clean minimalist background, professional healthcare setting with medical equipment and monitoring devices, clinical environment, photorealistic style, soft lighting, focused on healthcare education and patient care training.",
    },
    {
      id: 5,
      title: "Bachelor of Arts in Digital Media Design",
      category: "arts",
      duration: "3 Years",
      mode: "Full-time",
      fee: "$3,900 per semester",
      description:
        "Combine creativity with technical skills in our digital media program covering graphic design, animation, and interactive media development.",
      imagePrompt:
        "A creative digital media studio with students working on design projects on large monitors, clean minimalist background, professional setting with digital drawing tablets and creative software interfaces visible, modern design environment, photorealistic style, soft lighting, focused on digital creativity and design education.",
    },
    {
      id: 6,
      title: "Bachelor of Science in Biotechnology",
      category: "science",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,700 per semester",
      description:
        "Explore the cutting edge of biological science and its applications in medicine, agriculture, and industry in our advanced research facilities.",
      imagePrompt:
        "A state-of-the-art biotechnology laboratory with students using microscopes and advanced scientific equipment, clean minimalist background, professional research setting with laboratory glassware and biological specimens, scientific environment, photorealistic style, soft lighting, focused on biological research and technological innovation.",
    },
  ];
 
export const news = [
    {
      id: 1,
      title: "Kisii Impact Institute Receives Research Excellence Award",
      date: "May 28, 2025",
      excerpt:
        "Our institution has been recognized for outstanding contributions to scientific research in renewable energy technologies.",
      imagePrompt:
        "A formal academic award ceremony with university officials receiving a prestigious research award, clean minimalist background, professional setting with academic regalia and ceremonial atmosphere, elegant environment, photorealistic style, soft lighting, focused on academic achievement and recognition.",
    },
    {
      id: 2,
      title: "New State-of-the-Art Engineering Building Opening",
      date: "May 15, 2025",
      excerpt:
        "The new $25 million facility will house advanced laboratories and collaborative spaces for engineering students.",
      imagePrompt:
        "A modern university engineering building with glass facade and contemporary architecture, clean minimalist background, professional academic setting with students entering the building, campus environment, photorealistic style, soft lighting, focused on educational facilities and architectural innovation.",
    },
    {
      id: 3,
      title: "Partnership Announced with Leading Tech Companies",
      date: "April 30, 2025",
      excerpt:
        "Strategic partnerships will provide internship opportunities and industry-relevant curriculum development.",
      imagePrompt:
        "A professional meeting between university officials and corporate executives signing partnership documents, clean minimalist background, business setting with university and company logos visible, corporate environment, photorealistic style, soft lighting, focused on collaboration and professional networking.",
    },
  ];


export const events = [
    {
      id: 1,
      title: "Open Day 2025",
      date: "June 15, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Main Campus",
    },
    {
      id: 2,
      title: "International Science Symposium",
      date: "June 22-24, 2025",
      time: "All Day",
      location: "Science Complex",
    },
    {
      id: 3,
      title: "Career Fair: Tech & Engineering",
      date: "July 5, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "University Hall",
    },
  ];