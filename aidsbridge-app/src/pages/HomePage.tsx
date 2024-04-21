import React from "react";
import smileImage from "../assets/smile-people.jpg";
import HomePageArticle from "../components/homepage-article";
import Statistic from "../components/react-countup";
import { Box } from "@mui/material";
import { getBackgroundStyle } from "../components/BackgroundStyle";



const HomePage: React.FC = () => {
  

  const videoSrc = "https://youtube.com/embed/12vTnXekJu8";
  // const backgroundImageUrl =smileImage;
  const backgroundStyle = getBackgroundStyle(smileImage);

  return (
    <>
      <div style={backgroundStyle}>
        <h1>
          To protect everyone’s health, <br /> protect everyone’s rights{" "}
        </h1>
      </div>
      <Box textAlign="center" marginTop="80px">
        <h2>AIDS BY THE NUMBERS</h2>
        <p>See the latest data on HIV.</p>
      </Box>
      <Box
        maxWidth="80%"
        margin="0 auto"
        padding="20px"
        display={"flex"}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Statistic
          endValue={1.3}
          decimals={1}
          duration={2.75}
          label="MILLION"
          description="people were newly infected with HIV in 2022"
        />
        <Statistic
          endValue={39}
          decimals={0}
          duration={2.75}
          label="MILLION"
          description="people were living with HIV in 2022"
        />
        <Statistic
          endValue={630}
          decimals={0}
          duration={2.75}
          label="THOUSAND"
          description="people died of AIDS-related illnesses in 2022"
        />
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <iframe
          width="560"
          height="315"
          src={videoSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div style={{ width: '40%', padding: '0 20px' }}>
          <p>
            Learning the basics about HIV can keep you healthy and prevent HIV
            transmission. You can also download materials to share or watch
            videos on basic information about HIV.
          </p>
        </div>
      </div>

      <HomePageArticle />
    </>
  );
};
export default HomePage;
