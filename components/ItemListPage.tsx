import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ItemAction, LoadingAction } from "../types/items";
import exportFromJSON from 'export-from-json'
import CreateItem from "./CreateItem";
import Item from "./Item";
import '../styles/item-list-page.scss'

interface ItemListPageProps {
    searchQuery: string;
}

const ItemListPage: React.FC<ItemListPageProps> = ({searchQuery}) => {
    const [isCreateVisible,setCreateVisible] = useState<boolean>(false);
    const {items} = useTypedSelector(state => state.item)
    const {loading} = useTypedSelector(state => state.loading)
    const dispatch = useDispatch();
    const history = useHistory();

    function switchVisibility() : void{
        setCreateVisible(!isCreateVisible);
    }

    const getSearchedItem = useMemo(() => {
        return items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery,items])

    useEffect(() => {
            for(let key in localStorage){
                if (!localStorage.hasOwnProperty(key)) {
                    continue;
                  }

                const item = localStorage.getItem(key); 

                if(item !== null){
                    dispatch({type: ItemAction.SET_ITEMS, payload: JSON.parse(item)})
                }      
            };
        return () => {
            for(let i = 0 ; i < items.length; i++){
                const jsonItem = JSON.stringify(items[i]);
                localStorage.setItem(String(items[i].id),jsonItem);
            }
            dispatch({type : ItemAction.CLEAR});
        }
    }, []);

    useEffect(() => {
        dispatch({type: LoadingAction.LOADING})
    }, [items])

    const switchLoading = () => {
            setTimeout(() => {
                dispatch({type: LoadingAction.LOADED});
            },2500);
        return ( <div style={{display:'none'}}></div>)
    }

    const downloadXls = () => {
        if(getSearchedItem.length > 0){
        const fileName = 'item-list';
        const data = getSearchedItem;
        const exportType = 'xls';
        exportFromJSON({data,fileName,exportType});
        }
    }

    
    return (
        <div className='list-container'>
            <span id='label'>Item List</span>
            <div className='button-wrapper'>
                <button className='button-group export' onClick={() => downloadXls()}>EXPORT AS .XLS</button>
                <button className='button-group create-item' onClick={() => switchVisibility()}>CREATE ITEM</button>
            </div>
            {getSearchedItem.length !== 0 && !loading ?
                <div className='list-wrapper'>
                    {
                        getSearchedItem.map(item => {
                            return <Item key={Math.floor(Math.random()*10000)} onClick={() => history.push(`/item/${item.id}`)}  item={item} />
                        })
                    }
                </div>
                :
                <div>
                    <span id='empty-list'>NO ITEMS</span>
                    {
                        switchLoading()
                    }
                </div>
            }
             { isCreateVisible && <CreateItem purpose={'create'} switchVisibility = {switchVisibility}/>}
        </div>
    );
}

export default ItemListPage;