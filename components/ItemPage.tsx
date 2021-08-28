import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { IItem} from "../types/items";
import CreateItem from "./CreateItem";
import '../styles/item-page.scss';
import itemImage from '../img/item-image.svg';

interface IItemParams {
    id: string;
    name: string;
    cost: string;
    description: string;
}

const ItemPage : React.FC = () => {
    const [isEditVisible,setEditVisible] = useState<boolean>(false);
    const [item,setItem] = useState<IItem>();
    const params = useParams<IItemParams>();
    const history = useHistory()
    let items : IItem;

    useEffect(() => {
        const jsonItem = localStorage.getItem(params.id)
        if(jsonItem) {
            items = JSON.parse(jsonItem);
        }
        setItem(items);
    }, [isEditVisible])

    const deleteItem = () => {
        if(item) localStorage.removeItem(String(item.id));
        history.push('/');
    }

    const switchVisibility = () : void =>{
        setEditVisible(!isEditVisible);
    }

    function gapCost(n : string){
        return n.replace(/\d{0,3}(?=(\d{3})+$)/g, "$& ");
    }

    return (
        <div className='current-item-wrapper'>
            <div className='return-panel'>
                <button onClick={() => history.push('/')}>{'< Back'}</button>
                <span>Current Item</span>
            </div>
            <div className='current-item-info'>
                <div className='item-control'>
                    <img id='current-image' src={itemImage} alt='item-image'></img>
                    <div className='button-group'>
                        <button id='edit-button' onClick={() => switchVisibility()}>EDIT</button>
                        <button id='delete-button' onClick={deleteItem}></button>
                    </div>
                    <div id='current-cost'>$ {gapCost(String(item?.cost))}</div>
                </div>
                <div className='current-item-about'>
                    <div id='current-id'>ID: {item?.id}</div>
                    <div id='current-name'>{item?.name}</div>
                    <div id='current-description'>{item?.description}</div>
                </div>
            </div>
            { isEditVisible && <CreateItem item={item} purpose={'edit'} switchVisibility = {switchVisibility}/>}
        </div>
    )
}

export default ItemPage;
