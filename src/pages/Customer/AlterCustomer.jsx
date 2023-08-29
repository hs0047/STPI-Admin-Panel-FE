import "./AlterCustomer.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alterCustomer,
  clearSelectedCustomer,
} from "../../slice/customerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const AlterCustomer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isViewMode = queryParams.get("isViewMode");
  const [formData, setFormData] = useState({});

  const { selectedCustomer, alterStatus } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedCustomer) {
      setFormData(selectedCustomer);
    }

    return () => {
      dispatch(clearSelectedCustomer());
    };
  }, [selectedCustomer, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(alterCustomer(formData)).then((response) => {
      if (response.payload) {
        navigate("/customer");
      }
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>User Management</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {alterStatus === "loading" && <div>Loading...</div>}
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  disabled={isViewMode}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  disabled={isViewMode}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>User Name</label>
                <input
                  type="text"
                  name="userName"
                  disabled={isViewMode}
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  disabled={isViewMode}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  disabled={isViewMode}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  disabled={isViewMode}
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  disabled={isViewMode}
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  disabled={isViewMode}
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  disabled={isViewMode}
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              {isViewMode ? (
                <button
                  onClick={() => {
                    navigate("/customer");
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

export default AlterCustomer;
