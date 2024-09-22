import React from 'react';

const Hero = () => {
    return (
        <div className='h-[75vh] flex'>
           <div className='w-3/6 flex flex-col  justify-center'>
                <h1 className='text-6xl font-semibold text-yellow-300'>Welcome to Reading Portal</h1>
                <p className='mt-4 text-xl text-zinc-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam amet ullam perferendis repellendus quaerat ipsa possimus voluptate sequi. Voluptas natus laborum culpa dolorum at, repudiandae enim numquam quis illum officiis.</p>
                <div className='mt-8'>
                <button className='text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full'>Discover Books</button>
                </div>
           </div>
           <div className='w-3/6 flex items-center justify-center'>
                <img src='https://img.freepik.com/free-photo/creative-composition-world-book-day_23-2148883765.jpg'/>
           </div>
        </div>
    );
}

export default Hero;
