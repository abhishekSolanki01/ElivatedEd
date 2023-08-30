import React from "react";
import { register as registerUser } from "../axios";

//mui
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, Typography, Grid } from "@mui/material";

import { useSetRecoilState } from 'recoil'
import { userState } from "../store/atoms/user";

import img from "../assets/Mobile-login-rafiki.svg"


/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const setUser = useSetRecoilState(userState)


    const register = async () => {
        const registerRes = await registerUser({ username: email, password });
        if (registerRes.message = "User created successfully") {
            setUser({ loading: false, userEmail: registerRes.email})
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

                    <Paper elevation={3} sx={{
                        // display: "flex", 
                        borderRadius: '30px', 
                        // alignItems: 'center',
                        // justifyContent: 'center'
                    }} >

                        <AccountCircle sx={{
                            mt: 3,
                            // position: 'absolute', top: '15%', left: '50%', 
                            width: 70, height: 70, 
                            // transform: "translateX(-50%)",
                            textAlign: "center",
                        }} />

                        <Box sx={{ '& > :not(style)': { m: 4 }, m: 5, height: "auto" }}>
                            <Typography variant="h4">Register to the Site</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField required sx={{ width: 300 }} id="input-with-sx" label="Email" variant="standard" onChange={e => setEmail(e.target.value)} />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField required sx={{ width: 300 }} id="input-with-sx" label="Password" variant="standard" type="password" onChange={e => setPassword(e.target.value)} />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', t: 3 }} t={3}>
                                <Button onClick={register} variant="contained" >Signup</Button>
                            </Box>
                            <Typography variant="h9">Already a user? <a href="/login">Login</a> </Typography>

                        </Box>

                    </Paper>
                </Box>

            </Grid>
        </Grid>




    )
}

export default Register;