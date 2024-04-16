import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    const tidioScript = document.createElement("script");
    tidioScript.src = "//code.tidio.co/your_tidio_code.js";
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return null;
};

export default TidioChat;
