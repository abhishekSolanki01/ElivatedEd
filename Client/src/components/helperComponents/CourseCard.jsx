import React from "react";

import { Grid, Card, Paper, Box, CardActionArea } from '@mui/material';
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
    actions,
    onCardClick
}) {

    console.log(description,
        title,
        index,
        imageLink,
        actions,
        onCardClick);

    return (
        <Grid key={index} item>
            <Paper
                sx={{
                    height: 340,
                    width: 300,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <CardActionArea onClick={onCardClick}>
                    <Card sx={{ maxWidth: 345, height: "inherit" }}>
                        <CardMedia
                            sx={{ height: `${actions?.length>0 ? "145px" : "180px"}` }}
                            image={imageLink}
                            title="courseImage"
                        />
                        <CardContent sx={{ height: 150 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                sx={{
                                    height: 80,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}>
                                {description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            {actions && actions.length > 0 &&
                                <Box >
                                    {
                                        actions.map((action, index) =>
                                            <Button size="small" variant={action.variant || "text"} onClick={action.onClick}  disabled ={action.disabled} >{action.title}</Button>
                                        )
                                    }
                                </Box>
                            }
                        </CardActions>
                    </Card>
                </CardActionArea>

            </Paper>
        </Grid>
    )
}