import "@/styles/globals.scss";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css/sea-green";
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import store from "../redux-store/store";
import {Provider} from "react-redux";
const {ToastContainer} = createStandaloneToast();

export default function App({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider toastOptions={{defaultOptions: {position: "top-right"}}}>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}
