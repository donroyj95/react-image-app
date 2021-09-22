import styled from 'styled-components';
import { Category } from '../Category';

const SelectCategory = styled.select`
width: 185px;
`;

type Props = {
    selectCategory:(type:string)=>void;
}

export const CategoryDropdown = (props:Props) : JSX.Element => {
    return (
        <label>
            <SelectCategory data-testid="dropdown"
                onChange={(e) => props.selectCategory(e.target.value)}>
                {Category.map((item, index) => {
                    return (
                        <option data-testid = 'select-option' key={index} value={item}>{item}</option>
                    )
                })}
            </SelectCategory>
        </label>
    )
}