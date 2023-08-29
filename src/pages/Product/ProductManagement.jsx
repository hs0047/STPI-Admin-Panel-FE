import "./ProductManagement.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { PRODUCT } from "../../const";

const ProductManagement = () => {
  const tableColumns = [
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "monthlySubscription",
      headerName: "Monthly Subscription",
      width: 150,
    },
    {
      field: "additionalComments",
      headerName: "Additional Comments",
      width: 200,
    },
    {
      field: "tag",
      headerName: "Tag",
      width: 100,
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable page={PRODUCT} columns={tableColumns} />
      </div>
    </div>
  );
};

export default ProductManagement;
