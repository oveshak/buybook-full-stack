import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
const Sidebar = ({ data }) => {
  const role=useSelector((state)=>state.auth.role)
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout())
    dispatch(authActions.changeRole("user"))
    // Clear the local storage
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    // Redirect to login page or perform other logout actions
  navigate("/") // Adjust the path as needed
};
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex flex-col justify-center items-center" >
      <img src={data.avatar} className="h-[12vh]" />
      <p className="mt-3 text-xl text-zinc-100 font-semibold">
        {data.username}
      </p>
      <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
      <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>


 {
  role==="user" &&      <div className="w-full flex-col items-center justify-center hidden lg:flex">
  <Link
    to="/profile"
    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
  >
    Favourites
  </Link>
  <Link
    to="/profile/orderHistory"
    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transiti"
  >
    Order History
  </Link>
  <Link
    to="/profile/settings"
    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transiti"
  >
    Settings
  </Link>
</div>
 }
 {
  role==='admin'&&      <div className="w-full flex-col items-center justify-center hidden lg:flex">
  <Link
    to="/profile"
    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
  >
    All order
  </Link>
  <Link
    to="/profile/addbook"
    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transiti"
  >
    add book
  </Link>
  
 
</div>
 }
<button className="bg-zinc-900 w-3/6 " onClick={handleLogout}>
    LogOut
</button>
    </div>
  );
};

export default Sidebar;
