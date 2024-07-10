import React from 'react'

const MiddleBanner = () => {
  return (
    <div className='max-w-[100vw] bg-black-bg'>
        <div className='max-w-[95vw] md:max-w-[95vw] lg:max-w-[85vw] xl:max-w-[85vw] mx-auto flex justify-around items-center py-[5vh] flex-wrap gap-y-8'>
            <div className='flex flex-col justify-center items-center w-[50%] md:w-[50%] lg:w-auto xl:w-auto '>
                <h1 className='text-white text-3xl font-semibold'>500+</h1>
                <div className='text-white/60'>Active Students</div>
            </div>
            <div className='flex flex-col justify-center items-center w-[50%] md:w-[50%] lg:w-auto xl:w-auto '>
                <h1 className='text-white text-3xl font-semibold'>10+</h1>
                <div className='text-white/60'>Mentors</div>
            </div>
            <div className='flex flex-col justify-center items-center w-[50%] md:w-[50%] lg:w-auto xl:w-auto '>
                <h1 className='text-white text-3xl font-semibold'>100+</h1>
                <div className='text-white/60'>Courses</div>
            </div>
            <div className='flex flex-col justify-center items-center w-[50%] md:w-[50%] lg:w-auto xl:w-auto '>
                <h1 className='text-white text-3xl font-semibold'>50+</h1>
                <div className='text-white/60'>Ratings</div>
            </div>
        </div>
    </div>
  )
}

export default MiddleBanner