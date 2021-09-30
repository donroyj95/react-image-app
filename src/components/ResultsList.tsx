import React, { useState } from 'react';
import styled from 'styled-components';
import { Image, Props } from '../common-interfaces/index';
import { CheckBoxList as CheckBoxItem } from './CheckBoxItem';

const ResultsContainer = styled.div`
    border-style: solid;
    border-width: 1px;
    height: 30vh;
    overflow: auto;   
`;




const ResultsList: React.FC<Props> = ({ loading, resultsImages, selectedImages, selectImage }) => {

    // console.log(resultsImages, selectedImages);
    return (
        <>
            <h1 data-testid="results-h1">Results</h1>
            <ResultsContainer data-testid="results-container" id="results-container">

                {loading ? <h3 data-testid="loading-heading">Select a category</h3> : resultsImages.map((item: Image) => {
                    return (

                        <CheckBoxItem key={item.id} item={item} selectImage={selectImage} selectedImages={selectedImages} />
                    )
                })
                }
            </ResultsContainer>
        </>

    )
}

export default React.memo(ResultsList);