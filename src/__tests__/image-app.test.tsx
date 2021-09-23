export { }
import App from '../App';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from "../state/state-type";
import { createStore, applyMiddleware } from "redux";
import reducers from "../state/reducers";
import thunk from "redux-thunk"
import { render, screen, cleanup, fireEvent, getAllByRole, waitForElement } from '@testing-library/react'
import { store } from '../state'
import '@testing-library/jest-dom'
import ResultsList from '../components/ResultsList';
import SelectionPanel from '../components/SelectionPanel';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';
import { CategorySelection } from '../components/CategorySelection';
import { Category } from '../Category';
import { CategoryDropdown } from "../components/CategoryDropdown";
import { Filter } from "../components/Filter";
import { CheckBoxList } from '../components/CheckBoxItem';
import { Image } from '../common-interfaces/index';
import ImagePanel from '../components/ImagePanel';
import { ActionType, Action } from "../state/action-types/action-types";
import imageReducer, { initialState } from '../state/reducers/imageReducer'
import { selectCategory } from '../state/actions/actions';
import configureMockStore from 'redux-mock-store';





afterEach(cleanup);

const imageList: Image[] = [
    {
        id: "WBpr_yH0Frg", alt_description: "assorted petaled flowers centerpiece inside room", 
        urls: { small: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxMXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "flower" },{title:"flora"},{title:'centerpiece'}]
    },
    {
        id: "RPmWEtZLh7U", alt_description: "bunch of sunflowers", 
        urls: { small: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxM3x8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "sunflower" }]
    },
    {
        id: "7SXNxz8UIw4", alt_description: "selective focus photography of red petaled flower", 
        urls: { small: "https://images.unsplash.com/photo-1505129013025-ecf8f0168373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxNXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "flower" }]
    }
];





function SelectCategory(type: string) {
    return "";
}

describe('Selection component', () => {

    test('should render category selection without errors', () => {
        render(<CategorySelection selectCategory={SelectCategory} />);

        const category_h1 = screen.getByTestId('category-h1');
        expect(category_h1).toBeInTheDocument();
        expect(category_h1).toHaveTextContent('Select Category')
    })

    test('should render category dropdown without errors', async () => {
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

    it('should not call the callback function at the beginning and call only once when change dropdown', async () => {

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

        // interface tem extends HTMLElement{
        //     selected:boolean;
        // }

        const funOnChange = jest.fn();
        const { getByTestId, getAllByTestId } = render(<CategoryDropdown selectCategory={funOnChange} />);
        //The value should be the key of the option
        fireEvent.change(getByTestId('dropdown'), { target: { value: Category[1] } })


        let options = getAllByTestId('select-option');
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();

        //...
    })


})


describe('Testing filter component', () => {

    test('should rendor filter component header and labels', () => {
        render(<Provider store={store}><Filter /></Provider>);
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

    test('should render filter and clear buttons in filter component', () => {
        render(<Provider store={store}><Filter /></Provider>);
        // screen.debug();
        // screen.getByRole('');
        const filter_btn = screen.getByTestId("filter");
        expect(filter_btn.textContent).toBe('Filter');

        const clear_btn = screen.getByTestId('clear');
        expect(clear_btn.textContent).toBe('Clear');
        // expect(screen.getByRole('button',{name:/filter/i})).toBeEnabled(); 
        // screen.getByPlaceholderText('');
    })


    test('should render input fields in filter component at initially', () => {
        render(<Provider store={store}><Filter /></Provider>);

        const name_input = screen.getByTestId('name-input');
        expect(name_input.textContent).toBe('');

        const tag_input = screen.getByTestId('tag-input');
        expect(tag_input.textContent).toBe('');
    })


    test('should pass the correct input values', () => {
        render(<Provider store={store}><Filter /></Provider>);

        const name_input = screen.getByTestId('name-input');
        fireEvent.change(name_input, { target: { value: "test input" } });
        expect(name_input.getAttribute('value')).toBe("test input")

        const tag_input = screen.getByTestId('tag-input');
        fireEvent.change(tag_input, { target: { value: "test tag" } });
        expect(tag_input.getAttribute('value')).toBe("test tag");

    })

})






describe('Testing results component', () => {

    const mockedOnChange = jest.fn();


    const image: Image = {
        id: "OWq8w3BYMFY", alt_description: "white petaled flowers with green leaves", urls: { small: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxOXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
        tags: [{ title: "flower" }]
    };


    test('should render result heading', () => {
        render(<ResultsList loading={true} resultsImages={[]} selectedImages={imageList} selectImage={mockedOnChange} />)
        const result_heading = screen.getByTestId("results-h1");
        expect(result_heading).toBeInTheDocument();
    })


    test('should render entire results images', () => {
        render(<ResultsList loading={false} resultsImages={imageList} selectedImages={[]} selectImage={mockedOnChange} />)
        const result_heading = screen.getAllByTestId('result-field');
        expect(result_heading.length).toBe(3);
        // const { length } = screen.getByTestId("results-container").querySelectorAll('div');
        //    console.log(result_heading[0]);

    })


    test('should render "select category" when loading equals to true', () => {
        render(<ResultsList loading={true} resultsImages={imageList} selectedImages={[]} selectImage={mockedOnChange} />)
        const loading_heading = screen.getByTestId('loading-heading');
        expect(loading_heading).toBeInTheDocument();
        // const { length } = screen.getByTestId("results-container").querySelectorAll('div');
        //    console.log(result_heading[0]);

    })


    test('should render checkbox items', () => {
        render(<CheckBoxList item={imageList[0]} selectImage={mockedOnChange} selectedImages={imageList} />);
        const checkbox_item = screen.getByTestId('checkbox_item');
        expect(checkbox_item).toBeInTheDocument();

    })

    test('should not call the callback function at the beginning', () => {
        render(<CheckBoxList item={imageList[0]} selectImage={mockedOnChange} selectedImages={imageList} />);
        // const checkbox_item = screen.getAllByTestId('checkbox_item');
        // expect(checkbox_item.length).toEqual(3);
        // expect(screen.getByText('assorted petaled flowers centerpiece inside room')).toBeInTheDocument();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);
    })

    test('should call the callback function 1 time when checkbox ticked', () => {
        render(<CheckBoxList item={image} selectImage={mockedOnChange} selectedImages={imageList} />);
        const checkbox_item = screen.getByTestId('checkbox_item');

        expect(mockedOnChange).toBeCalledTimes(0);
        fireEvent.click(checkbox_item);
        expect(mockedOnChange).toBeCalledTimes(1);
    })

    test('should description of an image, located inside a checkbox item', () => {
        render(<CheckBoxList item={imageList[0]} selectImage={mockedOnChange} selectedImages={imageList} />);
        const result_field = screen.getByTestId('result-field');
        expect(result_field).toHaveTextContent(imageList[0].alt_description)
        expect(screen.getByText(imageList[0].alt_description)).toBeInTheDocument();

    })

    test('should previously selected item has ticked checkbox', () => {
        render(<CheckBoxList item={imageList[0]} selectImage={mockedOnChange} selectedImages={imageList} />);
        const checkbox_item = screen.getByTestId('checkbox_item') as HTMLInputElement;
        expect(checkbox_item.checked).toBe(true);

    })

    test('should previously non-selected item has non-ticked checkbox', () => {
        render(<CheckBoxList item={image} selectImage={mockedOnChange} selectedImages={imageList} />);
        const checkbox_item = screen.getByTestId('checkbox_item') as HTMLInputElement;
        expect(checkbox_item.checked).toBe(false);
    })



})



describe('Image panel tests', () => {
    const mockedOnChange = jest.fn();
    const imageList: Image[] = [
        {
            id: "WBpr_yH0Frg", alt_description: "assorted petaled flowers centerpiece inside room", urls: { small: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxMXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
            tags: [{ title: "flower" }]
        },
        {
            id: "RPmWEtZLh7U", alt_description: "bunch of sunflowers", urls: { small: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxM3x8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
            tags: [{ title: "sunflower" }]
        },
        {
            id: "7SXNxz8UIw4", alt_description: "selective focus photography of red petaled flower", urls: { small: "https://images.unsplash.com/photo-1505129013025-ecf8f0168373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxNXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
            tags: [{ title: "flower" }]
        }
    ];

    test('should render image panel', () => {
        render(<ImagePanel images={imageList} selectImage={mockedOnChange} />);
        const image_section = screen.getAllByTestId("image-section");
        expect(image_section).toBeTruthy();
    })

    test('should render all the images that input', () => {
        render(<ImagePanel images={imageList} selectImage={mockedOnChange} />);
        const image_section = screen.getAllByTestId("image-section");
        expect(image_section.length).toBe(imageList.length);
    })

    test('should not call the callback function at the beginning', () => {
        render(<ImagePanel images={imageList} selectImage={mockedOnChange} />);
        expect(mockedOnChange).toHaveBeenCalledTimes(0);
    })

    test('should call the callback function at one time when press close btn', () => {
        render(<ImagePanel images={imageList} selectImage={mockedOnChange} />);
        const close_btns = screen.getAllByTestId('image-panel-close-btn');
        expect(mockedOnChange).toHaveBeenCalledTimes(0);

        fireEvent.click(close_btns[0]);
        expect(mockedOnChange).toHaveBeenCalledTimes(1);

    })

    test('should render image correctly', () => {
        render(<ImagePanel images={imageList} selectImage={mockedOnChange} />);
        const image_container = screen.getAllByTestId('image-container');

        expect(image_container[0].src).toBe(imageList[0].urls.small);
    })

})



describe('Test reducers', () => {




    test('should return initial state', () => {

        expect(imageReducer(initialState, {})).toEqual(
            {
                selectedCategoryImages: [],
                resultsImages: [],
                clearValue: false,
                selectedImages: [],
                loading: true
            })
    })

    test('should return correct filtered objects as resultsImages when filter name given', () => {

        const filterInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(filterInitialObject, {
            type: ActionType.FILTER,
            payload: {
                name: "flowers",
                tag: ""
            }
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: [imageList[0], imageList[1]],
            clearValue: false,
            selectedImages: [],
            loading: false
        })
    })




    test('should return correct filtered objects as resultsImages when filter tag given', () => {

        const filterInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(filterInitialObject, {
            type: ActionType.FILTER,
            payload: {
                name: "",
                tag: "sunflower"
            }
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: [imageList[1]],
            clearValue: false,
            selectedImages: [],
            loading: false
        })
    })





    test('should selected image add to selectedImage list',()=>{
        
        const selectImageInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(selectImageInitialObject, {
            type: ActionType.SELECT_IMAGE,
            payload: imageList[1]
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: [],
            clearValue: false,
            selectedImages: [imageList[1]],
            loading: false
        })

    })




    test('should set initial image list into resultImage list when action type is CLEAR',()=>{
        
        const selectImageInitialObject: StateType = {
            selectedCategoryImages: imageList, resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(selectImageInitialObject, {
            type: ActionType.CLEAR
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: imageList,
            clearValue: false,
            selectedImages: [],
            loading: false
        })

    })




    test('should set selectedCategoryImages & resultsImages to new category images when action type is CHANGE_CATEGORY',()=>{
        
        const selectImageInitialObject: StateType = {
            selectedCategoryImages: [], resultsImages: [], clearValue: false,
            selectedImages: [], loading: false
        }

        expect(imageReducer(selectImageInitialObject, {
            type: ActionType.CHANGE_CATEGORY,
            payload: imageList
        })).toEqual({
            selectedCategoryImages: imageList,
            resultsImages: imageList,
            clearValue: false,
            selectedImages: [],
            loading: false
        })

    })




    test('should return loading true when action type fails', () => {

        expect(imageReducer(initialState, { type: ActionType.FAIL })).toEqual(
            {
                selectedCategoryImages: [],
                resultsImages: [],
                clearValue: false,
                selectedImages: [],
                loading: true
            })
    })



})




// describe('Test actions',()=>{
    

//     test('action',async ()=>{
//         console.log(selectCategory('cake'));
//     })
    
//     //expect(selectCategory('cake')).


// })


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