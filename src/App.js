import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AlterCustomer from "./pages/Customer/AlterCustomer";
import CustomerManagement from "./pages/Customer/CustomerManagement";
import ProductManagement from "./pages/Product/ProductManagement";
import AlterProduct from "./pages/Product/AlterProduct";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="customer">
              <Route index element={<CustomerManagement />} />
              <Route path="alterCustomer" element={<AlterCustomer />} />
            </Route>
            <Route path="product">
              <Route index element={<ProductManagement />} />
              <Route path="alterProduct" element={<AlterProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
