import React, { useState, useMemo } from 'react';

import Dispatch, { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';
import { StateType } from '../state/state-type';
import { Image, Props } from '../common-interfaces/index'
import ResultsList from './ResultsList';
import { CategorySelection } from './CategorySelection';


export const Filter: React.FC<{}> = React.memo(() => {
    console.log('inside filter');


    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const dispatch = useDispatch();
    const { clearSelections, filterNameAndTag } = useMemo(() => { return bindActionCreators(actionCreators, dispatch) }, []);;

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
        <div data-testid="filter-component">
            <h1 data-testid="filter-h1">Filter</h1>
            <label data-testid="name-label">Name</label><br />
            <input
                data-testid="name-input"
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
                data-testid="tag-input"
                type="text"
                name="tag"
                id="tag"
                placeholder="Enter Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <br /><br />
            <button data-testid="filter" name="filter" onClick={(e) => filterHandler(e)}>Filter</button>
            <button data-testid="clear" name="clear" onClick={(e) => clearHandler(e)}>Clear</button>
        </div>
    )
}
)

