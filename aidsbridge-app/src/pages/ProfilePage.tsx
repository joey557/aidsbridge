
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import image from '../assets/profile.jpg'
import { selectCurrentUser, clearAccount } from '../store/account-slice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAccount());
    console.log('Logged out', user);
  }

  return (
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
        <h1>Welcome {user?.userName}</h1>

        <Box
          sx={{ flexGrow: 1, display: 'flex', marginLeft: '200px', height: 300 }}
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
            <button onClick={logout}>logout</button>
          </Tabs>
          <TabPanel value={value} index={0}>Item One</TabPanel>
          <TabPanel value={value} index={1}>Item Two</TabPanel>
          <TabPanel value={value} index={2}>Item Three</TabPanel>
        </Box>
      </div>
    </div>
  );
}

