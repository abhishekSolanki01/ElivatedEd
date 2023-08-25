import React, { useState } from "react";

import { Grid, Card, Paper, Box, TextField, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
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
                {courseDetail && <Box m={2}>
                    <Box m={1} sx={{ maxWidth: '100%', }}>
                        <TextField disabled fullWidth  label="Title" id="fullWidth" defaultValue={title|| ""} value={title || ""} onChange={(e, value) => { setTitle(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ maxWidth: '100%'}}>
                        <TextField disabled fullWidth label="Description" id="fullWidth" defaultValue={description || ""} value={description || ""} onChange={(e, value) => { setDescription(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ maxWidth: '100%', }}>
                        <TextField disabled fullWidth label="Image Link" id="fullWidth" defaultValue={imageLink || ""} value={imageLink || ""} onChange={(e, value) => { setImageLink(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ display: 'flex', maxWidth: '100%' }}>
                        <TextField disabled fullWidth type='number' label="Price" id="fullWidth" defaultValue={price || ""} value={price || ""} onChange={(e, value) => { setPrice(e.target.value) }} />
                        <ToggleButtonGroup
                        disabled
                            color="primary"
                            defaultValue={published ? "Publish" : "Unpublish"}
                            value={published ? "Publish" : "Unpublish"}
                            exclusive
                            onChange={(e)=>{setPublish(e.target.value === "Publish")}}
                            aria-label="Platform"
                        >
                            <ToggleButton value="Publish">Publish</ToggleButton>
                            <ToggleButton value="Unpublish">Unpublish</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    {/* <Box m={1} sx={{ height: 'auto' }} >
                        <Button size="small" variant="contained" onClick={onSave}>Save</Button>
                    </Box> */}
                </Box>}
            </Paper>
        </Grid>
    )
}

export default CourseDetails;