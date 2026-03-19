import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';


const About = () => {
        const {theme}=useContext(ThemeContext)

  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} flex flex-col py-10 items-center`}>
            <div className='flex flex-col gap-2 w-4/5 mt-10 p-3 rounded-[10px] bg-white'>
                <h1 className='text-2xl font-bold'>About</h1>
                <h2 className='font-semibold'>Welcome to E-commerce!</h2>
                <p className='font-semibold'>Our journey began with a simple idea — to provide high-quality products at affordable prices while delivering an exceptional online shopping experience. Today, we proudly serve customers with carefully selected products that combine quality, value, and reliability.</p>
            </div>
            <div className='w-4/5 flex flex-col gap-2 mt-10 p-3 rounded-[10px] bg-white'>
                <h1  className='text-2xl font-bold'>Our Mission</h1>
                <p className='font-semibold'>Our mission is to make online shopping easy, secure, and enjoyable for everyone. We are committed to offering great products, fast delivery, and responsive customer support.</p>
            </div>
            <div className='w-4/5 flex flex-col gap-2 mt-10 p-3 rounded-[10px] bg-white'>
                <h1  className='text-2xl font-bold'>Our Vision</h1>
                <p className='font-semibold'>Our vision is to become a trusted and preferred online store where customers can shop with confidence and convenience.</p>
            </div>
            <div className='w-4/5 flex flex-col gap-2 mt-10 p-3 rounded-[10px] bg-white'>
                <h1  className='text-2xl font-bold'>Why Choose Us?</h1>
                <ul className='list-disc pl-3 font-semibold'>
                    <li>Premium Quality Products</li>
                    <li>Competitive & Affordable Prices</li>
                    <li>Fast and Reliable Shipping</li>
                    <li>Secure Payment Options</li>
                    <li>Easy Return & Refund Policy</li>
                    <li>Dedicated Customer Support</li>
                </ul>
            </div>
            <div className='w-4/5 flex flex-col gap-2 mt-10 p-3 rounded-[10px] bg-white'>
                <h1  className='text-2xl font-bold'> Get in Touch</h1>
                <ul className='font-semibold d-flex flex-col gap-2'>
                   <li> We would love to hear from you!</li>
                   <li> If you have any questions, feedback, or suggestions, feel free to contact us:</li>
                  <li>  Email: support@[E-commerce].com</li>
                   <li> Phone: +1-999-454-988</li></ul>
                <p className='font-semibold'>Thank you for choosing [E-commerce].
                    We look forward to serving you!</p>
            </div>
        </div>
  )
}

export default About
