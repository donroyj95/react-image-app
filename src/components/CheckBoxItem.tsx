import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../common-interfaces/index'

const ResultItem = styled.div`
margin:10px;
background: lightblue;
border-radius: 5px;
padding: 5px;
`;

type Prop = {
    item: Image;
    selectImage: (type: Image) => void;
    selectedImages: Image[];
}

export const CheckBoxList = (prop: Prop): JSX.Element => {


    return (
        <ResultItem key={prop.item.id} data-testid="result-field">
            <input
                data-testid = "checkbox_item"
                type="checkbox"
                value={prop.item.id}
                onChange={() => prop.selectImage(prop.item)}
                checked={prop.selectedImages.includes(prop.item) ? true : false} />
            {prop.item.alt_description}

        </ResultItem>
    )
}