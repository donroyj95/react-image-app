import configureMockStore from 'redux-mock-store';
import * as selectActions from '../state/actions/actions';
import thunk from "redux-thunk";
import { ActionType } from '../state/action-types/action-types';
import { Action } from 'redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";


const middlewares = [thunk];






describe('selectAvatar', () => {
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();
    beforeEach(() => {
        store.clearActions();
    })


    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
            type: ActionType.CLEAR,
        },
      ];
    //   const dispatch = store.dispatch();
    //   const { clearSelections } = bindActionCreators(actionCreators, store.dispatch)
      store.dispatch(selectActions.clearSelections());
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




