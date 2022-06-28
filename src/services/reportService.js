import http from "../http-common";

const getSales = () => {
  return http.get("reports/getSales");
};
const getOrders = () => {
  return http.get("reports/getOrders");
};


export const reportService = {
  getSales,
  getOrders,
};
