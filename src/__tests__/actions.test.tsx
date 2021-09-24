import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import thunk from "redux-thunk";
import { ActionType, Action } from '../state/action-types/action-types';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { Dispatch } from "redux";
import axios from 'axios';
import { Image } from '../common-interfaces/index';








describe('Testing actions', () => {

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();
  const dispatch: Dispatch<Action> = store.dispatch;

  const { clearSelections, selectCategory, selectImage, filterNameAndTag } = bindActionCreators(actionCreators, dispatch);

  beforeEach(() => {
    store.clearActions();
  })




  test('should return expectedAction when call clearSelection action', () => {
    const expectedActions = [
      {
        type: ActionType.CLEAR,
      }
    ];

    clearSelections();
    expect(store.getActions()).toEqual(expectedActions);
  });




  test('should return expectedActions when call selectCategory action', async () => {
    const category: string = 'car';

    const url = "https://api.unsplash.com/search/photos?page=2&query=" + category + "&client_id=" + "Up2AjDWTexG6Qzh1EcgW4EWdRxHCL0quU875jDOpeHY";
    const res = await axios.get(url);

    const expectedActions = [
      {
        type: ActionType.LOADING,
      },
      {
        type: ActionType.CHANGE_CATEGORY,
        payload: res.data.results
      },
    ];


    await selectCategory(category);
    expect(store.getActions()).toEqual(expectedActions);
  });




  test('should return expectedActions when call selectImage action', () => {
    const image: Image = {
      id: "7SXNxz8UIw4", alt_description: "selective focus photography of red petaled flower",
      urls: { small: "https://images.unsplash.com/photo-1505129013025-ecf8f0168373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjAzNjl8MHwxfHNlYXJjaHwxNXx8Rmxvd2Vyc3xlbnwwfHx8fDE2MzIzNjgwNjY&ixlib=rb-1.2.1&q=80&w=400" },
      tags: [{ title: "flower" }]
    };

    const expectedActions = [
      {
        type: ActionType.SELECT_IMAGE,
        payload: image
      }
    ];


    selectImage(image);
    expect(store.getActions()).toEqual(expectedActions);
  });



  test('should return expectedActions when call filterNameAndTag action', () => {
    const name: string = 'test';
    const tag: string = 'test tag';

    const expectedActions = [
      {
        type: ActionType.FILTER,
        payload: {
          name: name,
          tag: tag
        }
      }
    ];

    filterNameAndTag(name, tag);
    expect(store.getActions()).toEqual(expectedActions);
  });






  // const thunk =
  //     ({ dispatch, getState }) =>
  //         next =>
  //             action => {
  //                 if (typeof action === 'function') {
  //                     return action(dispatch, getState)
  //                 }

  //                 return next(action)
  //             }

  // const create = () => {
  //     const store = {
  //         getState: jest.fn(() => ({})),
  //         dispatch: selectActions.clearSelections()
  //     }
  //     const next = jest.fn()

  //     const invoke = action => thunk(store)(next)(action)

  //     return { store, next, invoke }
  // }

  // test('',()=>{
  //     const { next, invoke } = create()
  //     const action = { type: ActionType.CLEAR,}
  //     invoke(action)
  //     expect(next).toHaveBeenCalledWith(action)
  // })

  // test('calls the function', () => {
  //     const { invoke } = create()
  //     const fn = selectActions.clearSelections;
  //     invoke(fn)
  //     expect(fn).toHaveBeenCalled()
  //   })




  // test('passes dispatch and getState', () => {
  //     const { store, invoke } = create()
  //     invoke((dispatch, getState) => {
  //       dispatch({ type: ActionType.CLEAR})
  //       getState()
  //     })
  //     console.log(store.dispatch);

  //     expect(store.dispatch).toHaveBeenCalledWith(selectActions.clearSelections())
  //     expect(store.getState).toHaveBeenCalled()
  //   })



});




