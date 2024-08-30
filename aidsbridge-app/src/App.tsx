// App.tsx

import CssBaseline from "@mui/material/CssBaseline";
// import BrandBar from './pages/BrandBar';
// import HomePage from './pages/HomePage';
import AppRouter from "./router.tsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
