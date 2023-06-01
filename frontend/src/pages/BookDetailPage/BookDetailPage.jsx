import React from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const BookDetail = ({book}) =>{
    const navigate = useNavigate();


    const {book_id} = useParams()

    return(
        <div>
            {book_id}
        </div>
    )
};

export default BookDetail