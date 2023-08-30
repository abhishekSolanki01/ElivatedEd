import React, { useState } from "react";

import { Grid, Card, Paper, Box, TextField, ToggleButtonGroup, ToggleButton, Button, Typography, ListItem, ListItemText, List } from '@mui/material';
import { courseState } from "../store/atoms/courses";

import { useRecoilState } from 'recoil'

import { useParams } from "react-router-dom";

import {
    isCourseLoadingState,
    // courseDetails,
    courseTitle,
    courseDescription,
    coursePrice,
    courseImage,
    publishedSataus
} from "../store/selectors/course"
import { useEffect } from "react";
import { editCourse } from "../axios";


const CourseDetails = () => {
    const { id: courseId } = useParams()

    const [courseDetail, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetail?.course?.title)
    const [description, setDescription] = useState(courseDetail?.course?.description)
    const [imageLink, setImageLink] = useState(courseDetail?.course?.imageLink)
    const [price, setPrice] = useState(courseDetail?.course?.price)
    const [published, setPublish] = useState(courseDetail?.course?.published)


    useEffect(() => {
        setTitle(courseDetail.course?.title)
        setDescription(courseDetail.course?.description)
        setImageLink(courseDetail.course?.imageLink)
        setPrice(courseDetail.course?.price)
        setPublish(courseDetail.course?.published)
    }, [courseDetail])


    const onSave = async() => {
        const editCourseRes = await editCourse(courseId, {title,
            description,
            price,
            imageLink,
            published
        })
        setCourse({
            loading: false,
            course: {
                title,
                description,
                price,
                imageLink,
                published
            }
        })
    }

    // if(!formData){
    //     debugger
    //     return <></>
    // }

    function generate(element) {
        console.log(courseDetail)
        
        return courseDetail?.course?.summary && courseDetail.course.summary.map((value) =>
        (<ListItem>
            <Box sx={{backgroundColor: "#41a5f5", width: 10, height: 10, mr: 2, borderRadius: 50 }}></Box>
            <ListItemText
                primary={value}
                // secondary={false ? 'Secondary text' : null}
            />
        </ListItem>)
        );
      }

    return (
        <Grid container justifyContent="center" spacing={3} mt={1}>
            <Paper
                sx={{
                    height: "auto",
                    width: "100%",
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
                }}
            >
                {courseDetail && <Box m={2}>
                    <Box>
                    <Grid item xs={12} md={12}>
                    <Typography sx={{ mt: 4, mb: 2, textAlign: "left" , ml:2, color: "#41a5f5"}} variant="h6" component="div">
                        What you will learn
                    </Typography>
                    <Box style={{border: "1px solid #41a5f5", width: 300, marginBottom: 30, marginLeft: 15 }}/>

                        <List>
                            {generate()}
                        </List>
                    </Grid>
                    </Box>
                </Box>}
            </Paper>
        </Grid>
    )
}

export default CourseDetails;