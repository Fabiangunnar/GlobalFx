import {Box} from "@chakra-ui/react";
import React from "react";

type Props = {};

const BottomWidget = (props: Props) => {
  return (
    <Box
      w={"100vw"}
      h={{
        base: "4rem",
        sm: "4.4rem",
        md: "3.6rem",
        lg: "3rem",
      }}
      overflow={"hidden"}
      position={"fixed"}
      bottom={0}
      left={0}
      zIndex={100}>
      <Box position={"relative"} w={"100vw"}>
        <iframe
          style={{position: "relative", width: "100%"}}
          src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22BTC%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22ETH%2FUSD%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A46%2C%22utm_source%22%3A%22pfi-my.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22pfi-my.com%2F%22%7D"
        />
      </Box>
    </Box>
  );
};

export default BottomWidget;
