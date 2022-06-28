import React, { useState, useEffect } from "react";
import Spinner from "../../utils/spinner";
import Pagination from "../../components/pagination";
import Table from "../../components/table/customerTable";
import { customerService } from "../../services/customerService";

export default function CustomerList() {
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const numberPerPage = 30;
  const [customerTotal, setCustomerTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const setPagechange = (pageId) => {
    console.log("pageId:", pageId);
    setCurrentPage(pageId);
  };

  useEffect(() => {
    customerService.getAllcustomers().then((res) => {
      setCustomerTotal(res.data.allCustomers);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    customerService.getByPage(currentPage, numberPerPage).then((res) => {
      setRowData(res.data.pageCustomers);
      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
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
        total={customerTotal}
        pageChange={setPagechange}
      />
    </>
  );
}
