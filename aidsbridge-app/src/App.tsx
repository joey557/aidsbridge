// App.tsx
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BrandBar from './pages/BrandBar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <CssBaseline />
      <BrandBar />
      <HomePage />
    </>
  );
}

export default App;
