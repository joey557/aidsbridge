import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrandBar from './pages/BrandBar';
import HomePage from './pages/HomePage';
import LocatorPage from './pages/LocatorPage';  

const AppRouter: React.FC = () => {
    return (
        <Router>
            <BrandBar />
            <Routes> 
                <Route path="/" element={<HomePage />} />  // 使用 element 属性，并移除 exact
                <Route path="/find-services" element={<LocatorPage />} />
                {/* 这里可以添加更多的路由 */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
