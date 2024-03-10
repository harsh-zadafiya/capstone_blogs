import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard/BlogCard.component";
import Spinner from "../../components/Spinner/Spinner";
import { fetchBlogListingsSuccesss } from "../../redux/blog-listing/blogListing.reducers";
import axios from "../../utils/axios";
import {
  BlogListingsWrapper,
  BlogsList,
  EmptyStateDescription,
  EmptyStateTitle,
  EmptyStateVector,
  EmptyStateWrapper,
  Tab,
  TabsWrapper,
} from "./newListingsListpage.styles";

const tabNames = {
  ALL: "all",
  FAVORITE: "favorite",
  MY_LISTINGS: "myBlogs",
};

const NewBlogsListPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabNames.ALL);
  const blogs = useSelector((state) => state.blogListing.blogs);
  const dispatch = useDispatch();

  const fetchBlogListings = useCallback(
    async (url) => {
      setLoading(true);
      const { data: response } = await axios.get(url, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      dispatch(fetchBlogListingsSuccesss(response.blogs));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    (async function () {
      await fetchBlogListings("/listing?filter=all");
    })();
  }, [fetchBlogListings]);

  return (
    <>
      <BlogListingsWrapper>
        <h1
          style={{
            marginLeft: "16px",
          }}
        >
          Blogs
        </h1>
        <TabsWrapper>
          <Tab
            active={activeTab === tabNames.ALL}
            onClick={async () => {
              setActiveTab(tabNames.ALL);
              await fetchBlogListings("/listing?filter=all");
            }}
          >
            All Blogs
          </Tab>
          <Tab
            active={activeTab === tabNames.FAVORITE}
            onClick={async () => {
              setActiveTab(tabNames.FAVORITE);
              await fetchBlogListings("/listing?filter=favorite");
            }}
          >
            Favorite Blogs
          </Tab>
          <Tab
            active={activeTab === tabNames.MY_LISTINGS}
            onClick={async () => {
              setActiveTab(tabNames.MY_LISTINGS);
              await fetchBlogListings("/listing?filter=my-listings");
            }}
          >
            My Blogs
          </Tab>
        </TabsWrapper>
        <BlogsList>
          {loading ? (
            <Spinner />
          ) : blogs.length !== 0 ? (
            blogs.map((blog) => <BlogCard blog={blog} key={blog.vin} />)
          ) : (
            <EmptyStateWrapper>
              <EmptyStateVector />
              <EmptyStateTitle>No Listings Found</EmptyStateTitle>
              <EmptyStateDescription>
                We couldn't find anything for your search. Please try looking
                for different things.
              </EmptyStateDescription>
            </EmptyStateWrapper>
          )}
        </BlogsList>
      </BlogListingsWrapper>
    </>
  );
};

export default NewBlogsListPage;
