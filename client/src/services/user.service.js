import { axios } from "./axios";
import { getToken } from "./token.service";

function getAllUsers() {
  return axios
    .get("/api/users")
    .then((response) => response && response.data && response.data.users);
}

function login(credentials) {
  const url = "api/users/login";

  return axios.post(url, credentials);
}

export { getAllUsers, login};
