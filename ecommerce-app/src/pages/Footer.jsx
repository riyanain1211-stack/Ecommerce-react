import { useContext } from 'react';
import React from 'react';
import { ThemeContext } from './ThemeContext';


const Footer = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`${theme === "light" ? "bg-white" : "bg-black border-t-[2px] border-white"}  w-full flex justify-center items-center  h-full bg-gray-100`}>
            <footer className="w-full h-full bg-black flex justify-center items-center">
                <div className="flex w-[95%] h-full flex justify-between items-center py-[30px]">
                    <div>
                        <h2 className="text-3xl font-semibold text-white ">The Ecommerce<br />products<br />brands<span className="align-super text-sm">®</span></h2>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase mb-4">London</h3>
                        <ul className=" ">
                            <li><a href="" className="text-white">newbusiness@weareimpero.com</a></li>
                            <li className='text-white'>+44 20 7998 7571</li>
                            <li className='text-white'>Unit 306, Metropolitan Wharf,<br />70 Wapping Wall, London E1W 3SS</li>
                            <li><a href="#" className="underline text-white"> See on map →</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase mb-4">Buenos Aires</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:buenosaires@weareimpero.com" className="text-white">buenosaires@weareimpero.com </a></li>
                            <li className='text-white'>+54 11 6799 7949</li>
                            <li className='text-white'> Cabildo 1458 1st floor,<br />Buenos Aires</li>
                            <li><a href="#" className="underline text-white">See on map → </a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase mb-4">
                                Want to be the smartest<br />in your office?
                            </h3>
                            <a href="#" className="underline text-white text-sm">
                                Sign up for our newsletter →
                            </a>
                        </div>
                        <div className="mt-8">
                            <p className="text-sm mb-3 text-white">FOLLOW US</p>
                            <div className="flex justify-between text-lg">
                                <a href="#" className="text-white">Be</a>
                                <a href="#" className="text-white">Fb</a>
                                <a href="#" className="text-white">IG</a>
                                <a href="#" className="text-white">in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
