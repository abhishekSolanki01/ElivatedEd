import React from "react";

import { Grid, Card, Paper, Box, TextField, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { useState } from "react";


const EditCourse = () => {
    const [status,setStatus] = useState('Publish')

    const action = {}

    const handleToggleChange = (event, newAlignment) => {
        setStatus(newAlignment)
        console.log(newAlignment);
    };
    return (
        <Grid container justifyContent="center" spacing={3} mt={1}>
            <Paper
                sx={{
                    height: "auto",
                    width: "100%",
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Box m={2}>
                    <Box
                        m={1}
                        sx={{
                            // width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Title" id="fullWidth" />
                    </Box>
                    <Box
                        m={1}
                        sx={{
                            // width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Description" id="fullWidth" />
                    </Box>
                    <Box
                        m={1}
                        sx={{
                            // width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Image Link" id="fullWidth" />
                    </Box>
                    <Box
                        m={1}
                        sx={{
                            display: 'flex',
                            // width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth type='number' label="Price" id="fullWidth" />
                        <ToggleButtonGroup
                            color="primary"
                            value={status}
                            exclusive
                            onChange={handleToggleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="Publish">Publish</ToggleButton>
                            <ToggleButton value="Unpublish">Unpublish</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box
                        m={1}
                        sx={{
                            // width: 500,
                            // maxWidth: '100%',
                            height : 'auto'
                        }}
                    >
                        <Button size="small" variant="contained" onClick={action.onClick} disabled={action.disabled} >Save</Button>

                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default EditCourse;