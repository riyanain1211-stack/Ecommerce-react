import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from './ThemeContext';
import { toast } from "react-toastify";
import { Loader } from "lucide-react";


const ProductDetails = () => {
    const [Products, setProducts] = useState(JSON.parse(localStorage.getItem('data')) || [])
    const [currentImg, setCurrentImg] = useState(0)
    const { theme } = useContext(ThemeContext)

    const Navigate = useNavigate();
    const [similarProducts, setSimilarProducts] = useState([]);
    const { Id } = useParams();
    const { Type } = useParams();
    const product = Products.find((item) => item.Id == Number(Id));
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let checkproduct = cart.find((item) => item.Id === product.Id)
        if (checkproduct) {
            // alert("product already exists")
            toast.error("Product Already Exists")
            return
        }
        cart.push({ ...product, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Product Added To Cart")
    };


    useEffect(() => {
        if (Products.length > 0) {
            const filtered = Products.filter((item) => item.Type === Type && item.Id !== Number(Id));
            console.log(filtered)
            setSimilarProducts(filtered);
        }
    }, [Id]);

    return (
        <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} min-h-screen py-20 flex flex-col items-center justify-center p-6`}>
            <div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white border-[3px] border-white"} rounded-2xl shadow-lg max-w-6xl w-full grid md:grid-cols-2 gap-10 p-8`}>
                <div className={`flex gap-6`}>
                    <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none max-h-[500px]">
                        {product.Img?.map((img, index) => (
                            <div onClick={() => setCurrentImg(index)} className={`w-20 h-20 rounded-lg p-1 cursor-pointer transition border-2 ${currentImg === index ? "border-indigo-600" : "border-gray-200 hover:border-indigo-400"}`} key={index}>
                                <img src={img} alt="" className="w-full h-full object-contain rounded-md" />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center w-[400px] h-[500px] border rounded-xl p-4">
                        <img src={product.Img[currentImg]} alt="" className="rounded-xl w-full h-full object-contain" />
                    </div>
                </div>
                <div className="flex flex-col gap-5 justify-center">
                    <h1 className={`${theme === "light" ? "text-gray-800" : "text-gray-100"} text-4xl font-bold mb-4`}>{product.Name}</h1>
                    <div className="flex items-center gap-3 mb-4">
                        {product.Discount > 0 && (
                            <span className="text-lg line-through text-gray-400">₹{product.Price}</span>
                        )}
                        <span className="text-2xl font-semibold text-green-600">₹{product.finalPrice}</span>
                        {product.Discount > 0 && (
                            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-md font-semibold">{product.Discount}% OFF</span>
                        )}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Description:</h2>
                        <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"} text-gray-600`}>{product.Description}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Features:</h2>
                        <ul className={`${theme === "light" ? "text-gray-700" : "text-gray-400"} flex flex-col gap-2 text-sm list-disc pl-5`}>{product.Features?.map((feature, index) => (<li key={index}>{feature}</li>))}
                        </ul>
                    </div>
                    <button onClick={() => addToCart(product)} className="mr-2 border-[2px] border-white mb-2 ml-2 w-4/5 h-[40px] bg-black text-white rounded-lg">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="w-full max-w-7xl my-10 py-10">
                <h2 className={`${theme === "light" ? "text-gray-800" : "text-white"} text-3xl font-bold mb-6 text-center`}>You May Also Like</h2>
                <div className="flex gap-5 justify-center">
                    {similarProducts.length === 0 && (
                        <h2 className="text-2xl font-bold">NO similar Products here</h2>
                    )}
                    {similarProducts.map((prod, index) => (
                        <div key={index} className="bg-white w-[260px] rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300">
                            <div onClick={() => Navigate(`/ProductDetails/${prod.Id}/${prod.Type}`)} className="cursor-pointer">
                                <img src={prod.Img[0]} alt="product" className="w-full h-[180px] object-cover rounded-t-2xl" />
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="font-semibold text-lg">{prod.Name}</h3>
                                <div className="flex items-center gap-2">
                                    {prod.Discount > 0 && (
                                        <span className="text-lg line-through text-gray-400">₹{prod.Price}</span>
                                    )}
                                    <span className="text-2xl font-semibold text-green-600">₹{prod.finalPrice}</span>
                                    {prod.Discount > 0 && (
                                        <span className="text-sm text-red-500 font-semibold">{prod.Discount}% OFF</span>
                                    )}
                                </div>
                                <button onClick={() => addToCart(prod)} className="mr-2 mb-2 ml-2 w-4/5 h-[40px] bg-black text-white rounded-lg">
                                    Add to Cart
                                </button>

                                {/* <div className='w-10 h-10 bg-green-600 rounded-full animate-pulse'></div> */}
                                {/* <div className='w-5 h-5 animate-spin'>
                                    <Loader w-5 h-5></Loader>
                                </div> */}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;