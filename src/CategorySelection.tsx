import { Category } from './Category';
import { Dispatch, Action } from "redux"
import styled from 'styled-components';


const SelectCategory = styled.select`
    width: 185px;
`;

type selectCategory = {
    selectCategory: (type: string) => void
}

export const CategorySelection = (props: selectCategory) => {
    return (
        <div>
            <h1 data-testid="category-h1">Select Category</h1>
            <label>
                <SelectCategory
                    onChange={(e) => props.selectCategory(e.target.value)}>
                    {Category.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </SelectCategory>
            </label>

        </div>
    )
}


