export {}
import App from '../App';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from '../state/index';
import { StateType } from "../state/state-type";
import { createStore, applyMiddleware } from "redux";
import reducers from "../state/reducers";
import thunk from "redux-thunk"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';


// test('test',()=>{
//     expect(true).toBe(true);
// })

describe('component test',()=>{

    const initialState: StateType = {
        selectedCategoryImages: [], resultsImages: [], clearValue: false,
        selectedImages: [], loading: true
    };

   
    
    
    let container: HTMLDivElement;

    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk)
    )

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Provider store={store}>
            <App />
          </Provider>,container);
    })

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
    })

    it('Render correctly',()=>{
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(2);
        expect(inputs[0].name).toBe('name');
        expect(inputs[0].type).toBe('text');
        expect(inputs[0].value).toBe('name');

        expect(inputs[1].name).toBe('tag');
        expect(inputs[1].type).toBe('text');
    })
})