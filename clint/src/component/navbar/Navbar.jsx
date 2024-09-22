import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
const Navbar = () => {
    const links=[
        {
            text: 'Home',
            href: '/',
        },
        
        {
            text: 'All Books',
            href: '/allbook',
        },
        {
            text: 'Cart',
            href: '/cart',
        },
        {
            text: 'Profile',
            href: '/profile',
        },
        {
            text: 'Admin Profile',
            href: '/profile',
        },
       
        // Add more links as needed
    ]
    const islogin=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector((state)=>state.auth.role)
    console.log(islogin)
    if(islogin===false){
        links.splice(2,3)
    }
    if(islogin===true && role=='user'){
        links.splice(4,1)
        
    }
    if(islogin===true && role=='admin'){
        links.splice(2,2)
        
    }

    return (
        <div className='flex items-center justify-between bg-zinc-800 text-white px-8 py-4'>
            <div className="flex items-center ">
                <img 
                className="h-10 me-4"
                src="https://www.shutterstock.com/image-vector/open-book-logo-education-flat-260nw-2273881327.jpg"/>
                <h1 className='text-2xl font-semibold'>BookShop</h1>
            </div>
            <div>
                <div className="nav-links-bookheaven flex items-center gap-4">
                    <div className="flex gap-4">
                    {
                        links.map((link, index) => (
                            <Link to={link.href} className="hover:text-blue-500 transition-all duration-400" key={index}>{link.text}</Link>
                        ))
                    }
                    </div>
                    {
                        islogin === false ? <div className="flex gap-4">
                        <Link to="/login" className="px-4 py-1 border rounded border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-400 ">login</Link>
                        <Link to="/signup" className="px-4 py-1 bg-white text-zinc-800 rounded hover:bg-blue-500 hover:text-white transition-all duration-400">SignUp</Link>
                    </div>:<></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;
