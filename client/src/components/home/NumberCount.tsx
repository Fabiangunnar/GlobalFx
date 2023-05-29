import {motion, useAnimation} from "framer-motion";
import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Text} from "@chakra-ui/react";
type Props = {};

const NumberCount = ({targetNumber, isInView}: any) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isInView && count < targetNumber) {
        setCount((prevCount) => prevCount + 150089);
      }
    }, 1);

    return () => {
      clearInterval(timer);
    };
  }, [count, targetNumber, isInView]);
  return <span>{count}</span>;
};

export default NumberCount;
export const NumberCountTwo = ({targetNumber, isInView}: any) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isInView && count < targetNumber) {
        setCount((prevCount) => prevCount + 1005);
      }
    }, 1);

    return () => {
      clearInterval(timer);
    };
  }, [count, targetNumber, isInView]);
  return <span>{count}</span>;
};
export const NumberCountThree = ({targetNumber, isInView}: any) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isInView && count < targetNumber) {
        setCount((prevCount) => prevCount + 1050089);
      }
    }, 1);

    return () => {
      clearInterval(timer);
    };
  }, [count, targetNumber, isInView]);
  return <span>{count}</span>;
};
