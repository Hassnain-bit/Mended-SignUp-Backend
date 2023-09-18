import React from "react";

function ImageInput(props) {
  const handleDownloadImage = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "profile_image.jpg"; // You can adjust the filename as needed
    link.target = "_blank"; // Open the link in a new tab
    link.click();
  };
  return (
    <>
      <div className={`bg-transparent w-auto mt-auto ${props.className}`}>
        <h2 className="bg-transparent text-black opacity-80 text-[12px] whitespace-pre-wrap">
          {props.label}
        </h2>
        <button
          className="bg-white w-full p-3 rounded-md mt-1 text-[14px] text-black border border-gray-300"
          onClick={() => handleDownloadImage(props.onClick)}
        >
          Open {props.buttonName}
          <span className="hidden">
            <img src={props.ImageURL} alt="" />
          </span>
        </button>
      </div>
    </>
  );
}

export default ImageInput;
