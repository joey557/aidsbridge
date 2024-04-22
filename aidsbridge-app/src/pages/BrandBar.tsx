// BrandBar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/web-logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/account-slice';
import { getAllArticles, getArticleByTitle } from '../store/articles-slice';
import { Article } from '../models/article';
import { useSelector } from 'react-redux';
import { AppState } from '../store';



const BrandBar: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const articles = useSelector(getAllArticles());
  const user = useSelector(selectCurrentUser);

  const handleSearch = () => {
    console.log('Performing search for:', searchTerm);
    console.log('All articles:', articles);
    // TODO: Add search logic here
  };



  const handleFindServices = () => {
    navigate('/find-services');
  };

  const handleArticlesPage = () => {
    navigate('/articles');
  }

  const handleEventsPage = () => {
    navigate('/events');
  }

  const handleAccountClick = () => {
    if (user != null) {
      navigate('/profile');  // Navigate to profile page if logged in
    } else {
      navigate('/login');    // Navigate to login page if not logged in
    }
  };

  return (
    <AppBar position="fixed" color="default" elevation={0} style={{ alignItems: 'center' }}>
      <Toolbar style={{ justifyContent: 'space-between', width: '90%', maxWidth: '1200px' }}>
        {/* Logo and brand name */}
        <Typography variant="h6" color="inherit" noWrap >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Logo" style={{ maxHeight: '40px', marginRight: 8 }} />
            AIDS<span style={{ color: '#E62117' }}>BRIDGE</span>
          </Link>
        </Typography>

        {/* Navigation links */}

        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Button color="inherit" style={{ margin: '0 20px' }} onClick={handleArticlesPage}>{t('appbar.articles.label')}</Button>
          <Button color="inherit" style={{ marginRight: '20px'}} onClick={handleEventsPage}>{t('appbar.events.label')}</Button>
          <Button color="inherit" onClick={handleFindServices}>{t('appbar.events.findservice')}</Button>
          
        </div>

        {/* Search input and icon */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            style={{ marginRight: 8 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
        {/* Account icon */}
        <div style={{ display: 'flex', marginLeft: '40px' }}>
          <IconButton color="inherit" onClick={handleAccountClick}>
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BrandBar;
