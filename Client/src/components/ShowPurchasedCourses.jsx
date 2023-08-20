import React from "react";
import { fetchPurchasedCourse } from "../axios";
import CourseCard from "./helperComponents/CourseCard";

import { Grid, Typography } from "@mui/material";


function ShowPurchasedCourses() {
    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    const fetchAllCourses = async () => {
        const allCourses = await fetchPurchasedCourse()
        setCourses(allCourses.purchasedCourses)
    }

    React.useEffect(() => {
        fetchAllCourses()
    }, [])

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} mb={2}>
            <Grid item xs={12}>
                <Typography variant='h4'>Purchased Courses</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3}>
                    {courses.map((c, index) => <CourseCard title={c.title} description={c.description} index={index} imageLink={c.imageLink} />)}
                </Grid>
            </Grid>
        </Grid>
    )
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

export default ShowPurchasedCourses;