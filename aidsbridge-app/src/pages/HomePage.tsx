import React from 'react';
import smileImage from  '../assets/smile-people.jpg';
import HomePageArticle from '../components/homepage-article';
import Statistic from '../components/react-countup';
import { Box } from '@mui/material';



const HomePage: React.FC = () => {
    const backgroundStyle = {
        backgroundImage: `url(${smileImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center 15%',
        backgroundRepeat:'no-repeat',
        height: '70vh',  
        width: '100vw', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        color: 'white',
        fontSize: '2rem', 
        marginBottom: '100px',

    };
    return(
        <>
            <div style={backgroundStyle}>
                <h1>To protect everyone’s health, <br /> protect everyone’s rights </h1>
            </div>
            <Box textAlign = "center">
                <h2>AIDS BY THE NUMBERS</h2>
                <p>See the latest data on HIV.</p>
            </Box>
            <Box maxWidth="80%" margin="0 auto" padding="20px" display={'flex'} flexDirection='row' justifyContent="space-between" alignItems="center">
                <Statistic endValue={1.3} decimals={1} duration={2.75} label="MILLION" description="people were newly infected with HIV in 2022" />
                <Statistic endValue={39} decimals={0} duration={2.75} label="MILLION" description="people were living with HIV in 2022" />
                <Statistic endValue={630} decimals={0} duration={2.75} label="THOUSAND" description="people died of AIDS-related illnesses in 2022" />
            </Box>

            <HomePageArticle />
        </>
    );
};
export default HomePage;
