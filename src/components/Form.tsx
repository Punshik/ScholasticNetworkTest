import React, { useState } from "react";
import '../styles/form.scss';
import itemImage from '../img/item-image.svg';

interface IFormInvalid {
    nameInvalid : string;
    costInvalid: string;
    descriptionInvalid: string;
}

interface IForm {
    getValues : (name : string, cost : number, description : string) => void;
}

const Form : React.FC<IForm> = ({getValues}) => {
    const [name,setName] = useState<string>('');
    const [cost,setCost] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [disabled, setDisable] = useState<boolean>(false);
    const [formInvalid, setFormInvalid] = useState<IFormInvalid>({nameInvalid: '', costInvalid: '', descriptionInvalid: ''});

    const checkInputValidation = (event: any) => {
        switch (event.target.name){
            case 'name': {
                if(event.target.value.length < 200 && event.target.value.length > 0){
                    setValues(event);
                    setFormValidation();
                    return '';
                }
                else{
                    setDisable(false);
                    return 'name-invalid';
                }
            }
            case 'cost': {
                if(event.target.value > 0 && (typeof Number(event.target.value) === 'number')){
                    setValues(event);
                    setFormValidation();
                    return '';
                }
                else{
                    setDisable(false);
                    return 'cost-invalid';
                }
            }
            case 'description': {
                if(event.target.value.length < 1000 && event.target.value.length > 0){
                    setValues(event);
                    setFormValidation();
                    return '';
                }
                else{
                    setDisable(false);
                    return 'description-invalid';
                }
            }
            default:
                return '';
        }
    }

    const setValues = (event: any) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'cost':
                setCost(Number(event.target.value));
                break;
            case 'description':
                setDescription(event.target.value);
                break;
            default:
                return;
        }
    }

    const setFormValidation = () => {
       if(name && cost && description)  setDisable(true);
    }

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInvalid(() => {
            return {
                ...formInvalid,
                nameInvalid : checkInputValidation(e),
            }
        })
    };

    const changeCostHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInvalid(() => {
            return {
                ...formInvalid,
                costInvalid : checkInputValidation(e),
            }
        })
    };

    const changeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormInvalid(() => {
            return {
                ...formInvalid,
                descriptionInvalid : checkInputValidation(e),
            }
        })
    };

    return (
        <div className='form-wrapper'>
            <img id='form-image' src={itemImage} alt='item-image'></img>
            <form className='form-container' onSubmit={() => getValues(name,cost,description)}>
                <input className={`form-group input-group ${formInvalid.nameInvalid}`} type='text' onChange ={changeNameHandler} placeholder='Name' name='name'></input>
                <input className={`form-group input-group ${formInvalid.costInvalid}`} type='text' onChange ={changeCostHandler}  placeholder='Cost' name='cost'></input>
                <textarea className={`form-group textarea-group ${formInvalid.descriptionInvalid}`} onChange = {changeDescriptionHandler}   placeholder='Description' name='description'></textarea>
                <button className='apply-button' type='submit' disabled={!disabled}>CREATE ITEM</button>
            </form>
        </div>
    )
}

export default Form;