import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from './ThemeContext';
import { toast } from "react-toastify";



const Product = () => {
    const Navigate = useNavigate();
    const [Type, setType] = useState('')
    const { theme } = useContext(ThemeContext)
    const { Id } = useParams()
    const [similarProducts, setSimilarProducts] = useState([]);
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let checkproduct = cart.find((item) => item.Id === product.Id)
        if (checkproduct) {
            // alert("product already exists")
            toast.error("product already exists")
            return
        }
        cart.push({ ...product, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        // alert("product added to cart")
        toast.success("product added to cart")
    };

    useEffect(() => {
        let product = JSON.parse(localStorage.getItem("data"))
        if (product && Type) {
            const filtered = product.filter((item) => item.Type === Type);
            setSimilarProducts(filtered);
        }
        else {
            setSimilarProducts(product);
        }
    }, [Type, Id]);
    return (
        <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} min-h-screen p-20`}>
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6 mb-10 flex items-center justify-between">
                <span className="text-xl font-semibold">Select Product Type:</span>
                <select className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black" onChange={(e) => setType(e.target.value)}>
                    <option value="select">Select</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Watch">Watch</option>
                    <option value="USB Cables">USB Cables</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sarees">Sarees</option>
                    <option value="Sandals">Sandals</option>
                    <option value="Handbags">Handbags</option>
                    <option value="Sunglasses">Sunglasses</option>
                    <option value="Perfume">Perfume</option>
                    <option value="Wall Clocks">Wall Clocks</option>
                    <option value="Baby Clothes">Baby Clothes</option>
                </select>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {similarProducts.map((Product) => (
                    <div key={Product.Id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                        <div onClick={() => Navigate(`/ProductDetails/${Product.Id}/${Product.Type}`)} className="cursor-pointer bg-gray-50 h-[250px] flex items-center justify-center">
                            <img src={Product.Img[0]} alt="Product" className="h-full object-contain p-4" />
                        </div>
                        <div className="p-4 space-y-2">
                            <h2 className="text-lg font-bold">{Product.Name}</h2>
                            <div className="flex items-center gap-2">
                                {Product.Discount > 0 && (
                                    <span className="line-through text-gray-400">₹{Product.Price}</span>
                                )}
                                <span className="text-xl font-semibold text-green-600">₹{Product.finalPrice}</span>
                                {Product.Discount > 0 && (
                                    <span className="text-sm text-red-500 font-semibold">{Product.Discount}% OFF</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">{Product.Description}</p>
                            <button onClick={() => addToCart(Product)} className="w-full mt-3 h-[40px] bg-black text-white rounded-lg hover:bg-gray-800 transition">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product
