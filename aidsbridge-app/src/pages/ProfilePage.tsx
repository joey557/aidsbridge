import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import React, { useState } from 'react';
import { Box, Tab, Tabs, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import image from '../assets/profile.jpg'
import { selectCurrentUser, clearAccount } from '../store/account-slice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');//要改的




  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAccount());
    console.log('Logged out', user);
    navigate('/');
  }
  
//还没实现的
  // const handlePasswordChange = (event) => {
  //   setNewPassword(event.target.value);
  // };

  // const updatePassword = () => {
  //   console.log('New password is set to:', newPassword);
  //   // Add your logic to update the password here
  // };


  

  return (
  <ThemeProvider theme={theme}>
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
    }}>
      {/* Background div */}
      <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }} />
      {/* Content div */}
      <div style={{

        position: 'relative',
        height: '100%',
        paddingTop: '200px'  // Adjusted from marginTop to paddingTop
      }}>
        <div style={{textAlign:'center'}}>
          <h1>Welcome {user?.userName}</h1>
          
        </div>
        

        <Box
          sx={{ flexGrow: 1, display: 'flex', marginLeft:'250px', height: 300 }}
        >

          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Personal Profile" {...a11yProps(0)} />
            <Tab label="My Articles" {...a11yProps(1)} />
            <Tab label="My Events" {...a11yProps(2)} />
            
          </Tabs>
          <TabPanel value={value} index={0}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={user?.userName || ''}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              value={newPassword}
              
              type="password"
              margin="normal"
            />
            <Box sx={{ width: '100%', mt: 2 }}>
              <Button variant="contained" sx={{ width: '100%' }}>
                Change Password
              </Button>
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
                <Button onClick={logout} variant="contained" sx={{ width: '100%' }}>
                  Logout
                </Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>Item Two</TabPanel>
          <TabPanel value={value} index={2}>Item Three</TabPanel>
        </Box>
      </div>
    </div>
  </ThemeProvider>
  );
}

