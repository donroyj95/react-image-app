export interface Image {
    id: string;
    urls: { small: string };
    tags: Array<{title:string}>;
    alt_description: string;

}

export interface Props {
    resultsImages: Image[];

    selectedImages: Image[];
    loading: boolean;
    selectImage: (image: Image) => void;
}