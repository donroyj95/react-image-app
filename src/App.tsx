import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { StateType } from './state/state-type';

import SelectionPanel from './components/SelectionPanel';
import ImagePanel from './components/ImagePanel';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Image } from './common-interfaces/index'
import { Category } from './Category';
import axios from 'axios';
import { useImage } from './state/selectors/useImage';


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

interface ImageSet {
  category: string,
  imageList: Image[]
}


const App = (): JSX.Element => {

  const dispatch = useDispatch();
  const { selectImage } = bindActionCreators(actionCreators, dispatch);
  const state = useImage();
  const id = 1;
  const { data, error, isError, isLoading } = useQuery(['posts', id], fetchImages)
  console.log('render');


  return (
    <Container>

      <SelectionPanel
        resultsImages={state.resultsImages}
        selectedImages={state.selectedImages}
        loading={state.loading}
        selectImage={selectImage}
      />
      <ImageContainer>

        {<ImagePanel
          images={state.selectedImages}
          selectImage={selectImage}
        />}

      </ImageContainer>

    </Container>
  );



}


async function fetchImages(): Promise<ImageSet[]> {
  let imageSet: ImageSet[] = [];

  Category.forEach(async (item) => {

    const url = "https://api.unsplash.com/search/photos?page=2&query=" + item + "&client_id=Up2AjDWTexG6Qzh1EcgW4EWdRxHCL0quU875jDOpeHY";
    const res = await axios.get(url);
    imageSet.push({ category: item, imageList: res.data.results });
  })
  // console.log('inside query', imageSet);

  return imageSet;
}


export default App;
