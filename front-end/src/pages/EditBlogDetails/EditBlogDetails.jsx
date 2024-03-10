import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../utils/axios";
import AddNewBlogPage from "../sell-car-page/add-new-blog-component";

const EditBlogDetailsPage = () => {
  const { subTitle } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const {
        data: { blog },
      } = await axios.get(`/listing/${subTitle}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setData({
        tabOne: {
          blogCompany: blog.blogCompany,
          blogModel: blog.blogModel,
          blogMileage: blog.blogMileage,
          carEngine: blog.blogEngine,
          subTitle: blog.subTitle,
          transmission: blog.transmission,
        },
        tabTwo: {
          sellerName: blog.sellerName,
          location: blog.location,
          highlight: blog.highlight,
          recentServiceHistory: blog.recentServiceHistory,
          ownershipHistory: blog.ownershipHistory,
          sellerNotes: blog.sellerNotes,
        },
      });

      setLoading(false);
    })();
  }, [subTitle]);
  console.log(data);

  return loading ? (
    <Spinner />
  ) : (
    <AddNewBlogPage initialCarData={data} action="update" />
  );
};

export default EditBlogDetailsPage;
