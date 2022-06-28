import http from "../http-common";
const register = (data) => {
  return http.post("/user/register", data);
};

const login = (data) => {
  return http.post("/user/login", data, {
    withCredentials: true,
    credentials: "include",
  });
};

const auth = () => {
  return http.get("/user/auth", {
    withCredentials: true,
    credentials: "include",
  });
};

const update = (data) => {
  return http.post("/user/update", data, {
    withCredentials: true,
    credentials: "include",
  });
};

const logout = () => {
  return http.get("/user/logout", {
    withCredentials: true,
    credentials: "include",
  });
};

const forgotPassword = (email) => {
  return http.post("/user/forgot-password", email, {
    withCredentials: true,
    credentials: "include",
  });
};

const resetPassword = (data) => {
  return http.post("/user/reset-password", data, {
    withCredentials: true,
    credentials: "include",
  });
};

const validateResetToken = (data) => {
  return http.post("/user/validate-reset-token", data, {
    withCredentials: true,
    credentials: "include",
  });
};

export const accountService = {
  register,
  login,
  auth,
  logout,
  update,
  forgotPassword,
  resetPassword,
  validateResetToken,
};
