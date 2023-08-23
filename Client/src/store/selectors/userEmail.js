import {userState} from "../atoms/user"
import {selector} from "recoil";

export const userEmailStatus = selector({
    key: 'userEmailStatus',
    get: ({get}) => {
        const state = get(userState);
        return state.userEmail
    }
})