import React from 'react';
import smileImage from  '../assets/smile-people.jpg';
import HomePageArticle from '../components/homepage-article';




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

    };
    return(
        <>
            <div style={backgroundStyle}>
                <h1>To protect everyone’s health, <br /> protect everyone’s rights </h1>
            </div>
            <HomePageArticle />
        </>
    );
};
export default HomePage;
