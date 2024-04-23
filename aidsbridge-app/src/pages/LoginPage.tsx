import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Box, Tabs, Tab } from "@mui/material";
import loginImage from "../assets/login.jpg";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { useAuth } from "../context/AuthContext";
import { setAccount } from "../store/account-slice";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
// import { fetchUser } from "../store/user-slice";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { AppDispatch } from "../store";
// import { AppState } from "../store";
// import { useSelector } from "react-redux";

//login page design
const LoginPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [tabValue, setTabValue] = useState(0);
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

  // const { userName } = useSelector((state: AppState) => state.user);
  // console.log(userName);

  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();

  //generate short id for user
  function generateShortID() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return timestamp + random;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // If sucessful

  //   navigate('/profile');
  // };
  //handle the registering process 
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const id = generateShortID();
    userRegister(`user${id}`, userName, password);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/aidsbridge/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: userName, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        dispatch(setAccount(userData));
        login(); // update login state
        navigate("/profile"); // Navigate after successful login
        console.log("Login successful");
      } else {
        console.log("Failed to login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userRegister = async (
    userName: string,
    accountId: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        "http://localhost:3000/aidsbridge/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, accountId, password }),
        }
      );
      if (response.ok) {
        console.log("Registration successful");
        navigate("/"); // Navigate after successful registration
      } else {
        console.log("Failed to register");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ height: "100vh", display: "flex", alignItems: "center", pt: 8 }}
      >
        <Box
          sx={{
            p: 5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box textAlign="center" sx={{ width: "100%" }}>
            <h2>{t('login.header')}</h2>
          </Box>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {tabValue === 0 && (
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="UserName"
                name="userName"
                autoComplete="userName"
                autoFocus
                value={userName}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('login.login.button')}
              </Button>
            </Box>
          )}
          {tabValue === 1 && (
            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="UserName"
                name="userName"
                autoComplete="userName"
                autoFocus
                value={userName}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('login.register.button')}
              </Button>
            </Box>
          )}
        </Box>
        <Box
          component="img"
          sx={{
            flexShrink: 0,
            objectFit: "cover",
            width: "50%",
            display: { xs: "none", sm: "block" },
          }}
          alt="Login image"
          src={loginImage}
        />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
