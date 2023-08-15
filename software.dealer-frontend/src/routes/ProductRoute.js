import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductRoute() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  React.useEffect(() => {
    axios.get(`http://localhost:4000/products/${id}`).then((res) => {
      setProduct(res.data);
    });
    document.title =
      "software.dealer - Die beste software fuer die besten Preise";
  }, []);

  return (
    <div>
      <Navbar />
      <Product product={product} toastShow={function () {}} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default ProductRoute;
