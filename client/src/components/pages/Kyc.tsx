import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/pages/User.module.scss";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Text,
  createStandaloneToast,
} from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store";
import { kycVerify, resetSendState } from "@/redux-actions/HomeAppSlice";
import SpinnerPage from "../home/Spinner";

type Props = {};

const KYC = (props: Props) => {
  const [idInput, setIdInput] = useState<any>(null);
  const [poaInput, setPoaInput] = useState<any>(null);
  const [idDocuments, setIdDocuments] = useState<any>(null);
  const [proofOfAddress, setProofOfAddress] = useState<any>(null);
  const [documents, setDocuments] = useState({
    idDocuments: "",
    proofOfAddress: "",
  });
  const [isLoad, setIsLoad] = React.useState(false);
  const { toast } = createStandaloneToast();
  const { userInfo, sendState, errorMessage } = useSelector(
    (state: RootState) => state.HomeAppSlice
  );
  const onDrop = useCallback((acceptedFiles: any) => {
    setIdInput(acceptedFiles[0]);
    acceptedFiles.forEach(async (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      await new Promise<void>((resolve) => {
        reader.onload = () => {
          const binaryStr = reader.result;
          setIdDocuments(binaryStr);
          resolve();
        };
      });
    });
  }, []);
  const onDrop2 = useCallback((acceptedFiles: any) => {
    setPoaInput(acceptedFiles[0]);
    acceptedFiles.forEach(async (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      await new Promise<void>((resolve) => {
        reader.onload = () => {
          const binaryStr = reader.result;
          setProofOfAddress(binaryStr);
          resolve();
        };
      });
    });
  }, []);
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!idInput || !poaInput) {
      console.log("émprt input");
      return toast({
        title: "An error occurred.",
        description: "Input field empty.",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
    }
    dispatch(kycVerify([userInfo?.id, { idDocuments, proofOfAddress }]));
  };

  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success.",
        description: "Documents Sent Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
      setIsLoad(false);
      setIdInput(null);
      setPoaInput(null);
      dispatch(resetSendState());
    }
    if (sendState.isError) {
      toast({
        title: errorMessage.statusCode,
        description: errorMessage.message,
        status: "error",
        duration: 4000,
        variant: "subtle",
        isClosable: true,
        position: "top-right",
      });
      setIsLoad(false);
    }
    if (sendState.isLoading) {
      setIsLoad(true);
    }
  }, [sendState.isError, sendState.isLoading, sendState.isSuccess]);

  return (
    <section className={` ${styles.manage_user_grid}`}>
      {isLoad && <SpinnerPage />}

      <div className={`${styles.user_block} `}>
        <Card w="100%" background={"#759c4930"}>
          <div className={`${styles.management_block}`}>
            <div className={`${styles.management_head}`}>
              <BiMoneyWithdraw />
              <p>KYC Verification</p>
            </div>
            <Box p={4}>
              <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel fontSize={12} color={"#fff"}>
                    Identification Documents (National ID, International
                    Passport etc..)
                  </FormLabel>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      onDrop(acceptedFiles);
                    }}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <Box
                          cursor={"pointer"}
                          borderRadius={8}
                          border={`1px solid #759c49`}
                          _focus={{
                            border: `1px solid #55b598`,
                          }}
                          p={3}
                          {...getRootProps()}>
                          <input {...getInputProps()} type="file" />
                          <Box
                            className={`${styles.input}`}
                            p={3}
                            borderRadius={4}
                            border={`1px dashed #d0ff9c`}>
                            {!idInput ? (
                              <Flex justify={"space-between"} align={"center"}>
                                <Text color={"#cecece"} fontSize={12}>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </Text>
                                <BsUpload color={"#fafafa"} />
                              </Flex>
                            ) : (
                              <Flex justify={"space-between"} align={"center"}>
                                <Text color={"#fafafa"} fontSize={12}>
                                  {idInput.name}
                                </Text>
                                <AiFillEdit color={"#fafafa"} />
                              </Flex>
                            )}
                          </Box>
                        </Box>
                      </section>
                    )}
                  </Dropzone>
                </FormControl>
                <Divider />
                <FormControl>
                  <FormLabel fontSize={12} color={"#fff"}>
                    Proof of address (Bank statement, Any ID with your address
                    on it)
                  </FormLabel>
                  <Dropzone onDrop={(acceptedFiles) => onDrop2(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <Box
                          cursor={"pointer"}
                          borderRadius={8}
                          border={`1px solid #759c49`}
                          _focus={{
                            border: `1px solid #55b598`,
                          }}
                          p={3}
                          {...getRootProps()}>
                          <input {...getInputProps()} type="file" />
                          <Box
                            className={`${styles.input}`}
                            p={3}
                            borderRadius={4}
                            border={`1px dashed #d0ff9c`}>
                            {!poaInput ? (
                              <Flex justify={"space-between"} align={"center"}>
                                <Text color={"#cecece"} fontSize={12}>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </Text>
                                <BsUpload color={"#fafafa"} />
                              </Flex>
                            ) : (
                              <Flex justify={"space-between"} align={"center"}>
                                <Text color={"#fafafa"} fontSize={12}>
                                  {poaInput.name}
                                </Text>
                                <AiFillEdit color={"#fafafa"} />
                              </Flex>
                            )}
                          </Box>
                        </Box>
                      </section>
                    )}
                  </Dropzone>
                </FormControl>
                <FormControl>
                  <Button
                    fontSize={14}
                    type="submit"
                    w="100%"
                    _hover={{
                      background: "#64d2b1",
                    }}
                    color={"#fff"}
                    background="#55b598">
                    Submit Documents
                  </Button>
                </FormControl>
              </form>
            </Box>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default KYC;
