import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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

  useSetRecoilState
} from 'recoil';

//mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarCustom from './components/helperComponents/AppBarCustom'
import { Container } from '@mui/material'
import Footer from './components/helperComponents/Footer'
import { loginStatus } from './axios'

import {userState} from './store/atoms/user'
import { userEmailStatus } from './store/selectors/userEmail'
import { useEffect } from 'react'

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


const ProtectedRouteLoginLogout = ({ children }) => {
  const userEmail = useRecoilValue(userEmailStatus)
  if (userEmail) {
      return <Navigate to="/" />;
    }
    return children;
};

const ProtectedRoute = ({ children }) => {
  const userEmail = useRecoilValue(userEmailStatus)
  if (!userEmail) {
      return <Navigate to="/" />;
    }
    return children;
};

// const UnProtectedRoute = ({ children }) => {
//   const user = useRecoilValue(userState);
//     if (user) {
//       return <Navigate to="/" />;
//     }
//     return children;
// };

  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>

        <CssBaseline />
        <Container sx={{}}>
          <Router>
            
            <AppBarCustom />
            <InitUser/>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<ProtectedRouteLoginLogout><Login/></ProtectedRouteLoginLogout>} />
              <Route path="/signup" element={<ProtectedRouteLoginLogout><Register /></ProtectedRouteLoginLogout>} />
              <Route path="/courses" element={<ProtectedRoute><ShowCourses/></ProtectedRoute>} />
              <Route path="/courses/purchased" element={<ProtectedRoute><ShowPurchasedCourses /></ProtectedRoute>} />
              <Route path="/courses/:id" element={<ShowSelectedCourse />} />
            </Routes>
          </Router>
        </Container>
        {/* <Footer /> */}

      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App


const InitUser = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    init()
  }, [])

  const init = async() => {
    try{
      const isUserLoggedIn = await loginStatus();
      console.log(isUserLoggedIn);
      if(isUserLoggedIn?.email){
        setUser({
          loading: false,
          userEmail: isUserLoggedIn?.email
        })
      }else{
        setUser({
          loading: false,
          userEmail: null
        })
      }
    }catch(err){
      setUser({
        loading: false,
        userEmail: null
      })
    }
  }

  return <></>
}
