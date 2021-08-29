
export interface IItem {
    id : number;
    name: string;
    cost: number;
    description: string;
}

export interface IItemState {
    items: IItem[];
}

export interface IItemAction {
    type: string;
    payload?: any;
}

export interface ILoadingState {
    loading: boolean;
}

export interface ILoadingAction {
    type: string;
}

export enum ItemAction {
    CHANGE_ITEMS = "CHANGE_ITEMS",
    DELETE_ITEMS = "DELETE_ITEMS",
    SET_ITEMS = "SET_ITEMS",
    CLEAR = "CLEAR",
}

export enum LoadingAction {
    LOADING = "LOADING",
    LOADED = "LOADED",
}