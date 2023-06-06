import {resetNav, resetCurrentPage} from "@/redux-actions/navSlice";
import Image from "next/image";
import styles from "@/styles/pages/User.module.scss";
import {
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
  ModalBody,
  ModalContent,
  Flex,
  Box,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
  InputRightElement,
  createStandaloneToast,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  BsCamera,
  BsFillTelephonePlusFill,
  BsUpload,
  BsEyeSlashFill,
  BsEyeFill,
} from "react-icons/bs";
import Dropzone from "react-dropzone";
import {AiFillEdit} from "react-icons/ai";
import {CiMail} from "react-icons/ci";
import {
  logout,
  resetSendState,
  setUserInfo,
  updateAccount,
  updatePhoneNumber,
  updateProfile,
} from "@/redux-actions/HomeAppSlice";
import {RootState} from "@/redux-store/store";
import SpinnerPage from "../home/Spinner";
interface ModalProps {
  overlay: any;
  isOpen: boolean;
  onClose: () => void;
  img?: string;
}
export default function ModalPage({overlay, isOpen, onClose}: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"80%"}
        >
          <ModalHeader
            fontFamily={"inherit"}
            borderBottom={`1px solid #d0ff9c`}
            fontSize={18}
            color={"#fff"}
            textAlign={"center"}
          >
            Confirm Logout?
          </ModalHeader>

          <ModalBody textAlign={"center"}>
            <Text fontSize={14}>
              Click proceed to logout and be redirected to the{" "}
              <strong style={{color: "#ffd700", textTransform: "uppercase"}}>
                GLOBAL TYCOON FX
              </strong>{" "}
              Home page
            </Text>
          </ModalBody>
          <ModalFooter pt={0}>
            <Button
              fontSize={14}
              p={1}
              w="100%"
              _hover={{
                background: "#64d2b1",
              }}
              color={"#fff"}
              background="tomato"
              onClick={async () => {
                await router.push("/");
                await dispatch(logout());
                dispatch(resetNav());
                dispatch(resetCurrentPage());
                dispatch(setUserInfo(null));
              }}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export function WithdrawMessageModal({overlay, isOpen, onClose}: any) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"80%"}
        >
          <ModalHeader
            fontFamily={"inherit"}
            borderBottom={`1px solid #d0ff9c`}
            fontSize={18}
            color={"#fff"}
            textAlign={"center"}
          >
            Withdraw Successful
          </ModalHeader>

          <ModalBody textAlign={"center"} pb={8}>
            <Text fontSize={14}>
              Your withdrawal is pending! your active robotic signal your trade
              section exceeded limit. Contact your account manager for
              further information.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export function ProfileImageModal({overlay, isOpen, onClose, img}: ModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          overflow={"hidden"}
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"100%"}
          // height={'20rem'}
        >
          <Image width={500} height={500} src={`${img}`} alt={"image here"} />
        </ModalContent>
      </Modal>
    </>
  );
}
export function ProfilePictureChangeModal({
  overlay,
  isOpen,
  onClose,
}: ModalProps) {
  const [isInput, setIsInput] = useState<any>(null);
  const [isLoad, setIsLoad] = React.useState(false);
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const dispatch = useDispatch();
  const {userInfo, sendState, errorMessage} = useSelector(
    (state: RootState) => state.HomeAppSlice
  );
  const {toast} = createStandaloneToast();
  const acceptedFileTypes: any = ["image/png", "image/svg+xml", "image/jpeg"];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(
      updateProfile([
        userInfo?.id,
        {picture: profileInfo, pictureInfo: isInput},
      ])
    );
    setIsInput(null);
    onClose();
  };
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach(async (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      await new Promise<void>((resolve) => {
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          setProfileInfo(binaryStr);
          resolve();
        };
      });
    });
    setIsInput(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success.",
        description: "Profile picture updated",
        status: "success",
        duration: 2000,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
      setIsLoad(false);
    }
    if (sendState.isError) {
      toast({
        title: errorMessage.statusCode,
        description: errorMessage.message,
        status: "error",
        duration: 2000,
        variant: "subtle",
        isClosable: true,
        position: "top-right",
      });
      setIsLoad(false);
    }
    if (sendState.isLoading) {
      setIsLoad(true);
    }

    dispatch(resetSendState());
  }, [sendState.isError, sendState.isLoading, sendState.isSuccess]);
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"80%"}
        >
          <ModalHeader
            fontFamily={"inherit"}
            borderBottom={`1px solid #d0ff9c`}
            fontSize={18}
            color={"#fff"}
            textAlign={"center"}
          >
            {isLoad && <SpinnerPage />}
            <Flex
              gap={2}
              align={"center"}
              className={`${styles.management_head}`}
            >
              <BsCamera fontSize={24} /> <p>Profile</p>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Dropzone
                accept={acceptedFileTypes.join(",") as any}
                onDrop={(e) => onDrop(e)}
              >
                {({getRootProps, getInputProps}) => (
                  <Flex direction={"column"} gap={4} paddingBottom={2}>
                    <FormControl>
                      <FormLabel fontSize={18} color={"#fff"}>
                        Upload New Profile Picture
                      </FormLabel>
                      <Box
                        cursor={"pointer"}
                        borderRadius={8}
                        border={`2px solid #759c49`}
                        _focus={{
                          border: `1px solid #55b598`,
                        }}
                        p={3}
                        {...getRootProps()}
                      >
                        <input
                          accept="image/*"
                          {...getInputProps()}
                          type="file"
                        />
                        <Box
                          className={`${styles.input}`}
                          p={3}
                          borderRadius={4}
                          border={`2px dashed #d0ff9c`}
                        >
                          {!isInput ? (
                            <Flex justify={"space-between"} align={"center"}>
                              <Text color={"#cecece"} fontSize={12}>
                                Drag 'n' drop image here, or click to select
                                image
                              </Text>
                              <BsUpload color={"#fafafa"} />
                            </Flex>
                          ) : (
                            <Flex justify={"space-between"} align={"center"}>
                              <Text color={"#fafafa"} fontSize={12}>
                                {isInput.name}
                              </Text>
                              <AiFillEdit color={"#fafafa"} />
                            </Flex>
                          )}
                        </Box>
                      </Box>
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
                        background="#55b598"
                      >
                        Upload
                      </Button>
                    </FormControl>
                  </Flex>
                )}
              </Dropzone>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export function EditPhoneInfoModal({overlay, isOpen, onClose}: ModalProps) {
  const [isInput, setIsInput] = useState<any>(null);
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: RootState) => state.HomeAppSlice);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updatePhoneNumber([userInfo?.id, {phoneNumber: isInput}]));
  };
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"80%"}
        >
          <ModalHeader
            fontFamily={"inherit"}
            borderBottom={`1px solid #d0ff9c`}
            fontSize={18}
            color={"#fff"}
            textAlign={"center"}
          >
            <Flex
              gap={2}
              align={"center"}
              className={`${styles.management_head}`}
            >
              <AiFillEdit fontSize={24} /> <p>Edit Information</p>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex gap={4} direction={"column"}>
                <Flex gap={1} direction={"column"}>
                  <Text fontSize={14}>Update Phone Number </Text>

                  <FormControl p={2}>
                    <Text mb="8px" fontSize={11}>
                      Phone Number:{" "}
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BsFillTelephonePlusFill color="gray.300" />}
                      />
                      <Input
                        type="tel"
                        className={`${styles.input}`}
                        fontSize={12}
                        required
                        placeholder="Phone number"
                        _placeholder={{opacity: 1, color: "gray.300"}}
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Divider />
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter pt={0}>
            <Button
              fontSize={14}
              p={1}
              w="100%"
              _hover={{
                background: "#64d2b1",
              }}
              color={"#fff"}
              colorScheme="messenger"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export function EditEmailInfoModal({overlay, isOpen, onClose}: ModalProps) {
  const [isInput, setIsInput] = useState<any>(null);
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: RootState) => state.HomeAppSlice);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateAccount([userInfo?.id, isInput]));
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"80%"}
        >
          <ModalHeader
            fontFamily={"inherit"}
            borderBottom={`1px solid #d0ff9c`}
            fontSize={18}
            color={"#fff"}
            textAlign={"center"}
          >
            <Flex
              gap={2}
              align={"center"}
              className={`${styles.management_head}`}
            >
              <AiFillEdit fontSize={24} /> <p>Edit Information</p>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex gap={4} direction={"column"}>
                <Flex gap={1} direction={"column"}>
                  <Text fontSize={14}>Update Email Address </Text>

                  <FormControl p={2}>
                    <Text mb="8px" fontSize={11}>
                      Email Address:{" "}
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CiMail color="gray.300" />}
                      />
                      <Input
                        type="email"
                        className={`${styles.input}`}
                        fontSize={12}
                        name="tell"
                        required
                        placeholder="Email address"
                        _placeholder={{opacity: 1, color: "gray.300"}}
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Divider />
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter pt={0}>
            <Button
              fontSize={14}
              p={1}
              w="100%"
              _hover={{
                background: "#64d2b1",
              }}
              color={"#fff"}
              colorScheme="messenger"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export function EditPasswordInfoModal({overlay, isOpen, onClose}: ModalProps) {
  const [isInput, setIsInput] = useState<any>(null);
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: RootState) => state.HomeAppSlice);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateAccount([userInfo?.id, isInput]));
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          borderRadius={16}
          background={"#759c4990"}
          color={"#fff"}
          width={"80%"}
        >
          <ModalHeader
            fontFamily={"inherit"}
            borderBottom={`1px solid #d0ff9c`}
            fontSize={18}
            color={"#fff"}
            textAlign={"center"}
          >
            <Flex
              gap={2}
              align={"center"}
              className={`${styles.management_head}`}
            >
              <AiFillEdit fontSize={24} /> <p>Edit Information</p>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex gap={4} direction={"column"}>
                <Flex gap={1} direction={"column"}>
                  <Text fontSize={14}>Update Password </Text>
                  <FormControl p={2}>
                    <Text mb={1} fontSize={11}>
                      Old Password:{" "}
                    </Text>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        className={`${styles.input}`}
                        fontSize={12}
                        required
                        placeholder="Phone number"
                        _placeholder={{opacity: 1, color: "gray.300"}}
                      />
                      <InputRightElement padding={0} width="4.5rem">
                        <Button
                          h="100%"
                          w="100%"
                          bg={"transparent"}
                          _hover={{
                            color: "#FFF",
                            background: "#ffffff30",
                          }}
                          onClick={handleClick}
                        >
                          {show ? (
                            <BsEyeSlashFill fontSize={18} />
                          ) : (
                            <BsEyeFill fontSize={18} />
                          )}
                        </Button>{" "}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl p={2}>
                    <Text mb={1} fontSize={11}>
                      New Password:{" "}
                    </Text>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        className={`${styles.input}`}
                        fontSize={12}
                        required
                        placeholder="New password"
                        _placeholder={{opacity: 1, color: "gray.300"}}
                      />
                      <InputRightElement padding={0} width="4.5rem">
                        <Button
                          h="100%"
                          w="100%"
                          bg={"transparent"}
                          _hover={{
                            color: "#FFF",
                            background: "#ffffff30",
                          }}
                          onClick={handleClick}
                        >
                          {show ? (
                            <BsEyeSlashFill fontSize={18} />
                          ) : (
                            <BsEyeFill fontSize={18} />
                          )}
                        </Button>{" "}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl p={2}>
                    <Text mb={1} fontSize={11}>
                      Confirm New Password:{" "}
                    </Text>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        className={`${styles.input}`}
                        fontSize={12}
                        required
                        placeholder="Confirm new password"
                        _placeholder={{opacity: 1, color: "gray.300"}}
                      />
                      <InputRightElement padding={0} width="4.5rem">
                        <Button
                          h="100%"
                          w="100%"
                          bg={"transparent"}
                          _hover={{
                            color: "#FFF",
                            background: "#ffffff30",
                          }}
                          onClick={handleClick}
                        >
                          {show ? (
                            <BsEyeSlashFill fontSize={18} />
                          ) : (
                            <BsEyeFill fontSize={18} />
                          )}
                        </Button>{" "}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Divider />
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter pt={0}>
            <Button
              fontSize={14}
              p={1}
              w="100%"
              _hover={{
                background: "#64d2b1",
              }}
              color={"#fff"}
              colorScheme="messenger"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
