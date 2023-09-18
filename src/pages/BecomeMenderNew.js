import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import UserModal from "../components/Dashboard/UserModal"; // Adjust the path as needed

function BecomeMenderTableNew() {
  const [userDataList, setUserDataList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      "https://mended-1e5fc-default-rtdb.firebaseio.com/becomeMenderRecords.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const userDataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUserDataList(userDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(
        `https://mended-1e5fc-default-rtdb.firebaseio.com/becomeMenderRecords/${userId}.json`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          alert("User deleted successfully");
          console.log("User deleted successfully");
          fetchData(); // Fetch updated data after deletion
          window.location.reload(); // Refresh the page
        })
        .catch((error) => {
          alert("Error deleting user");
          console.error("Error deleting user:", error);
        });
    }
  };

  const filteredUserData = userDataList.filter(
    (userData) =>
      userData.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      userData.businessName
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      userData.workPhone.includes(searchKeyword) ||
      userData.workEmail.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const searchResultCount = filteredUserData.length;

  const handleDeleteSelectedUsers = async (userIds) => {
    if (window.confirm("Are you sure you want to delete selected data?")) {
      try {
        for (const userId of userIds) {
          await fetch(
            `https://mended-1e5fc-default-rtdb.firebaseio.com/becomeMenderRecords/${userId}.json`,
            {
              method: "DELETE",
            }
          );
        }
        alert("Selected data deleted successfully");
        fetchData(); // Fetch updated data after deletion
        window.location.reload(); // Refresh the page
      } catch (error) {
        alert("Error deleting selected data");
        console.error("Error deleting selected data:", error);
      } finally {
        setSelectedUserIds([]); // Clear selected user IDs after deletion
      }
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  return (
    <>
      <div>
        <div className="relative w-fit">
          <h1 className="text-4xl font-bold mb-6">Menders List</h1>
          <span className=" absolute top-[3px] -right-[37px] border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
            {searchResultCount}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="w-full md:w-1/2 max-w-md">
            <input
              type="text"
              placeholder="Search by keyword..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="px-4 py-2 border rounded w-full flex md:ml-auto"
            />
          </div>

          <div className="w-full md:w-1/2 mt-4 sm:mt-0">
            {selectedUserIds.length > 0 && (
              <button
                onClick={() => handleDeleteSelectedUsers(selectedUserIds)}
                className="bg-red-500 text-white px-4 py-2 rounded flex ml-auto"
              >
                Delete selected data
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="justify-between">
              <tr className="">
                <th className=" py-4 text-left px-6 bg-black rounded-s-lg">
                  <span className="text-gray-100 font-semibold">Name</span>
                </th>
                <th className=" py-4 text-left px-6 bg-black">
                  <span className="text-gray-100 font-semibold">
                    Business Name (dba)
                  </span>
                </th>

                <th className=" py-4 text-left px-6 bg-black">
                  <span className="text-gray-100 font-semibold">
                    Work Phone
                  </span>
                </th>

                <th className=" py-4 text-left px-6 bg-black">
                  <span className="text-gray-100 font-semibold">
                    Work Email
                  </span>
                </th>

                <th className=" py-4 text-left px-6 bg-black rounded-e-lg">
                  <span className="text-gray-100 font-semibold">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {filteredUserData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center bg-white">
                    Not found
                  </td>
                </tr>
              ) : (
                filteredUserData.map((userData) => (
                  <tr
                    className="bg-white border-b-2 border-gray-200 odd:bg-white even:bg-gray-50"
                    key={userData.id}
                  >
                    <td>
                      <div className="flex items-baseline pl-6">
                        <input
                          type="checkbox"
                          checked={selectedUserIds.includes(userData.id)}
                          onChange={() => {
                            if (selectedUserIds.includes(userData.id)) {
                              setSelectedUserIds(
                                selectedUserIds.filter(
                                  (id) => id !== userData.id
                                )
                              );
                            } else {
                              setSelectedUserIds([
                                ...selectedUserIds,
                                userData.id,
                              ]);
                            }
                          }}
                        />
                        <span className="text-left block px-6">
                          {userData.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="text-left block px-6">
                        {userData.businessName}
                      </span>
                    </td>

                    <td>
                      <span className="text-left block px-6">
                        {userData.workPhone}
                      </span>
                    </td>

                    <td>
                      <span className="text-left block px-6">
                        {userData.workEmail}
                      </span>
                    </td>

                    <td className="p-6">
                      <span className="flex gap-5">
                        <button
                          className="py-[.4rem] px-4 rounded-lg bg-black text-white"
                          onClick={() => handleOpenModal(userData.id)}
                        >
                          Open Details
                        </button>
                        <button onClick={() => handleDeleteUser(userData.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        center
        classNames={{
          modal: "!max-w-4xl !bg-gray-50 !rounded-lg !py-10 !px-8",
        }}
      >
        <UserModal
          userData={userDataList.find((user) => user.id === selectedUserId)}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
}

export default BecomeMenderTableNew;
