// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b0bec5',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#90a4ae'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#90a4ae'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#b0bec5'
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#b0bec5'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#b0bec5'
            },
            '&:hover fieldset': {
              borderColor: '#b0bec5'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b0bec5'
            }
          },
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#b0bec5'
          },
        }
      }
    },
  },
});

export default theme;
