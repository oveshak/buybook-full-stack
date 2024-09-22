import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Ensure this import is present
import { Routes, Route } from "react-router-dom";
import { authActions } from "./store/auth";

import Footer from "./component/footer/Footer";
import Navbar from "./component/navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBook from "./component/viewbookdetails/ViewBook";
import Favourites from "./component/profile/Favourites";
import UserOrder from "./component/profile/UserOrder";
import Settings from "./component/profile/Settings";
import AllOrder from "./pages/AllOrder";
import Addbook from "./pages/Addbook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role); // Using useSelector to get the role from state

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]); // Adding dispatch as a dependency in the useEffect hook

  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/allbook" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} >
      { role ==='user'? <Route index element={<Favourites/>}/>:  <Route index element={<AllOrder/>}/>}
      { role ==='admin'&& <Route path="/profile/addbook" element={<Addbook/>}/>}
        <Route path="/profile/orderHistory" element={<UserOrder/>}/>

        <Route path="/profile/settings" element={<Settings/>}/>

        </Route>
        <Route path="/book/:id" element={<ViewBook />} />
        <Route path="/update/:id" element={<UpdateBook />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
