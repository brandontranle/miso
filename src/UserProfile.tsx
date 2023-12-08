import React from "react";
import "./style.css";
import "./profile.css";
import pfp from "./assets/profile-picture.png";
import { useUserContext } from "./useUserContext";
import { useState, useEffect } from "react";
import TimeZoneDropdown from "./timezone-dropdown-menu";
import axios from "axios";
import miso from "./miso/brown_cat/cat01_sit_8fps.gif";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useUserContext();
  const region = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  );
  const [kibbles, setKibbles] = useState(0);
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 100; // Set your desired character limit
  const [profilePicture, setProfilePicture] = useState(pfp);
  const [isHovering, setIsHovering] = useState(false);
  const [date, setDate] = useState("");

  const roundKibbles = (num: number) => {
    setKibbles(Math.round(num));
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const getKibbles = async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      const response = await axios.post("http://localhost:5000/getKibbles", {
        userId: userId,
      });

      roundKibbles(response.data.kibbles);
      console.log("kibbles retrieved");
    } catch (error) {
      console.log(error + " failed to retrieve kibbles");
    }
  };

  const getBio = async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      const response = await axios.post("http://localhost:5000/getBio", {
        userId: userId,
      });

      setBio(response.data.bio);
      console.log("bio retrieved!");
    } catch (error) {
      console.log("error retrieving bio: " + error);
    }
  };

  const editBio = async (newBio: string) => {
    try {
      const userId = sessionStorage.getItem("userId");

      const response = await axios.post("http://localhost:5000/editBio", {
        userId,
        bio: newBio,
      });

      console.log("bio editted successfully!");
    } catch (error) {
      console.log("error editting the bio " + error);
    }
  };

  useEffect(() => {
    getKibbles();
    getBio();
    getDate();
    loadProfilePicture();
  }, [isAuthenticated]);

  useEffect(() => {
    if (bio.length === 0) {
      setBio("Nothing to display here :(");
    }
  }, [bio]);

  const handleBioEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Check if the new value exceeds the character limit
    if (newValue.length <= maxCharacterLimit) {
      setBio(newValue);
      setCharacterCount(newValue.length);
    }
  };

  const getDate = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.post("http://localhost:5000/getDate", {
        userId: userId,
      });

      setDate(response.data.createdAt);
      console.log(response.data.createdAt);
      console.log("date set!");
    } catch (error) {
      console.log("failed to retrieve the date!");
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const saveBio = async () => {
    // Call your editBio function here to save the updated bio
    try {
      await editBio(bio);
      toggleEdit(); // Exit edit mode after saving
    } catch (error) {
      console.log("Error editing bio: " + error);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("profile-picture-input");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("The file input element was not found");
    }
  };

  const saveProfilePicture = async (base64String) => {
    try {
      const userId = sessionStorage.getItem("userId");
      await axios.post("http://localhost:5000/updateProfilePicture", {
        userId,
        image: base64String,
      });
      // Handle successful upload here
      console.log("Upload successful");
    } catch (error) {
      console.log("Error uploading profile picture: " + error);
    }
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = 128; // Change this to your desired size
          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions, to preserve the aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          // Set the canvas dimensions to the new values
          canvas.width = width;
          canvas.height = height;

          // Draw the resized image onto the canvas
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert the canvas to a data URL and set the state
          const resizedDataURL = canvas.toDataURL("image/png");
          setProfilePicture(resizedDataURL);
          // Now call your API to send this string to the backend
          saveProfilePicture(resizedDataURL);
        };
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const loadProfilePicture = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:5000/getProfilePicture",
        {
          userId,
        }
      );

      console.log(response.data.image);

      if (response.data.image) {
        setProfilePicture(response.data.image);
      } else {
        setProfilePicture(pfp);
      }

      console.log("profile picture loaded from the db!");
    } catch (error) {
      console.log("error loading the image upon logging in");
    }
  };

  return (
    <div className="side-bar-container">
      <div className="nav-bar-form">
        <div className="profile-container">
          <label className="header-label"> MY ACCOUNT </label>
          <div
            className="profile-picture-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="profile-picture"
              src={profilePicture}
              alt="Profile"
              onClick={triggerFileInput}
            />
            {isHovering && (
              <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="#FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
                className="pencil-icon"
              >
                <g filter="url(#filter0_d_86_1438)">
                  <path
                    d="M51.6726 10.5771L43.2446 2.14909C42.1446 1.11588 40.7033 0.523032 39.1946 0.483332C37.686 0.443632 36.2155 0.959846 35.0627 1.93378L7.37938 29.6171C6.38513 30.6197 5.76607 31.9339 5.6261 33.3389L4.30346 46.1655C4.26202 46.616 4.32048 47.0702 4.47466 47.4955C4.62885 47.9209 4.87497 48.3069 5.19547 48.6263C5.48289 48.9113 5.82375 49.1369 6.19851 49.29C6.57327 49.443 6.97456 49.5206 7.37938 49.5183H7.65621L20.4828 48.3494C21.8879 48.2095 23.202 47.5904 24.2047 46.5961L51.888 18.9129C52.9624 17.7777 53.5431 16.263 53.5027 14.7005C53.4624 13.138 52.8043 11.6552 51.6726 10.5771ZM19.9291 42.1976L10.7014 43.0588L11.5319 33.8311L28.9108 16.6674L37.2158 24.9724L19.9291 42.1976ZM41.2145 20.8507L32.971 12.6072L38.9691 6.45538L47.3664 14.8526L41.2145 20.8507Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_86_1438"
                    x="0.290527"
                    y="0.481201"
                    width="57.2144"
                    height="57.0371"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_86_1438"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_86_1438"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            )}
            <input
              type="file"
              id="profile-picture-input"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
              accept="image/*"
            />
          </div>
          {user && <h3 id="username"> {user.name} </h3>}
          <div className="profile-flex-row">
            <label className="profile-row-label-kibbles">
              {kibbles} kibbles
            </label>

            <svg
              width="34"
              height="34"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_140_795)">
                <path
                  d="M36.8867 29.7617H36.5315L33.6424 15.798C33.3325 14.2999 32.2077 13.1289 30.7931 12.7102C30.7978 12.63 30.8008 12.5496 30.8008 12.4688C30.8008 10.2437 29.0113 8.4288 26.796 8.38746C26.1946 7.30387 25.0488 6.60547 23.75 6.60547C23.0674 6.60547 22.4077 6.8092 21.8492 7.17213C21.0996 6.44226 20.0823 6.01172 19 6.01172C17.9177 6.01172 16.9004 6.44226 16.1508 7.17213C15.5922 6.80913 14.9327 6.60547 14.25 6.60547C12.9512 6.60547 11.8055 7.30387 11.2041 8.38746C8.98871 8.4288 7.19922 10.2437 7.19922 12.4688C7.19922 12.5496 7.20219 12.63 7.20686 12.7102C5.79218 13.1289 4.66739 14.2999 4.35753 15.798L1.46849 29.7617H1.11328C0.498453 29.7617 0 30.2602 0 30.875C0 31.4898 0.498453 31.9883 1.11328 31.9883H36.8867C37.5015 31.9883 38 31.4898 38 30.875C38 30.2602 37.5015 29.7617 36.8867 29.7617ZM11.2812 10.6133C11.4169 10.6133 11.5542 10.6286 11.6895 10.659C11.9777 10.7236 12.2797 10.6711 12.5291 10.5129C12.7785 10.3549 12.9549 10.1041 13.0194 9.81595C13.1471 9.2458 13.6646 8.83203 14.25 8.83203C14.6987 8.83203 15.1043 9.06293 15.3349 9.44961C15.5475 9.80623 15.9407 10.0149 16.3554 9.99088C16.7699 9.96691 17.1367 9.7142 17.3067 9.33546C17.6059 8.66897 18.2706 8.23828 19 8.23828C19.7293 8.23828 20.3941 8.66897 20.6933 9.33546C20.8633 9.71427 21.2301 9.96691 21.6445 9.99088C22.0589 10.0149 22.4524 9.80623 22.6651 9.44961C22.8956 9.06293 23.3012 8.83203 23.7499 8.83203C24.3353 8.83203 24.8528 9.2458 24.9805 9.81595C25.045 10.1041 25.2214 10.3549 25.4708 10.5129C25.7202 10.671 26.0223 10.7236 26.3103 10.659C26.4456 10.6286 26.5829 10.6133 26.7186 10.6133C27.7417 10.6133 28.5741 11.4456 28.5741 12.4688C28.5741 12.4936 28.5732 12.5183 28.5722 12.543H9.42764C9.42667 12.5183 9.42578 12.4936 9.42578 12.4688C9.42578 11.4456 10.2581 10.6133 11.2812 10.6133ZM3.74218 29.7617L6.53793 16.2491C6.71524 15.3918 7.47939 14.7695 8.35488 14.7695H29.645C30.5205 14.7695 31.2846 15.3918 31.462 16.2491L34.2578 29.7617H3.74218Z"
                  fill="#B9835E"
                />
                <path
                  d="M27.2383 21.9687C27.2383 21.4298 27.8207 20.6643 28.1027 20.3781C28.5346 19.9431 28.5336 19.2404 28.0998 18.8066C27.6651 18.3718 26.9602 18.3718 26.5254 18.8066C26.4079 18.924 25.5992 19.76 25.2145 20.8555H23.7892C23.9397 20.0534 24.1871 19.4207 24.1908 19.4117C24.4177 18.8412 24.14 18.1945 23.5699 17.9664C22.9989 17.7381 22.351 18.0158 22.1227 18.5866C22.1014 18.6398 21.7097 19.6313 21.5338 20.8555H19.5966C19.7441 19.7134 20.0526 18.7695 20.0566 18.7571C20.2503 18.1741 19.9351 17.5444 19.3521 17.3502C18.769 17.1557 18.1384 17.471 17.9439 18.0543C17.9225 18.1185 17.5135 19.361 17.3551 20.8555H15.9571V18.4063C15.9571 18.0791 15.8131 17.7684 15.5634 17.5569C15.3137 17.3453 14.9836 17.2543 14.6608 17.3082C10.3894 18.0201 9.6263 21.5984 9.59587 21.7504C9.567 21.8946 9.567 22.0429 9.59587 22.1871C9.62623 22.3391 10.3894 25.9175 14.6608 26.6294C14.7217 26.6395 14.7829 26.6445 14.8438 26.6445C15.1054 26.6445 15.3609 26.5522 15.5634 26.3807C15.8131 26.1691 15.9571 25.8585 15.9571 25.5312V23.082H17.3551C17.5135 24.5765 17.9225 25.819 17.9439 25.8832C18.0994 26.3496 18.5334 26.6442 18.9994 26.6442C19.1158 26.6442 19.2342 26.6258 19.3507 26.5871C19.9337 26.3936 20.2495 25.7636 20.0566 25.1803C20.0526 25.168 19.744 24.2241 19.5966 23.0819H21.5338C21.7097 24.3062 22.1014 25.2977 22.1227 25.3509C22.2967 25.7859 22.7142 26.0502 23.1557 26.0502C23.2929 26.0502 23.4324 26.0247 23.5676 25.9708C24.1382 25.7438 24.4168 25.0967 24.1908 24.5258C24.1872 24.5167 23.9398 23.8841 23.7892 23.0819H25.2146C25.5993 24.1775 26.408 25.0134 26.5255 25.1309C26.7432 25.3486 27.029 25.4577 27.3149 25.4577C27.5996 25.4577 27.8843 25.3493 28.1014 25.1323C28.5361 24.6975 28.5375 23.9941 28.1028 23.5593C27.8207 23.2731 27.2383 22.5076 27.2383 21.9687ZM13.7305 24.0299C12.4885 23.426 12.0067 22.4206 11.8461 21.9687C12.0067 21.5167 12.4885 20.5114 13.7305 19.9075V24.0299Z"
                  fill="#B9835E"
                />
              </g>
              <defs>
                <clipPath id="clip0_140_795">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="horizontal-line"> </div>
          <div className="profile-flex-row">
            <label className="profile-row-label-about"> ABOUT ME </label>
            {!editing ? (
              <button className="svg-button" onClick={toggleEdit}>
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  width="20px"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            ) : (
              <></>
            )}
          </div>
          {editing ? ( // If in edit mode, display input field and save button
            <>
              <input
                type="text"
                className="profile-bio-input"
                value={bio}
                onChange={handleBioEdit}
                maxLength={100} // Set your desired character limit
              />
              <div className="character-count">
                {characterCount}/{maxCharacterLimit}
              </div>
              <button className="svg-button" onClick={saveBio}>
                a
              </button>
            </>
          ) : (
            <>
              <label className="profile-bio">{bio}</label>
            </>
          )}
          <div className="horizontal-line"> </div>
          <div className="item-centered-row-container">
            <label className="date-label">
              {" "}
              MEMBER SINCE {date.slice(0, 4)}{" "}
            </label>
            <img className="larger-miso" src={miso} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
