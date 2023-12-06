import React from "react";

interface ImageButtonProps {
    imageUrl: string,
    onClick: () => void;
}


const ImageButton: React.FC<ImageButtonProps> = ({imageUrl, onClick}) => {
    console.log(imageUrl); // This should be a string, not an object

    //width and height can be adjustable here
    //pass in imageUrl into src 
    let style = {
        height:50,
        width: 50,
    };


    return (
        <>
        <button className="image-button" onClick={onClick}>
        <img className="hubs-img" src={`${imageUrl}`} style={style} alt=""/>        
        </button>

        </>
    )

}

export default ImageButton;