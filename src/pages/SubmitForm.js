import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const SubmitForm = () => {
  const [loading, setLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (file) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Download URL:", downloadURL); 
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const [userData, setUserData] = useState({
    name: "",
    universityName: "",
    phoneNo: "",
    country: "",
  });

  let name, value;

  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { name, universityName, phoneNo, country } = userData;

    if (name && universityName && phoneNo && country) {
      if (!loading) {
        setLoading(true);

        // Clean the phone number by removing non-numeric characters
        const cleanedPhoneNo = phoneNo.replace(/[^0-9]/g, "");

        try {
          // Upload the image first
          if (selectedFile) {
            await handleImageUpload(selectedFile);
          }

          const res = await fetch(
            "https://mended-1e5fc-default-rtdb.firebaseio.com/userDataRecords.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                universityName,
                phoneNo: cleanedPhoneNo, // Use the cleaned phone number
                country,
                imageUrl: imgUrl,
              }),
            }
          );

          if (res.ok) {
            setUserData({
              name: "",
              universityName: "",
              phoneNo: "",
              country: "",
            });
            alert(
              "Welcome to the family! We will text you when the app is ready to download"
            );
          } else {
            alert("Error occurred. Please try again later.");
          }
        } catch (err) {
          alert("Error occurred. Please try again later.");
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
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
                  Image
                </h2>
                <input
                  id="imageInput"
                  name="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="bg-transparent"
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
  );
};

export default SubmitForm;