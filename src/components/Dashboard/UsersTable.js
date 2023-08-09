import React, { useState, useEffect } from "react";

function UsersTable() {
  const [userDataList, setUserDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      "https://mended-1e5fc-default-rtdb.firebaseio.com/userDataRecords.json"
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
    fetch(
      `https://mended-1e5fc-default-rtdb.firebaseio.com/userDataRecords/${userId}.json`,
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
        alert(
            "Error deleting user"
          );
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-6">Users List</h1>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="justify-between">
              <tr className="">
                <th className=" py-4 text-left px-6 bg-black rounded-s-lg">
                  <span className="text-gray-100 font-semibold">Name</span>
                </th>
                <th className=" py-4 text-left px-6 bg-black">
                  <span className="text-gray-100 font-semibold">
                    University Name
                  </span>
                </th>

                <th className=" py-4 text-left px-6 bg-black">
                  <span className="text-gray-100 font-semibold">Phone No</span>
                </th>

                <th className=" py-4 text-left px-6 bg-black rounded-e-lg">
                  <span className="text-gray-100 font-semibold">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {userDataList.map((userData) => (
                <tr
                  className="bg-white border-b-2 border-gray-200 odd:bg-white even:bg-gray-50"
                  key={userData.id}
                >
                  <td>
                    <span className="text-left block px-6">
                      {userData.name}
                    </span>
                  </td>

                  <td>
                    <span className="text-left block px-6">
                      {userData.universityName}
                    </span>
                  </td>

                  <td>
                    <span className="text-left block px-6">
                      {userData.phoneNo}
                    </span>
                  </td>

                  <td className="px-6  py-4">
                    <span className="flex">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UsersTable;
