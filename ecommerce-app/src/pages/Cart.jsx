import React, { useEffect, useState,useContext } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from './ThemeContext';


const Cart = () => {
      const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
        const {theme}=useContext(ThemeContext)

    useEffect(() => {
        try {
            const data = localStorage.getItem("cart");
            if (data) {
                setCartItems(JSON.parse(data));
            }
        }
        catch (error) {
            console.log("Error reading cart:", error);
            setCartItems([]);
        }
    }, []);

    const removeItem = (Id) => {
        const updatedCart = cartItems.filter((product) => product.Id !== Id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const increase = (Id) => {
        const updatedCart = cartItems.map(item =>
            item.Id === Id ? { ...item, qty: item.qty + 1 } : item
        )
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    const decrease = (Id) => {
        const updatedCart = cartItems
            .map(item =>
                item.Id === Id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter(item => item.qty > 0)
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    const totalPrice = cartItems.reduce(
        (total, item) => total + Number(item.finalPrice) * item.qty,
        0
    );

    return (
        <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} flex min-h-screen py-16  `}>
            <div className="w-1/2 p-10 overflow-y-scroll scrollbar-none">
                {cartItems.length === 0 && (
                    <h2 className="text-2xl font-bold">Cart is Empty</h2>
                )}
                {cartItems.map((item) => (
                    <div key={item.Id} className="flex justify-between items-center bg-white p-4 mb-4 rounded-xl shadow">
                        <div className="flex gap-4 items-center" onClick={()=>navigate(`/ProductDetails/${item.Id}/${item.Type}`)}>
                            <img src={item.Img[0]} alt="" className="w-[100px] h-[100px] cursor-pointer object-cover rounded-lg" />
                            <div>
                                <h2 className="text-xl font-bold">{item.Name}</h2>
                                <div className="flex items-center gap-2">
                                    {item.Discount > 0 && (
                                        <span className="text-lg line-through text-gray-400">₹{item.Price}</span>
                                    )}
                                    <span className="text-2xl font-semibold text-green-600">₹{item.finalPrice}</span>
                                    {item.Discount > 0 && (
                                        <span className="text-sm text-red-500 font-semibold">{item.Discount}% OFF</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <button onClick={() => decrease(item.Id)} className="font-semibold text-3xl">-</button>
                            <span className="font-semibold text-3xl">{item.qty}</span>
                            <button onClick={() => increase(item.Id)} className="font-semibold text-3xl">+</button>
                        </div>
                        <div onClick={() => removeItem(item.Id)} className="cursor-pointer text-red-500"><X /></div>
                    </div>
                ))}
            </div>
            <div className="w-1/2 p-10 h-full flex justify-center ">
                <div className="bg-white p-10 h-[50%]  rounded-2xl shadow-lg w-[70%]">
                    <h1 className="text-3xl font-bold mb-6">Cart Totals</h1>
                    <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Total Products:</span><span>{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold mb-6">
                        <span>Total Price:</span><span>₹{totalPrice}</span>
                    </div>
                    <button className="w-full h-[50px] bg-black text-white rounded-lg">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;