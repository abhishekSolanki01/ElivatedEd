import React from "react";
import { fetchPurchasedCourse, purchaseCourse } from "../axios";
import CourseCard from "./helperComponents/CourseCard";
import { useNavigate } from 'react-router-dom';

import { Grid, Typography } from "@mui/material";


function ShowPurchasedCourses() {
    const [courses, setCourses] = React.useState([]);
    const navigate = useNavigate()
    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    const fetchAllCourses = async () => {
        const allCourses = await fetchPurchasedCourse()
        setCourses(allCourses.purchasedCourses)
    }

    React.useEffect(() => {
        fetchAllCourses()
    }, [])

    const onPurchaseCourseClick = async (id) => {
        const purchaseCourseRes = await purchaseCourse(id)
    }

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} mb={2}>
            <Grid item xs={12}>
                <Typography variant='h4'>Purchased Courses</Typography>
            </Grid>
            <Grid item xs={12}>
                {courses && <Grid container justifyContent="center" spacing={3}>
                    {courses.map((c, index) => <CourseCard 
                        onCardClick={() => {navigate(`/courses/${c._id}/?purchased=${true}`)}}
                        title={c.title} 
                        description={c.description} 
                        index={index} 
                        imageLink={c.imageLink} 
                        actions={[]}
                    // [{
                    //     title: "Buy",
                    //     onClick: () => { onPurchaseCourseClick(c._id) },
                    //     variant: "contained"
                    // }]}
                    />)}
                </Grid>}
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