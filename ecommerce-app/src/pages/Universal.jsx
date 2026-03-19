import React from 'react'
import './Universal.css'
import banner1 from './img/404.jpg'

const Universal = () => {
  return (
    <div className='universalMain'>
      <div className='second_div'>
        <div className='image_div'>
            <img src={banner1} alt="" />
        </div>
        <div className='heading_div'>
            <div className='error_div'>
                <span >404 error</span>
            </div>
            <span className='span_wrong'>Something went wrong:(</span>
            <p className='error_para'>sorry, the page you're searching for isn't here or it's been moved</p>
        </div>
      </div>
    </div>
  )
}

export default Universal
