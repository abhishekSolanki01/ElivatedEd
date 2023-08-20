import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './components/Landing'
import ShowCourses from './components/ShowCourses'
import ShowPurchasedCourses from './components/ShowPurchasedCourses'
import ShowSelectedCourse from './components/ShowSelectedCourse'
import Login from './components/Login'
import Register from './components/Register'

//recoil
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

//mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarCustom from './components/helperComponents/AppBarCustom'
import { Container } from '@mui/material'
import Footer from './components/helperComponents/Footer'
import { loginStatus } from './axios'
import { userState } from './recoil'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})


function App() {


const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userState)
  if (!user) {
      return <Navigate to="/" />;
    }
    return children;
};

const UnProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userState);
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
};

  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>

        <CssBaseline />
        <Container sx={{}}>
          <Router>
            <AppBarCustom />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<UnProtectedRoute><Login/></UnProtectedRoute>} />
              <Route path="/signup" element={<UnProtectedRoute><Register /></UnProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><ShowCourses /></ProtectedRoute>} />
              <Route path="/courses/purchased" element={<ProtectedRoute><ShowPurchasedCourses /></ProtectedRoute>} />
              <Route path="/courses/:id" element={<ProtectedRoute><ShowSelectedCourse /></ProtectedRoute>} />
            </Routes>
          </Router>
        </Container>
        <Footer />

      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
