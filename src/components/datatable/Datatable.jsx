import "./datatable.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteCustomer,
  getCustomers,
  selectCustomer,
} from "../../slice/customerSlice";
import {
  deleteProduct,
  getProducts,
  selectProduct,
} from "../../slice/productSlice";

import { CUSTOMER } from "../../const";
import { CircularProgress } from "@mui/material";

const Datatable = ({ page, columns }) => {
  const dispatch = useDispatch();
  const customerFromRedux = useSelector((state) => state.customer);
  const productFromRedux = useSelector((state) => state.product);

  const data =
    page === CUSTOMER ? customerFromRedux.items : productFromRedux.items;
  const loadingStatus =
    page === CUSTOMER
      ? customerFromRedux.status || customerFromRedux.deleteStatus
      : productFromRedux.status || productFromRedux.deleteStatus;

  useEffect(() => {
    if (page === CUSTOMER) {
      dispatch(getCustomers());
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, page]);

  const handleDelete = (id) => {
    if (page === CUSTOMER) {
      dispatch(deleteCustomer(id));
    } else {
      dispatch(deleteProduct(id));
    }
  };

  const handleClick = (row) => {
    if (page === CUSTOMER) {
      dispatch(selectCustomer(row));
    } else {
      dispatch(selectProduct(row));
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={
                page === CUSTOMER
                  ? "/customer/alterCustomer"
                  : "/product/alterProduct"
              }
              style={{ textDecoration: "none" }}
              onClick={() => handleClick(params.row)}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <Link
              to={
                page === CUSTOMER
                  ? "/customer/alterCustomer?isViewMode=true"
                  : "/product/alterProduct?isViewMode=true"
              }
              style={{ textDecoration: "none" }}
              onClick={() => handleClick(params.row)}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const getRowId = (row) => row._id;

  return (
    <div className="datatable">
      {console.log(data)}
      {loadingStatus === "loading" ? (
        <CircularProgress />
      ) : (
        <>
          <div className="datatableTitle">{page} Management</div>
          <Link
            to={
              page === CUSTOMER
                ? "/customer/alterCustomer"
                : "/product/alterProduct"
            }
            className="link"
          >
            Add New
          </Link>
          <DataGrid
            className="datagrid"
            rows={data}
            getRowId={getRowId}
            columns={columns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20, 50]}
            checkboxSelection
          />
        </>
      )}
    </div>
  );
};

export default Datatable;
