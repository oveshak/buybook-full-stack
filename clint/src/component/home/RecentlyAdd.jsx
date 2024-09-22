import  { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../bookcard/BookCard';
import Loader from '../loader/Loader';
const RecentlyAdd = () => {
    const [Data,setData]=useState()
    useEffect(()=>{
        const fetch = async () =>{
            const response = await axios.get('http://127.0.0.1:3000/book/get-recent-book');
           
            setData(response.data)
        }
      fetch()
    },[])
    
    
    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently added books</h4> 
            {!Data &&<div className='flex items-center justify-center my-8'><Loader/></div>}
            <div className='my-4 grid grid-cols-4 gap-4'>
            {
                Data&&Data.map((item)=>(
                    <div key={item._id}>
                        <BookCard data={item} />
                    </div>
                ) )
            }
            </div>           
        </div>
    );
}

export default RecentlyAdd;
