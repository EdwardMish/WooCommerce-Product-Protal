import {accountService} from "../services";
import {
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
  LOGOUT_USER,
  AUTH_USER,
} from "./type";

export function loginUser(dataToSubmit) {
  const request = accountService
    .login(dataToSubmit)
    .then((res) => res.data)
    .catch((e) => e.data);
  return { type: LOGIN_USER, payload: request };
}
export function registerUser(dataToSubmit) {
  const request = accountService
    .register(dataToSubmit)
    .then((res) => res.data)
    .catch((e) => e.data);
  return { type: REGISTER_USER, payload: request };
}
export function updateUser(dataToSubmit) {
  const request = accountService
    .update(dataToSubmit)
    .then((res) => res.data)
    .catch((e) => e.data);
  return { type: UPDATE_USER, payload: request };
}
export function logoutUser() {
  const request = accountService
    .logout()
    .then((res) => res.data)
    .catch((e) => e.data);
  return { type: LOGOUT_USER, payload: request };
}
export function authUser() {
  const request = accountService
    .auth()
    .then((res) => res.data)
    .catch((e) => e.data);
  return { type: AUTH_USER, payload: request };
}
