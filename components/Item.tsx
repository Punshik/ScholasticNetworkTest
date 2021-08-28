import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IItem, ItemAction } from "../types/items";
import CreateItem from "./CreateItem";
import '../styles/item.scss';
import itemImage from '../img/item-image.svg';

interface IItemProps {
    item : IItem;
    onClick: (item: IItem) => void;
}

const Item : React.FC<IItemProps> = ({item, onClick}) => {
    const [isEditVisible,setEditVisible] = useState<boolean>(false);
    const dispatch = useDispatch();

    const switchVisibility = () : void =>{
        setEditVisible(!isEditVisible);
    }

    const deleteItem = () => {
        dispatch({type: ItemAction.DELETE_ITEMS, payload: item})
        localStorage.removeItem(String(item.id));
    }

    function gapCost(n : string){
        return n.replace(/\d{0,3}(?=(\d{3})+$)/g, "$& ");
    }

    return (
        <div className='item-container'>
            <div className='item-info-wrapper' onClick={() => onClick(item)} key={item.id}>
                <div id='image'>
                    <img src={itemImage} alt='item-image'></img>
                </div>
                <div className='item-info'>
                    <div id='item-name'>{item.name}</div>
                    <div id='item-description'>{item.description}</div>
                </div>
            </div>
            <div className='edit-menu'>
                <div id='item-id'>ID: {item.id}</div>
                <div id='item-cost'>$ {gapCost(String(item.cost))}</div>
                <div className='item-button-group'>
                    <button id='edit' onClick={() => switchVisibility()}>EDIT</button>
                    <button id='delete' onClick={deleteItem}></button>
                </div>
            </div>
                { isEditVisible && <CreateItem item={item} purpose={'edit'} switchVisibility = {switchVisibility}/>}
        </div>
    )
}

export default Item;