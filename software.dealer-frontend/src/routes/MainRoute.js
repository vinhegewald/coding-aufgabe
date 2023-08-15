import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BestRated from "../components/BestRated";
import NewestProducts from "../components/NewestProducts";

function MainRoute() {
  return (
    <div>
      <Navbar />
      <BestRated />
      <NewestProducts />
    </div>
  );
}

export default MainRoute;
