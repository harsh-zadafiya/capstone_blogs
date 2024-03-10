import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as MileageIcon } from "../../assets/mileage.svg";
import { ReactComponent as LocationIcon } from "../../assets/location.svg";
import { ReactComponent as EngineIcon } from "../../assets/engine.svg";
import { ReactComponent as TransmissionIcon } from "../../assets/transmission.svg";

import path from "../../constants/paths.js";

import {
  ActionButtons,
  BlogDescription,
  BlogDetailsBody,
  BlogDetailsTop,
  BlogHeader,
  BlogImages,
  BlogProperties,
  BlogProperty,
  BlogTitle,
  DeleteIcon,
  DescriptionGroup,
  DescriptionHeading,
  DownloadIcon,
  EditIcon,
  HeaderLeft,
  HeaderRight,
  IconWrapper,
  Image,
  PropertyTitle,
  PropertyValue,
  PropertyWrapper,
  Text,
  TitleGroup,
  UploadIcon,
} from "./blogDetailsPage.styles.js";
import {
  CardButtons,
  CardSubTitle,
  GreenButton,
  RedButton,
} from "../../components/BlogCard/BlogCard.styels.js";
import FavouriteIcon from "../../components/FavouriteIcon/favouriteIcon.jsx";
import Button from "../../components/button/button.component.jsx";

import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import {
  deleteBlogListings,
  updateBlogListings
} from "../../redux/blog-listing/blogListing.reducers.js";
import ListingStatus from "../../components/ListingStatus/ListingStatus.component.jsx";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.jsx";
import axios from "../../utils/axios.js";
import Modal from "../../components/Modal/Modal.jsx";

import { ReactComponent as WarningVector } from "../../assets/warning.svg";
import ToolTip from "../../components/ToolTip/ToolTip.jsx";
import { Input } from "../sell-car-page/step-three/stepThree.style.js";

const BlogDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginStatus.userInfo);

  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [documents, setDocuments] = useState([]);

  const { subTitle } = useParams();
  const blog = useSelector((state) => state.blogListing.blogs).find(
    (blog) => blog.subTitle === subTitle
  );

  const {
    blogTitle,
    category,
    location,
    blogYear,
    subTitle: blogSubTitle,
    highlight,
    blogDetails,
    blogNotes,
    authorName,
    status,
    favorite,
    userId,
  } = blog;

  return (
    <>
      <BlogDetailsPage>
        <ConfirmationModal
          title="Accept Confirmation"
          description="Are you sure you want to approve this blog?"
          currentStatus="approve"
          vin={blogSubTitle}
          approveModal={approveModal}
          setModal={(state) => {
            setApproveModal(state);
          }}
          toggle={() => {
            setApproveModal((prevState) => !prevState);
          }}
        />
        <ConfirmationModal
          currentStatus="reject"
          vin={blogSubTitle}
          title="Reject Confirmation"
          description="Are you sure you want to reject this blog?"
          approveModal={rejectModal}
          setModal={(state) => {
            setRejectModal(state);
          }}
          toggle={() => {
            setRejectModal((prevState) => !prevState);
          }}
        />
        <Modal
          title="Upload Documents"
          isOpen={uploadModal}
          toggleModal={() => {
            setUploadModal((prevState) => !prevState);
          }}
        >
          <h4>Select one or more .pdf files to upload</h4>
          <form
            encType="multipart/form-data"
            id="car-documents-form"
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(documents);

              await axios.post(
                "/document/upload",
                {
                  subTitle,
                  blogTitle,
                  documents,
                },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": localStorage.getItem("token"),
                  },
                }
              );

              setUploadModal(false);
            }}
          >
            <Input
              type="file"
              accept=".pdf"
              name="documents"
              multiple
              onChange={(e) => {
                const form = document.getElementById("car-documents-form");
                const data = new FormData(form);
                const documents = [];
                for (const [key, value] of data) {
                  console.log(key);
                  console.log(value);
                  documents.push(value);
                }
                setDocuments(documents);
              }}
            />
            <div
              style={{
                marginTop: "16px",
              }}
            >
              <Button type="submit">SUBMIT</Button>
            </div>
          </form>
        </Modal>
        <Modal
          title="Delete Confirmation"
          toggleModal={() => {
            setDeleteModal((prevState) => !prevState);
          }}
          isOpen={deleteModal}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <WarningVector />
              <h4
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Are you sure you want to delete?
              </h4>
              <p
                style={{
                  opacity: "0.8",
                  fontWeight: "400",
                  width: "70%",
                  margin: "0 auto",
                }}
              >
                Make sure you are 100% sure about deleting this blog. You
                will not be able to recover it back.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={(e) => {
                  setDeleteModal(false);
                }}
                style={{
                  outline: "none",
                  border: "none",
                  backgroundColor: "#e5e5e5",
                  color: "#707070",
                  padding: "1rem",
                  borderRadius: "4px",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontWeight: "550",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <RedButton
                onClick={async () => {
                  setDeleteModal(false);
                  await axios.delete(`/listing/${blogSubTitle}`);
                  dispatch(deleteBlogListings({ subTitle: blogSubTitle }));
                  navigate(path.NEW_BLOGS);
                }}
              >
                Delete
              </RedButton>
            </div>
          </div>
        </Modal>
        <BlogDetailsTop>
          <BlogImages>
            {blog.images.map((image, i) => {
              if (i <= 7) {
                return <Image src={image} alt="Blog Image" key={image} />;
              } else {
                return <></>;
              }
            })}
          </BlogImages>
        </BlogDetailsTop>
        <BlogHeader>
          <HeaderLeft>
            <Link to={path.NEW_BLOGS}>
              <IconWrapper>
                <BackArrow />
              </IconWrapper>
            </Link>
            <TitleGroup>
              <BlogTitle>
                {blogTitle} {blogYear}
              </BlogTitle>
              <CardSubTitle>{blogSubTitle}</CardSubTitle>
            </TitleGroup>
            <ListingStatus status={status} />
          </HeaderLeft>
          <HeaderRight>
            {user.role === "admin" ? (
              <>
                <CardButtons>
                  <GreenButton
                    onClick={async (e) => {
                      setApproveModal(true);
                    }}
                  >
                    Approve
                  </GreenButton>
                  <RedButton
                    onClick={async (e) => {
                      setRejectModal(true);
                    }}
                  >
                    Reject
                  </RedButton>
                </CardButtons>
              </>
            ) : null}

            <ActionButtons>
              {user.role === "admin" ||
              (user._id === userId && status === "under-review") ? (
                <>
                  <ToolTip hoverText="Delete">
                    <DeleteIcon
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                    />
                  </ToolTip>
                </>
              ) : null}

              {status === "under-review" && user._id === userId ? (
                <>
                  <ToolTip hoverText="Edit">
                    <EditIcon
                      onClick={() => {
                        navigate(`${path.ADD_NEW_BLOG}/${blogSubTitle}`);
                      }}
                    />
                  </ToolTip>
                </>
              ) : null}

              {user._id === userId ? (
                <>
                  <ToolTip hoverText="Upload">
                    <UploadIcon
                      onClick={() => {
                        setUploadModal(true);
                        // navigate("/upload-documents", {
                        //     state: {
                        //         vin: carVIN,
                        //         carCompany,
                        //     },
                        // });
                      }}
                    />
                  </ToolTip>
                </>
              ) : null}

              {user._id === userId || user.role === "admin" ? (
                <>
                  <ToolTip hoverText="Download">
                    <DownloadIcon
                      onClick={async () => {
                        console.log(`/document/download/${blogSubTitle}`);
                        axios
                          .get(`/document/download/${blogSubTitle}`, {
                            headers: {
                              "x-access-token": localStorage.getItem("token"),
                            },
                            responseType: "blob",
                          })
                          .then((response) => {
                            const url = window.URL.createObjectURL(
                              new Blob([response.data])
                            );
                            const a = document.createElement("a");
                            a.href = url;
                            a.setAttribute("download", `${subTitle}.zip`);
                            document.body.appendChild(a);
                            a.click();

                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                          });
                      }}
                    />
                  </ToolTip>
                </>
              ) : null}

              <FavouriteIcon
                favourite={favorite}
                handleOnClick={async () => {
                  const { data: response } = await axios.post(
                    `/listing/favorite/${blogSubTitle}`,
                    {
                      favorite: !favorite,
                    }
                  );
                  console.log(response);
                  dispatch(updateBlogListings(response.blog));
                }}
              />
            </ActionButtons>
          </HeaderRight>
        </BlogHeader>
        <BlogDetailsBody>
          <BlogProperties>
            <BlogProperty>
              <MileageIcon />
              <PropertyWrapper>
                <PropertyTitle>Date</PropertyTitle>
              </PropertyWrapper>
            </BlogProperty>

            <BlogProperty>
              <LocationIcon />
              <PropertyWrapper>
                <PropertyTitle>Location</PropertyTitle>
                <PropertyValue>{location}</PropertyValue>
              </PropertyWrapper>
            </BlogProperty>
            <BlogProperty>
              <TransmissionIcon />
              <PropertyWrapper>
                <PropertyTitle>Category</PropertyTitle>
                <PropertyValue>{category}</PropertyValue>
              </PropertyWrapper>
            </BlogProperty>
            {/* <CarProperty>
              <EngineIcon />
              <PropertyWrapper>
                <PropertyTitle>Engine</PropertyTitle>
                <PropertyValue>{carEngine}</PropertyValue>
              </PropertyWrapper>
            </CarProperty> */}
          </BlogProperties>
          <BlogDescription>
            <DescriptionGroup>
              <DescriptionHeading>Author Name</DescriptionHeading>
              <Text>{authorName}</Text>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionHeading>Highlights</DescriptionHeading>
              <Text>{highlight}</Text>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionHeading>Blog Details</DescriptionHeading>
              <Text>{blogDetails}</Text>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionHeading>Comments</DescriptionHeading>
           
            </DescriptionGroup>
            {blogNotes ? (
              <DescriptionGroup>
                <DescriptionHeading>Seller Notes</DescriptionHeading>
                <Text>{blogNotes}</Text>
              </DescriptionGroup>
            ) : null}
          </BlogDescription>
        </BlogDetailsBody>
      </BlogDetailsPage>
    </>
  );
};

export default BlogDetailsPage;
