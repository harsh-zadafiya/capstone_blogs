import { Status } from "./ListingStatus.styles";

const ListingStatus = ({ status }) => {
  return <Status status={status}>{status.split("-").join(" ")}</Status>;
};

export default ListingStatus;
