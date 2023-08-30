import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { purchaseCourse, viewCourse } from "../axios";
import { courseDetails } from "../store/selectors/course";
import EditCourse from "./editCourse";
import CourseCard from "./helperComponents/CourseCard";
import {useRecoilState} from 'recoil';
import { courseState } from "../store/atoms/courses";
import { useEffect } from "react";
import CourseDetails from './CourseDetails'

function ShowSelectedCourses() {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const [searchParams, setSearchParams] = useSearchParams();
    const isPurchased = JSON.parse(searchParams.get('purchased'))
    const { id: courseId } = useParams()
    const [courseDetail, setCourse] = useRecoilState(courseState);

    React.useEffect(() => {
        fetchCourseById()
    }, [])

    const fetchCourseById = async () => {
        const course = await viewCourse(courseId);
        if(!course){
            setCourse({
                loading: false,
                course: null
            })
        }else{
            setCourse({
                loading: false,
                course
            })
        }

    }

    useEffect(()=>{console.log("courseDetail",courseDetail);}, [courseDetail])

    const onPurchaseCourseClick = async (id) => {
        const purchaseCourseRes = await purchaseCourse(id)
    }

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    if(courseDetail.loading){
        return <></>
    }

    const action = isPurchased || JSON.parse(localStorage.getItem('isAdmin')) ? [] : [{
        title: "Buy",
        onClick: () => { onPurchaseCourseClick(courseDetail.course._id) },
        variant: "contained"
    }]

    console.log(isPurchased);

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} mb={2}>
            <Grid item xs={12}>
                {/* <Typography variant='h4'>Selected Course Page</Typography> */}
            </Grid>
            <Grid item xs={12} md={4} mt={1}>
                <Grid container justifyContent="center" spacing={3}>
                    {/* {courses.map((c, index) => */}
                    {courseDetail && courseDetail.course && <CourseCard
                        title={courseDetail.course.title}
                        description={courseDetail.course.description}
                        index={1}
                        imageLink={courseDetail.course.imageLink}
                        actions={action}
                    />}
                        {/* )} */}
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                {isAdmin ?
                    <EditCourse/>
                    :
                    <CourseDetails/>
                }
            </Grid>
        </Grid>
    )

}

export default ShowSelectedCourses;