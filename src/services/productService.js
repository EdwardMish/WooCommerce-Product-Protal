import http from "../http-common";

const getTotal = () => {
  return http.get("products/total");
};
const getByPage = (pageId, numberPerPage) => {
  return http.get("products/getByPage/" + pageId + "/" + numberPerPage);
};
const deleteProduct = (_id) => {
  return http.get("products/delete/" + _id);
};
const getProductById = (_id) => {
  return http.get("products/getById/" + _id);
};
const getVariations = (_id) => {
  return http.get("products/getById/" + _id + "/variations");
};

const updateProductById = (_id) => {
  return http.get("products/updateById/" + _id);
};

export const productService = {
  getTotal,
  getByPage,
  deleteProduct,
  getProductById,
  updateProductById,
  getVariations,
};
