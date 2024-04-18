import React from 'react';
import { Card, Typography, Container, Box, Toolbar } from '@mui/material';

const LocatorPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Toolbar /> 
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
        <h2 style={{ marginBottom: '16px' }}>Find HIV/AIDS Services Near You</h2>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Enter your location to discover nearby service options including testing, treatment, and support facilities.
        </Typography>
        <Card variant="outlined" sx={{ p: 2, width: '100%', maxWidth: 600 }}>
          <locator-widget></locator-widget>
        </Card>
      </Box>
    </Container>
  );
};

export default LocatorPage;
