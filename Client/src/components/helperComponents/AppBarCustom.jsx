import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { loginStatus, logout } from '../../axios';
import { useEffect } from 'react';

import {
  useSetRecoilState,
  useRecoilState,
  useRecoilValue
} from 'recoil';
import { userState } from '../../store/atoms/user';

import {isUserLoading} from '../../store/selectors/isUserLoading.js'
import {userEmailStatus} from '../../store/selectors/userEmail'

import avatar from '../../assets/avatar.jpg'



const user_pages = [{name:'courses', route: '/courses'}, {name:'purchased', route: '/courses/purchased'}, {name: 'ContactUs', route: "/"}];
const admin_pages = [{name:'courses', route: '/courses'}, {name: 'ContactUs', route: "/"}];


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AppBarCustom() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate()
  const userLoading = useRecoilValue(isUserLoading)
  const userEmail = useRecoilValue(userEmailStatus);
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  const pages = isAdmin ? admin_pages : user_pages



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    navigate(event.currentTarget.value)
    // window.location = event.currentTarget.value
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenu = async(e) => {
    const target = e.currentTarget.getAttribute("name")
    handleCloseUserMenu()
    // console.log(target.toLowerCase());
    if(target.toLowerCase() === 'logout'){
      const logoutRes = await logout()
      if(logoutRes.status){
        localStorage.setItem("isAdmin", false)
        navigate('/')
        setUser({
          loading: false,
          userEmail: null
        })
      }
    }
  }

  if(userLoading){
    return <>Loading...</>
  }else{
    return (
      <AppBar position="sticky" sx={{background: "#121212", paddingLeft:3, paRight: 3 }}>
        {/* <Container maxWidth="xl"> */}
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , color: "#41a5f5"}} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                "&:hover":{color: "#41a5f5"},
                textDecoration: 'none',
              }}
            >
              LEARNit 
            </Typography>
  
            {userEmail && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={(event) => { navigate(event.currentTarget.value) }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={(event) => { navigate(event.currentTarget.value) }}>
                    <Typography textAlign="center" value={page.route}>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Learnit
            </Typography>
            {userEmail && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={(event) => { navigate(event.currentTarget.value) }}
                  sx={{ my: 2, color: 'white', display: 'block', "&:hover, &:active, &:focus" : {color: "#41a5f5", backgroundColor: "transparent", border: "none"} }}
                  value={page.route}
                >
                  {page.name}
                </Button>
              ))}
            </Box>}
            {userEmail && <Typography sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                color: 'inherit',
                textDecoration: 'none',
                "&:hover" : {color: "#41a5f5", backgroundColor: "transparent"} 
              }}>{userEmail}</Typography>}
            {
              userEmail && 
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} name={setting} onClick={handleClickUserMenu}>
                      <Typography name={setting} textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            }
  
          </Toolbar>
        {/* </Container> */}
      </AppBar>
    );
  }

}
export default AppBarCustom;