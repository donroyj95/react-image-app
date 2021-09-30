import React, { useState, useMemo } from 'react';
import Dispatch, { useDispatch, useSelector, } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';
import { Props } from '../common-interfaces/index'
import ResultsList from './ResultsList';
import { CategorySelection } from './CategorySelection';
import { Filter } from './Filter';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 50%;
  margin-left:10px;
  margin-right: 10px;
`;




function SelectionPanel(state: Props): JSX.Element {



  const dispatch = useDispatch();
  const { selectCategory } = useMemo(() => { return bindActionCreators(actionCreators, dispatch) }, [])


  return (
    <FormContainer>

      <CategorySelection selectCategory={selectCategory} />
      <Filter />
      <ResultsList
        loading={state.loading}
        resultsImages={state.resultsImages}
        selectedImages={state.selectedImages}
        selectImage={state.selectImage}
      />
    </FormContainer>
  )
}





export default SelectionPanel;