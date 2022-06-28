import React, { useState, useEffect } from "react";
import Spinner from "../../utils/spinner";
import Pagination from "../../components/pagination";
import Table from "../../components/table/productTable";
import { productService } from "../../services/productService";

export default function ProductList() {
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const [productTotal, setProductTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const numberPerPage = 5;
  const setPagechange = (pageId) => {
    setCurrentPage(pageId);
  };

  useEffect(() => {
    productService.getTotal().then((res) => {
      setProductTotal(res.data.allProducts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productService.getByPage(currentPage, numberPerPage).then((res) => {
      setRowData(res.data.pageProducts);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return isLoading ? (
    <div className="flex w-screen h-auto justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <Table
        rowData={rowData}
        currentPage={currentPage - 1}
        numberPerPage={numberPerPage}
      />
      <Pagination
        numberPerPage={numberPerPage}
        total={productTotal}
        pageChange={setPagechange}
      />
    </>
  );
}
