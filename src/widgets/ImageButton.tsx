import React from "react";

interface ImageButtonProps {
    imageUrl: string
    onClick: () => void;
}


const ImageButton: React.FC<ImageButtonProps> = (imageUrl, handleOnClick) => {

    //width and height can be adjustable here
    //pass in imageUrl into src 
    let style = {
        height:50,
        src: {imageUrl},
    };


    return (
        <>
        <button className="image-button">
            <img className="hubs-img" style={style} onClick={handleOnClick} />
        </button>

        </>
    )

}

export default ImageButton;