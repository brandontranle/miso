import "./hubs.css";
import axios from "axios";
import { useState } from "react";
import ImageButton from "./ImageButton";
import background1 from "../assets/background.gif";
import background2 from "../assets/background4.gif";
import background3 from "../assets/backgroundd5.gif";
import cherryblossom from "../assets/cherry-blossom.gif";
import purpleBG from "../assets/purple.webp";

import brownCatWalkGif from "../miso/brown_cat/cat01_walk_8fps.gif";
import blackCatWalkGif from "../miso/black_cat/cat05_walk_8fps.gif";
import greyCatWalkGif from "../miso/grey_cat/cat02_walk_8fps.gif";

import brownCatSitGif from "../miso/brown_cat/cat01_sit_8fps.gif";
import blackCatSitGif from "../miso/black_cat/cat05_sit_8fps.gif";
import greyCatSitGif from "../miso/grey_cat/cat02_sit_8fps.gif";

import brownCatAttackGif from "../miso/brown_cat/cat01_attack_12fps.gif";
import blackCatAttackGif from "../miso/black_cat/cat05_attack_12fps.gif";
import greyCatAttackGif from "../miso/grey_cat/cat02_attack_12fps.gif";

import pixelBackground1 from "../miso/backgrounds/pixelbackground1.jpg";
import pixeBackground2 from "../miso/backgrounds/pixelbackground2.png";
import pixel3 from "../miso/backgrounds/pixel3.png";
import pixel4 from "../miso/backgrounds/pixel4.jpg";
import pixel5 from "../miso/backgrounds/pixel5.jpg";



import { useUserContext } from "../useUserContext";
import blossomrain from "../assets/blossomrain.gif";
import lofi from "../assets/lofi.gif";
import study1 from "../assets/study1.gif";

import pixelautumn from "../assets/pixelautumn.gif";
import groundrain from "../assets/groundrain.gif";
import study2 from "../assets/study2.gif";

interface HubsWidgetProps {
  setBackgroundImage: (image: string) => void;
  handleMinimize: () => void;
  isMinimized: boolean;
  setMiso: () => void;
  setMisoBackgroundImage: (image: string) => void;
}

export const HubsWidget = ({
  handleMinimize,
  isMinimized,
  setBackgroundImage,
  setMiso,
  setMisoBackgroundImage,
}) => {
  const [background, setBackground] = useState();
  const { user, isAuthenticated } = useUserContext();

  const changeBackground = (newBackground: string) => {
    setBackgroundImage(newBackground);
  };

  const changeMiso = (newMiso: string) => {
    setMiso(newMiso);
  };

  const changeMisoBackground = (newMisoBackground: string) => {
    setMisoBackgroundImage(newMisoBackground);
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create an image element

      if (file.type === "image/gif") {
        // Directly use the GIF file without processing
        const reader = new FileReader();
        reader.onload = function (e) {
          const gifSrc = e.target?.result as string;
          changeBackground(gifSrc);
          saveBackgroundImage(gifSrc);
        };
        reader.readAsDataURL(file);
      } else {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target?.result as string;
          img.onload = function () {
            // Define the maximum dimensions
            const maxWidth = 800;
            const maxHeight = 800;
            // Compute the scaling factor
            const scalingFactor = Math.min(
              maxWidth / img.width,
              maxHeight / img.height
            );
            const width = scalingFactor * img.width;
            const height = scalingFactor * img.height;
            // Draw the image to a canvas at the new size
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            // Convert the canvas to a data URL and upload
            const resizedImage = canvas.toDataURL(file.type);
            changeBackground(resizedImage);
            saveBackgroundImage(resizedImage);
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  /*
  const triggerFileInput = () => {
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("The file input element was not found");
    }
  };*/

  const saveBackgroundImage = async (base64String: string) => {
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        await axios.post("http://localhost:5000/updateBackgroundImage", {
          userId,
          image: base64String,
        });
        // Handle successful upload here
        console.log("Upload successful");
      } catch (error) {
        console.log("Error uploading profile picture: " + error);
      }
    }
  };

  return (
    <div className="hubs-widget widget-handle">
      <div className="widget-header">
        <p className="widget-title">Hubs</p>
        <button className="minimize-symbol" onClick={() => handleMinimize()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="2"
            viewBox="0 0 15 2"
            fill="none"
          >
            <path
              d="M1.83081 1L14 1"
              stroke="#4E4E4E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <div className="hubs-bg-container">
            <div className="left-container">
              <label> Background </label>
            </div>
            <div className="row-selections">
              <ImageButton
                imageUrl={background1}
                onClick={() => changeBackground(background1)}
              />
              <ImageButton
                imageUrl={purpleBG}
                onClick={() => changeBackground(purpleBG)}
              />
              <ImageButton
                imageUrl={cherryblossom}
                onClick={() => changeBackground(cherryblossom)}
              />
            </div>

            <div className="row-selections">
              <ImageButton
                imageUrl={blossomrain}
                onClick={() => changeBackground(blossomrain)}
              />
              <ImageButton
                imageUrl={lofi}
                onClick={() => changeBackground(lofi)}
              />
              <ImageButton
                imageUrl={study1}
                onClick={() => changeBackground(study1)}
              />
            </div>

            <div className="row-selections">

              <ImageButton
                imageUrl={pixelautumn}
                onClick={() => changeBackground(pixelautumn)}
              />

              <ImageButton
                imageUrl={study2}
                onClick={() => changeBackground(study2)}
              />

              <ImageButton
                imageUrl={groundrain}
                onClick={() => changeBackground(groundrain)}
              />

            </div>





            <div className="left-container">
              <button className="bottom-button">
                <label htmlFor="file-upload">Choose File</label>
              </button>
              <input
                id="file-upload"
                type="file"
                onChange={handleUploadImage}
                style={{ display: "none" }}
                accept="image/*"
              />{" "}
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="hubs-miso-container">
            <div className="left-container">
              <label> Miso </label>
            </div>


            <div className="row-selections">
              <ImageButton
                imageUrl={pixelBackground1}
                onClick={() => changeMisoBackground(pixelBackground1)}
              />
              <ImageButton
                imageUrl={pixeBackground2}
                onClick={() => changeMisoBackground(pixeBackground2)}
              />
              <ImageButton
                imageUrl={background3}
                onClick={() => changeMisoBackground(background3)}
              />
            </div>


            <div className="row-selections">
              <ImageButton
                imageUrl={pixel3}
                onClick={() => changeMisoBackground(pixel3)}
              />
              <ImageButton
                imageUrl={pixel4}
                onClick={() => changeMisoBackground(pixel4)}
              />
              <ImageButton
                imageUrl={pixel5}
                onClick={() => changeMisoBackground(pixel5)}
              />
            </div>

            <div className="row-selections">
              <ImageButton
                imageUrl={brownCatWalkGif}
                onClick={() =>
                  setMiso({
                    walk: brownCatWalkGif,
                    sit: brownCatSitGif,
                    attack: brownCatAttackGif,
                  })
                }
              />
              <ImageButton
                imageUrl={blackCatWalkGif}
                onClick={() =>
                  setMiso({
                    walk: blackCatWalkGif,
                    sit: blackCatSitGif,
                    attack: blackCatAttackGif,
                  })
                }
              />
              <ImageButton
                imageUrl={greyCatWalkGif}
                onClick={() =>
                  setMiso({
                    walk: greyCatWalkGif,
                    sit: greyCatSitGif,
                    attack: greyCatAttackGif,
                  })
                }
              />{" "}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default HubsWidget;
