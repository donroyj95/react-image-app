import { ActionType, Action } from "../action-types/action-types";
import { Dispatch } from "redux";
import { Image } from '../../common-interfaces/index'
import axios from "axios";


const clientId = "Up2AjDWTexG6Qzh1EcgW4EWdRxHCL0quU875jDOpeHY";



export const selectCategory = (type: string) => async (dispatch: Dispatch<Action>) => {

    const url = "https://api.unsplash.com/search/photos?page=2&query=" + type + "&client_id=" + clientId;

    try {
        dispatch({
            type: ActionType.LOADING
        })

        const res = await axios.get(url);
        // console.log(res.data.results);


        dispatch({
            type: ActionType.CHANGE_CATEGORY,
            payload: res.data.results
        })


    } catch (e) {

        dispatch({
            type: ActionType.FAIL
        })
    }
}

export const clearSelections = () => {
    return (dispatch: Dispatch<Action>) => {
        
        
        dispatch({
            type: ActionType.CLEAR,
        })
    }
}

export const selectImage = (image: Image) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SELECT_IMAGE,
            payload: image
        })
    }
}

export const filterNameAndTag = (name: string, tag: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FILTER,
            payload: {
                name: name,
                tag: tag
            }
        })
    }
}

