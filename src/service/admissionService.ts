import axios from "./axios";

export const SaveStudentPersonalDetails = async (studentDetails) => {
  let server_response = {};

  console.log(studentDetails)
  await axios.post("/student/register",studentDetails).then((res) => {
    console.log(res.data);
    server_response = res.data;
  });
  return  server_response;
};
