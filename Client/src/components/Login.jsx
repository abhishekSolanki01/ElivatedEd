import React from "react";
import { useNavigate } from 'react-router-dom'
import { login as loginUser } from "../axios";

import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, Typography, Grid, Switch, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';


import { useSetRecoilState, useRecoilState } from 'recoil'
import { userState } from "../store/atoms/user";

import img from "../assets/Computer-login-rafiki.svg"
import { useState } from "react";


/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const setUser = useSetRecoilState(userState)
    const [isAdmin, setIsAdmin] = useState(false)

    const login = async () => {
        const loginRes = await loginUser({ username: email, password }, isAdmin)
        if (loginRes.message = "Logged in successfully") {
            setUser({ loading: false, userEmail: loginRes.email })
            navigate('/')
        }
    }

    return (

        <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    height: "90vh", display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Box
                        component="div"
                        // src={gif}
                        sx={{
                            // width: "85%",
                            height: "800px",
                            backgroundImage: `url(${img})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            overflow: 'hidden'

                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ height: "90vh", display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,

                            width: 528,
                            height: 428,
                        },
                    }}
                >

                    <Paper elevation={3}
                        sx={{
                            // display: "flex", 
                            borderRadius: '30px',
                            // alignItems: 'center',
                            // justifyContent: 'center'
                        }}
                    >

                        <AccountCircle
                            sx={{
                                mt: 2,
                                // position: 'absolute', top: '15%', left: '50%', 
                                width: 50, height: 50,
                                // transform: "translateX(-50%)",
                                textAlign: "center",
                            }}
                        />

                        <Box sx={{display: 'flex', alignItem:'center', justifyContent: 'center'}}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography>User</Typography>
                                <Switch inputProps={{ 'aria-label': 'ant design' }} onChange={(e) => { setIsAdmin(true) }} />
                                <Typography>Admin</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ '& > :not(style)': { m: 4, mt: 0 }, m: 0, height: "auto" }}>
                            <Typography variant="h4">Login to the site</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', mt: 0 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField required sx={{ width: 300 }} id="input-with-sx" label="Email" variant="standard" onChange={e => setEmail(e.target.value)} />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField required sx={{ width: 300 }} id="input-with-sx" label="Password" variant="standard" type="password" onChange={e => setPassword(e.target.value)} />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} mb={0}>
                                <Typography variant="h9" gutterBottom={3}>New here? <a href="/signup">Register</a> </Typography>
                                <Button onClick={login} variant="contained" >Login</Button>

                            </Box>
                        </Box>

                    </Paper>
                </Box>
            </Grid>

        </Grid>


    )



}


export default Login;