import axios from "./axios";

export const SaveStudentPersonalDetails = async (studentDetails) => {
  let server_response = {};

  console.log(studentDetails);
  await axios.post("/student/register", studentDetails).then((res) => {
    console.log(res.data);
    server_response = res.data;

    // save the student id to the local storage
    localStorage.setItem("nationalId", server_response.data._id);
  });
  return server_response;
};

export const SaveStudentDetails = async (details, link) => {
  let server_response = {};

  await axios.put(link, details).then((res) => {
    console.log(res.data);
    server_response = res.data;
  });
  return server_response;
};

export const SubmitStudentApplication = async (id, link) => {
  let server_response = {};
  await axios.post(link, { applicationId: id }).then((res) => {
    console.log(res.data);
    server_response = res.data;
    localStorage.removeItem("nationalId");
  });
  return server_response;
};
