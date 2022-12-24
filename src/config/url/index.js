import axios from "axios";

axios.defaults.baseURL = "https://frontend-test-api.aircall.io";

//Get Request
export const getRequest = (api) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.get(api, headers);
};

//Post Request
export const postRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.post(api, body, headers);
};

//Put Request
export const putRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.put(api, body, headers);
};

// Refresh token request
export const refreshRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post(api, body, headers);
};
