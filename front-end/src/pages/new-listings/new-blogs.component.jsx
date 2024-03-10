import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const NewBlogsPage = () => {
  const blogs = useSelector((state) => state.blogListing.blogs);
  console.log(blogs);
  return <Outlet />;
};

export default NewBlogsPage;
