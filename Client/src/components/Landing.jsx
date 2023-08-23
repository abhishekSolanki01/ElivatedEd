
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil'
import img from "../assets/Thesis-rafiki-detailed.svg"

import { fetchPurchasedCourse, purchaseCourse, viewAllCourses } from "../axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CourseCard from "./helperComponents/CourseCard";
import { userState } from "../store/atoms/user";
import {userEmailStatus} from '../store/selectors/userEmail'

function Landing() {
    const navigate = useNavigate()
    const user = useRecoilValue(userEmailStatus)

    return <>

        <Container>
            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item sm={4} xs={12}>
                    <Box sx={{
                        height: "100vh", display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            // justifyContent: 'space-around'
                        }}>
                            <Typography variant="h1">Simplify Learning, Amplify Growth</Typography>
                            {!user && <Stack spacing={2} mt={6} direction="row" alignItems="center" justifyContent="center">
                                <Button variant="contained" onClick={() => { navigate('/login') }} >Login</Button>
                                <Button variant="outlined" onClick={() => { navigate('/signup') }}  >Signup</Button>
                            </Stack>}

                        </Box>

                    </Box>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Box sx={{
                        height: "100vh", display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Box
                            component="div"
                            // src={gif}
                            sx={{
                                // width: "85%",
                                height: "800px",
                                backgroundImage: `url(${img})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                overflow: 'hidden'
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={12}>
                    <Box sx={{ height: "fit-content" }} mb={3}>
                        <Typography variant="h5">Learn at Your Own Pace," "Guided by Industry Experts," "Interactive & Rich Content.</Typography>
                        <Stack spacing={2} mt={6} direction="row" alignItems="center" justifyContent="center">

                            <Courses/>

                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </>
}

const Courses = () => {
    const [courses, setCourses] = React.useState([]);
    const user = useRecoilValue(userEmailStatus)
    const navigate = useNavigate()


    const onPurchaseCourseClick = async (id) => {
        const purchaseCourseRes = await purchaseCourse(id)
    }

    const fetchAllCourses = async () => {
        const allCourses = await viewAllCourses()
        setCourses(allCourses.courses)
    }

    React.useEffect(() => {
        fetchAllCourses()
    }, [])
    
    return (
        <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
                {courses.map((c, index) => {
                    let actions = [{
                        title: "Buy",
                        onClick: () => { onPurchaseCourseClick(c._id) },
                        variant: "contained",
                        disabled: c.purchased
                    }]
                    if (!user) {
                        actions = []
                    }
                    return (
                        <CourseCard
                            title={c.title}
                            description={c.description}
                            index={index}
                            imageLink={c.imageLink}
                            actions={actions}
                            onCardClick={() => {navigate(`/courses/${c._id}`)}}
                        />
                    )
                }
                )}
            </Grid>
        </Grid>

    )
}

export default Landing;