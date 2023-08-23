import {atom} from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        loading: true,
        userEmail: null
    }
})