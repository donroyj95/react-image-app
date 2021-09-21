import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { StateType } from './state/state-type';

import SelectionPanel from './SelectionPanel';
import ImagePanel from './ImagePanel';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ImageContainer = styled.div`
  height: 95vh;
  overflow: auto;
  width: 50%;
  margin-top: 20px;
  background-color: lightgray;
`;


function App(): JSX.Element {

  const dispatch = useDispatch();
  const { selectImage } = bindActionCreators(actionCreators, dispatch);
  const state: StateType = useSelector((state: State) => state.image)


  return (
    <Container>

      {<SelectionPanel
        resultsImages={state.resultsImages}
        selectedImages={state.selectedImages}
        loading={state.loading}
        selectImage={selectImage}

      />}
      <ImageContainer>

        {<ImagePanel
          images={state.selectedImages}
          selectImage={selectImage}
        />}

      </ImageContainer>

    </Container>
  );



}


export default App;
