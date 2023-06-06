import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';  
import useCustomForm from '../../hooks/useCustomForm';


const defaultValues = {
    
    book_id: "",
    text: "",
    rating: ""
}


const ReviewForm = (props) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, postNewReview)

    async function postNewReview(){

        try {
            let response = await axios.post("http://127.0.0.1:5000/api/book_information", formData, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
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
                text: { " "}
                <input 
                    type='text'
                    name='text'
                    value={formData.text}
                    onChange={handleInputChange}
                    />
            </label>
            <label>
                rating: { " "}
                <input 
                    type='text'
                    name='rating'
                    value={formData.rating}
                    onChange={handleInputChange}
                    />
            </label>
            <button type='submit'>Add Review!!</button>


        </form>
    </div>)
}

export default ReviewForm
