import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "../../components/Modal/Modal.jsx";

const ManageProfile = () => {
  const [allUser, setAllUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get("https://stirring-puffpuff-37664f.netlify.app//user", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAllUser(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching all users:", error);
      });
  }, []);
  const openModal = (userId, e) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleBlock = (userId) => {
    axios
      .post(
        `https://stirring-puffpuff-37664f.netlify.app//user/${userId}/block`
      )
      .then(() => {
        // Update the user data to mark the user as blocked
        setAllUser((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === userId) {
              return { ...user, isBlocked: true };
            }
            return user;
          });
        });
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Profiles</h1>
        <hr />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>First Name</TableHeaderCell>
                <TableHeaderCell>Last Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody>
              {allUser.map((user) =>
                user.role !== "admin" ? (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {!user.isBlocked ? (
                        <GreenButton onClick={() => openModal(user._id)}>
                          Action
                        </GreenButton>
                      ) : (
                        <RedButton>Blocked</RedButton>
                      )}
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </tbody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Confirmation"
        toggleModal={() => setIsModalOpen(false)}
      >
        <form>
          <h4>Are you sure you want to block this user?</h4>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <RedButton
              onClick={() => {
                handleBlock(selectedUserId);
              }}
            >
              Block
            </RedButton>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageProfile;

export const PaymentMethod = styled.button`
  background-color: #17b9ec;
  color: white;
  margin-left: auto;
  margin-top: 12px;
  align-self: center;
  font-size: 15px;
  width: 180px;
  min-height: 35px;
  border-radius: 3px;
  border: none;

  :hover {
    background-color: #00c3ff;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px 15px;
`;

const GreenButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const RedButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: not-allowed;
`;
