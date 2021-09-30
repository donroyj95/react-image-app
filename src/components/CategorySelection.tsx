import { Category } from '../Category';
import { Dispatch, Action } from "redux";
import { CategoryDropdown } from "./CategoryDropdown";
import React from 'react';





type selectCategory = {
    selectCategory: (type: string) => void
}

export const CategorySelection = React.memo((props: selectCategory): JSX.Element => {
    console.log('inside category');

    return (
        <div>
            <h1 data-testid="category-h1">Select Category</h1>
            <CategoryDropdown selectCategory={props.selectCategory} />
        </div>
    )
})


