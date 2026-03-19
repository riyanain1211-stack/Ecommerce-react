import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { ThemeContext } from './ThemeContext';
import Logo_img from './img/logo.png'

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div>
            <div className={`${theme === "light" ? "bg-white" : "bg-black border-b-[2px] border-white"} flex justify-between z-[100] items-center fixed  w-full h-[70px] px-10`}>
                <NavLink className={"w-[20%] cursor-pointer"} to="/">
                    <img className="w-[130px] h-[40px] bg-white border-[2px] border-black rounded-[35px]" src={Logo_img} alt="" />
                </NavLink>
                <div className="w-[70%] flex font-semibold text-[22px] justify-center items-center">
                    <div className=" flex justify-center items-center">
                        <NavLink className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-5 mx-2 h-[35px] w-[115px]  rounded-[35px]`} to="/About">About</NavLink>
                        <NavLink className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-5 mx-2 h-[35px] w-[115px]  rounded-[35px]`} to="/Admin">Admin</NavLink>
                        <NavLink className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-5 mx-2 h-[35px] w-[115px]  rounded-[35px]`} to="/Cart">Cart</NavLink>
                        <NavLink className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-5 mx-2 h-[35px] w-[115px]  rounded-[35px]`} to="/Product">Product</NavLink>
                        <NavLink className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-5 mx-2 h-[35px] w-[115px]  rounded-[35px]`} to="/Contact">Contact</NavLink>
                        <div onClick={() => toggleTheme(theme === "light" ? "dark" : "light")} className={`${theme === "dark" ? "translate-x-0 bg-gray-100" : "bg-black"} w-[65px] h-[30px] rounded-[30px] flex items-center p-1 cursor-pointer relative`}>
                            <div className={`h-[23px] w-[24px] rounded-[22px] shadow-md transform transition duration-300 hover:scale-105
                                  ${theme === "dark" ? "translate-x-[33px] bg-black" : "translate-x-0 bg-white"}`}></div>
                        </div>
                        {/* <button className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-2 mx-2 h-[35px] w-[130px]  rounded-[35px]`} onClick={toggleTheme}>theme:{theme === "light" ? "dark" : "Light"}</button> */}
                    </div>
                </div>
            </div>

          
        </div>
    )
}

export default Navbar