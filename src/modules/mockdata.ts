// Mock student data
export const studentData = {
  name: "Alex Johnson",
  id: "ST2025061",
  program: "Computer Science",
  overallAttendance: 87,
  profileImage:
    "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20college%20student%20with%20short%20brown%20hair%20and%20friendly%20smile%2C%20minimalist%20light%20blue%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=profile1&orientation=squarish",
};

// Mock upcoming classes data
export const upcomingClasses = [
  {
    id: 1,
    courseName: "Advanced Algorithms",
    courseCode: "CS4023",
    date: "2025-06-06",
    time: "10:00 AM - 11:30 AM",
    venue: "Computer Science Building, Room 301",
    status: "ongoing",
    distance: 0.1,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    courseName: "Database Systems",
    courseCode: "CS3033",
    date: "2025-06-06",
    time: "2:00 PM - 3:30 PM",
    venue: "Science Hall, Room 205",
    status: "upcoming",
    distance: 0.5,
    coordinates: { lat: 40.7138, lng: -74.016 },
  },
  {
    id: 3,
    courseName: "Machine Learning",
    courseCode: "CS4053",
    date: "2025-06-09",
    time: "9:00 AM - 11:00 AM",
    venue: "Engineering Building, Room 102",
    status: "upcoming",
    distance: 1.2,
    coordinates: { lat: 40.7148, lng: -74.026 },
  },
  {
    id: 4,
    courseName: "Software Engineering",
    courseCode: "CS3043",
    date: "2025-06-10",
    time: "1:00 PM - 2:30 PM",
    venue: "Computer Science Building, Room 201",
    status: "upcoming",
    distance: 0.3,
    coordinates: { lat: 40.7158, lng: -74.036 },
  },
];

// Mock attendance history data
export const attendanceHistory = [
  {
    key: "1",
    date: "2025-06-05",
    course: "Advanced Algorithms",
    courseCode: "CS4023",
    venue: "Computer Science Building, Room 301",
    status: "Present",
  },
  {
    key: "2",
    date: "2025-06-04",
    course: "Database Systems",
    courseCode: "CS3033",
    venue: "Science Hall, Room 205",
    status: "Present",
  },
  {
    key: "3",
    date: "2025-06-03",
    course: "Machine Learning",
    courseCode: "CS4053",
    venue: "Engineering Building, Room 102",
    status: "Absent",
  },
  {
    key: "4",
    date: "2025-06-02",
    course: "Software Engineering",
    courseCode: "CS3043",
    venue: "Computer Science Building, Room 201",
    status: "Late",
  },
  {
    key: "5",
    date: "2025-06-01",
    course: "Advanced Algorithms",
    courseCode: "CS4023",
    venue: "Computer Science Building, Room 301",
    status: "Present",
  },
  {
    key: "6",
    date: "2025-05-31",
    course: "Database Systems",
    courseCode: "CS3033",
    venue: "Science Hall, Room 205",
    status: "Present",
  },
  {
    key: "7",
    date: "2025-05-30",
    course: "Machine Learning",
    courseCode: "CS4053",
    venue: "Engineering Building, Room 102",
    status: "Present",
  },
];


// Mock course attendance data
export const courseAttendance = [
  { course: "Advanced Algorithms", percentage: 95 },
  { course: "Database Systems", percentage: 87 },
  { course: "Machine Learning", percentage: 75 },
  { course: "Software Engineering", percentage: 92 },
];