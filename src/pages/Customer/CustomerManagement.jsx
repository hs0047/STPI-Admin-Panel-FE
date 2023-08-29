import "./CustomerManagement.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { CUSTOMER } from "../../const";

const CustomerManagement = () => {
  const tableColumns = [
    { field: "firstName", headerName: "First Name", width: 100 },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 100,
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable page={CUSTOMER} columns={tableColumns} />
      </div>
    </div>
  );
};

export default CustomerManagement;
