import { courseState } from '../atoms/courses'
import { selector } from 'recoil'

const isCourseLoadingState = selector({
    key: 'isCourseLoadingState',
    set: ({ set }) => {
        const state = set(courseState);
        return state.isCourseLoading
    }
})

const courseDetails = selector({
    key: 'courseDetails',
    set: ({ set }) => {
        const state = set(courseState);
        return state.course
    }
})

const courseTitle = selector({
    key: 'courseTitle',
    set: ({ set }) => {
        const state = set(courseState);
        return state?.course?.title || ""
    }
})

const courseDescription = selector({
    key: 'courseDescription',
    set: ({ set }) => {
        const state = set(courseState);
        return state?.course?.description || ""
    }
})

const coursePrice = selector({
    key: 'coursePrice',
    set: ({ set }) => {
        const state = set(courseState);
        return state?.course?.price || ""
    }
})

const courseImage = selector({
    key: 'courseImage',
    set: ({ set }) => {
        const state = set(courseState);
        return state?.course?.image || ""
    }
})

eports = {
    isCourseLoadingState,
    courseDetails,
    courseTitle,
    courseDescription,
    coursePrice,
    courseImage,
}