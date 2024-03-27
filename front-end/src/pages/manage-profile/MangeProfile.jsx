import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { RedButton } from "../../components/CarCard/CarCard.styels";
import Modal from "../../components/Modal/Modal.jsx";

const ManageProfile = () => {
  const [allUser, setAllUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user", {
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
      .post(`http://localhost:8000/user/${userId}/block`)
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
        <h1>Profile</h1>
        <hr />
        <h2>Account</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user) =>
              user.role !== "admin" ? (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {!user.isBlocked ? (
                      <RedButton onClick={() => openModal(user._id)}>
                        {" "}
                        Action
                      </RedButton>
                    ) : (
                      <RedButton>Blocked</RedButton>
                    )}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
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
