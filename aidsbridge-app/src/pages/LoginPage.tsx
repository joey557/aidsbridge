import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  Link,
  Tabs,
  Tab,
} from "@mui/material";
import loginImage from "../assets/login.jpg";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const LoginPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/profile");
    userLogin(userName, password);
    // Navigate to profile page on successful login assumption
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/profile"); // Assume registration is successful and navigate
  };

  const userLogin = async (userName: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/aidsbridge/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Login successful");
      } else {
        console.log("Failed to login");
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
            <h2>Healing, Supporting, Advancing</h2>
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
                onChange={(e) => setUserName(e.target.value)}
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
                Login
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
                onChange={(e) => setUserName(e.target.value)}
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
                Register
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
