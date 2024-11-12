import React from "react";
import "./styles/LoadingItem.css";
import dynamic from "next/dynamic";
import animationData from "../assets/lottie/loading.json";

const LoadingItem = () => {
  const LottiePlayer = dynamic(() => import("react-lottie-player"), {
    ssr: false,
  });
  return (
    <div id="loadingContainer">
      <div id="loadingBorder">
        <LottiePlayer loop animationData={animationData} play id="lottie" />
        <br />
        <h2 id="loadingTxt">Loading...</h2>
        <p>
          Im using a free plan with render to host the server
          <br />
          so it might take a seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingItem;
