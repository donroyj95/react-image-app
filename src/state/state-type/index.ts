import { Image } from '../../common-interfaces/index'

interface ImageState {
    selectedCategoryImages: Image[];
    resultsImages: Image[];
    clearValue: boolean;
    selectedImages: Image[];
    loading: boolean;
}




export type StateType = ImageState;