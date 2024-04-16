// BrandBar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/web-logo.png';

const BrandBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Performing search for:', searchTerm);
    // TODO: Add search logic here
  };

  return (
    <AppBar position="static" color="default" elevation={0} style={{ alignItems: 'center' }}>
      <Toolbar style={{ justifyContent: 'space-between', width: '80%', maxWidth: '1200px' }}>
        {/* Logo and brand name */}
        <Typography variant="h6" color="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ maxHeight: '40px', marginRight: 8 }} />
          AIDS<span style={{ color: '#E62117' }}>BRIDGE</span>
        </Typography>

        {/* Navigation links */}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Button color="inherit" style={{ margin: '0 20px' }}>ARTICLES</Button>
          <Button color="inherit">EVENTS</Button>
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
      </Toolbar>
    </AppBar>
  );
};

export default BrandBar;
