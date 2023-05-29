import React from "react";
import { useEffect, useState } from "react";
import atob from "atob";
type Props = {};

const PdfViewer = ({ base64PDF }: any) => {
  const [pdfURL, setPDFURL] = useState("");
  const base64Data = base64PDF.split(",")[1];
  //   console.log(base64PDF, pdfURL);
  useEffect(() => {
    const decodedPDF = atob(base64Data);
    const blob = new Blob([decodedPDF], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    setPDFURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [base64Data]);
  return <iframe src={pdfURL} width="100%" height="600px"></iframe>;
};

export default PdfViewer;
