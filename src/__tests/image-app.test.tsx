export {}
import App from '../App';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import { StateType } from "../state/state-type";
import { createStore, applyMiddleware } from "redux";
import reducers from "../state/reducers";
import thunk from "redux-thunk"
import {render,screen,cleanup} from '@testing-library/react' 
import {store} from '../state'
import '@testing-library/jest-dom'




test('test',()=>{
    render(<Provider store={store}>
        <App />
      </Provider>);

    const category_h1 = screen.getByTestId('category-h1');
    expect(category_h1).toBeInTheDocument();
    expect(category_h1).toHaveTextContent('Select Category')


    const filter_h1 = screen.getByTestId('filter-h1');
    expect(filter_h1).toBeInTheDocument();
    expect(filter_h1).toHaveTextContent('Filter');

    const name_label = screen.getByTestId('name-label');
    expect(name_label).toBeInTheDocument();
    expect(name_label).toHaveTextContent('Name');

    const tag_label = screen.getByTestId('tag-label');
    expect(tag_label).toBeInTheDocument();
    expect(tag_label).toHaveTextContent('Tag');

    const results_h1 = screen.getByTestId('results-h1');
    expect(results_h1).toBeInTheDocument();
    expect(results_h1).toHaveTextContent('Results');
})

describe('component test',()=>{

    let container: HTMLDivElement;

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
        // expect(inputs[0].value).toBe();

        expect(inputs[1].name).toBe('tag');
        expect(inputs[1].type).toBe('text');
    })
})