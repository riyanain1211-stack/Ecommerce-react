import React, { useState, useContext, useEffect } from "react";
import { Trash, X, Pencil } from 'lucide-react'
import { ThemeContext } from './ThemeContext';
import { toast } from "react-toastify";

function Admin() {
  const { theme } = useContext(ThemeContext)
  const [Products, setProducts] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [Name, setName] = useState('')
  const [Price, setPrice] = useState('')
  const [Img, setImage] = useState([''])
  const [Description, setDescription] = useState('')
  const [Featured, setFeatured] = useState('')
  const [editIndex, setEditindex] = useState(null)
  const [Features, setFeatures] = useState([""])
  const [Discount, setDiscount] = useState('')
  const [Type, setType] = useState('')
  const [Loading, setLoading] = useState(false)
  const [Modal, setModal] = useState(false)

  const handelAddProduct = () => {
    if (!Name || !Price || !Img || !Description || Featured === "" || !Featured || !Type || Type === "select") {
      toast.error("Please fill the Product details first")
      return
    }
    if (Number(Featured) !== 0 && Number(Featured) !== 1) {
      toast.error("Featured field me sirf 0 ya 1 enter kar sakte ho")
      return
    }
    if (Discount > 100) {
      toast.error("Discount 0 to 100% only")
      return
    }
    if (editIndex !== null) {
      setLoading(true)
      const featuresArray = Features.filter(f => f.trim() !== "")
      const ImageArray = Img.filter(img => img.trim() !== "")
      const originalPrice = Number(Price)
      const discountValue = Number(Discount)
      const finalPrice = discountValue > 0 ? originalPrice - (originalPrice * discountValue) / 100 : originalPrice
      let editedProduct = Products.map((product) =>
        product.Id === editIndex
          ? { ...product, Name, Img: ImageArray, Price, finalPrice: finalPrice, Description, Discount, Featured: Number(Featured), Features: featuresArray, Type }
          : product
      )
      setProducts(editedProduct)
      setTimeout(() => {
        setLoading(false)
        let dataproduct = JSON.stringify(editedProduct)
        localStorage.setItem("data", dataproduct)
      }, 3000);
      setName("")
      setPrice("")
      setImage([""])
      setDescription("")
      setFeatured("")
      setFeatures([""])
      setDiscount("")
      setType("")
      toast.success("Product edited Successfully 🎉🎉")
    }
    else {
      setLoading(true)
      const featuresArray = Features.filter(f => f.trim() !== "")
      const ImageArray = Img.filter(img => img.trim() !== "")
      const originalPrice = Number(Price)
      const discountValue = Number(Discount)
      const finalPrice = discountValue > 0 ? originalPrice - (originalPrice * discountValue) / 100 : originalPrice
      let Product = {
        Name,
        Price: originalPrice,
        finalPrice: finalPrice,
        Img: ImageArray,
        Description,
        Id: Date.now(),
        Features: featuresArray,
        Featured: Number(Featured),
        Discount: discountValue,
        Type
      }
      let addProduct = Products
      addProduct.push(Product)
      setProducts(addProduct)
      setTimeout(() => {
        setLoading(false)
        let allProducts = JSON.stringify(addProduct)
        localStorage.setItem("data", allProducts)
      }, 3000);
      setName("")
      setPrice(0)
      setImage([""])
      setDescription("")
      setFeatured("")
      setDiscount("")
      setFeatures([""])
      setType("")
      // alert("Product created Successfully 🎉🎉")
      toast.success("Product created Successfully 🎉🎉")
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2500);
  }, [])

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...Features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
  }

  const addFeatureInput = () => {
    setFeatures([...Features, ""])
  }

  const handleimage = (index, value) => {
    const updatedimg = [...Img]
    updatedimg[index] = value
    setImage(updatedimg)
  }

  const addProductImg = () => {
    setImage([...Img, ""])
  }

  const dltProduct = (Id) => {
    setLoading(true)
    const newProduct = Products.filter((el) => el.Id !== Id)
    setProducts(newProduct)
    setTimeout(() => {
      setLoading(false)
      let allProduct = JSON.stringify(newProduct)
      localStorage.setItem("data", allProduct)
    }, 3000);
    let cartproduct = JSON.parse(localStorage.getItem("cart"))
    const updatedCart = cartproduct.filter((product) => product.Id !== Id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // alert("product deleted successfully")
    toast.success("product deleted successfully")
  }

  const removeFeature = (index) => {
    const updatedFeatures = Features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
  }

  const removeimage = (index) => {
    const updatedimg = Img.filter((_, i) => i !== index)
    setImage(updatedimg)
  }

  const editProduct = (Id) => {
    setModal(true)
    setEditindex(Id)
    let product = Products.find((p) => p.Id === Id)
    setName(product.Name)
    setImage(product.Img)
    setPrice(product.Price)
    setDescription(product.Description)
    setFeatured(String(product.Featured))
    setFeatures(product.Features)
    setDiscount(product.Discount)
    setType(product.Type)
  }

  const handelCloseModal = () => {
    setModal(false)
    setName("")
    setPrice(0)
    setImage([""])
    setDescription("")
    setFeatured("")
    setDiscount("")
    setFeatures([""])
    setType("")
  }

  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} flex flex-col items-center justify-center flex-wrap  gap-8 py-20 w-full h-full`}>
      <div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-700"} flex flex-col rounded-[10px] p-5 gap-8 justify-center items-center flex-wrap w-[95%]`}>
        <div className="flex justify-center">
          <button className="w-[130px] h-[35px] rounded-[10px] bg-black text-white" onClick={() => setModal(true)}>add product</button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 w-full p-6">
          {Loading ? (
            <div className="flex items-center justify-center w-full h-[60vh]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 animate-spin">
              </div>
            </div>
          ) : (
            Products.map((Product) => (
              <div key={Product.Id} className="bg-white w-[300px] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="h-[260px] w-full bg-white flex items-center justify-center">
                    <img src={Product.Img[0]} alt="Product" className="w-full h-full object-contain p-4" />
                  </div>
                  <span className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white cursor-pointer transition">
                    <Trash size={18} onClick={() => dltProduct(Product.Id)} />
                  </span>
                  <span className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white cursor-pointer transition">
                    <Pencil size={18} onClick={() => editProduct(Product.Id)} />
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-sm text-gray-500">ID: {Product.Id}</h2>
                  <h2 className="text-xl font-bold text-gray-800">{Product.Name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    {Product.Discount > 0 && (
                      <span className="text-md line-through text-gray-400">₹{Product.Price}</span>
                    )}
                    <span className="text-xl font-semibold text-green-600">₹{Product.finalPrice}</span>
                    {Product.Discount > 0 && (
                      <span className="text-sm text-red-500 font-semibold">{Product.Discount}% OFF</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">{Product.Description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {
        Modal &&
        <div className="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center h-[100%]">
          <div className="w-auto flex bg-gray-100 h-[90vh] justify-center items-center rounded-[10px]">
            <div className={`${theme === "light" ? "bg-gray-100" : "bg-black text-white border-[3px] border-white"} flex flex-col gap-4 p-6 font-bold rounded-[8px] w-full min-w-[500px] h-[85vh]`}>
              <div className="flex justify-between items-center w-full">
                <span>{editIndex !== null ? "Edit product" : "Add product"}</span>
                <X className="cursor-pointer" onClick={handelCloseModal} />
              </div>
              <div className="overflow-y-auto flex-1 pr-2 scrollbar-none">
                <form className="flex flex-col gap-4">
                  <input value={Name} onChange={(e) => setName(e.target.value)} className="rounded-[8px] w-full bg-gray-300 h-[39px] p-3" type="text" placeholder="Product Name" />
                  <textarea value={Description} onChange={(e) => setDescription(e.target.value)} className="rounded-[8px] border p-3 bg-gray-300 w-full h-[60px]" placeholder="Description" />
                  {Img.map((img, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <textarea value={img} onChange={(e) => handleimage(index, e.target.value)} className="rounded-[8px] border p-2 h-[50px] bg-gray-300 flex-1" placeholder={`Image URL ${index + 1}`} />
                      {Img.length > 1 && (
                        <button type="button" onClick={() => removeimage(index)} className="flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-red-200 hover:bg-red-300">
                          <Trash size={18} />
                        </button>
                      )}
                      {index === Img.length - 1 && (
                        <button type="button" onClick={addProductImg} className="flex text-2xl items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-blue-200 hover:bg-blue-300">+</button>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-[20px] w-full items-center">
                    <span className="text-xl">Select Product Type:</span>
                    <select className={`${theme === "light" ? "text-black" : "bg-gray-100 text-black"} rounded-[8px] p-2`} onChange={(e) => setType(e.target.value)}>
                      <option value="select">select</option>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Shirt">Shirt</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Watch">Watch</option>
                      <option value="Jeans">Jeans</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Sarees">Sarees</option>
                      <option value="Sandals">Sandals</option>
                      <option value="Handbags">Handbags</option>
                      <option value="Sunglasses">Sunglasses</option>
                      <option value="Perfume">Perfume</option>
                    </select>
                  </div>
                  <div className="flex gap-4 w-full items-center">
                    <span className="font-semibold text-2xl text-green-600 pr-10">Featured</span>
                    <span>Yes</span>
                    <input value={1} checked={Featured === "1"} onChange={(e) => setFeatured(e.target.value)} type="radio" name="aa" />
                    <span>No</span>
                    <input value={0} checked={Featured === "0"} onChange={(e) => setFeatured(e.target.value)} type="radio" name="aa" />
                  </div>
                  <div className="flex gap-4 w-full">
                    <input value={Price} onChange={(e) => setPrice(Number(e.target.value))} className="rounded-[8px] h-[37px] w-1/2 bg-gray-300 p-3" type="number" min={1} placeholder="Price" />
                    <input value={Discount} onChange={(e) => setDiscount(Number(e.target.value))} className="rounded-[8px] h-[37px] w-1/2 bg-gray-300 p-3" type="number" min="0" max="100" placeholder="Discount (%)" />
                  </div>
                  {Features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <textarea value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="rounded-[8px] p-2 bg-gray-300 flex-1 h-[50px]" placeholder={`Product Feature ${index + 1}`} />
                      {Features.length > 1 && (
                        <button type="button" onClick={() => removeFeature(index)} className="flex items-center justify-center w-[40px] h-[35px] rounded-[8px] bg-red-200 hover:bg-red-300">
                          <Trash size={18} />
                        </button>
                      )}
                      {index === Features.length - 1 && (
                        <button type="button" onClick={addFeatureInput} className="flex items-center justify-center text-2xl w-[40px] h-[35px] rounded-[8px] bg-blue-200 hover:bg-blue-300">+</button>
                      )}
                    </div>
                  ))}
                </form>
              </div>
              <button onClick={handelAddProduct} className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} h-[45px] w-full rounded-[20px] font-semibold hover:opacity-90`}>{editIndex !== null ? "Edit" : "Add"}</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}


export default Admin;