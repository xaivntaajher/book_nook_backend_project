import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';  
import useCustomForm from '../../hooks/useCustomForm';


const defaultValues = {
    
        "book_id": "",
        "title": "",
        "thumbnail_url": "",

}


const AddFavorite = (props) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, postNewFavorite)

    async function postNewFavorite(){

        try {
            let response = axios.post("http://127.0.0.1:5000/api/user_favorites", formData, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              navigate('/')
        } catch (error) {
            console(error.message)

        }
    
    }

    return(
    <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
            <label>
                book_id: { " "}
                <input 
                    type='text'
                    name='book_id'
                    value={formData.book_id}
                    onChange={handleInputChange}
                    />
            </label>
            <label>
                title: { " "}
                <input 
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                    />
            </label>
            <label>
                thumbnail_url: { " "}
                <input 
                    type='text'
                    name='thumbnail_url'
                    value={formData.thumbnail_url}
                    onChange={handleInputChange}
                    />
            </label>
            <button type='submit'>Add!</button>


        </form>
    </div>)
}

export default AddFavorite
