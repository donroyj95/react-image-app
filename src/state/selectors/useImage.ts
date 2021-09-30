import { useSelector } from "react-redux";
import { State } from "../reducers";


export const useImage = () => {

    return useSelector((state: State) => state.image);

};