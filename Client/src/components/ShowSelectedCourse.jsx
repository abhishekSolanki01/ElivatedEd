import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { purchaseCourse, viewCourse } from "../axios";
import EditCourse from "./editCourse";
import CourseCard from "./helperComponents/CourseCard";


function ShowSelectedCourses() {
    const adminUser = true
    const { id: courseId } = useParams()
    console.log(courseId);
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        fetchCourseById()
    }, [])

    const fetchCourseById = async () => {
        const course = await viewCourse(courseId);
        setCourses([course])
    }

    const onPurchaseCourseClick = async (id) => {
        const purchaseCourseRes = await purchaseCourse(id)
    }

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} mb={2}>
            <Grid item xs={12}>
                <Typography variant='h4'>Selected Course Page</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container justifyContent="center" spacing={3}>
                    {courses.map((c, index) =>
                        <CourseCard
                            title={c.title}
                            description={c.description}
                            index={index}
                            imageLink={c.imageLink}
                            actions={[{
                                title: "Buy",
                                onClick: () => { onPurchaseCourseClick(c._id) },
                                variant: "contained"
                            }]}
                        />)}
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <EditCourse/>
            </Grid>
        </Grid>
    )

}

export default ShowSelectedCourses;