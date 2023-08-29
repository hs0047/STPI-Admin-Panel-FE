import "./AlterProduct.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alterProduct, clearSelectedProduct } from "../../slice/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const AlterProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isViewMode = queryParams.get("isViewMode");
  const [formData, setFormData] = useState({});

  const { selectedProduct, alterStatus } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [selectedProduct, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(alterProduct(formData)).then((response) => {
      if (response.payload) {
        navigate("/product");
      }
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Product Management</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {alterStatus === "loading" && <div>Loading...</div>}
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  disabled={isViewMode}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  disabled={isViewMode}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Monthly Subscription</label>
                <input
                  type="text"
                  name="monthlySubscription"
                  disabled={isViewMode}
                  value={formData.monthlySubscription}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Additional Comments</label>
                <input
                  type="text"
                  name="additionalComments"
                  disabled={isViewMode}
                  value={formData.additionalComments}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Tag</label>
                <input
                  type="text"
                  name="tag"
                  disabled={isViewMode}
                  value={formData.tag}
                  onChange={handleChange}
                  required
                />
              </div>
              {isViewMode ? (
                <button
                  onClick={() => {
                    navigate("/product");
                  }}
                >
                  Back
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/customer");
                    }}
                  >
                    Back
                  </button>
                  <button type="submit">Save</button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlterProduct;
