import React, { useState } from "react";

import { Grid, Card, Paper, Box, TextField, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { courseState } from "../store/atoms/courses";

import { useRecoilState, useSetRecoilState } from 'recoil'

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
import CustomSnackBar from "./helperComponents/CustomSnackBar";
import { snackBarState } from "../store/atoms/snackBar";


const EditCourse = () => {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

    const setSnackBarDetails = useSetRecoilState(snackBarState)

    const { id: courseId } = useParams()

    const [courseDetail, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetail?.course?.title)
    const [description, setDescription] = useState(courseDetail?.course?.description)
    const [imageLink, setImageLink] = useState(courseDetail?.course?.imageLink)
    const [price, setPrice] = useState(courseDetail?.course?.price)
    const [published, setPublish] = useState(courseDetail?.course?.published)
    const [summary, setSummary] = useState(courseDetail?.course?.summary)

    useEffect(() => {
        setTitle(courseDetail.course?.title)
        setDescription(courseDetail.course?.description)
        setImageLink(courseDetail.course?.imageLink)
        setPrice(courseDetail.course?.price)
        setPublish(courseDetail.course?.published)
        setSummary(courseDetail.course?.summary)
    }, [courseDetail])


    const onSave = async() => {
        try{
            const editCourseRes = await editCourse(courseId, {title,
                description,
                price,
                imageLink,
                published,
                summary
            })
            if(editCourseRes.message === "Course updated successfully" ){
                setSnackBarDetails({
                    type: "success",
                    isOpen: true,
                    message: editCourseRes.message,
                    showSnackBar: true, 
                    triggerOpen: new Date().getTime,
                })
            }else{
                setSnackBarDetails({
                    type: "error",
                    isOpen: true,
                    message: editCourseRes.message
                }) 
            }
            setCourse({
                loading: false,
                course: {
                    title,
                    description,
                    price,
                    imageLink,
                    published,
                    summary
                }
            })

        }catch(e){
            setSnackBarDetails({
                type: "error",
                isOpen: true,
                message: e?.message,
                showSnackBar: true, 
                triggerOpen: new Date().getTime,
            }) 
        }
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
                <Box m={2}>
                    <Box m={1} sx={{ maxWidth: '100%', }}>
                        <TextField fullWidth label="Title" id="fullWidth" defaultValue={title} value={title || ""} onChange={(e, value) => { setTitle(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ maxWidth: '100%', }}>
                        <TextField fullWidth label="Description" id="fullWidth" defaultValue={description} value={description || ""} onChange={(e, value) => { setDescription(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ maxWidth: '100%', }}>
                        <TextField fullWidth label="Image Link" id="fullWidth" defaultValue={imageLink} value={imageLink || ""} onChange={(e, value) => { setImageLink(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ display: 'flex', maxWidth: '100%' }}>
                        <TextField fullWidth type='number' label="Price" id="fullWidth" defaultValue={price} value={price || ""} onChange={(e, value) => { setPrice(e.target.value) }} />
                        <ToggleButtonGroup
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
                    <Box m={1} sx={{ maxWidth: '100%', }}>
                        <TextField multiline rows={6} fullWidth label="Summary" id="fullWidth" defaultValue={summary} value={summary || ""} onChange={(e, value) => { setSummary(e.target.value) }} />
                    </Box>
                    <Box m={1} sx={{ height: 'auto' }} >
                        <Button size="small" variant="contained" onClick={onSave}>Save</Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default EditCourse;