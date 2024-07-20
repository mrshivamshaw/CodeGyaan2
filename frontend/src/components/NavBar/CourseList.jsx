import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCourseCategories } from '../../servies/operations/courseOpertaions'
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCourseCategories();
      setCategories(categories);  
    } 
    if(!sessionStorage.getItem("category")){
      getCategories()
    }
    else{
      setCategories(JSON.parse(sessionStorage.getItem("category")))
    }
  }, [])
  
  return (
    
    <div className=' absolute top-[20.5vh] md:top-[15.5vh] lg:top-[13.5vh] xl:top-[13.5vh] left-[35.7vw] md:left-[35.7vw] lg:left-[26.7vw] xl:left-[26.7vw] z-20 hidden group-hover:block courselist py-4 bg-transparent'>
      <div className='bg-black-bg rounded-md'>
        <div className='flex flex-col justify-start items-start w-full'>
          {
            categories.map((category,id) => (
              <div key={id} onClick={() => navigate(`/courses/category/${category._id}`)} className='hover:bg-gray-700 w-full px-6 py-2 '>{category.name}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CourseList