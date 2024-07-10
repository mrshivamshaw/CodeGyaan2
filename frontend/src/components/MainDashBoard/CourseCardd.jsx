import React from 'react'
import { IoBookmarks } from "react-icons/io5";
import { removeFromCart } from '../../servies/operations/cartOperation';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices/UIslice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const CourseCardd = ({image,title,price,id}) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = async() => {
    removeFromCart(dispatch, setLoading, id, toast); 

  }
  return (
    <div className='flex flex-col justify-between items-start rounded-md relative bg-black-bg pb-3 w-[100%] md:w-full lg:w-[300px] xl:w-[300px] border-1 border-black shadow-2xl'>
        <img src={image} alt="image" className='w-full h-[160px] rounded-md'/>
        <div className='flex justify-between items-center w-full px-2'>
        <Link to={'/course/'+title+'/'+id} >
          <div className='group'>
            <div className='text-white/90 font-semibold pt-2 group-hover:underline'>{title}</div>
            <div className='text-white/90 font-semibold text-glod-color group-hover:underline'>Rs. {price}</div>
          </div>
          </Link>
          <div onClick={removeFromCartHandler} className='text-white text-2xl cursor-pointer'>
            <IoBookmarks/>
          </div>
        </div>
    </div>
  )
}

export default CourseCardd