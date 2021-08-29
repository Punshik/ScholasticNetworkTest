import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/create-item.scss';
import {IItem, ItemAction} from "../types/items";
import Form from './Form';

interface ICreateItemProps {
    item? : IItem ;
    purpose : 'create' | 'edit';
    switchVisibility : () => void;
}

const CreateItem : React.FC<ICreateItemProps> = ({item , purpose , switchVisibility}) => {
    const dispatch = useDispatch();
    
    const generateId = () : number =>{
        return Math.floor(Math.random()*10000);
    }

    function getValues(nameForm : string, costForm : number, descriptionForm : string){
        switch (purpose) {
            case 'create':{
                onCreate(nameForm,costForm,descriptionForm);
                break;
            }
            case 'edit': {
                item !== undefined ? onEdit(item.id,nameForm,costForm,descriptionForm) : onEdit(1,'',1,'');
                break;
            }
        }
    }

    const onCreate = (name : string, cost : number, description : string) : void => {
        const id = generateId();
        const newItem = {id,name,cost,description};
        dispatch({type: ItemAction.SET_ITEMS, payload: newItem});
        localStorage.setItem(String(newItem.id),JSON.stringify(newItem));
        switchVisibility();
    }

    const onEdit = (id : number,name : string, cost : number, description : string) : void => {
        const newItem = {id,name,cost,description};
        dispatch({type: ItemAction.CHANGE_ITEMS, payload: newItem})
        localStorage.removeItem(String(id));
        localStorage.setItem(String(id),JSON.stringify(newItem));
        switchVisibility();
    }

    
        return (
            <div className='create-window-wrapper'>
                <div id='background'></div>
                <div id='create-window-form'>
                    <span id='window-label'>{purpose === 'create' ? 'Create new item' : 'Edit item'}</span> 
                    <Form getValues={getValues}/>
                </div>
            </div>
        )
}

export default CreateItem;