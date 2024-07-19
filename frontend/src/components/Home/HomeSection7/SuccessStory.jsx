import React, { useEffect, useRef, useState } from "react";
import review from "../../../data/review";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";

const SuccessStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const itemWidth = 280; // Adjust based on your item width

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const totalWidth = carouselRef.current.scrollWidth;
        const containerWidth = carouselRef.current.clientWidth;

        if (currentIndex >= totalWidth - containerWidth) {
          setCurrentIndex(0); // Reset to start if end is reached
        } else {
          setCurrentIndex((prev) => prev + itemWidth); // Move to the next item
        }
      }
    }, 2000); // Adjust the speed

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full h-auto py-10">
      <div className="w-[95%] md:w-[95%] lg:w-[85%] xl:w-[85%] mx-auto carousel-container ">
        <h1 className="text-4xl text-white font-semibold">
          Success <span className="text-glod-color">Stories.</span>
        </h1>
        <p className="font-extralight text-white">
          Discover the transformative journeys of our satisfied clients, as they
          share their success stories and experiences with our services.
        </p>
        <div
          className="w-full carousel-inner mt-4"
          ref={carouselRef}
          style={{ transform: `translateX(-${currentIndex}px)` }}
        >
          {review.map((item, index) => (
           
              <ReviewCard
                name={item.name}
                increment={item.salary_increment}
                short_name={item.short_name}
                feedback={item.feedback}
                course={item.course}
                history={item.history}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
