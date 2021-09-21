import React, { useState } from 'react';
import styled from 'styled-components';
import { Image, Props } from './common-interfaces/index'

const ResultsContainer = styled.div`
    border-style: solid;
    border-width: 1px;
    height: 30vh;
    overflow: auto;   
`;

const ResultItem = styled.div`
    margin:10px;
    background: lightblue;
    border-radius: 5px;
    padding: 5px;
`;


const ResultsList: React.FC<Props> = ({ loading, resultsImages, selectedImages, selectImage }) => {

    // console.log(resultsImages, selectedImages);


    return (
        <>
            <h1 data-testid="results-h1">Results</h1>
            <ResultsContainer>

                {loading ? <h3>Select a category</h3> : resultsImages.map((item: Image) => {
                    return (
                        <ResultItem key={item.id}>
                            <input
                                type="checkbox"
                                value={item.id}
                                onChange={() => selectImage(item)}
                                checked={selectedImages.includes(item) ? true : false} />
                            {item.alt_description}

                        </ResultItem>
                    )
                })
                }
            </ResultsContainer>
        </>

    )
}

export default ResultsList;