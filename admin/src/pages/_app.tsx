import type { AppProps } from "next/app";
import { store } from "../redux-store/store";
import { Provider } from "react-redux";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer } = createStandaloneToast();
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider
        toastOptions={{ defaultOptions: { position: "top-right" } }}>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}
