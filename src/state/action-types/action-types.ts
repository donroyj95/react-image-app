
import { Image } from '../../common-interfaces/index'

export enum ActionType {
    CLEAR = "clear",
    CHANGE_CATEGORY = "changeCategory",
    FILTER = "filter",
    SELECT_IMAGE = "selectImage",
    LOADING = 'loading',
    FAIL = 'fail'
}


interface Clear {
    type: ActionType.CLEAR,
}

interface Filter {
    type: ActionType.FILTER,
    payload: {
        name: string,
        tag: string
    }
}

interface ChangeCategory {
    type: ActionType.CHANGE_CATEGORY,
    payload: Image
}

interface SelectImage {
    type: ActionType.SELECT_IMAGE,
    payload: Image
}

interface Loading {
    type: ActionType.LOADING
}

interface Fail {
    type: ActionType.FAIL
}


export type Action = Clear | ChangeCategory | SelectImage | Loading | Fail | Filter;
