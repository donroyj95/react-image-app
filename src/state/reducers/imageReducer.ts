import { ActionType, Action } from "../action-types/types";
import { StateType } from "../state-type";


export const initialState: StateType = {
    selectedCategoryImages: [], resultsImages: [], clearValue: false,
    selectedImages: [], loading: true
};


const imageReducer = (state: StateType = initialState, action: Action) => {



    switch (action.type) {

        case ActionType.FILTER:

            let temporyImageList = state.selectedCategoryImages;
            if (action.payload.name) {
                temporyImageList = temporyImageList.filter(ele =>
                    ele.alt_description.toLowerCase().includes(action.payload.name.toLowerCase()));
                // console.log('filter', temporyImageList);
            }

            if (action.payload.tag) {

                temporyImageList = temporyImageList.filter(ele =>
                    ele.tags.filter(tag =>
                        tag.title.toLowerCase().includes(action.payload.tag.toLowerCase())).length > 0);
                // console.log('tags:', temporyImageList);
            }

            return { ...state, resultsImages: temporyImageList };

        case ActionType.SELECT_IMAGE:

            let temporySelectedList = state.selectedImages;

            state.selectedImages.includes(action.payload) ?
                temporySelectedList = temporySelectedList.filter(element => element.id !== action.payload.id) :
                temporySelectedList.push(action.payload);


            return { ...state, selectedImages: temporySelectedList, }


        case ActionType.CLEAR:
            return { ...state, resultsImages: state.selectedCategoryImages, loading: false };

        case ActionType.CHANGE_CATEGORY:
            return {
                ...state, resultsImages: action.payload, selectedCategoryImages: action.payload,
                loading: false, selectedImages: []
            };

        case ActionType.LOADING:
            return { ...state, loading: true }

        case ActionType.FAIL:
            return { ...state, loading: true }

        default:
            return state

    }

}

export default imageReducer;