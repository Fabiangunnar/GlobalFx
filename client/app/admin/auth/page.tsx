"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Home.module.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  createStandaloneToast,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import SpinnerPage from "@/components/home/Spinner";
import { login, register, reset } from "@/redux/features/HomeAppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
type Props = {};

const Index = (props: Props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegister, setIsRegister] = useState(true);
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const { userState, errorMessage } = useAppSelector(
    (state) => state.HomeAppSlice
  );
  const { toast } = createStandaloneToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (email || password) {
      setFormData((prev) => ({
        ...prev,
        email: email || prev.email,
        password: password || prev.password,
      }));

      if (isRegister) {
        setIsRegister(false);
      }

      // Auto-submit login if both email and password are provided
      if (email && password) {
        // Use setTimeout to ensure state updates have completed
        setTimeout(() => {
          dispatch(login(formData));
        }, 100);
      }
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        return toast({
          title: "An error occurred.",
          description: "Password do not match.",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top-right",
          variant: "subtle",
        });
      }
      dispatch(register(formData));
    }
    if (!isRegister) {
      dispatch(login(formData));
    }
  };
  const handleClick = () => setShow(!show);
  const handleRegisterState = () => {
    setIsRegister((prev) => !prev);
  };
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (userState.isSuccess) {
      const successState = async () => {
        await router.push("/admin");
        setFormData({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setLoad(false);
        dispatch(reset());
      };
      successState();
    }
    const storedUser = localStorage.getItem("user");
    const data = storedUser ? JSON.parse(storedUser) : null;

    if (userState.isLoading) {
      setLoad(true);
    }

    if (userState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      setLoad(false);
    }

    return () => {};
  }, [
    userState.isError,
    userState.isSuccess,
    dispatch,
    load,
    userState.isLoading,
  ]);

  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltycoonfx trading, globaltycoonfx, login, log in, register, globaltycoonfx admin, admin globaltycoonfx, admin, globaltycoonfx.com, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>

      <main className={`${styles.auth_block} !h-screen`}>
        {load === true && <SpinnerPage />}
        <Card background={"#759c4940"} color={"#fff"}>
          <CardHeader>
            <Text fontWeight={"semibold"} fontSize={24}>
              {isRegister ? "Register a new account" : "Log In to your account"}
            </Text>
          </CardHeader>

          <CardBody className={styles.auth_info}>
            <form action="" onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <FormControl p={2}>
                    <FormLabel fontSize={12}>First Name: </FormLabel>
                    <Input
                      type="text"
                      fontSize={14}
                      required
                      name="firstname"
                      placeholder="Your firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl p={2}>
                    <FormLabel fontSize={12}>Last Name: </FormLabel>
                    <Input
                      type="text"
                      fontSize={14}
                      required
                      name="lastname"
                      placeholder="Your lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              )}
              <FormControl p={2}>
                <FormLabel fontSize={12}>Email: </FormLabel>
                <Input
                  type="email"
                  fontSize={14}
                  required
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl p={2}>
                <FormLabel fontSize={12}>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    fontSize={14}
                    required
                    w="100%"
                    name="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement padding={0} width="3rem">
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
              {isRegister && (
                <FormControl p={2}>
                  <FormLabel fontSize={12}>Confirm Password: </FormLabel>
                  <Input
                    type={show ? "text" : "password"}
                    fontSize={14}
                    required
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </FormControl>
              )}
              <FormControl p={2}>
                <Button
                  fontSize={16}
                  type="submit"
                  w="100%"
                  _hover={{
                    background: "#64d2b1",
                  }}
                  color={"#fff"}
                  background="#55b598"
                >
                  {isRegister ? "Register" : "Log In"}
                </Button>
              </FormControl>
              <FormControl p={2}>
                <Text
                  _hover={{
                    textDecoration: "underline",
                  }}
                  fontSize="sm"
                  cursor={"pointer"}
                  onClick={handleRegisterState}
                >
                  {isRegister ? (
                    <span>
                      Already have an account?{" "}
                      <span style={{ color: "#bdffeb" }}>Login</span>
                    </span>
                  ) : (
                    <span>
                      Don't have an account?{" "}
                      <span style={{ color: "#bdffeb" }}>Register</span>
                    </span>
                  )}
                </Text>
              </FormControl>
            </form>
          </CardBody>
        </Card>
      </main>
    </>
  );
};

export default Index;
