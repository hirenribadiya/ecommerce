import { useState } from 'react'
import {Navbar} from "./component/navbar.jsx"
import { Routes,Route } from 'react-router-dom'
import './App.css'
import { Home } from "./component/home.jsx"
import { Men } from "./component/men.jsx"
import { Women} from "./component/women.jsx"
import { Kids } from "./component/kids.jsx"
import { Login } from "./component/login.jsx"
import { Cart } from "./component/cart.jsx"
import { Seller } from './component/seller.jsx'
import { SignUp } from './component/signup.jsx'

function App() {
  const RouteData = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/men",
      element: <Men />,
    },
    {
      path: "/women",
      element: <Women />,
    },
    {
      path: "/kids",
      element: <Kids />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/seller",
      element: <Seller />,
    },
    
    
  ];

  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        {RouteData.map((ele) => {
          return (
            <Route path={ele.path} element={ele.element} />
          );
        })}
      </Routes>
    </div>
  
    </>
  )   
}

export default App
