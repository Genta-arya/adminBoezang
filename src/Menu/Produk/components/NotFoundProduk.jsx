import Lottie from 'lottie-react'
import React from 'react'
import animationData from "../../../assets/animation/ItemNotFound.json"
const NotFoundProduk = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Lottie animationData={animationData} autoplay loop className='md:w-80 lg:w-[40%]' />
    </div>
  )
}

export default NotFoundProduk
