import React from "react";

import { Grid, Card, Paper, Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CourseCard({
    description,
    title,
    index,
    imageLink,
    actions
}) {

    return (
        <Grid key={index} item>
            <Paper
                sx={{
                    height: 340,
                    width: 300,
                    // backgroundColor: (theme) =>
                    //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={imageLink}
                        title="courseImage"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                    {actions && actions.length > 0 &&
                        <Box>
                            {
                                actions.map((action, index) =>
                                    <Button size="small" variant={action.variant || "text"} onClick={action.onClick}>{action.title}</Button>
                                )
                            }
                        </Box>
                    }
                    </CardActions>
                </Card>
            </Paper>
        </Grid>
    )
}