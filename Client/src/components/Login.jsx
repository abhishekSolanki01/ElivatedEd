import React from "react";
import { login as loginUser } from "../axios";

import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, Typography, Grid } from "@mui/material";

import { useSetRecoilState, useRecoilState } from 'recoil'
import { userState } from "../recoil";

import img from "../assets/Computer-login-rafiki.svg"


/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user,setUser] = useRecoilState(userState)

    const login = async () => {
        const loginRes = await loginUser({ username: email, password })
        if (loginRes.message = "Logged in successfully") {
            setUser({ loggedIn: true })
        }
    }

    return (

        <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    height: "100vh", display: 'flex',
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
            <Grid item xs={12} md={6} sx={{ height: "100vh", display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
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
                                mt: 3,
                                // position: 'absolute', top: '15%', left: '50%', 
                                width: 70, height: 70,
                                // transform: "translateX(-50%)",
                                textAlign: "center",
                            }}
                        />

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