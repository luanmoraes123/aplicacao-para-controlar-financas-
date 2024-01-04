'use client'
import './globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#299D91',
    },
    background: {
      default: '#f4f5f7'
    }
  },
  typography: {
    h1: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: '2.5rem',
      fontWeight: '500'
    },
    h2: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'black'
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
