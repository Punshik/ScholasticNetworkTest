import { combineReducers } from "redux";
import { itemReducer } from "./ItemReducer";
import { loadingReducer } from "./LoadingReducer";


export const rootReducer = combineReducers( {
    item: itemReducer,
    loading: loadingReducer,
})

export type RootState =  ReturnType<typeof rootReducer>