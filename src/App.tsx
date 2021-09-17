import React, { useState } from 'react';
import { Category } from './Category';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { StateType } from './state/state-type';
import { Image } from './common-interfaces/index'


function App() {

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const { selectCategory, clearSelections, selectImage, filterNameAndTag } = bindActionCreators(actionCreators, dispatch);
  const state: StateType = useSelector((state: State) => state.image)

  // console.log('selected images', state.selectedImages);


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
    <div className="container">
      <div className='form-container'>
        <form>
          <h1>Select Category</h1>
          <label>
            <select
              className="select-category"
              onChange={(e) => selectCategory(e.target.value)}>
              {Category.map((item,index) => {
                return (
                  <option key={index} value={item}>{item}</option>
                )
              })}
            </select>
          </label><br />
          <h1>Filter</h1>
          <label>Name</label>
          <br />
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
          <label>Tag</label>
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
          <br /><br />
          <h1>Results</h1><br />

          <div className="result-container">
            {state.loading ? <h3>Select a category</h3> : state.resultsImages.map((item: Image) => {
              return (

                <div className="resultItem" key={item.id}>
                  <input
                    type="checkbox"
                    value={item.id}
                    onChange={() => selectImage(item)}
                    checked={state.selectedImages.includes(item) ? true : false} />
                  {item.alt_description}

                </div>
              )
            })}
          </div>
        </form>
      </div>

      <div className="image-container">

        {<ImageList
          images={state.selectedImages}
          selectImage={selectImage}
        />}

      </div>

    </div>
  );



}




const ImageList = React.memo((props: any) => {

  const selectImage = props.selectImage;
  console.log('props', props.images);

  const images = props.images;

  return (
    <section>
      {images.map((photo: Image) => {
        return (
          <section key={photo.id} className='products'>
            <button className="close-button" onClick={() => selectImage(photo)}>X</button>
            <img className="image" src={photo.urls.small} alt=''></img>
          </section>
        )
      })}
    </section>
  )
})




export default App;
