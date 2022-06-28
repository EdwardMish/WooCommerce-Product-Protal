import http from "../http-common";

const getAllcustomers = () => {
  return http.get("customers/all");
};
const getByPage = (pageId, numberPerPage) => {
  return http.get("customers/getByPage/" + pageId + "/" + numberPerPage);
};
export const customerService = {
  getAllcustomers,
  getByPage,
};
