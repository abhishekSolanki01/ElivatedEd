import {atom} from 'recoil'

export const snackBarState = atom({
    key: 'snackBarState',
    default : {
        isOpen: false,
        message: null,
        type: null,
        triggerOpen: 0,
        showAlert: false, 
        showSnackBar: false 
    }
}) 