import {Box} from "@chakra-ui/react";
import React, {useEffect} from "react";
import Swiper from "swiper";

type Props = {};

const AutoPlayCarousel = (props: Props) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      autoplay: {
        delay: 100, // Set the delay between slides in milliseconds
      },
      loop: true, // Enable continuous loop
    });

    return () => {
      swiper.destroy(); // Clean up Swiper instance on unmount
    };
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <Box w={"100%"} h={"20rem"} bg={"grey"}></Box>
        </div>
        <div className="swiper-slide">
          <Box w={"100%"} h={"20rem"} bg={"red"}></Box>
        </div>
        <div className="swiper-slide">
          <Box w={"100%"} h={"20rem"} bg={"yellow"}></Box>
        </div>
      </div>
    </div>
  );
};

export default AutoPlayCarousel;
