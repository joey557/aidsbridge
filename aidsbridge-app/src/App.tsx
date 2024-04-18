// App.tsx
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BrandBar from './pages/BrandBar';
import HomePage from './pages/HomePage';
import AppRouter from './router'; 
function App() {
  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
}

export default App;
