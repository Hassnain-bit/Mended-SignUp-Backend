import React from "react";
import Input from "../Common/Input";
import ImageInput from "../Common/ImageInput";

function UserModal({ userData, onClose }) {
  return (
    <>
      {userData && (
        <>
          <h1 className="text-4xl font-bold mb-12">Mender Details</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Input label="Name" InputName={userData.name} />

            <Input
              label="Business Name (dba)"
              InputName={userData.businessName}
            />

            <Input label="Work Phone" InputName={userData.workPhone} />

            <Input label="Work Email" InputName={userData.workEmail} />

            <Input label="Work Address" InputName={userData.workAddress} />

            <ImageInput
              label="Profile photo (headshot)"
              onClick={userData.profileImageURL}
              ImageURL={userData.profileImageURL}
              buttonName="Image"
            />

            <Input label="Education" InputName={userData.education} />

            <Input label="Experience" InputName={userData.experience} />

            <ImageInput
              label="Resume Pdf"
              onClick={userData.resumePdfUrl}
              ImageURL={userData.resumePdfUrl}
              buttonName="PDF"
              className="mt-0"
            />

            <Input label="Cover Letter" InputName={userData.coverLetter} />

            <Input
              label="Please provide your licensing details and information including your current licensing states, license number(s), and your license expiration date(s)."
              InputName={userData.licensingDetails}
            />

            <Input
              label="Are you experienced with providing online counseling services? If so, please inform us about it."
              InputName={userData.onlineCounseling}
            />

            <Input
              label="Please provide contact information for one or more licensed therapists who you can use as a reference(s)."
              InputName={userData.licensedTherapists}
            />

            <Input
              label="What are your reasons for wanting to provide online services?"
              InputName={userData.onlineServices}
            />

            <Input
              label="How much time are you willing to dedicate towards Mended?"
              InputName={userData.time}
            />

            <Input
              label="What are your thoughts about conducting live video chat based therapy?"
              InputName={userData.liveVideoChat}
            />

            <Input
              label="Which browser and operating system do you use on your computer?"
              InputName={userData.operatingSystem}
            />

            <Input
              label="How many years have you spent practicing mental health services?"
              InputName={userData.yearsMentalHealth}
            />

            <Input
              label="Have you completed at least 2,000 hours of providing mental health services?"
              InputName={userData.hoursMentalHealth}
            />

            <Input
              label="How often do you check your email and mobile phone?"
              InputName={userData.checkEmailPhone}
            />

            <Input
              label="Have you ever been to an investigation or review by your licensing board? If so, please explain why."
              InputName={userData.investigationLicensingBoard}
            />

            <Input
              label="Have you ever been subject to discipline actions by your licensing board? If so, please explain why."
              InputName={userData.disciplineLicensingBoard}
            />

            <Input
              label="Are you available to provide services in a secondary language other than english? If so, which language(s)?"
              InputName={userData.language}
            />

            <Input
              label="What is your counseling style, and approach?"
              InputName={userData.counselingStyle}
            />

            <Input
              label="Are you aware about the fact that you will not be a Mender employee but an independent provider who provides services through the Mended Network?"
              InputName={userData.independentProvider}
            />

            <Input
              label="How did you hear about Mended?"
              InputName={userData.hearAboutMended}
            />

            <ImageInput
              label="Professional License picture"
              onClick={userData.licenseImageUrl}
              ImageURL={userData.licenseImageUrl}
              buttonName="Image"
            />

            <ImageInput
              label="Driver's License picture"
              onClick={userData.driverLicenseImageUrl}
              ImageURL={userData.driverLicenseImageUrl}
              buttonName="Image"
            />

            <ImageInput
              label="Social Security Card picture"
              onClick={userData.securityCardImageUrl}
              ImageURL={userData.securityCardImageUrl}
              buttonName="Image"
            />

            <Input
              label="Do you believe Mended will change the world and lead the people into a mental health revolution?"
              InputName={userData.mentalHealthRevolution}
            />

            <Input
              label="Will you help us spread the word about what we do at Mended and who we are?"
              InputName={userData.helpUs}
            />

            <Input
              label="Please provide contact numbers to 2-5 mental health professionals that you think would like being a mender on our platform."
              InputName={userData.numbersOfProfessionals}
            />

            <Input
              label="Do you understand that Love Is the foundation of Mended, and that Mended is a Family?
"
              InputName={userData.mendedIsFamily}
            />

            <Input
              label="Will you join the Mended Family and become one of our Menders and help us change the world globally?"
              InputName={userData.joinMendedFamily}
            />
          </div>
          <button
            className="p-3 rounded-lg bg-black text-white mt-12 w-full"
            onClick={onClose}
          >
            Close
          </button>
        </>
      )}
    </>
  );
}

export default UserModal;
