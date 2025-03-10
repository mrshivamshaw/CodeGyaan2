import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex z-10 w-full items-start gap-x-6 px-0 md:px-0 lg:px-8 xl:px-8 pt-8 h-[81vh] overflow-y-scroll profile">
        <div className="flex flex-1 flex-col w-[70%]">
          <h1 className="mb-14 ml-16 md:ml-0 text-4xl font-semibold  text-glod-color">
            Add <span className="text-white">Course.</span>
          </h1>
          <div className="flex-1 w-full ">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden md:hidden lg:block max-w-[400px] flex-1 rounded-md border-[1px] p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5 text-white font-semibold">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5 text-white">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}