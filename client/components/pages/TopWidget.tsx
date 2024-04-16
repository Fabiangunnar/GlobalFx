import {Box} from "@chakra-ui/react";
import React from "react";

type Props = {};

const TopWidget = (props: Props) => {
  return (
    <Box w={"100vw"} h={"3rem"} position={"relative"} overflow={"hidden"}>
      <Box position={"relative"} zIndex={100} left={0} w={"100vw"}>
        <iframe
          style={{width: "100%"}}
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
        />
      </Box>
    </Box>
  );
};

export default TopWidget;
