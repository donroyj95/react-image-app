import { StateType } from "../state/state-type";
import { Image } from '../common-interfaces/index';
import { ActionType, Action } from "../state/action-types/action-types";
import imageReducer, { initialState } from '../state/reducers/imageReducer'

const imageList: Image[] = [
    {
        id: "WBpr_yH0Frg", alt_description: "assorted petaled flowers centerpiece inside room",
        urls: { small: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxMXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "flower" }, { title: "flora" }, { title: 'centerpiece' }]
    },
    {
        id: "RPmWEtZLh7U", alt_description: "bunch of sunflowers",
        urls: { small: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxM3x8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "sunflower" }]
    },
    {
        id: "7SXNxz8UIw4", alt_description: "selective focus photography of red petaled flower",
        urls: { small: "https://images.unsplash.com/photo-1505129013025-ecf8f0168373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxNXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "flower" }]
    }
];

describe('Test reducers', () => {




    it('should return initial state', () => {

        expect(imageReducer(initialState, {})).toEqual(
            {
                selectedCategoryImages: [],
                resultsImages: [],
                clearValue: false,
                selectedImages: [],
                loading: true
            })
    })

    it('should return correct filtered objects as resultsImages when filter name given', () => {

        const filterInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(filterInitialObject, {
            type: ActionType.FILTER,
            payload: {
                name: "flowers",
                tag: ""
            }
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: [imageList[0], imageList[1]],
            clearValue: false,
            selectedImages: [],
            loading: false
        })
    })




    it('should return correct filtered objects as resultsImages when filter tag given', () => {

        const filterInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(filterInitialObject, {
            type: ActionType.FILTER,
            payload: {
                name: "",
                tag: "sunflower"
            }
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: [imageList[1]],
            clearValue: false,
            selectedImages: [],
            loading: false
        })
    })





    it('should selected image add to selectedImage list', () => {

        const selectImageInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(selectImageInitialObject, {
            type: ActionType.SELECT_IMAGE,
            payload: imageList[1]
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: [],
            clearValue: false,
            selectedImages: [imageList[1]],
            loading: false
        })

    })




    it('should set initial image list into resultImage list when action type is CLEAR', () => {

        const selectImageInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(selectImageInitialObject, {
            type: ActionType.CLEAR
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: imageList,
            clearValue: false,
            selectedImages: [],
            loading: false
        })

    })




    it('should set selectedCategoryImages & resultsImages to new category images when action type is CHANGE_CATEGORY', () => {

        const selectImageInitialObject: StateType = {
            selectedCategoryImages: [], resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(selectImageInitialObject, {
            type: ActionType.CHANGE_CATEGORY,
            payload: imageList
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: imageList,
            clearValue: false,
            selectedImages: [],
            loading: false
        })

    })




    it('should return loading true when  action type fails', () => {

        expect(imageReducer(initialState, { type: ActionType.FAIL })).toEqual(
            {
                selectedCategoryImages: [],
                resultsImages: [],
                clearValue: false,
                selectedImages: [],
                loading: true
            })
    })



})