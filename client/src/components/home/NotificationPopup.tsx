import {Box, Card, CardBody, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {FaUser} from "react-icons/fa";
import {IoLogoBitcoin} from "react-icons/io5";

type Props = {};

const NotificationPopup = (props: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showopup, setShowpup] = useState(false);
  const [popupText, setPopupText] = useState({
    id: 20,
    name: "Yusuf",
    location: "Iran",
    earned: 3800,
  });
  const popupOptions = [
    {
      id: 1,
      name: "Vina",
      location: "India",
      earned: 3895,
    },
    {
      id: 2,
      name: "Aiden",
      location: "Australia",
      earned: 3895,
    },
    {
      id: 3,
      name: "John",
      location: "United States",
      earned: 23400,
    },
    {
      id: 4,
      name: "Fekir",
      location: "Turkey",
      earned: 23400,
    },
    {
      id: 5,
      name: "Emma",
      location: "United Kingdom",
      earned: 17800,
    },
    {
      id: 6,
      name: "John",
      location: "United States",
      earned: 24500,
    },
    {
      id: 7,
      name: "Maria",
      location: "Brazil",
      earned: 17600,
    },
    {
      id: 8,
      name: "Ahmed",
      location: "Egypt",
      earned: 9200,
    },
    {
      id: 9,
      name: "Sofia",
      location: "Spain",
      earned: 4050,
    },
    {
      id: 10,
      name: "Hiroshi",
      location: "Japan",
      earned: 19250,
    },
    {
      id: 11,
      name: "Elena",
      location: "Russia",
      earned: 30100,
    },
    {
      id: 12,
      name: "Lucas",
      location: "Australia",
      earned: 17400,
    },
    {
      id: 13,
      name: "Lila",
      location: "France",
      earned: 6210,
    },
    {
      id: 14,
      name: "Mohan",
      location: "India",
      earned: 3350,
    },
    {
      id: 15,
      name: "John",
      location: "United States",
      earned: 5000,
    },
    {
      id: 16,
      name: "Sophia",
      location: "Canada",
      earned: 2500,
    },
    {
      id: 17,
      name: "Luis",
      location: "Mexico",
      earned: 1200,
    },
    {
      id: 18,
      name: "Maria",
      location: "Brazil",
      earned: 8000,
    },
    {
      id: 19,
      name: "Hiroshi",
      location: "Japan",
      earned: 15000,
    },
    {
      id: 20,
      name: "Elena",
      location: "Spain",
      earned: 6000,
    },
    {
      id: 21,
      name: "Mohammed",
      location: "Saudi Arabia",
      earned: 40000,
    },
    {
      id: 22,
      name: "Sofia",
      location: "Sweden",
      earned: 5000,
    },
    {
      id: 23,
      name: "Gustavo",
      location: "Argentina",
      earned: 1800,
    },
    {
      id: 24,
      name: "Oliver",
      location: "Australia",
      earned: 10000,
    },
    {
      id: 25,
      name: "Isabella",
      location: "Italy",
      earned: 7000,
    },
    {
      id: 26,
      name: "Liam",
      location: "United Kingdom",
      earned: 3000,
    },
    {
      id: 27,
      name: "Yuna",
      location: "South Korea",
      earned: 4500,
    },
    {
      id: 28,
      name: "Maja",
      location: "Norway",
      earned: 2000,
    },
    {
      id: 29,
      name: "Lucas",
      location: "France",
      earned: 800,
    },
    {
      id: 30,
      name: "Aisha",
      location: "United Arab Emirates",
      earned: 12000,
    },
    {
      id: 31,
      name: "Miguel",
      location: "Portugal",
      earned: 5500,
    },
    {
      id: 32,
      name: "Emma",
      location: "Germany",
      earned: 9500,
    },
    {
      id: 33,
      name: "Mateo",
      location: "Colombia",
      earned: 3400,
    },
    ,
    {
      id: 34,
      name: "Emma",
      location: "United Kingdom",
      earned: 15000,
    },
    {
      id: 35,
      name: "Hiroshi",
      location: "Japan",
      earned: 1800,
    },
    {
      id: 36,
      name: "Luisa",
      location: "Brazil",
      earned: 8000,
    },
    {
      id: 37,
      name: "Sophie",
      location: "France",
      earned: 1200,
    },
    {
      id: 38,
      name: "Max",
      location: "Germany",
      earned: 35000,
    },
    {
      id: 39,
      name: "Sofia",
      location: "Spain",
      earned: 5000,
    },
    {
      id: 40,
      name: "Muhammad",
      location: "Pakistan",
      earned: 40000,
    },
    {
      id: 41,
      name: "Yuki",
      location: "Japan",
      earned: 2800,
    },
    {
      id: 42,
      name: "Isabella",
      location: "Italy",
      earned: 20000,
    },
    {
      id: 43,
      name: "Khaled",
      location: "Egypt",
      earned: 7000,
    },
    {
      id: 44,
      name: "Chen",
      location: "China",
      earned: 1500,
    },
    {
      id: 45,
      name: "Olivia",
      location: "Australia",
      earned: 30000,
    },
    {
      id: 46,
      name: "Ravi",
      location: "India",
      earned: 2500,
    },
    {
      id: 47,
      name: "Lucas",
      location: "Brazil",
      earned: 13000,
    },
    {
      id: 48,
      name: "Emilia",
      location: "Poland",
      earned: 9000,
    },
    {
      id: 49,
      name: "Maria",
      location: "Mexico",
      earned: 22000,
    },
    {
      id: 50,
      name: "David",
      location: "Australia",
      earned: 3400,
    },
    {
      id: 51,
      name: "Olivia",
      location: "Australia",
      earned: 50000,
    },
    {
      id: 52,
      name: "Sophia",
      location: "United States",
      earned: 10000,
    },
    {
      id: 53,
      name: "Liam",
      location: "Canada",
      earned: 5500,
    },
    {
      id: 54,
      name: "Ella",
      location: "New Zealand",
      earned: 8000,
    },
    {
      id: 55,
      name: "Alexander",
      location: "Sweden",
      earned: 1500,
    },
    {
      id: 56,
      name: "Sophie",
      location: "France",
      earned: 6200,
    },
    {
      id: 57,
      name: "Daniel",
      location: "Germany",
      earned: 3500,
    },
    {
      id: 58,
      name: "Sophia",
      location: "United States",
      earned: 8000,
    },
    {
      id: 59,
      name: "Leo",
      location: "France",
      earned: 6000,
    },
    {
      id: 60,
      name: "Alexander",
      location: "Germany",
      earned: 3000,
    },
    {
      id: 61,
      name: "Chandeep",
      location: "Australia",
      earned: 12000,
    },
    {
      id: 62,
      name: "Emma",
      location: "Italy",
      earned: 5000,
    },
    {
      id: 63,
      name: "Aiden",
      location: "Canada",
      earned: 2200,
    },
    {
      id: 64,
      name: "Olivia",
      location: "Brazil",
      earned: 13000,
    },
    {
      id: 65,
      name: "Lorenzo",
      location: "Mexico",
      earned: 9000,
    },
    {
      id: 65,
      name: "Lawrence",
      location: "Austria",
      earned: 9000,
    },
    {
      id: 67,
      name: "Mia",
      location: "Spain",
      earned: 22000,
    },
    {
      id: 68,
      name: "John",
      location: "United States",
      earned: 5000,
    },
    {
      id: 69,
      name: "Tejada",
      location: "Canada",
      earned: 4200,
    },
    {
      id: 70,
      name: "Punjaab",
      location: "India",
      earned: 4200,
    },
    {
      id: 71,
      name: "Higuain",
      location: "Columbia",
      earned: 127500,
    },
    {
      id: 72,
      name: "Tuotou",
      location: "Morocco",
      earned: 300,
    },
    {
      id: 73,
      name: "Xingang",
      location: "China",
      earned: 2390,
    },
    {
      id: 74,
      name: "Sarutobi",
      location: "Japan",
      earned: 63240,
    },
    {
      id: 75,
      name: "Lee-ying",
      location: "Korea",
      earned: 78020,
    },
    {
      id: 76,
      name: "Maria",
      location: "Spain",
      earned: 22700,
    },
    {
      id: 77,
      name: "Hamie",
      location: "United States",
      earned: 5000,
    },
    {
      id: 78,
      name: "Diana",
      location: "Peurto Rico",
      earned: 4200,
    },
    {
      id: 79,
      name: "Tejada",
      location: "Canada",
      earned: 78062,
    },
    {
      id: 80,
      name: "Arturo",
      location: "Chile",
      earned: 95079,
    },
  ];
  useEffect(() => {
    // Set a timer to toggle the notification popup after a specific time

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // Adjust the time interval as per your requirement
    setShowpup(true);
    setPopupText(getRandomOption(popupOptions));
    // Clean up the timer on component unmount
    setTimeout(() => {
      setShowpup(false);
      clearTimeout(timer);
      setShowPopup(false);
    }, 10000);
  }, [showopup]);

  const getRandomOption = (options: any[]) => {
    const randomIndex = Math.floor(Math.random() * options.length - 1);
    return options[randomIndex];
  };
  return (
    <div style={{zIndex: 10, position: "relative"}}>
      <Box
        right={{
          base: "10%",
          md: "20%",
          lg: "20rem",
        }}
        top={{
          base: "6rem",
          sm: "7rem",
          md: "8rem",
          lg: "10rem",
        }}
        style={{
          zIndex: 1,
        }}
        position={"fixed"}
        className={`notification ${showPopup ? "show" : "hide"}`}
      >
        {popupText?.name && popupText?.location && (
          <Card
            zIndex={40}
            //   bg={ "#162d26" }
            border={"1px solid #2b525a60"}
            bg={"rgba(0, 0, 0, 0.8)"}
            backdropFilter={"blur(6px)"}
            w={"18rem"}
            color={"#fff"}
            style={{
              //   display: showPopup ? "block" : "none",
              transition: "500ms ease",
              opacity: showPopup ? 1 : 0,
              transform: showPopup ? "translateY(0)" : "translateY(-10rem)",
            }}
          >
            <CardBody
              display={"flex"}
              alignContent={"center"}
              gap={2}
              alignItems={"center"}
            >
              <Box fontSize={[38, 40, 48]}>
                <IoLogoBitcoin color="rgba(117, 156, 73, 1)" />{" "}
              </Box>
              <Box>
                <Text fontSize={14} fontWeight={600}>
                  Earnings
                </Text>

                <Text
                  style={{opacity: showPopup ? 1 : 0}}
                  fontSize={{base: "0.7rem", sm: "0.8rem", lg: "0.9rem"}}
                >
                  {popupText?.name} from {popupText?.location} <br /> has just
                  earned $
                  {popupText?.earned.toLocaleString("en-US", {
                    style: "decimal",
                  })}
                </Text>
              </Box>
            </CardBody>
          </Card>
        )}
      </Box>
    </div>
  );
};

export default NotificationPopup;
