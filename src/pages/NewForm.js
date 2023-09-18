import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const NewForm = () => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [userData, setUserData] = useState({
    name: "",
    universityName: "",
    phoneNo: "",
    country: "",
    profileImage: null,
    frontImage: null,
    backImage: null,
    sideImage: null,
    pdfFile: null,
  });

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfileImageChange = (file) => {
    setUserData({ ...userData, profileImage: file });
  };

  const handleFrontImageChange = (file) => {
    setUserData({ ...userData, frontImage: file });
  };

  const handleBackImageChange = (file) => {
    setUserData({ ...userData, backImage: file });
  };

  const handleSideImageChange = (file) => {
    setUserData({ ...userData, sideImage: file });
  };

  const handlePdfChange = (file) => {
    setUserData({ ...userData, pdfFile: file });
  };

  const MAX_IMAGE_SIZE_MB = 1; // Maximum image size in megabytes

  const submitData = async (event) => {
    event.preventDefault();
    const {
      name,
      universityName,
      phoneNo,
      country,
      profileImage,
      frontImage,
      backImage,
      sideImage,
      pdfFile,
    } = userData;

    // Function to check if image size is below 1 MB
    const isImageSizeValid = (image) => {
      const imageSizeMB = image.size / (1024 * 1024);
      return imageSizeMB <= MAX_IMAGE_SIZE_MB;
    };

    if (
      name &&
      universityName &&
      phoneNo &&
      country &&
      profileImage &&
      frontImage &&
      backImage &&
      sideImage &&
      pdfFile
    ) {
      if (!loading) {
        setLoading(true);

        const cleanedPhoneNo = phoneNo.replace(/[^0-9]/g, "");

        try {
          // Check profile image size
          if (!isImageSizeValid(profileImage)) {
            alert("Profile image size should be below 1 MB.");
            setLoading(false);
            return;
          }

          const storageRef = ref(storage, `files/${profileImage.name}`);
          const uploadTask = uploadBytesResumable(storageRef, profileImage);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.error("Image Upload Error:", error);
              setLoading(false);
            },
            async () => {
              try {
                const profileImageURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );

                // Check front image size
                if (!isImageSizeValid(frontImage)) {
                  alert("Front image size should be below 1 MB.");
                  setLoading(false);
                  return;
                }

                const frontImageStorageRef = ref(
                  storage,
                  `files/${frontImage.name}`
                );
                const frontImageUploadTask = uploadBytesResumable(
                  frontImageStorageRef,
                  frontImage
                );

                frontImageUploadTask.on(
                  "state_changed",
                  (snapshot) => {},
                  (error) => {
                    console.error("Front Image Upload Error:", error);
                    setLoading(false);
                  },
                  async () => {
                    try {
                      const frontImageUrl = await getDownloadURL(
                        frontImageUploadTask.snapshot.ref
                      );

                      // Check back image size
                      if (!isImageSizeValid(backImage)) {
                        alert("Back image size should be below 1 MB.");
                        setLoading(false);
                        return;
                      }

                      const backImageStorageRef = ref(
                        storage,
                        `files/${backImage.name}`
                      );
                      const backImageUploadTask = uploadBytesResumable(
                        backImageStorageRef,
                        backImage
                      );

                      backImageUploadTask.on(
                        "state_changed",
                        (snapshot) => {},
                        (error) => {
                          console.error("Back Image Upload Error:", error);
                          setLoading(false);
                        },
                        async () => {
                          try {
                            const backImageUrl = await getDownloadURL(
                              backImageUploadTask.snapshot.ref
                            );

                            // Check side image size
                            if (!isImageSizeValid(sideImage)) {
                              alert("Side image size should be below 1 MB.");
                              setLoading(false);
                              return;
                            }

                            const sideImageStorageRef = ref(
                              storage,
                              `files/${sideImage.name}`
                            );
                            const sideImageUploadTask = uploadBytesResumable(
                              sideImageStorageRef,
                              sideImage
                            );

                            sideImageUploadTask.on(
                              "state_changed",
                              (snapshot) => {},
                              (error) => {
                                console.error(
                                  "Side Image Upload Error:",
                                  error
                                );
                                setLoading(false);
                              },
                              async () => {
                                try {
                                  const sideImageUrl = await getDownloadURL(
                                    sideImageUploadTask.snapshot.ref
                                  );

                                  const pdfStorageRef = ref(
                                    storage,
                                    `files/${pdfFile.name}`
                                  );
                                  const pdfUploadTask = uploadBytesResumable(
                                    pdfStorageRef,
                                    pdfFile
                                  );

                                  pdfUploadTask.on(
                                    "state_changed",
                                    (snapshot) => {},
                                    (error) => {
                                      console.error("PDF Upload Error:", error);
                                      setLoading(false);
                                    },
                                    async () => {
                                      try {
                                        const pdfUrl = await getDownloadURL(
                                          pdfUploadTask.snapshot.ref
                                        );

                                        const res = await fetch(
                                          "https://mended-1e5fc-default-rtdb.firebaseio.com/userDataRecords.json",
                                          {
                                            method: "POST",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                            },
                                            body: JSON.stringify({
                                              name,
                                              universityName,
                                              phoneNo: cleanedPhoneNo,
                                              country,
                                              profileImageURL,
                                              frontImageUrl,
                                              backImageUrl,
                                              sideImageUrl,
                                              pdfUrl,
                                            }),
                                          }
                                        );

                                        if (res.ok) {
                                          setUserData({
                                            name: "",
                                            universityName: "",
                                            phoneNo: "",
                                            country: "",
                                            profileImage: null,
                                            frontImage: null,
                                            backImage: null,
                                            sideImage: null,
                                            pdfFile: null,
                                          });
                                          setLoading(false);

                                          alert(
                                            "Welcome to the family! We will text you when the app is ready to download"
                                          );
                                        } else {
                                          alert(
                                            "Error occurred. Please try again later."
                                          );
                                          setLoading(false);
                                        }
                                      } catch (err) {
                                        alert(
                                          "Error occurred. Please try again later."
                                        );
                                        console.log(err);
                                        setLoading(false);
                                      }
                                    }
                                  );
                                } catch (err) {
                                  alert(
                                    "Error occurred. Please try again later."
                                  );
                                  console.log(err);
                                  setLoading(false);
                                }
                              }
                            );
                          } catch (err) {
                            alert("Error occurred. Please try again later.");
                            console.log(err);
                            setLoading(false);
                          }
                        }
                      );
                    } catch (err) {
                      alert("Error occurred. Please try again later.");
                      console.log(err);
                      setLoading(false);
                    }
                  }
                );
              } catch (err) {
                alert("Error occurred. Please try again later.");
                console.log(err);
                setLoading(false);
              }
            }
          );
        } catch (err) {
          alert("Error occurred. Please try again later.");
          console.log(err);
          setLoading(false);
        }
      }
    } else {
      alert("Please fill all the fields and select an image and a PDF");
    }
  };

  const InputComponent = ({ label, placeholder }) => {
    return (
      <div className="bg-transparent w-auto lg:mt-0 mt-5">
        <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
          {label}
        </h2>
        <input
          type="text"
          placeholder={placeholder}
          className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2 signup-input"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="bg-transparent relative" id="signup">
        <h2 className="text-white bg-transparent lg:text-[25px] md:text-[25px] text-[23px] -mt-3 opacity-[80%] text-center">
          Signup for pre launch user
        </h2>

        <div className="bg-transparent lg:px-32 absolute w-full mt-6 signup-form2">
          <div
            style={{
              boxShadow: "0px 2.2666666507720947px 34px 0px #00000040",
            }}
            className="lg:rounded-[50px] rounded-3xl border bg-[#193535CC]  border-[#97D5D533] p-6 lg:pb-6 pb-14"
          >
            <div className="lg:flex justify-between bg-transparent backdrop-blur-lg sinup-form">
              <div className="lg:w-[70%] w-full bg-transparent lg:flex gap-3 signup-form3">
                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Profile Image
                  </h2>
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleProfileImageChange(e.target.files[0])
                    }
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>
                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Your name
                  </h2>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                    // onChange={(e) => setName(e.target.value)}
                    value={userData.name}
                    onChange={postUserData}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Front Image
                  </h2>
                  <input
                    id="frontImage"
                    name="frontImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFrontImageChange(e.target.files[0])}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    University Name
                  </h2>
                  <input
                    id="universityName"
                    name="universityName"
                    type="text"
                    placeholder="University Name"
                    // onChange={(e) => setUniversityName(e.target.value)}
                    value={userData.universityName}
                    onChange={postUserData}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Back Image
                  </h2>
                  <input
                    id="backImage"
                    name="backImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleBackImageChange(e.target.files[0])}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Phone Number
                  </h2>
                  <input
                    id="phoneNo"
                    name="phoneNo"
                    type="text"
                    placeholder="Phone Number"
                    // onChange={(e) => setPhoneNo(e.target.value)}
                    value={userData.phoneNo}
                    onChange={postUserData}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Side Image
                  </h2>
                  <input
                    id="sideImage"
                    name="sideImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSideImageChange(e.target.files[0])}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    Country
                  </h2>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Country"
                    // onChange={(e) => setPhoneNo(e.target.value)}
                    value={userData.country}
                    onChange={postUserData}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>

                <div className="bg-transparent w-auto lg:mt-0 mt-5">
                  <h2 className="bg-transparent text-[#FFFFFFB2] text-[14px] whitespace-pre">
                    PDF
                  </h2>
                  <input
                    id="pdfFile"
                    name="pdfFile"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handlePdfChange(e.target.files[0])}
                    className="bg-white w-full py-1 rounded-md mt-1 placeholder:text-[10px] placeholder:text-[#00000080] placeholder:pl-2"
                  />
                </div>
              </div>
              <div className="lg:w-[30%] relative w-full bg-transparent flex justify-center items-center signup-button">
                <button
                  onClick={submitData}
                  className="bg-[#FF6E05] lg:relative cursor-pointer absolute lg:top-0 top-5 text-white font-semibold shadow-lg shadow-[#FFE75659] text-headingThree  rounded-[50px] px-10 py-4 capitalize signup-button2"
                >
                  {loading ? "Loading..." : "join the family"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewForm;
