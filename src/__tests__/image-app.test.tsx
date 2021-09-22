export {}
import App from '../App';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from "../state/state-type";
import { createStore, applyMiddleware } from "redux";
import reducers from "../state/reducers";
import thunk from "redux-thunk"
import {render,screen,cleanup, fireEvent, getAllByRole, waitForElement} from '@testing-library/react' 
import {store} from '../state'
import '@testing-library/jest-dom'
import ResultsList from '../components/ResultsList';
import SelectionPanel from '../components/SelectionPanel';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';
import { CategorySelection } from '../components/CategorySelection';
import { Category } from '../Category';
import {CategoryDropdown} from "../components/CategoryDropdown";
import {Filter} from "../components/Filter";


afterEach(cleanup);


function SelectCategory(type:string){
    return "";
}

describe('Selection component',()=>{

    test('should render category selection without errors',()=>{
        render(<CategorySelection selectCategory={SelectCategory} />);
    
        const category_h1 = screen.getByTestId('category-h1');
        expect(category_h1).toBeInTheDocument();
        expect(category_h1).toHaveTextContent('Select Category')
    })

    test('should render category dropdown without errors',async()=>{
        const mockedOnChange = jest.fn();
        render(<CategoryDropdown selectCategory={mockedOnChange} />);

        const category_dropdown = screen.getByTestId("dropdown");
        expect(category_dropdown).toBeInTheDocument();
        const display1 = category_dropdown.children[0];
        expect(display1.textContent).toBe(Category[0]);
    
        // fireEvent.click(category_dropdown);
        // const drop_down_options = getAllByRole(category_dropdown,'option');
        // console.log(drop_down_options[1].textContent);

        // fireEvent.click(screen.getByText(Category[1]));
        // await screen.findByText(Category[1]);
        // expect(mockedOnChange).toHaveBeenCalledTimes(1);
        

    })

    it('should not call the callback function at the beginning and call only once when change dropdown',async ()=>{

        const funOnChange = jest.fn();
        render(<CategoryDropdown selectCategory={funOnChange} />);
        

        const category_dropdown = screen.getByTestId("dropdown");
        expect(category_dropdown).not.toBeNull();
        
        expect(funOnChange).toHaveBeenCalledTimes(0);
        fireEvent.change(category_dropdown, { target: { value: Category[1] } })
        expect(funOnChange).toHaveBeenCalledTimes(1);

        // fireEvent.click(category_dropdown);
        // (await screen.findByText(Category[1])).textContent;
        // expect(screen.findByText(Category[1]).Te).toBe(Category[1]);
        // expect(funOnChange).toHaveBeenCalledTimes(1);

        // fireEvent.keyDown(category_dropdown,{key:'ArrowDown'});
        // fireEvent.click()
        
        // await waitForElement(()=> getByText('Cars'));
        // fireEvent.click(getByText('Cars'));
        // expect(funOnChange).toHaveBeenCalledTimes(1);
        

    })

    test('should render correct selected option when value given', () => {
        const funOnChange = jest.fn();
        const { getByTestId, getAllByTestId } = render(<CategoryDropdown selectCategory={funOnChange} />);
        //The value should be the key of the option
        fireEvent.change(getByTestId('dropdown'), { target: { value: Category[1] } })
        let options = getAllByTestId('select-option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
        
        //...
      })


})


describe('Testing filter component',()=>{

    test('should rendor filter component header and labels',()=>{
        render(<Provider store={store}><Filter/></Provider>);
        const filter_h1 = screen.getByTestId("filter-h1");
        expect(filter_h1).toBeInTheDocument();
        expect(filter_h1).toHaveTextContent('Filter')  

        const name_label = screen.getByTestId("name-label");
        expect(name_label).toBeInTheDocument();
        expect(name_label).toHaveTextContent('Name')


        const tag_label = screen.getByTestId("tag-label");
        expect(tag_label).toBeInTheDocument();
        expect(tag_label).toHaveTextContent('Tag')



    })

    test('should render filter and clear buttons in filter component',()=>{
        render(<Provider store={store}><Filter/></Provider>);
        // screen.debug();
        screen.getByRole('');
        const filter_btn = screen.getByTestId("filter");
        expect(filter_btn.textContent).toBe('Filter');

        const clear_btn = screen.getByTestId('clear');
        expect(clear_btn.textContent).toBe('Clear');
        // expect(screen.getByRole('button',{name:/filter/i})).toBeEnabled(); 
        // screen.getByPlaceholderText('');
    })


    test('should render input fields in filter component at initially',()=>{
        render(<Provider store={store}><Filter/></Provider>);
        
        const name_input = screen.getByTestId('name-input');
        expect(name_input.textContent).toBe('');

        const tag_input = screen.getByTestId('tag-input');
        expect(tag_input.textContent).toBe('');
    })


    test('should pass the correct input values',()=>{
        render(<Provider store={store}><Filter/></Provider>);
        
        const name_input = screen.getByTestId('name-input');
        fireEvent.change(name_input,{target:{value:"test input"}});
        expect(name_input.value).toBe("test input")

        const tag_input = screen.getByTestId('tag-input');
        fireEvent.change(tag_input,{target:{value:"test tag"}});
        expect(tag_input.value).toBe("test tag");

    })

})







// test('test results list',()=>{
//     render(<ResultsList />);

//     const category_h1 = screen.getByTestId('category-h1');
//     expect(category_h1).toBeInTheDocument();
//     expect(category_h1).toHaveTextContent('Select Category')


// })



// describe('component test',()=>{

//     let container: HTMLDivElement;

//     beforeEach(()=>{
//         container = document.createElement('div');
//         document.body.appendChild(container);
//         ReactDOM.render(<Provider store={store}>
//             <App />
//           </Provider>,container);
//     })

//     afterEach(()=>{
//         document.body.removeChild(container);
//         container.remove();
        
//     })

//     it('Render correctly',()=>{
//         const inputs = container.querySelectorAll('input');
//         expect(inputs).toHaveLength(2);
//         expect(inputs[0].name).toBe('name');
//         expect(inputs[0].type).toBe('text');
//         // expect(inputs[0].value).toBe();

//         expect(inputs[1].name).toBe('tag');
//         expect(inputs[1].type).toBe('text');
//     })
// })