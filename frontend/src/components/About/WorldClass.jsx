import React from 'react'

const WorldClass = () => {
  return (
    <div className='flex flex-wrap max-w-[95vw] md:max-w-[95vw] lg:max-w-[85vw] xl:max-w-[85vw] mx-auto my-[15vh]'>
        <div className='flex flex-col gap-4 pb-6 w-full md:w-full lg:w-[614px] xl:w-[614px] h-[310px] md:h-[250px] lg:h-[250px] xl:h-[250px]'>
            <h1 className='text-4xl text-white font-bold'>World-Class Learning for <span className='text-glod-color'>Anyone, Anywhere</span></h1>
            <p className='text-white/80'>CodeGyann partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
            <button className='py-3 px-6 bg-[rgb(203,171,97)] rounded font-semibold text-white hover:bg-[#b99b55] w-[180px]'>Learn More</button>
        </div>
        <div className='p-6 bg-[#82827f] flex flex-col gap-[4vh] w-full md:w-full lg:w-[339px] xl:w-[339px] h-[250px]'>
            <h1 className='text-white text-xl font-semibold '>Our Learning Methods</h1>
            <p className='text-white/80 text-[15px]'>CodeGyann partners with more than 275+ leading universities and companies to bring</p>
        </div>
        <div className='p-6 bg-black-bg flex flex-col gap-[4vh] w-full md:w-full lg:w-[339px] xl:w-[339px] h-[250px]'>
            <h1 className='text-white text-xl font-semibold '>Certification</h1>
            <p className='text-white/80 text-[15px]'>CodeGyann partners with more than 275+ leading universities and companies to bring</p>
        </div>
        <div className='w-[275px] h-[250px] hidden md:hidden lg:block xl:block '>
            </div>
        <div className='p-6 bg-[#82827f] flex flex-col gap-[4vh] w-full md:w-full lg:w-[339px] xl:w-[339px] h-[250px]'>
            <h1 className='text-white text-xl font-semibold '>Rating "Auto-grading"</h1>
            <p className='text-white/80 text-[15px]'>CodeGyann partners with more than 275+ leading universities and companies to bring</p>
        </div>
        <div className='p-6 bg-black-bg flex flex-col gap-[4vh] w-full md:w-full lg:w-[339px] xl:w-[339px] h-[250px]'>
            <h1 className='text-white text-xl font-semibold '>Curriculum Based on Industry Needs</h1>
            <p className='text-white/80 text-[15px]'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
        </div>
        <div className='p-6 bg-[#82827f] flex flex-col gap-[4vh] w-full md:w-full lg:w-[339px] xl:w-[339px] h-[250px]'>
            <h1 className='text-white text-xl font-semibold '>Ready to Work</h1>
            <p className='text-white/80 text-[15px]'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
        </div>
    </div>
  )
}

export default WorldClass