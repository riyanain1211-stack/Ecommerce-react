import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { ThemeContext } from './ThemeContext';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [Datas, setData] = useState(JSON.parse(localStorage.getItem("contact_data")) || [])
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext)
  const [Full_Name, setFull_Name] = useState('')
  const [Email, setEmail] = useState('')
  const [Contact, setContact] = useState('')
  const [Message, setMessage] = useState('')
  const [ConatctModal, setContactModal] = useState(false)
  const [TableModal, setTableModal] = useState(false)

  const handelSubmit = (e) => {
    e.preventDefault()
    if (!Full_Name || !Email || !Contact || !Message) {
      toast.error("Please fill the Product details first")
      return
    }
    let Data = {
      Full_Name,
      Email,
      Message,
      Contact,
      Id: Date.now(),
    }
    const addData = [...Datas, Data]
    setData(addData)
    localStorage.setItem("contact_data", JSON.stringify(addData))
    setFull_Name("")
    setEmail("")
    setContact("")
    setMessage("")
    toast.success("user information saved successfully")
  }

  const CloseContactForm=()=>{
    setContactModal(false)
    setFull_Name("")
    setEmail("")
    setContact("")
    setMessage("")
  }
  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-black"} py-20 flex flex-col items-center justify-center min-h-screen`}>
      <div className="bg-white flex justify-around shadow-lg rounded-2xl p-8 w-2/5">
        <button onClick={() => setContactModal(true)} className='bg-black text-white rounded-[20px] hover:bg-white hover:border-black hover:border-[3px] hover:text-black w-[200px] h-[50px]'>Contact form</button>
        <button onClick={() => setTableModal(true)} className='bg-black text-white rounded-[20px] hover:bg-white hover:border-black hover:border-[3px] hover:text-black w-[200px] h-[50px]'>Messages</button>
      </div>
      {
        ConatctModal &&
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4">
          <div className={`${theme === "light" ? "bg-gray-100" : "bg-black border-white border-[2px]"} shadow-xl rounded-2xl p-6 w-full max-w-md relative`}>
            <X className={`${theme === "light" ? "text-gray-500 hover:text-black" : "text-gray-300 hover:text-white"} absolute top-4 right-4 text-lg cursor-pointer`} onClick={CloseContactForm} />
            <h2 className={`${theme === "light" ? "text-black" : "text-white"} text-xl font-bold text-gray-800 mb-4`}>Contact Us</h2>
            <form onSubmit={handelSubmit} className="flex flex-col gap-3">
              <div>
                <label className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} block text-sm font-medium mb-1`}>Full Name</label>
                <input value={Full_Name} onChange={(e) => setFull_Name(e.target.value)} type="text" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} block text-sm font-medium mb-1`}>Email Address</label>
                <input value={Email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} block text-sm font-medium mb-1`}>Contact</label>
                <input value={Contact} onChange={(e) => setContact(e.target.value)} type="tel" placeholder="Enter contact number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} block text-sm font-medium mb-1`}>Message</label>
                <textarea value={Message} onChange={(e) => setMessage(e.target.value)} rows="3" placeholder="Write your message..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">Submit</button>
            </form>
          </div>
        </div>
      }


      {
        TableModal &&
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center h-[100%]'>
          <div className={`${theme === "light" ? 'bg-gray-100' : 'bg-black border-[2px] border-white'} flex flex-col rounded-[10px] p-4`}>
            <div className='flex justify-between'>
              <h2 className={`${theme === "light" ? 'text-black' : 'text-white'} text-2xl font-bold mb-6 text-center`}>All Messages</h2>
              <X className={`${theme === "light" ? 'text-gray-500 hover:text-black' : 'text-gray-400 hover:text-white'} cursor-pointer`} onClick={() => setTableModal(false)} />
            </div>
            <table className='pt-10 mt-10 rounded-[10px] bg-white w-[80%]'>
              <thead className='w-full'>
                <tr className='flex gap-8 p-3 justify-center'>
                  <th className='w-[200px] border-l-[1px] border-black text-center'>Name</th>
                  <th className='w-[200px] border-l-[1px] border-black text-center'>Contact</th>
                  <th className='w-[200px] border-l-[1px] border-black text-center'>Email</th>
                  <th className='w-[200px] border-l-[1px] border-r-[1px] border-black text-center'>Message</th>
                </tr>
              </thead>
              <tbody>
                {
                  Datas.map((Data, index) => (
                    <tr className='flex  justify-center gap-8 border-t-[1px] border-b-[1px] border-black-400 p-3' key={index}>
                      <td className='w-[200px] border-l-[1px] border-black text-center font-semibold'>{Data.Full_Name}</td>
                      <td className='w-[200px] border-l-[1px] border-black text-center font-semibold'>{Data.Contact}</td>
                      <td className='w-[200px] border-l-[1px] border-black text-center font-semibold'>{Data.Email}</td>
                      <td className='w-[200px] border-l-[1px] border-r-[1px] border-black text-center font-semibold'>{Data.Message}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      }

    </div>
  )
}

export default Contact
