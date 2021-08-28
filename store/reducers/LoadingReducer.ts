import { ILoadingAction, ILoadingState, LoadingAction } from "../../types/items";


const initialLoadingState : ILoadingState = {
    loading : true,
}


export const loadingReducer = (state = initialLoadingState, action : ILoadingAction) : ILoadingState => {
    switch(action.type){
        case LoadingAction.LOADING:
            return {loading: true};
        case LoadingAction.LOADED:
            return {loading: false};
        default:
            return state;
    }
}