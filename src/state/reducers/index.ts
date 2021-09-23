import { CombinedState, combineReducers, Reducer } from "redux";
import imageReducer from './imageReducer';
import { ActionType, Action } from "../action-types/action-types";
import { StateType } from "../state-type";


const reducers = combineReducers({
    image: imageReducer
})



export default reducers;
//: Reducer<CombinedState<{image: never;}>, Action>
 

// export type State1 = GetAllReduxActions<typeof reducers>
export type State = ReturnType<typeof reducers>;


// type GetAllReduxActions<T> = T extends (state: any, actions: infer Actions, ...args: any[]) => any
//   // omit empty objects like `{}`
//   ? keyof Actions extends []
//     ? never
//     : Actions
//   : T extends Record<string, infer Values>
//   ? GetAllReduxActions<Values>
//   : never