import { Image } from '../../common-interfaces/index'

export interface ImageState {
    selectedCategoryImages: Image[];
    resultsImages: Image[];
    clearValue: boolean;
    selectedImages: Image[];
    loading: boolean;
}


// const initialState={
//     selectedCategoryImages: [], resultsImages: [], clearValue: false,
//     selectedImages: [], loading: true
// };

// export type StateType2  = typeof initialState;

export type StateType = ImageState;

