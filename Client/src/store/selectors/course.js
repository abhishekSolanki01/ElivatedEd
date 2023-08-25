import { courseState } from '../atoms/courses'
import { selector } from 'recoil'

export const isCourseLoadingState = selector({
    key: 'isCourseLoadingState',
    get: ({ get }) => {
        const state = get(courseState);
        return state.isLoading
    }
})

export const courseDetails = selector({
    key: 'courseDetails',
    get: ({ get }) => {
        const state = get(courseState);
        return state.course
    }
})

export const courseTitle = selector({
    key: 'courseTitle',
    get: ({ get }) => {
        const state = get(courseState);
        return state?.course?.title || ""
    }
})

export const courseDescription = selector({
    key: 'courseDescription',
    get: ({ get }) => {
        const state = get(courseState);
        return state?.course?.description || ""
    }
})

export const coursePrice = selector({
    key: 'coursePrice',
    get: ({ get }) => {
        const state = get(courseState);
        return state?.course?.price || ""
    }
})

export const courseImage = selector({
    key: 'courseImage',
    get: ({ get }) => {
        const state = get(courseState);
        return state?.course?.image || ""
    }
})

export const publishedSataus = selector({
    key: 'publishedSataus',
    get: ({ get }) => {
        const state = get(courseState);
        return state?.course?.published || true
    }
})

// export = {
//     isCourseLoadingState,
//     courseDetails,
//     courseTitle,
//     courseDescription,
//     coursePrice,
//     courseImage,
//     publishedSataus
// }