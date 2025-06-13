import axios from "./axios";

export const SaveStudentPersonalDetails = async (studentDetails) => {
  let server_response = {};

  await axios
    .post("/student/register", studentDetails)
    .then((res) => {
      server_response = res.data;

      // save the student id to the local storage
      localStorage.setItem("nationalId", server_response.data._id);
    })
    .catch((error) => {
      server_response = error;
    });
  return server_response;
};

export const SaveStudentDetails = async (details, link) => {
  let server_response = {};

  await axios
    .put(link, details)
    .then((res) => {

      server_response = res.data;
    })
    .catch((error) => {
      server_response = error;
    });
  return server_response;
};

export const SubmitStudentApplication = async (id, link) => {
  let server_response = {};

  await axios.post(link, { applicationId: id }).then((res) => {

    server_response = res.data;
    localStorage.removeItem("nationalId");
  });
  return server_response;
};
