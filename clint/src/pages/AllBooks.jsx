import { useEffect, useState } from "react";
import BookCard from "../component/bookcard/BookCard";
import Loader from "../component/loader/Loader";
import axios from "axios";

const AllBooks = () => {
    const [Data,setData]=useState()
    useEffect(()=>{
        const fetch = async () =>{
            const response = await axios.get('http://127.0.0.1:3000/book/');
           
            setData(response.data)
        }
      fetch()
    },[])
    return (
        <div className="bg-zinc-900 h-auto  px-12 py-8">
         <h4 className='text-3xl text-yellow-100'>All books</h4> 
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

export default AllBooks;
