import { Category } from '../Category';
import { Dispatch, Action } from "redux";
import {CategoryDropdown} from "./CategoryDropdown";





type selectCategory = {
    selectCategory: (type: string) => void
}

export const CategorySelection = (props: selectCategory):JSX.Element => {
    return (
        <div>
            <h1 data-testid="category-h1">Select Category</h1>
            <CategoryDropdown selectCategory={props.selectCategory}/>
        </div>
    )
}


