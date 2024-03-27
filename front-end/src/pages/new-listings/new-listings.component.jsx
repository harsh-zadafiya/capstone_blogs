import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const NewListingsPage = () => {
  const cars = useSelector((state) => state.blogListing.cars);
  console.log(cars);
  return <Outlet />;
};

export default NewListingsPage;
