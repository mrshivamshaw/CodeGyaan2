import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import HeroSection from '../../components/CourseOverView/HeroSection'
import CourseContent from '../../components/CourseOverView/CourseContent'
import ReviewSection from '../../components/CourseOverView/ReviewSection'
import Footer from '../../components/Footer/Footer'
import { getFullDetailsOfCourse } from '../../servies/operations/courseOpertaions'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setLoading } from '../../slices/UIslice'
import BuyCourseCard from '../../components/CourseOverView/BuyCourseCard'

const CourseOverView = () => {
  const [ result, setResult ] = useState(null)
  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect( () => {
    // Move the async function inside the effect
    async function fetchData() {
      dispatch(setLoading(true));
      try {
        const resultData = await getFullDetailsOfCourse(id);
        setResult(resultData);
        // console.log(resultData);
        // console.log("klk",resultData.courseContent[0].subSection[0]._id);
        // console.log("ee",resultData.courseContent[0]._id);
      } catch (error) {
        console.error("Error fetching course details:", error);
        // Handle error, e.g., display error message or redirect
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchData(); 
  }, []); 
  
  return (
    <div className='min-w-[100vw] min-h-[100vh] overflow-hidden'>
        <NavBar/>
        <div className='mt-12 md:mt-12 lg:mt-28 xl:mt-28 w-[95%] md:w-[95%] lg:w-[85%] xl:w-[85%] mx-auto flex flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row justify-between items-start gap-9 py-12'>
          <div className='w-[95%] md:w-[95%] lg:w-[80%] xl:w-[80%] mx-auto'>
            <HeroSection course={result}/>
            <CourseContent content={result?.courseContent} author={result?.instructor}/>
            <ReviewSection reviews={result?.ratingAndReviews}/>
          </div>
          <BuyCourseCard thumbnail={result?.thumbnail} id={result?._id} price={result?.price} sectionId={result?.courseContent[0]?._id} subSectionId={result?.courseContent[0]?.subSection[0]?._id} />
        </div>
        <Footer/>
    </div>
  )
}

export default CourseOverView