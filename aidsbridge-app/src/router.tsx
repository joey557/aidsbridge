import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrandBar from './pages/BrandBar';
import HomePage from './pages/HomePage';
import LocatorPage from './pages/LocatorPage';  
import LoginPage from './pages/LoginPage';

import ProfilePage from './pages/ProfilePage';



const AppRouter: React.FC = () => {
    return (
        <Router>
            <BrandBar />
            <Routes> 
                <Route path="/" element={<HomePage />} />  
                <Route path="/find-services" element={<LocatorPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/login" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
