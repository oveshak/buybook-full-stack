import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/profile/Sidebar';
import axios from 'axios';
import Loader from '../component/loader/Loader';

const Profile = () => {
    const [profile,setprofile]=useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    
      useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(
            "http://127.0.0.1:3000/user/userinfo",
            { headers }
          );
          setprofile(response.data);
        }
        fetch();
      }, []);
    return (
        <div className='bg-zinc-900 px-2 md:pz-12 flex flex-col md:flex-row h-screen py-8 gap-4'>
            {!profile && <div className='w-full h-[100%] flex items-center justify-center'>
                <Loader/></div>}
            {
                profile && <>
                
                <div className='w-1/6'>
                <Sidebar data={profile}/>
                            </div>
                            <div  className='w-5/6'>
                                <Outlet/>
                            </div>
                            
                </>
            }
        </div>
    );
}

export default Profile;
