import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import path from "../../constants/paths";
import { ReactComponent as MileageIcon } from "../../assets/mileage.svg";
import { ReactComponent as LocationIcon } from "../../assets/location.svg";
import { ReactComponent as EngineIcon } from "../../assets/engine.svg";
import { ReactComponent as TransmissionIcon } from "../../assets/transmission.svg";
import { ReactComponent as ApproveIcon } from "../../assets/done.svg";
import { ReactComponent as RejectIcon } from "../../assets/close.svg";

import {
  Card,
  CardBody,
  CardButton,
  CardButtons,
  CardHeader,
  CardImage,
  CardImageWrapper,
  CardProperties,
  CardProperty,
  CardSubTitle,
  CardTitle,
  CardTop,
  FavIconWrapper,
  GreenButton,
  RedButton,
} from "./BlogCard.styels";

import FavouriteIcon from "../FavouriteIcon/favouriteIcon";
import { useDispatch, useSelector } from "react-redux";
import { updateBlogListings } from "../../redux/blog-listing/blogListing.reducers";
import ListingStatus from "../ListingStatus/ListingStatus.component";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import axios from "../../utils/axios";

const BlogCard = ({ blog }) => {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginStatus.userInfo);

  const {
    blogTitle,
    blogYear,
    favorite,
    subTitle,
    location,
    images,
    category,
    status,
  } = blog;

  return (
    <>
      <Card>
        <CardTop>
          <CardImageWrapper>
            <CardImage src={images[0]} />
          </CardImageWrapper>
          <FavIconWrapper>
            <FavouriteIcon
              favourite={favorite}
              handleOnClick={async () => {
                const { data: response } = await axios.post(
                  `/listing/favorite/${subTitle}`,
                  {
                    favorite: !favorite,
                  }
                );

                dispatch(updateBlogListings(response.blog));
              }}
            />
          </FavIconWrapper>
        </CardTop>

        <CardBody>
          <CardHeader>
            <div>
              <CardTitle>{`${blogTitle} ${blogYear}`}</CardTitle>
              <CardSubTitle>{subTitle}</CardSubTitle>
            </div>
            <ListingStatus status={status} />
          </CardHeader>
          <CardProperties>
            {/* <CardProperty>
              <MileageIcon />
              <span>{carMileage}</span>
            </CardProperty> */}
            <CardProperty>
              <LocationIcon />
              <span>{location}</span>
            </CardProperty>
            <CardProperty>
              <TransmissionIcon />
              <span>{category}</span>
            </CardProperty>
            {/* <CardProperty>
              <EngineIcon />
              <span>{carEngine}</span>
            </CardProperty> */}
          </CardProperties>
        </CardBody>
        {user.role === "admin" ? (
          <CardButtons>
            <CardButton
              onClick={() => {
                navigate(`${path.NEW_BLOGS}/${subTitle}`);
              }}
            >
              More
            </CardButton>
            <CardButtons>
              <GreenButton
                onClick={async () => {
                  setApproveModal(true);
                }}
              >
                <ApproveIcon /> <span>Approve</span>
              </GreenButton>
              <RedButton
                onClick={async () => {
                  setRejectModal(true);
                }}
              >
                <RejectIcon /> <span>Reject</span>
              </RedButton>
            </CardButtons>
          </CardButtons>
        ) : (
          <CardButton
            onClick={() => {
              navigate(`${path.NEW_BLOGS}/${subTitle}`);
            }}
          >
            More Info
          </CardButton>
        )}
      </Card>

      <ConfirmationModal
        currentStatus="approve"
        vin={subTitle}
        title="Accept Confirmation"
        description="Are you sure you want to accept this blog?"
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
        vin={subTitle}
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
    </>
  );
};

export default BlogCard;
