'use client'
import './globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#299D91',
    },
  },
  typography: {
    h1: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: '40px',
      fontWeight: '500'
    }
  }
});

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  )
}
