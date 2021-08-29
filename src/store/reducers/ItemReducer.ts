import { IItemAction, IItemState, ItemAction } from "../../types/items";


const initialItemState : IItemState = {
    items : [],
}

export const itemReducer = (state = initialItemState, action : IItemAction) : IItemState => {
    switch(action.type){
        case ItemAction.SET_ITEMS:
            return {items: [...state.items,action.payload]};
        case ItemAction.CHANGE_ITEMS:
            return {...state, 
                    items: state.items.map(item => {
                        if(item.id !== action.payload.id){
                            return item
                        }
                        return {
                            ...item,
                            name: action.payload.name,
                            cost: action.payload.cost,
                            description: action.payload.description
                        }
                })
            };
        case ItemAction.DELETE_ITEMS:
            return {items: state.items.filter(item => item !== action.payload)};
        case ItemAction.CLEAR:
            return {items: []};
        default:
            return state;

    }
}