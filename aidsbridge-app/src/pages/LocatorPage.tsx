import React from 'react';
import { Card, CardContent, CardMedia, Typography, Container, Box, Toolbar, Grid } from '@mui/material';
import { getBackgroundStyle } from '../components/BackgroundStyle';
import doctor from '../assets/Doctor.jpg';

const LocatorPage: React.FC = () => {
  const backgroundStyle = getBackgroundStyle(doctor);

  return (
    <>
      <div style={backgroundStyle}>
        <h2>
          You're not alone in this journey <br /> — find local support and services close to you.
        </h2>
      </div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
          <h2 style={{ marginBottom: '16px' }}>Find HIV/AIDS Services Near You</h2>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Enter your location to discover nearby service options including testing, treatment, and support facilities.
          </Typography>

          <Card variant="outlined" sx={{ p: 2, width: '100%', maxWidth: 600, mb: 3 }}>
            <locator-widget></locator-widget>
          </Card>

          {/* Grid container for tip cards */}
          <Grid container spacing={2} justifyContent="center" marginTop="50px">
            {/* Understanding HIV/AIDS */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ width: 250, height: 350, mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/hiv-awareness.jpg"
                  alt="HIV Awareness"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Understanding HIV/AIDS
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    HIV (Human Immunodeficiency Virus) affects your immune system by destroying white blood cells that fight infection. Without treatment, HIV can lead to AIDS (acquired immunodeficiency syndrome).
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Prevention Tips */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ width: 250, height: 350, mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/prevention-tips.jpg"
                  alt="Prevention Tips"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Prevention Tips
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Always use a new, clean needle if you inject drugs, practice safe sex using condoms, and consider PrEP medications if you're at high risk of HIV.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Finding Support */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ width: 250, height: 350, mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/support-groups.jpg"
                  alt="Support Groups"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Finding Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Many communities offer support groups and counselors specifically trained to help with the psychological and emotional aspects of living with HIV/AIDS.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LocatorPage;
