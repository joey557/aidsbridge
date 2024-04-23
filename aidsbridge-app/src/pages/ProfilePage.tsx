import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Box, Tab, Tabs, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, clearAccount } from "../store/account-slice";
import image from "../assets/profile.jpg";

import { getAllArticles } from "../store/articles-slice";
import ArticlesPanel from "../components/UserArticlesPanel";

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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  //console.log('User:', user);
  const dispatch = useDispatch();

  const aidsArticles = useSelector(getAllArticles());
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const updateCredentials = async (accountId: string | undefined) => {
    //console.log('New credentials are set to:', newUsername, newPassword);
    try {
      const response = await fetch(
        `http://localhost:3000/aidsbridge/user/update/${accountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: newUsername,
            newPassword: newPassword,
          }),
        }
      );
      if (response.ok) {
        console.log("Credentials updated successfully");
        logout();
      } else {
        console.error("Failed to update credentials");
      }
    } catch (error) {
      console.error("Error updating credentials:", error);
    }
  };

  const logout = () => {
    dispatch(clearAccount());
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",

            minHeight: "100vh",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "100%",
            paddingTop: "200px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Welcome {user?.userName}</h1>
          </div>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              height: 300,
              marginLeft: "250px",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
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
                value={newUsername !== null ? newUsername : user?.userName}
                onChange={handleUsernameChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={handlePasswordChange}
                type="password"
                margin="normal"
              />
              <Button
                onClick={() => updateCredentials(user?.accountId)}
                variant="contained"
                sx={{ width: "100%" }}
              >
                Update Credentials
              </Button>
              <Box sx={{ mt: 2, width: "100%" }}>
                <Button
                  onClick={logout}
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Logout
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ArticlesPanel articles={aidsArticles} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
