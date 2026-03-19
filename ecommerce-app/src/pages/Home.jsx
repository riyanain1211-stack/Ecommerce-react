import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from './ThemeContext';
import { toast } from "react-toastify";


function Home() {
  const [Products] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const Navigate = useNavigate();
      const {theme}=useContext(ThemeContext)


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
    // alert("product added to cart")
    toast.success("Product Added To Cart")
  };

  const banners = [
    {
      Banner_heading: "WORKWEAR WONDER",
      Banner_description:
        "Browse through our diverse range of melticously crafted garments designed to bring out your individuality and cater to your sense of style.",
      Banner_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPi17eqBZ8ho2RXjv8e8oaD0hB9n3LfT9yg&s",
    },
    {
      Banner_heading: "NEW SEASON ARRIVALS",
      Banner_description:
        "Discover the latest trends in fashion and refresh your wardrobe with new arrivals for men, women, and kids.",
      Banner_img: "https://pbs.twimg.com/media/Cbl77n1UsAE8S-w.jpg",
    },
    {
      Banner_heading: "MEGA DIWALI SALE",
      Banner_description:
        "Get up to 70% off on top brands this festive season. Limited time offer — shop before it's gone!",
      Banner_img: "https://img.freeup.app/fit-in/600x600/filters:upscale()/a7e2092ce9ede0614c5b92f5ee887b6c.jpg",
    },
    {
      Banner_heading: "WINTER COLLECTION",
      Banner_description: "Stay warm and stylish this winter with our latest range of jackets, sweaters, and hoodies.",
      Banner_img: "https://m.media-amazon.com/images/I/5119m71aRYL._AC_UF894,1000_QL80_.jpg",
    },
    {
      Banner_heading: "WINTER CLOTHS",
      Banner_description: "Stay warm and stylish this winter with our latest range of jackets, sweaters, and hoodies.",
      Banner_img: "https://w0.peakpx.com/wallpaper/125/717/HD-wallpaper-jungkook-bts-jungkook-jk-gl.jpg",
    },

    {
      Banner_heading: "SUMMER NEW COLLECTIONS",
      Banner_description: "Stay and stylish this summer with our latest range of shirt and t-shirt.",
      Banner_img: "https://assets.ajio.com/medias/sys_master/root/20230628/9NgD/649bc879a9b42d15c909e518/-473Wx593H-465905533-maroon-MODEL.jpg",
    }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === banners.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 3000)
  }, []);

  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"}  flex flex-wrap justify-center gap-8 p-10 min-h-screen`}>
      <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} flex flex-col justify-center gap-8 p-10 w-full h-full`}>
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 w-full text-white rounded-[10px] overflow-hidden py-5">
          <div className="flex transition-all duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {banners.map((element, index) => (
              <div key={index} className="min-w-full flex items-center justify-between px-20">
                <div className="max-w-lg">
                  <h1 className="text-4xl font-bold mb-4">{element.Banner_heading}</h1>
                  <p className="text-gray-400 mb-6">{element.Banner_description}</p>
                  <a href="/shop" className="bg-black text-white px-6 py-3 rounded">Shop Now</a>
                  <div className="flex gap-10 mt-8">
                    <div>
                      <h1 className="text-2xl font-bold">200+</h1>
                      <span>International Brands</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">2,000+</h1>
                      <span>High-Quality Products</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">30,000+</h1>
                      <span>Happy Customers</span>
                    </div>
                  </div>
                </div>
                <div className="w-[350px] h-[400px]">
                  <img src={element.Banner_img} alt={element.Banner_heading} className="w-full h-full rounded-[10px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-5xl font-bold">Featured product</h1>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {Products
            .filter(product => product.Featured === 1)
            .slice(0, 6)
            .map((Product) => (
              <div key={Product.Id} className="bg-white w-[310px] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.35)] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)] transition duration-300">
                <div onClick={() => Navigate(`/ProductDetails/${Product.Id}/${Product.Type}`)} className="relative">
                  <div className="relative h-[300px] w-full bg-white object-contain">
                    <img src={Product.Img[0]} alt="Product" className="w-full h-full p-4 rounded-[20px]" />
                  </div>
                </div>
                <div className="pl-4 pb-4 pr-4 pt-0">
                  <h2 className="text-xl font-bold"> {Product.Name}</h2>
                  <div className="flex items-center gap-2">
                    {Product.Discount > 0 && (
                      <span className="text-lg line-through text-gray-400">₹{Product.Price}</span>
                    )}
                    <span className="text-2xl font-semibold text-green-600">₹{Product.finalPrice}</span>
                    {Product.Discount > 0 && (
                      <span className="text-sm text-red-500 font-semibold">{Product.Discount}% OFF</span>
                    )}
                  </div>
                  <h2 className="font-semibold"> {Product.Description}</h2>
                </div>
                <button onClick={() => addToCart(Product)} className="mr-2 mb-2 ml-2 w-4/5 h-[40px] bg-black text-white rounded-lg">
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
        <section class="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 w-full text-white rounded-[10px]">
          <div class="mx-auto px-6 py-6 flex items-center">
            <div class="w-1/2 flex flex-col gap-5">
              <p class="uppercase tracking-widest text-sm text-purple-200">New Collection</p>
              <h1 class="text-4xl md:text-6xl font-bold leading-tight">Elevate Your <br /><span class="text-white">Style Today</span></h1>
              <p class="text-purple-100">Discover premium quality products designed for modern living.</p>
              <button class="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300">Shop Now</button>
            </div>
            <div class="w-1/2 rounded-[20px] flex justify-center">
              <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSRR06GWGrJB6hKvikcPOb5F34ourmOGQB3UTTJJb2wv8Ac9uZLE0fW5myaoIsKtSQQxCGm4kkMpRJjmdV_B91EnHiz27AzgRhbVdItzCkZBcAQjdxEy2L9Lw" alt="Product" class="w-80 rounded-[20px] md:w-96 drop-shadow-2xl" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
