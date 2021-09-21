import React, { useState } from 'react';

import Dispatch, { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { StateType } from './state/state-type';
import { Image, Props } from './common-interfaces/index'
import ResultsList from './ResultsList';
import { CategorySelection } from './CategorySelection';


export const Filter: React.FC<{}> = () => {

    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const dispatch = useDispatch();
    const { clearSelections, filterNameAndTag } = bindActionCreators(actionCreators, dispatch);

    const filterHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (name || tag) {
            filterNameAndTag(name, tag);
        }
    }

    const clearHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setName('');
        setTag('');
        clearSelections();
    }


    return (
        <div>
            <h1 data-testid="filter-h1">Filter</h1>
            <label data-testid="name-label">Name</label><br />
            <input
                data-test="name"
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br /><br />
            <label data-testid="tag-label">Tag</label>
            <br />
            <input
                type="text"
                name="tag"
                placeholder="Enter Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <br /><br />
            <button onClick={(e) => filterHandler(e)}>Filter</button>
            <button onClick={(e) => clearHandler(e)}>Clear</button>
        </div>
    )
}


