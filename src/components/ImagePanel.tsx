import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../common-interfaces/index'

const CloseButton = styled.button`
        width: 30px;
    `;

const ImageContainer = styled.img`
    margin:auto;
`;

const ImageSection = styled.section`
    margin: 2rem 0;
    display: grid;
    gap: 2rem;
`;

type Props = {
    images: Image[];
    selectImage: (photo: Image) => void;
}

const ImagePanel = React.memo((props: Props) => {

    const selectImage = props.selectImage;
    console.log('props', props.images);

    const images = props.images;



    return (
        <section>
            {images.map((photo: Image) => {
                return (
                    <ImageSection key={photo.id} >
                        <CloseButton onClick={() => selectImage(photo)}>X</CloseButton>
                        <ImageContainer src={photo.urls.small} alt=''></ImageContainer>
                    </ImageSection>
                )
            })}
        </section>
    )
})

export default ImagePanel;